import { Module } from '@nestjs/common';
import { ContributionAnalyzerService } from './contribution-analyzer.service';
import { ReputationAnalystService } from './reputation-analyst.service';

@Module({
  providers: [ContributionAnalyzerService, ReputationAnalystService],
  exports: [ContributionAnalyzerService, ReputationAnalystService],
})
export class AiModule {}
