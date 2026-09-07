import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { PrismaService } from '../prisma/prisma.service';
import { OAuthStateStore } from './oauth-state.store';
import { ContributionAnalyzerService } from '../ai/contribution-analyzer.service';

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
// Read-only scope: enough to identify the user and read their public contribution
// history via the Search API. No `repo` scope, so no private-repo access is granted.
const OAUTH_SCOPE = 'read:user';
const MAX_CONTRIBUTIONS_PER_SYNC = 30;

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly stateStore: OAuthStateStore,
    private readonly contributionAnalyzer: ContributionAnalyzerService,
  ) {}

  getAuthorizeUrl(userId: string): string {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = process.env.GITHUB_OAUTH_CALLBACK_URL;
    if (!clientId || !redirectUri) {
      throw new Error('GITHUB_CLIENT_ID / GITHUB_OAUTH_CALLBACK_URL are not configured');
    }

    const state = this.stateStore.create(userId);
    const url = new URL(GITHUB_AUTHORIZE_URL);
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', OAUTH_SCOPE);
    url.searchParams.set('state', state);
    return url.toString();
  }

  async handleCallback(code: string, state: string) {
    const userId = this.stateStore.consume(state);
    if (!userId) {
      throw new BadRequestException('Invalid or expired OAuth state');
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = process.env.GITHUB_OAUTH_CALLBACK_URL;

    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenBody = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!tokenBody.access_token) {
      throw new BadRequestException(
        `GitHub OAuth exchange failed: ${tokenBody.error_description ?? tokenBody.error ?? 'unknown error'}`,
      );
    }

    const octokit = new Octokit({ auth: tokenBody.access_token });
    const { data: githubUser } = await octokit.rest.users.getAuthenticated();

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        githubUsername: githubUser.login,
        githubAccessToken: tokenBody.access_token,
      },
    });

    this.logger.log(`Connected GitHub account @${githubUser.login} for user ${userId}`);

    return { userId, githubUsername: githubUser.login };
  }

  async syncContributions(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.githubAccessToken || !user.githubUsername) {
      throw new BadRequestException('User has not connected a GitHub account yet');
    }

    const octokit = new Octokit({ auth: user.githubAccessToken });

    const { data: searchResult } = await octokit.rest.search.issuesAndPullRequests({
      q: `author:${user.githubUsername} type:pr is:merged`,
      per_page: MAX_CONTRIBUTIONS_PER_SYNC,
      sort: 'updated',
      order: 'desc',
    });

    const repoLanguageCache = new Map<string, string | null>();

    for (const item of searchResult.items) {
      const match = item.repository_url.match(/repos\/(.+)\/(.+)$/);
      if (!match) continue;
      const [, owner, repo] = match;
      const repository = `${owner}/${repo}`;

      const [{ data: pr }, language] = await Promise.all([
        octokit.rest.pulls.get({ owner, repo, pull_number: item.number }),
        this.syncRepoImpact(octokit, repoLanguageCache, owner, repo),
      ]);

      const contribution = await this.prisma.githubContribution.upsert({
        where: { repository_prNumber: { repository, prNumber: item.number } },
        update: {
          title: pr.title,
          mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
          filesChanged: pr.changed_files,
          additions: pr.additions,
          deletions: pr.deletions,
          language,
        },
        create: {
          userId,
          repository,
          prNumber: item.number,
          title: pr.title,
          status: 'MERGED',
          url: pr.html_url,
          createdAt: new Date(pr.created_at),
          mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
          filesChanged: pr.changed_files,
          additions: pr.additions,
          deletions: pr.deletions,
          language,
        },
      });

      // Analysis is best-effort and only runs once per contribution — re-syncing an
      // already-analyzed PR (e.g. a stale merge date refresh) shouldn't re-spend an
      // inference call.
      if (!contribution.analyzedAt) {
        const analysis = await this.contributionAnalyzer.analyze({
          repository,
          title: pr.title,
          language,
          filesChanged: pr.changed_files,
          additions: pr.additions,
          deletions: pr.deletions,
        });

        if (analysis) {
          await this.prisma.githubContribution.update({
            where: { id: contribution.id },
            data: {
              aiCategory: analysis.category,
              aiSkills: analysis.skills,
              aiComplexity: analysis.complexity,
              aiImpact: analysis.impact,
              aiSummary: analysis.summary,
              analyzedAt: new Date(),
            },
          });
        }
      }
    }

    return this.prisma.githubContribution.findMany({
      where: { userId },
      orderBy: { mergedAt: 'desc' },
    });
  }

  // Fetches repo-level impact (stars/forks/open issues/contributors) once per repo per
  // sync, upserts it into RepoImpact, and returns the repo's primary language for the
  // contribution record — reusing the same repos.get() call for both purposes.
  private async syncRepoImpact(
    octokit: Octokit,
    cache: Map<string, string | null>,
    owner: string,
    repo: string,
  ): Promise<string | null> {
    const key = `${owner}/${repo}`;
    if (cache.has(key)) return cache.get(key)!;

    const [{ data: repoData }, contributors] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      this.getContributorCount(octokit, owner, repo),
    ]);

    await this.prisma.repoImpact.upsert({
      where: { repository: key },
      update: {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        openIssues: repoData.open_issues_count,
        contributors,
      },
      create: {
        repository: key,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        openIssues: repoData.open_issues_count,
        contributors,
      },
    });

    cache.set(key, repoData.language);
    return repoData.language;
  }

  // GitHub doesn't expose a total-contributors count directly; the documented trick is
  // to request 1 result per page and read the last page number off the Link header.
  private async getContributorCount(
    octokit: Octokit,
    owner: string,
    repo: string,
  ): Promise<number | null> {
    try {
      const response = await octokit.rest.repos.listContributors({
        owner,
        repo,
        per_page: 1,
        anon: '1',
      });
      const link = response.headers.link;
      if (!link) return response.data.length;

      const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      return match ? Number(match[1]) : response.data.length;
    } catch (err) {
      this.logger.warn(`Failed to fetch contributor count for ${owner}/${repo}: ${(err as Error).message}`);
      return null;
    }
  }
}
