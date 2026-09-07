import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { analyzeReputation, type ContributionEvidenceSummary } from './reputation-analyst.agent';

@Injectable()
export class ReputationAnalystService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        // Only on-chain projects count as verified work, same scoping as the passport.
        developerProjects: { where: { status: 'ONCHAIN' } },
        payments: true,
        githubContributions: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Developer ${userId} not found`);
    }

    const analyzedContributions: ContributionEvidenceSummary[] = user.githubContributions
      .filter((c) => c.aiCategory && c.aiComplexity)
      .map((c) => ({
        category: c.aiCategory!,
        skills: c.aiSkills,
        complexity: c.aiComplexity!,
      }));

    const verifiedEarnings = user.payments
      .reduce((sum, p) => sum + Number(p.amount), 0)
      .toFixed(6);

    const repositoryCount = new Set(user.githubContributions.map((c) => c.repository)).size;

    const analysis = await analyzeReputation({
      githubUsername: user.githubUsername,
      verifiedProjectCount: user.developerProjects.length,
      verifiedEarnings,
      verifiedPaymentCount: user.payments.length,
      totalContributions: user.githubContributions.length,
      analyzedContributions,
      repositoryCount,
    });

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        reputationTopAreas: analysis.topAreas,
        reputationStrengths: analysis.strengths,
        reputationSummary: analysis.summary,
        reputationGeneratedAt: new Date(),
      },
      select: {
        id: true,
        reputationTopAreas: true,
        reputationStrengths: true,
        reputationSummary: true,
        reputationGeneratedAt: true,
      },
    });
  }
}
