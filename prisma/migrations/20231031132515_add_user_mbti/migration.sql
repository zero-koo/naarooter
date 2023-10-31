-- CreateEnum
CREATE TYPE "EI" AS ENUM ('E', 'I');

-- CreateEnum
CREATE TYPE "SN" AS ENUM ('S', 'N');

-- CreateEnum
CREATE TYPE "FT" AS ENUM ('F', 'T');

-- CreateEnum
CREATE TYPE "JP" AS ENUM ('J', 'P');

-- CreateTable
CREATE TABLE "UserMbti" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "ei" "EI" NOT NULL,
    "sn" "SN" NOT NULL,
    "ft" "FT" NOT NULL,
    "jp" "JP" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMbti_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMbti_userId_key" ON "UserMbti"("userId");

-- AddForeignKey
ALTER TABLE "UserMbti" ADD CONSTRAINT "UserMbti_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
