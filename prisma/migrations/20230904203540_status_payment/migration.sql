/*
  Warnings:

  - You are about to drop the column `status_transaction` on the `CreditTransaction` table. All the data in the column will be lost.
  - Added the required column `status` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "status_transaction",
ADD COLUMN     "status" TEXT NOT NULL;
