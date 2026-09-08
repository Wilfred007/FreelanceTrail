-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "contributionId" TEXT;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "GithubContribution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
