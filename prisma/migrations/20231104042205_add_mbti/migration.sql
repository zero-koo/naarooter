/*
  Warnings:

  - You are about to drop the column `MBTI` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ei` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ft` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sn` on the `User` table. All the data in the column will be lost.
  - Added the required column `mbti` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "MBTI",
DROP COLUMN "ei",
DROP COLUMN "ft",
DROP COLUMN "jp",
DROP COLUMN "sn",
ADD COLUMN     "mbti" "MBTI" NOT NULL;

-- DropEnum
DROP TYPE "EI";

-- DropEnum
DROP TYPE "FT";

-- DropEnum
DROP TYPE "JP";

-- DropEnum
DROP TYPE "SN";
