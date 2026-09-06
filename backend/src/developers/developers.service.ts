import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevelopersService {
  constructor(private readonly prisma: PrismaService) {}

  async getPassport(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        // Only on-chain projects count toward the passport — a draft that never
        // reached the escrow contract isn't verified work, per the escrow-only
        // scoping decision for "verified" figures.
        developerProjects: { where: { status: 'ONCHAIN' } },
        payments: true,
        githubContributions: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Developer ${id} not found`);
    }

    const verifiedEarnings = user.payments
      .reduce((sum, p) => sum + Number(p.amount), 0)
      .toFixed(6);

    const languageCounts = new Map<string, number>();
    for (const c of user.githubContributions) {
      if (!c.language) continue;
      languageCounts.set(c.language, (languageCounts.get(c.language) ?? 0) + 1);
    }
    const skills = [...languageCounts.entries()]
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count);

    const repositories = [...new Set(user.githubContributions.map((c) => c.repository))];
    const repoImpacts = repositories.length
      ? await this.prisma.repoImpact.findMany({ where: { repository: { in: repositories } } })
      : [];

    const projectImpact = repoImpacts.reduce(
      (acc, r) => ({
        repositories: acc.repositories + 1,
        stars: acc.stars + r.stars,
        forks: acc.forks + r.forks,
        contributors: acc.contributors + (r.contributors ?? 0),
      }),
      { repositories: 0, stars: 0, forks: 0, contributors: 0 },
    );

    const recentContributions = [...user.githubContributions]
      .sort((a, b) => (b.mergedAt?.getTime() ?? 0) - (a.mergedAt?.getTime() ?? 0))
      .slice(0, 5);

    const recentPayments = [...user.payments]
      .sort((a, b) => b.releasedAt.getTime() - a.releasedAt.getTime())
      .slice(0, 5);

    return {
      developer: {
        id: user.id,
        walletAddress: user.walletAddress,
        githubUsername: user.githubUsername,
      },
      verifiedEarnings,
      projects: user.developerProjects.length,
      contributions: user.githubContributions.length,
      verifiedPayments: user.payments.length,
      // Stands in for Feature 5's AI-derived skills until the Reputation Analyst
      // agent exists — a naive frequency count over contributed languages.
      skills,
      projectImpact,
      recentContributions,
      recentPayments,
    };
  }
}
