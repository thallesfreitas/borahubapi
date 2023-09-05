/*
  Warnings:

  - You are about to drop the column `source` on the `credits` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_id_transaction` on the `credits` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `credits` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `credits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "credits" DROP COLUMN "source",
DROP COLUMN "stripe_id_transaction",
DROP COLUMN "transactionDate",
DROP COLUMN "transactionId";
