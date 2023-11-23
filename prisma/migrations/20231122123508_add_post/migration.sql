/*
  Warnings:

  - You are about to drop the column `pollId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Poll` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('POST', 'POLL');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_authorId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "pollId",
DROP COLUMN "text",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB NOT NULL,
    "authorId" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "pollId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_pollId_key" ON "Post"("pollId");

-- CreateIndex
CREATE UNIQUE INDEX "Poll_postId_key" ON "Poll"("postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
