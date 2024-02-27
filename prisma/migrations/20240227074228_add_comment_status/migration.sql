-- CreateEnum
CREATE TYPE "COMMENT_STATUS" AS ENUM ('default', 'deleted');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "status" "COMMENT_STATUS" NOT NULL DEFAULT 'default';
