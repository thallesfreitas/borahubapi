/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `article_history` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `articles` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `article_history` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `articles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "article_history" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "article_history_uuid_key" ON "article_history"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "articles_uuid_key" ON "articles"("uuid");
