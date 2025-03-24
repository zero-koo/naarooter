/*
  Warnings:

  - You are about to drop the column `topicId` on the `Community` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_topicId_fkey";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "topicId";

-- CreateTable
CREATE TABLE "_CommunityTopics" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityTopics_AB_unique" ON "_CommunityTopics"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityTopics_B_index" ON "_CommunityTopics"("B");

-- AddForeignKey
ALTER TABLE "_CommunityTopics" ADD CONSTRAINT "_CommunityTopics_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTopics" ADD CONSTRAINT "_CommunityTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "CommunityTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
