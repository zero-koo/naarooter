/*
  Warnings:

  - You are about to drop the column `sub` on the `PollChoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PollChoice" DROP COLUMN "sub",
ADD COLUMN     "imageUrl" TEXT;
