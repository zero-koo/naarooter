/*
  Warnings:

  - Added the required column `index` to the `PollChoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PollChoice" ADD COLUMN     "index" INTEGER NOT NULL;
