/*
  Warnings:

  - You are about to drop the column `isActive` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `is_approved` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArticleLike" ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "isActive",
DROP COLUMN "is_approved";
