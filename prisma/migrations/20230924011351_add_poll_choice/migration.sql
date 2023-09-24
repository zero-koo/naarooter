/*
  Warnings:

  - You are about to drop the column `choices` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `choiceId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `pollId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `pollChoiceId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pollId_fkey";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "choices";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "choiceId",
DROP COLUMN "pollId",
ADD COLUMN     "pollChoiceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PollChoice" (
    "id" TEXT NOT NULL,
    "main" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "PollChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollChoice" ADD CONSTRAINT "PollChoice_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollChoiceId_fkey" FOREIGN KEY ("pollChoiceId") REFERENCES "PollChoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
