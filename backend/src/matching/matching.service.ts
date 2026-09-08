import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { matchFreelancers, type CandidateEvidence, type MatchingResult } from '../ai/matching.agent';

@Injectable()
export class MatchingService {
  private readonly logger = new Logger(MatchingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async match(requirement: string) {
    const users = await this.prisma.user.findMany({
      include: {
        developerProjects: { where: { status: 'ONCHAIN' } },
        payments: true,
        githubContributions: true,
      },
    });

    const candidates: CandidateEvidence[] = users.map((u) => {
      const skillCounts = new Map<string, number>();
      for (const c of u.githubContributions) {
        const skillSources = c.aiSkills.length ? c.aiSkills : c.language ? [c.language] : [];
        for (const skill of skillSources) {
          skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1);
        }
      }
      const topSkills = [...skillCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([skill]) => skill);

      const verifiedEarnings = u.payments.reduce((sum, p) => sum + Number(p.amount), 0).toFixed(6);

      return {
        developerId: u.id,
        githubUsername: u.githubUsername,
        topSkills,
        reputationTopAreas: u.reputationTopAreas,
        reputationSummary: u.reputationSummary,
        verifiedProjects: u.developerProjects.length,
        verifiedEarnings,
      };
    });

    let result: MatchingResult;
    try {
      result = await matchFreelancers({ requirement, candidates });
    } catch (err) {
      // Unlike the Contribution Analyzer (best-effort, runs unattended during sync),
      // this is a direct user-initiated request — surface a clear, actionable error
      // instead of letting an inference timeout/hiccup bubble up as a bare 500.
      this.logger.warn(`Matching failed: ${(err as Error).message}`);
      throw new ServiceUnavailableException(
        'Developer matching is temporarily unavailable — please try again in a moment.',
      );
    }

    const byId = new Map(users.map((u) => [u.id, u]));
    return {
      requirement,
      matches: result.matches
        .filter((m) => byId.has(m.developerId))
        .map((m) => {
          const user = byId.get(m.developerId)!;
          return {
            developerId: m.developerId,
            githubUsername: user.githubUsername,
            walletAddress: user.walletAddress,
            matchScore: m.matchScore,
            reasoning: m.reasoning,
          };
        }),
    };
  }
}
