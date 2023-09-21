/*
  Warnings:

  - The primary key for the `TempPost` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TempPost" DROP CONSTRAINT "TempPost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TempPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TempPost_id_seq";
