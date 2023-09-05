/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "token_email_key";

-- DropIndex
DROP INDEX "token_phone_key";

-- CreateIndex
CREATE UNIQUE INDEX "token_token_key" ON "token"("token");
