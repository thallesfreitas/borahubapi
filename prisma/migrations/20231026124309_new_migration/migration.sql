/*
  Warnings:

  - You are about to alter the column `unit_amount` on the `packs` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "affirmative" TEXT[];

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "affirmative" TEXT[];

-- AlterTable
ALTER TABLE "packs" ALTER COLUMN "unit_amount" SET DATA TYPE INTEGER;
