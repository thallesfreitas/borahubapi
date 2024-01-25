/*
  Warnings:

  - You are about to drop the column `articleId` on the `UserArticlePaid` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `article_comments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `article_history` table. All the data in the column will be lost.
  - The `created_by` column on the `article_history` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `articleId` on the `article_like` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `article_view` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[article_id,created_by]` on the table `UserArticlePaid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[article_id,created_by]` on the table `article_like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[article_id,created_by]` on the table `article_view` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `article_id` to the `UserArticlePaid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article_id` to the `article_comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article_id` to the `article_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `article_id` to the `article_view` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserArticlePaid" DROP CONSTRAINT "UserArticlePaid_articleId_fkey";

-- DropForeignKey
ALTER TABLE "article_comments" DROP CONSTRAINT "article_comments_articleId_fkey";

-- DropForeignKey
ALTER TABLE "article_history" DROP CONSTRAINT "article_history_created_by_fkey";

-- DropForeignKey
ALTER TABLE "article_like" DROP CONSTRAINT "article_like_articleId_fkey";

-- DropForeignKey
ALTER TABLE "article_view" DROP CONSTRAINT "article_view_articleId_fkey";

-- DropIndex
DROP INDEX "UserArticlePaid_articleId_created_by_key";

-- DropIndex
DROP INDEX "article_comments_articleId_created_by_idx";

-- DropIndex
DROP INDEX "article_like_articleId_created_by_key";

-- DropIndex
DROP INDEX "article_view_articleId_created_by_key";

-- AlterTable
ALTER TABLE "UserArticlePaid" DROP COLUMN "articleId",
ADD COLUMN     "article_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "article_comments" DROP COLUMN "articleId",
ADD COLUMN     "article_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "article_history" DROP COLUMN "createdAt",
ADD COLUMN     "article_id" INTEGER,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "article_like" DROP COLUMN "articleId",
ADD COLUMN     "article_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "article_view" DROP COLUMN "articleId",
ADD COLUMN     "article_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserArticlePaid_article_id_created_by_key" ON "UserArticlePaid"("article_id", "created_by");

-- CreateIndex
CREATE INDEX "article_comments_article_id_created_by_idx" ON "article_comments"("article_id", "created_by");

-- CreateIndex
CREATE UNIQUE INDEX "article_like_article_id_created_by_key" ON "article_like"("article_id", "created_by");

-- CreateIndex
CREATE UNIQUE INDEX "article_view_article_id_created_by_key" ON "article_view"("article_id", "created_by");

-- AddForeignKey
ALTER TABLE "article_history" ADD CONSTRAINT "article_history_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticlePaid" ADD CONSTRAINT "UserArticlePaid_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_view" ADD CONSTRAINT "article_view_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_like" ADD CONSTRAINT "article_like_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
