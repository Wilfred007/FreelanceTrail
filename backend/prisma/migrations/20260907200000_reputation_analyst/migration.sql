-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reputationTopAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "reputationStrengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "reputationSummary" TEXT,
ADD COLUMN     "reputationGeneratedAt" TIMESTAMP(3);
