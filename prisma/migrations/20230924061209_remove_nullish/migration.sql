/*
  Warnings:

  - Made the column `description` on table `Poll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Poll" ALTER COLUMN "description" SET NOT NULL;
