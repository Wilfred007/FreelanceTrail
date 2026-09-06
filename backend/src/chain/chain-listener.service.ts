import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChainService } from './chain.service';
import { baseUnitsToDecimalString } from './usdc.util';

@Injectable()
export class ChainListenerService implements OnModuleInit {
  private readonly logger = new Logger(ChainListenerService.name);

  constructor(
    private readonly chain: ChainService,
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    try {
      await this.backfill();
    } catch (err) {
      this.logger.error('Backfill failed; continuing to live watch only', err as Error);
    }
    this.watch();
  }

  // Arc's public RPC rejects eth_getLogs over a wide block range ("requested range too
  // large"), so we page through history in fixed-size chunks instead of one wide query.
  private async backfill() {
    const deployBlock = process.env.ESCROW_DEPLOY_BLOCK
      ? BigInt(process.env.ESCROW_DEPLOY_BLOCK)
      : 0n;
    const latestBlock = await this.chain.client.getBlockNumber();
    const chunkSize = 2000n;

    let processed = 0;
    for (let from = deployBlock; from <= latestBlock; from += chunkSize) {
      const to = from + chunkSize - 1n > latestBlock ? latestBlock : from + chunkSize - 1n;

      const logs = await this.chain.client.getContractEvents({
        address: this.chain.escrowAddress,
        abi: this.chain.escrowAbi,
        fromBlock: from,
        toBlock: to,
      });

      const sorted = [...logs].sort((a, b) => {
        if (a.blockNumber !== b.blockNumber) return a.blockNumber! < b.blockNumber! ? -1 : 1;
        return (a.logIndex ?? 0) - (b.logIndex ?? 0);
      });

      for (const log of sorted) {
        await this.handleLog(log);
        processed++;
      }
    }

    this.logger.log(`Backfilled ${processed} escrow event(s) from block ${deployBlock} to ${latestBlock}`);
  }

  private watch() {
    this.chain.client.watchContractEvent({
      address: this.chain.escrowAddress,
      abi: this.chain.escrowAbi,
      onLogs: async (logs) => {
        for (const log of logs) {
          try {
            await this.handleLog(log);
          } catch (err) {
            this.logger.error(
              `Failed to process ${(log as any).eventName} at ${log.transactionHash}`,
              err as Error,
            );
          }
        }
      },
      onError: (error) => {
        this.logger.error('watchContractEvent error', error);
      },
    });

    this.logger.log('Watching FreelanceEscrow for new events');
  }

  private async handleLog(log: any) {
    switch (log.eventName) {
      case 'ProjectCreated':
        return this.onProjectCreated(log);
      case 'MilestoneFunded':
        return this.onMilestoneFunded(log);
      case 'MilestoneSubmitted':
        return this.onMilestoneSubmitted(log);
      case 'MilestoneApproved':
        return this.onMilestoneApproved(log);
      case 'PaymentReleased':
        return this.onPaymentReleased(log);
      case 'RefundIssued':
        return this.onRefundIssued(log);
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

  private async onProjectCreated(log: any) {
    const { projectId, client, developer, metadataURI, milestoneAmounts } = log.args;

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
      (milestoneAmounts as bigint[]).map((amount, index) =>
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

  private async onMilestoneFunded(log: any) {
    const { projectId, milestoneIndex } = log.args;
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'FUNDED' } });
  }

  private async onMilestoneSubmitted(log: any) {
    const { projectId, milestoneIndex, proofURI } = log.args;
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({
      where: { id: milestone.id },
      data: { status: 'SUBMITTED', proofURI },
    });
  }

  private async onMilestoneApproved(log: any) {
    const { projectId, milestoneIndex } = log.args;
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'APPROVED' } });
  }

  private async onPaymentReleased(log: any) {
    const { projectId, milestoneIndex, developer, amount } = log.args;
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
        txHash: log.transactionHash,
        blockNumber: log.blockNumber,
      },
    });

    this.logger.log(`PaymentReleased: milestone ${milestone.id} -> ${developer}`);
  }

  private async onRefundIssued(log: any) {
    const { projectId, milestoneIndex } = log.args;
    const milestone = await this.findMilestone(projectId, Number(milestoneIndex));
    if (!milestone) return;
    await this.prisma.milestone.update({ where: { id: milestone.id }, data: { status: 'REFUNDED' } });
  }
}
