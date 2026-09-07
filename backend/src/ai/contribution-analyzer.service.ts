import { Injectable, Logger } from '@nestjs/common';
import { analyzeContribution, type ContributionEvidence, type ContributionAnalysis } from './contribution-analyzer.agent';

@Injectable()
export class ContributionAnalyzerService {
  private readonly logger = new Logger(ContributionAnalyzerService.name);

  async analyze(evidence: ContributionEvidence): Promise<ContributionAnalysis | null> {
    try {
      return await analyzeContribution(evidence);
    } catch (err) {
      // Analysis is best-effort: a flaky inference call shouldn't fail a GitHub sync.
      this.logger.warn(`Contribution analysis failed for ${evidence.repository}: ${(err as Error).message}`);
      return null;
    }
  }
}
