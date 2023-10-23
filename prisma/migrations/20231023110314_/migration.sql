/*
  Warnings:

  - You are about to alter the column `unit_amount` on the `packs` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `unit_amount_value` to the `packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "packs" ADD COLUMN     "unit_amount_value" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "unit_amount" SET DATA TYPE INTEGER;
