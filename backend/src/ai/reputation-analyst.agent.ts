import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { nvidiaModel } from './nvidia.provider';

export const reputationAnalysisSchema = z.object({
  topAreas: z
    .array(z.string())
    .describe('The developer\'s strongest verified technical areas, e.g. ["blockchain infrastructure", "frontend"]'),
  strengths: z
    .array(z.string())
    .describe('Professional strengths evidenced by the verified activity, e.g. ["delivers end-to-end features", "strong test discipline"]'),
  summary: z
    .string()
    .describe('Concise 2-3 sentence narrative summary of the developer\'s verified activity patterns and professional profile'),
});

export type ReputationAnalysis = z.infer<typeof reputationAnalysisSchema>;

export const reputationAnalystAgent = new Agent({
  id: 'reputation-analyst',
  name: 'Reputation Analyst',
  instructions: `You interpret a developer's already-verified project, contribution, and
payment history to surface professional intelligence. You never re-adjudicate facts that
GitHub or the blockchain have already verified — you only interpret what the evidence
demonstrates. Do not present your output as an objective trust score; frame it as
AI-generated intelligence backed by verifiable evidence. Base your analysis only on the
evidence given. Do not invent details you weren't given. Be concise and professional.

You must respond with a JSON object containing EXACTLY these three keys, no others,
no nesting, no renaming:
{
  "topAreas": string[] — the developer's strongest verified technical areas,
  "strengths": string[] — professional strengths evidenced by the verified activity,
  "summary": string — concise 2-3 sentence narrative of verified activity patterns and professional profile
}
Do not wrap this in another object, do not add extra fields, do not use different key names.`,
  model: nvidiaModel(),
});

export interface ContributionEvidenceSummary {
  category: string;
  skills: string[];
  complexity: string;
}

export interface ReputationEvidence {
  githubUsername: string | null;
  verifiedProjectCount: number;
  verifiedEarnings: string;
  verifiedPaymentCount: number;
  totalContributions: number;
  analyzedContributions: ContributionEvidenceSummary[];
  repositoryCount: number;
}

export async function analyzeReputation(evidence: ReputationEvidence): Promise<ReputationAnalysis> {
  const contributionLines = evidence.analyzedContributions
    .map((c) => `- ${c.category} (${c.complexity} complexity): ${c.skills.join(', ')}`)
    .join('\n');

  const prompt = `Analyze this developer's verified activity:
GitHub username: ${evidence.githubUsername ?? 'unknown'}
Verified on-chain projects: ${evidence.verifiedProjectCount}
Verified earnings: $${evidence.verifiedEarnings}
Verified payments: ${evidence.verifiedPaymentCount}
Total GitHub contributions: ${evidence.totalContributions}
Distinct repositories contributed to: ${evidence.repositoryCount}

Analyzed contributions (category, complexity, skills):
${contributionLines || 'None analyzed yet.'}`;

  const result = await reputationAnalystAgent.generate(prompt, {
    structuredOutput: { schema: reputationAnalysisSchema },
  });

  return result.object;
}
