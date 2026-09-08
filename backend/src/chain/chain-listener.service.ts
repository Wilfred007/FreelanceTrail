import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { baseUnitsToDecimalString } from './usdc.util';

// Single fixed row id for the one-row sync-progress table — see SyncCursor in
// schema.prisma. Using a constant string avoids a second lookup query just to find it.
const CURSOR_ID = 'escrow';

interface RawEvent {
  eventName: string;
  blockNumber: bigint;
  logIndex: number;
  transactionHash: string;
  args: Record<string, unknown>;
}

@Injectable()
export class ChainListenerService implements OnModuleInit {
  private readonly logger = new Logger(ChainListenerService.name);

  constructor(private readonly prisma: PrismaService) {}

  // Previously this class polled Arc Testnet's RPC directly (getContractEvents for
  // history, watchContractEvent for new events), which hit Arc's public RPC rate limit
  // constantly and re-scanned the entire history from ESCROW_DEPLOY_BLOCK on every
  // restart (that range only grows over time). Now it polls a subgraph via GraphQL
  // instead — The Graph's own infrastructure does the chain-scanning, and a persisted
  // cursor (SyncCursor) means a restart resumes instantly rather than re-scanning.
  onModuleInit() {
    if (!process.env.GRAPH_API_URL) {
      this.logger.error(
        'GRAPH_API_URL is not set — on-chain event sync is disabled until the subgraph ' +
          'is deployed and its query URL is configured. See subgraph/README.md.',
      );
      return;
    }

    const intervalMs = Number(process.env.GRAPH_POLL_INTERVAL_MS ?? 15_000);
    this.poll().catch((err) => this.logger.error('Initial subgraph sync failed', err as Error));
    setInterval(() => {
      this.poll().catch((err) => this.logger.error('Subgraph poll failed', err as Error));
    }, intervalMs);

    this.logger.log(`Polling subgraph for FreelanceEscrow events every ${intervalMs}ms`);
  }

  private async getCursor(): Promise<bigint> {
    const row = await this.prisma.syncCursor.findUnique({ where: { id: CURSOR_ID } });
    return row?.lastBlock ?? 0n;
  }

  private async setCursor(lastBlock: bigint) {
    await this.prisma.syncCursor.upsert({
      where: { id: CURSOR_ID },
      update: { lastBlock },
      create: { id: CURSOR_ID, lastBlock },
    });
  }

  private async poll() {
    const cursor = await this.getCursor();
    const events = await this.fetchEvents(cursor);
    if (events.length === 0) return;

    events.sort((a, b) => (a.blockNumber === b.blockNumber ? a.logIndex - b.logIndex : a.blockNumber < b.blockNumber ? -1 : 1));

    for (const event of events) {
      try {
        await this.handleEvent(event);
      } catch (err) {
        this.logger.error(`Failed to process ${event.eventName} at ${event.transactionHash}`, err as Error);
      }
    }

    const maxBlock = events[events.length - 1].blockNumber;
    await this.setCursor(maxBlock);
    this.logger.log(`Synced ${events.length} escrow event(s) up to block ${maxBlock}`);
  }

