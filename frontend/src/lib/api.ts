const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export interface DeveloperSummary {
  id: string;
  walletAddress: string;
  githubUsername: string | null;
}

export interface GithubContribution {
  id: string;
  userId: string;
  repository: string;
  prNumber: number;
  title: string;
  status: string;
  url: string;
  createdAt: string;
  mergedAt: string | null;
  filesChanged: number;
  additions: number;
  deletions: number;
  language: string | null;
  fetchedAt: string;
  aiCategory: string | null;
  aiSkills: string[];
  aiComplexity: string | null;
  aiImpact: string | null;
  aiSummary: string | null;
  analyzedAt: string | null;
}

export interface Payment {
  id: string;
  milestoneId: string;
  developerId: string;
  amount: string;
  txHash: string;
  blockNumber: string;
  releasedAt: string;
}

export interface VerifiedProof {
  id: string;
  repository: string;
  prNumber: number;
  title: string;
  url: string;
  aiSummary: string | null;
}

export interface Milestone {
  id: string;
  projectId: string;
  index: number;
  description: string | null;
  amount: string;
  status: 'PENDING' | 'FUNDED' | 'SUBMITTED' | 'APPROVED' | 'REFUNDED';
  proofURI: string | null;
  contribution?: VerifiedProof | null;
  payment?: Payment | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  onchainId: string | null;
  status: 'DRAFT' | 'ONCHAIN';
  metadataURI: string;
  title: string;
  description: string | null;
  client: DeveloperSummary;
  developer: DeveloperSummary;
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

export interface Passport {
  developer: DeveloperSummary;
  verifiedEarnings: string;
  projects: number;
  contributions: number;
  verifiedPayments: number;
  skills: { skill: string; count: number }[];
  projectImpact: { repositories: number; stars: number; forks: number; contributors: number };
  recentContributions: GithubContribution[];
  recentPayments: Payment[];
  reputation: {
    topAreas: string[];
    strengths: string[];
    summary: string;
    generatedAt: string;
  } | null;
}

export interface MatchResult {
  developerId: string;
  githubUsername: string | null;
  walletAddress: string;
  matchScore: number;
  reasoning: string;
}

export const api = {
  connect: (walletAddress: string) =>
    request<DeveloperSummary>('/developers/connect', {
      method: 'POST',
      body: JSON.stringify({ walletAddress }),
    }),

  getPassport: (id: string) => request<Passport>(`/developers/${id}/passport`),

  generateReputation: (id: string) => request<unknown>(`/developers/${id}/reputation`, { method: 'POST' }),

  githubConnectUrl: (userId: string) => `${API_URL}/github/connect?userId=${userId}`,

  syncGithubContributions: (userId: string) =>
    request<GithubContribution[]>(`/github/contributions?userId=${userId}`),

  getVerifiableContributions: (developerId: string) =>
    request<GithubContribution[]>(`/developers/${developerId}/contributions`),

  listProjects: () => request<Project[]>('/projects'),

  getProject: (id: string) => request<Project>(`/projects/${id}`),

  createProject: (dto: {
    clientWallet: string;
    developerWallet: string;
    title: string;
    description?: string;
    milestones: { description?: string; amount: string }[];
  }) =>
    request<{ project: Project; onchainCall: { developer: string; metadataURI: string; milestoneAmounts: string[] } }>(
      '/projects',
      { method: 'POST', body: JSON.stringify(dto) },
    ),

  match: (requirement: string) =>
    request<{ requirement: string; matches: MatchResult[] }>('/matching', {
      method: 'POST',
      body: JSON.stringify({ requirement }),
    }),
};
