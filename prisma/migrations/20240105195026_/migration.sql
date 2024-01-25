/*
  Warnings:

  - You are about to drop the column `created_by` on the `article_history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "article_history" DROP COLUMN "created_by",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
