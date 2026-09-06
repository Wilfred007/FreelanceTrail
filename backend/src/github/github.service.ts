import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { PrismaService } from '../prisma/prisma.service';
import { OAuthStateStore } from './oauth-state.store';

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
        this.getRepoLanguage(octokit, repoLanguageCache, owner, repo),
      ]);

      await this.prisma.githubContribution.upsert({
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
    }

    return this.prisma.githubContribution.findMany({
      where: { userId },
      orderBy: { mergedAt: 'desc' },
    });
  }

  private async getRepoLanguage(
    octokit: Octokit,
    cache: Map<string, string | null>,
    owner: string,
    repo: string,
  ): Promise<string | null> {
    const key = `${owner}/${repo}`;
    if (cache.has(key)) return cache.get(key)!;

    const { data } = await octokit.rest.repos.get({ owner, repo });
    cache.set(key, data.language);
    return data.language;
  }
}
