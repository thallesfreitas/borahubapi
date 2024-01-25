/*
  Warnings:

  - You are about to drop the `UserArticlePaid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserArticlePaid" DROP CONSTRAINT "UserArticlePaid_article_id_fkey";

-- DropForeignKey
ALTER TABLE "UserArticlePaid" DROP CONSTRAINT "UserArticlePaid_created_by_fkey";

-- DropTable
DROP TABLE "UserArticlePaid";

-- CreateTable
CREATE TABLE "user_article_paid" (
    "id" SERIAL NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "article_id" INTEGER NOT NULL,
    "created_by" INTEGER,

    CONSTRAINT "user_article_paid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_article_paid_article_id_created_by_idx" ON "user_article_paid"("article_id", "created_by");

-- AddForeignKey
ALTER TABLE "user_article_paid" ADD CONSTRAINT "user_article_paid_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_article_paid" ADD CONSTRAINT "user_article_paid_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
