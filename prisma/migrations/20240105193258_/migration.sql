/*
  Warnings:

  - You are about to drop the `ArticleComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleComments" DROP CONSTRAINT "ArticleComments_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleComments" DROP CONSTRAINT "ArticleComments_created_by_fkey";

-- DropForeignKey
ALTER TABLE "ArticleLike" DROP CONSTRAINT "ArticleLike_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleLike" DROP CONSTRAINT "ArticleLike_created_by_fkey";

-- DropTable
DROP TABLE "ArticleComments";

-- DropTable
DROP TABLE "ArticleLike";

-- CreateTable
CREATE TABLE "article_like" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "created_by" INTEGER,

    CONSTRAINT "article_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_comments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "created_by" INTEGER,

    CONSTRAINT "article_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_like_articleId_created_by_key" ON "article_like"("articleId", "created_by");

-- CreateIndex
CREATE INDEX "article_comments_articleId_created_by_idx" ON "article_comments"("articleId", "created_by");

-- AddForeignKey
ALTER TABLE "article_like" ADD CONSTRAINT "article_like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_like" ADD CONSTRAINT "article_like_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_comments" ADD CONSTRAINT "article_comments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
