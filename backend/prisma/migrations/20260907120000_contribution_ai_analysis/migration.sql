-- AlterTable
ALTER TABLE "GithubContribution" ADD COLUMN     "aiCategory" TEXT,
ADD COLUMN     "aiSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "aiComplexity" TEXT,
ADD COLUMN     "aiImpact" TEXT,
ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "analyzedAt" TIMESTAMP(3);
