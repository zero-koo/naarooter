/*
  Warnings:

  - You are about to drop the column `groupId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_groupId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "groupId",
ADD COLUMN     "communityId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "PostGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
