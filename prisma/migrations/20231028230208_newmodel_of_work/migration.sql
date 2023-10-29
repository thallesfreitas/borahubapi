/*
  Warnings:

  - The `modelOfWork` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "contractMode" TEXT[],
ADD COLUMN     "seniority" TEXT[],
ADD COLUMN     "travel" TEXT[],
DROP COLUMN "modelOfWork",
ADD COLUMN     "modelOfWork" TEXT[];
