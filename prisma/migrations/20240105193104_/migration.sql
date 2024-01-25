/*
  Warnings:

  - You are about to drop the `ArticleView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleView" DROP CONSTRAINT "ArticleView_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleView" DROP CONSTRAINT "ArticleView_created_by_fkey";

-- DropTable
DROP TABLE "ArticleView";

-- CreateTable
CREATE TABLE "article_view" (
    "id" SERIAL NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "created_by" INTEGER,

    CONSTRAINT "article_view_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "article_view_articleId_created_by_key" ON "article_view"("articleId", "created_by");

-- AddForeignKey
ALTER TABLE "article_view" ADD CONSTRAINT "article_view_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_view" ADD CONSTRAINT "article_view_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
