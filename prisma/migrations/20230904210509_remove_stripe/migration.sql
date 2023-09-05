/*
  Warnings:

  - You are about to drop the column `stripe_id_transaction` on the `CreditTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "stripe_id_transaction";
