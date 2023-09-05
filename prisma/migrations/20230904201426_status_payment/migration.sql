/*
  Warnings:

  - Added the required column `status` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `credits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credits" ADD COLUMN     "status" TEXT NOT NULL;
