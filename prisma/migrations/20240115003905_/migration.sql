/*
  Warnings:

  - You are about to drop the column `viewsCount` on the `articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "viewsCount",
ADD COLUMN     "views_count" BIGINT NOT NULL DEFAULT 0;
