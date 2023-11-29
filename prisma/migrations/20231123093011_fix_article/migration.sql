/*
  Warnings:

  - You are about to drop the column `userId` on the `ArticleComments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ArticleLike` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ArticleView` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articleId,created_by]` on the table `ArticleComments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleId,created_by]` on the table `ArticleLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleId,created_by]` on the table `ArticleView` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ArticleComments_articleId_userId_key";

-- DropIndex
DROP INDEX "ArticleLike_articleId_userId_key";

-- DropIndex
DROP INDEX "ArticleView_articleId_userId_key";

-- AlterTable
ALTER TABLE "ArticleComments" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "ArticleLike" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "ArticleView" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "ArticleComments_articleId_created_by_key" ON "ArticleComments"("articleId", "created_by");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleLike_articleId_created_by_key" ON "ArticleLike"("articleId", "created_by");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleView_articleId_created_by_key" ON "ArticleView"("articleId", "created_by");
