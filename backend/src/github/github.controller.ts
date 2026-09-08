import { BadRequestException, Controller, Get, Query, Redirect } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('connect')
  @Redirect()
  connect(@Query('userId') userId: string) {
    if (!userId) throw new BadRequestException('userId is required');
    return { url: this.githubService.getAuthorizeUrl(userId), statusCode: 302 };
  }

  @Get('callback')
  @Redirect()
  async callback(@Query('code') code: string, @Query('state') state: string) {
    if (!code || !state) throw new BadRequestException('code and state are required');
    await this.githubService.handleCallback(code, state);
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    return { url: `${frontendUrl}/passport`, statusCode: 302 };
  }

  @Get('contributions')
  contributions(@Query('userId') userId: string) {
    if (!userId) throw new BadRequestException('userId is required');
    return this.githubService.syncContributions(userId);
  }
}
