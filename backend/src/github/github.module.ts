import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { OAuthStateStore } from './oauth-state.store';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [GithubController],
  providers: [GithubService, OAuthStateStore],
})
export class GithubModule {}
