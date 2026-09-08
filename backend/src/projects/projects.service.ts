import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { decimalToBaseUnits } from '../chain/usdc.util';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const clientWallet = dto.clientWallet.toLowerCase();
    const developerWallet = dto.developerWallet.toLowerCase();

    const [clientUser, developerUser] = await Promise.all([
      this.prisma.user.upsert({
        where: { walletAddress: clientWallet },
        update: {},
        create: { walletAddress: clientWallet },
      }),
      this.prisma.user.upsert({
        where: { walletAddress: developerWallet },
        update: {},
        create: { walletAddress: developerWallet },
      }),
    ]);

    const metadataURI = `ft://${randomUUID()}`;

    const project = await this.prisma.project.create({
      data: {
        metadataURI,
        title: dto.title,
        description: dto.description,
        clientId: clientUser.id,
        developerId: developerUser.id,
        milestones: {
          create: dto.milestones.map((m, index) => ({
            index,
            description: m.description,
            amount: m.amount,
            status: 'PENDING',
          })),
        },
      },
      include: { milestones: { orderBy: { index: 'asc' } } },
    });

    return {
      project,
      // Params the client's connected wallet needs to call createProject() on FreelanceEscrow.
      // The listener matches the resulting ProjectCreated event back to this row by metadataURI.
      onchainCall: {
        developer: dto.developerWallet,
        metadataURI,
        milestoneAmounts: project.milestones.map((m) =>
          decimalToBaseUnits(m.amount.toString()).toString(),
        ),
      },
    };
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        // Only public-safe fields — never the full User row (it carries githubAccessToken).
        client: { select: { id: true, walletAddress: true, githubUsername: true } },
        developer: { select: { id: true, walletAddress: true, githubUsername: true } },
        milestones: { orderBy: { index: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        // Only public-safe fields — never the full User row (it carries githubAccessToken).
        client: { select: { id: true, walletAddress: true, githubUsername: true } },
        developer: { select: { id: true, walletAddress: true, githubUsername: true } },
        milestones: {
          orderBy: { index: 'asc' },
          include: {
            payment: true,
            contribution: {
              select: { id: true, repository: true, prNumber: true, title: true, url: true, aiSummary: true },
            },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    return project;
  }
}
