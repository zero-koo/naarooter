/*
  Warnings:

  - The primary key for the `CommunityTopic` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_CommunityTopics" DROP CONSTRAINT "_CommunityTopics_B_fkey";

-- AlterTable
ALTER TABLE "CommunityTopic" DROP CONSTRAINT "CommunityTopic_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CommunityTopic_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CommunityTopics" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CommunityTopics" ADD CONSTRAINT "_CommunityTopics_B_fkey" FOREIGN KEY ("B") REFERENCES "CommunityTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
