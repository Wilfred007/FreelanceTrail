import { Module } from '@nestjs/common';
import { ContributionAnalyzerService } from './contribution-analyzer.service';

@Module({
  providers: [ContributionAnalyzerService],
  exports: [ContributionAnalyzerService],
})
export class AiModule {}
