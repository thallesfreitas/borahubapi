-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserArticlePaid" (
    "id" SERIAL NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" INTEGER NOT NULL,
    "created_by" INTEGER,

    CONSTRAINT "UserArticlePaid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserArticlePaid_articleId_created_by_key" ON "UserArticlePaid"("articleId", "created_by");

-- AddForeignKey
ALTER TABLE "UserArticlePaid" ADD CONSTRAINT "UserArticlePaid_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserArticlePaid" ADD CONSTRAINT "UserArticlePaid_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
