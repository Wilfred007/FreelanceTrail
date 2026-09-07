import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { nvidiaModel } from './nvidia.provider';

export const contributionAnalysisSchema = z.object({
  category: z
    .string()
    .describe('Short category for the contribution, e.g. "blockchain infrastructure", "frontend", "developer tooling"'),
  skills: z.array(z.string()).describe('Specific technical skills demonstrated, e.g. "Rust", "transaction processing"'),
  complexity: z.enum(['low', 'medium', 'high']).describe('Estimated technical complexity of the change'),
  impact: z.string().describe('One sentence on the likely impact or significance of the contribution'),
  summary: z.string().describe('Concise 1-2 sentence professional summary of what was contributed'),
});

export type ContributionAnalysis = z.infer<typeof contributionAnalysisSchema>;

export const contributionAnalyzerAgent = new Agent({
  id: 'contribution-analyzer',
  name: 'Contribution Analyzer',
  instructions: `You analyze a single verified GitHub pull request and convert it into
structured professional intelligence for a developer's portfolio. Base your analysis
only on the evidence given — title, repository, primary language, and diff stats. Do
not invent details you weren't given. Be concise and professional.

You must respond with a JSON object containing EXACTLY these five keys, no others,
no nesting, no renaming:
{
  "category": string — short category, e.g. "blockchain infrastructure", "frontend", "developer tooling",
  "skills": string[] — specific technical skills demonstrated, e.g. ["Rust", "transaction processing"],
  "complexity": "low" | "medium" | "high" — estimated technical complexity of the change,
  "impact": string — one sentence on the likely impact or significance of the contribution,
  "summary": string — concise 1-2 sentence professional summary of what was contributed
}
Do not wrap this in another object, do not add extra fields, do not use different key names.`,
  model: nvidiaModel(),
});

export interface ContributionEvidence {
  repository: string;
  title: string;
  language: string | null;
  filesChanged: number;
  additions: number;
  deletions: number;
}

export async function analyzeContribution(evidence: ContributionEvidence): Promise<ContributionAnalysis> {
  const prompt = `Analyze this merged pull request:
Repository: ${evidence.repository}
Title: ${evidence.title}
Primary language: ${evidence.language ?? 'unknown'}
Files changed: ${evidence.filesChanged}
Lines added: ${evidence.additions}
Lines deleted: ${evidence.deletions}`;

  const result = await contributionAnalyzerAgent.generate(prompt, {
    structuredOutput: { schema: contributionAnalysisSchema },
  });

  return result.object;
}
