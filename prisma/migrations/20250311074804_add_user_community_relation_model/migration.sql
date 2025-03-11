/*
  Warnings:

  - You are about to drop the `_UserCommunity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserCommunity" DROP CONSTRAINT "_UserCommunity_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCommunity" DROP CONSTRAINT "_UserCommunity_B_fkey";

-- DropTable
DROP TABLE "_UserCommunity";

-- CreateTable
CREATE TABLE "UserCommunity" (
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "UserCommunity_pkey" PRIMARY KEY ("userId","communityId")
);

-- AddForeignKey
ALTER TABLE "UserCommunity" ADD CONSTRAINT "UserCommunity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommunity" ADD CONSTRAINT "UserCommunity_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