  // One combined query covers all six event types per poll. `first: 1000` is far more
  // than this app will ever produce between 15s polls; add pagination here if that
  // ever stops being true.
  private async fetchEvents(cursor: bigint): Promise<RawEvent[]> {
    const query = `
      query Events($cursor: BigInt!) {
        projectCreatedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId client developer metadataURI milestoneAmounts blockNumber transactionHash logIndex
        }
        milestoneFundedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId milestoneIndex amount blockNumber transactionHash logIndex
        }
        milestoneSubmittedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId milestoneIndex proofURI blockNumber transactionHash logIndex
        }
        milestoneApprovedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId milestoneIndex blockNumber transactionHash logIndex
        }
        paymentReleasedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId milestoneIndex developer amount blockNumber transactionHash logIndex
        }
        refundIssuedEvents(where: { blockNumber_gt: $cursor }, orderBy: blockNumber, orderDirection: asc, first: 1000) {
          projectId milestoneIndex client amount blockNumber transactionHash logIndex
        }
      }
    `;

    const res = await fetch(process.env.GRAPH_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { cursor: cursor.toString() } }),
    });

    if (!res.ok) {
      throw new Error(`Subgraph query failed: ${res.status} ${res.statusText}`);
    }
    const body = (await res.json()) as { data?: Record<string, unknown[]>; errors?: { message: string }[] };
    if (body.errors?.length) {
      throw new Error(`Subgraph query returned errors: ${body.errors.map((e) => e.message).join('; ')}`);
    }
    const data = body.data ?? {};

    const events: RawEvent[] = [];
    const common = (e: any) => ({
      blockNumber: BigInt(e.blockNumber),
      logIndex: Number(e.logIndex),
      transactionHash: e.transactionHash,
    });

    for (const e of (data.projectCreatedEvents ?? []) as any[]) {
      events.push({
        eventName: 'ProjectCreated',
        ...common(e),
        args: {
          projectId: BigInt(e.projectId),
          client: e.client,
          developer: e.developer,
          metadataURI: e.metadataURI,
          milestoneAmounts: (e.milestoneAmounts as string[]).map((a) => BigInt(a)),
        },
      });
    }
    for (const e of (data.milestoneFundedEvents ?? []) as any[]) {
      events.push({
        eventName: 'MilestoneFunded',
        ...common(e),
        args: { projectId: BigInt(e.projectId), milestoneIndex: BigInt(e.milestoneIndex), amount: BigInt(e.amount) },
      });
    }
    for (const e of (data.milestoneSubmittedEvents ?? []) as any[]) {
      events.push({
        eventName: 'MilestoneSubmitted',
        ...common(e),
        args: { projectId: BigInt(e.projectId), milestoneIndex: BigInt(e.milestoneIndex), proofURI: e.proofURI },
      });
    }
    for (const e of (data.milestoneApprovedEvents ?? []) as any[]) {
      events.push({
        eventName: 'MilestoneApproved',
        ...common(e),
        args: { projectId: BigInt(e.projectId), milestoneIndex: BigInt(e.milestoneIndex) },
      });
    }
    for (const e of (data.paymentReleasedEvents ?? []) as any[]) {
      events.push({
        eventName: 'PaymentReleased',
        ...common(e),
        args: {
          projectId: BigInt(e.projectId),
          milestoneIndex: BigInt(e.milestoneIndex),
          developer: e.developer,
          amount: BigInt(e.amount),
        },
      });
    }
    for (const e of (data.refundIssuedEvents ?? []) as any[]) {
      events.push({
        eventName: 'RefundIssued',
        ...common(e),
        args: {
          projectId: BigInt(e.projectId),
          milestoneIndex: BigInt(e.milestoneIndex),
          client: e.client,
          amount: BigInt(e.amount),
        },
      });
    }

    return events;
  }

  private async handleEvent(event: RawEvent) {
    switch (event.eventName) {
      case 'ProjectCreated':
        return this.onProjectCreated(event);
      case 'MilestoneFunded':
        return this.onMilestoneFunded(event);
      case 'MilestoneSubmitted':
        return this.onMilestoneSubmitted(event);
      case 'MilestoneApproved':
        return this.onMilestoneApproved(event);
      case 'PaymentReleased':
        return this.onPaymentReleased(event);
      case 'RefundIssued':
        return this.onRefundIssued(event);
    }
  }

  private async upsertUser(address: string) {
    const walletAddress = address.toLowerCase();
    return this.prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });
  }

  private async findMilestone(onchainProjectId: bigint, index: number) {
    const project = await this.prisma.project.findUnique({
      where: { onchainId: onchainProjectId },
    });
    if (!project) {
      this.logger.warn(`No project found for on-chain id ${onchainProjectId}`);
      return null;
    }
    return this.prisma.milestone.findUnique({
      where: { projectId_index: { projectId: project.id, index } },
    });
  }

  private async onProjectCreated(event: RawEvent) {
    const { projectId, client, developer, metadataURI, milestoneAmounts } = event.args as {
      projectId: bigint;
      client: string;
      developer: string;
      metadataURI: string;
      milestoneAmounts: bigint[];
    };

    const [clientUser, developerUser] = await Promise.all([
      this.upsertUser(client),
      this.upsertUser(developer),
    ]);

    const project = await this.prisma.project.upsert({
      where: { metadataURI },
      update: { onchainId: projectId, status: 'ONCHAIN' },
      create: {
        metadataURI,
        title: metadataURI,
        onchainId: projectId,
        status: 'ONCHAIN',
        clientId: clientUser.id,
        developerId: developerUser.id,
      },
    });

    await Promise.all(
      milestoneAmounts.map((amount, index) =>
        this.prisma.milestone.upsert({
          where: { projectId_index: { projectId: project.id, index } },
          update: {},
          create: {
            projectId: project.id,
            index,
            amount: baseUnitsToDecimalString(amount),
            status: 'PENDING',
          },
        }),
      ),
    );

    this.logger.log(`ProjectCreated on-chain #${projectId} -> ${project.id}`);
  }

  private async onMilestoneFunded(event: RawEvent) {
    const { projectId, milestoneIndex } = event.args as { projectId: bigint; milestoneIndex: bigint };
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'FUNDED' } });
  }

  private async onMilestoneSubmitted(event: RawEvent) {
    const { projectId, milestoneIndex, proofURI } = event.args as {
      projectId: bigint;
      milestoneIndex: bigint;
      proofURI: string;
    };
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;

    // Proof is "verified" when proofURI matches a merged GithubContribution actually
    // belonging to this project's developer — not just any contribution with that URL,
    // so a developer can't claim credit for someone else's merged PR.
    const project = await this.prisma.project.findUnique({
      where: { onchainId: projectId },
      select: { developerId: true },
    });
    const contribution = project
      ? await this.prisma.githubContribution.findFirst({
          where: { url: proofURI, userId: project.developerId, status: 'MERGED' },
        })
      : null;

    await this.prisma.milestone.update({
      where: { id: milestone.id },
      data: { status: 'SUBMITTED', proofURI, contributionId: contribution?.id ?? null },
    });

    if (contribution) {
      this.logger.log(`Milestone ${milestone.id} proof verified against contribution ${contribution.id}`);
    } else {
      this.logger.warn(`Milestone ${milestone.id} proof "${proofURI}" did not match a verified contribution`);
    }
  }

  private async onMilestoneApproved(event: RawEvent) {
    const { projectId, milestoneIndex } = event.args as { projectId: bigint; milestoneIndex: bigint };
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'APPROVED' } });
  }

  private async onPaymentReleased(event: RawEvent) {
    const { projectId, milestoneIndex, developer, amount } = event.args as {
      projectId: bigint;
      milestoneIndex: bigint;
      developer: string;
      amount: bigint;
    };
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;

    const developerUser = await this.upsertUser(developer);

    await this.prisma.payment.upsert({
      where: { milestoneId: milestone.id },
      update: {},
      create: {
        milestoneId: milestone.id,
        developerId: developerUser.id,
        amount: baseUnitsToDecimalString(amount),
        txHash: event.transactionHash,
        blockNumber: event.blockNumber,
      },
    });

    this.logger.log(`PaymentReleased: milestone ${milestone.id} -> ${developer}`);
  }

  private async onRefundIssued(event: RawEvent) {
    const { projectId, milestoneIndex } = event.args as { projectId: bigint; milestoneIndex: bigint };
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'REFUNDED' } });
  }
}
