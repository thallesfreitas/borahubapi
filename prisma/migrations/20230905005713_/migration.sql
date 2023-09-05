/*
  Warnings:

  - The `mp_id_transaction` column on the `CreditTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "mp_id_transaction",
ADD COLUMN     "mp_id_transaction" INTEGER NOT NULL DEFAULT 0;
