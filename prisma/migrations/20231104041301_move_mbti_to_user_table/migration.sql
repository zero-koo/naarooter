/*
  Warnings:

  - You are about to drop the `UserMbti` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `MBTI` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ei` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ft` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sn` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MBTI" AS ENUM ('ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ');

-- DropForeignKey
ALTER TABLE "UserMbti" DROP CONSTRAINT "UserMbti_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "MBTI" "MBTI" NOT NULL,
ADD COLUMN     "ei" "EI" NOT NULL,
ADD COLUMN     "ft" "FT" NOT NULL,
ADD COLUMN     "jp" "JP" NOT NULL,
ADD COLUMN     "sn" "SN" NOT NULL;

-- DropTable
DROP TABLE "UserMbti";
