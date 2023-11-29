-- DropIndex
DROP INDEX "ArticleComments_articleId_created_by_key";

-- CreateIndex
CREATE INDEX "ArticleComments_articleId_created_by_idx" ON "ArticleComments"("articleId", "created_by");
