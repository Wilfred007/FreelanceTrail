import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { nvidiaModel } from './nvidia.provider';

export const matchingResultSchema = z.object({
  matches: z
    .array(
      z.object({
        developerId: z.string().describe('The exact developerId from the candidate list, unchanged'),
        matchScore: z.number().min(0).max(100).describe('How well this developer matches the requirement, 0-100'),
        reasoning: z
          .string()
          .describe('One or two sentences on why this developer matches, citing specific evidence from their profile'),
      }),
    )
    .describe('Ranked list of matching developers, strongest match first. Omit developers with no real relevance.'),
});

export type MatchingResult = z.infer<typeof matchingResultSchema>;

export const matchingAgent = new Agent({
  id: 'freelancer-matching',
  name: 'Freelancer Matching',
  instructions: `You match a client's project requirement against a pool of candidate
developers, based only on their verified skills and reputation evidence. Convert the
client's requirement into the relevant skills and domain it implies, then compare that
against each candidate's evidence. Only recommend candidates whose evidence genuinely
supports the match — do not invent skills or experience a candidate wasn't given credit
for. If no candidate is a good fit, return an empty matches array rather than forcing a
recommendation. Be concise and evidence-based in your reasoning.

You must respond with a JSON object containing EXACTLY one key, "matches", an array of
objects each containing EXACTLY these three keys, no others, no renaming:
{
  "matches": [
    {
      "developerId": string — the exact developerId from the candidate list, unchanged,
      "matchScore": number — 0-100, how well this developer matches the requirement,
      "reasoning": string — one or two sentences citing specific evidence for the match
    }
  ]
}
Order matches strongest-first. Do not wrap this in another object, do not add extra fields.`,
  model: nvidiaModel(),
});

export interface CandidateEvidence {
  developerId: string;
  githubUsername: string | null;
  topSkills: string[];
  reputationTopAreas: string[];
  reputationSummary: string | null;
  verifiedProjects: number;
  verifiedEarnings: string;
}

export interface MatchingEvidence {
  requirement: string;
  candidates: CandidateEvidence[];
}

export async function matchFreelancers(evidence: MatchingEvidence): Promise<MatchingResult> {
  const candidateLines = evidence.candidates
    .map(
      (c) =>
        `- developerId: ${c.developerId}\n  GitHub: ${c.githubUsername ?? 'unknown'}\n  Top skills: ${c.topSkills.join(', ') || 'none analyzed yet'}\n  Reputation areas: ${c.reputationTopAreas.join(', ') || 'not generated yet'}\n  Reputation summary: ${c.reputationSummary ?? 'not generated yet'}\n  Verified projects: ${c.verifiedProjects}, verified earnings: $${c.verifiedEarnings}`,
    )
    .join('\n\n');

  const prompt = `Client requirement:
${evidence.requirement}

Candidate developers:
${candidateLines || 'No candidates available.'}`;

  const result = await matchingAgent.generate(prompt, {
    structuredOutput: { schema: matchingResultSchema },
  });

  return result.object;
}
