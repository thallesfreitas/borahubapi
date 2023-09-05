/*
  Warnings:

  - You are about to drop the column `transactionType` on the `credits` table. All the data in the column will be lost.
  - Added the required column `transactionType` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" ADD COLUMN     "transactionType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credits" DROP COLUMN "transactionType";
