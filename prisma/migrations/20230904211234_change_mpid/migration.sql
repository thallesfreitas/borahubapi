/*
  Warnings:

  - Made the column `mp_id_transaction` on table `CreditTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" ALTER COLUMN "mp_id_transaction" SET NOT NULL,
ALTER COLUMN "mp_id_transaction" SET DEFAULT '';
