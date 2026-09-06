-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubAccessToken" TEXT;

-- CreateTable
CREATE TABLE "GithubContribution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "prNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "mergedAt" TIMESTAMP(3),
    "filesChanged" INTEGER NOT NULL,
    "additions" INTEGER NOT NULL,
    "deletions" INTEGER NOT NULL,
    "language" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GithubContribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubContribution_repository_prNumber_key" ON "GithubContribution"("repository", "prNumber");

-- AddForeignKey
ALTER TABLE "GithubContribution" ADD CONSTRAINT "GithubContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
