/*
  Warnings:

  - You are about to drop the column `content` on the `Poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "content",
ADD COLUMN     "description" TEXT;
