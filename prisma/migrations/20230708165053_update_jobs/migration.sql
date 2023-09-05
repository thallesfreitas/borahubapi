/*
  Warnings:

  - The `category` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "tags" TEXT[],
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];
