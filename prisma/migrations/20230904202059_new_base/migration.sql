/*
  Warnings:

  - You are about to drop the column `status` on the `CreditTransaction` table. All the data in the column will be lost.
  - Added the required column `status_transaction` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "status",
ADD COLUMN     "status_transaction" TEXT NOT NULL;
