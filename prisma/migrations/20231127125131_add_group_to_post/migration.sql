/*
  Warnings:

  - You are about to drop the column `pollId` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_pollId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "pollId",
ADD COLUMN     "group" TEXT;
