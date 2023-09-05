/*
  Warnings:

  - The `travel` column on the `candidates` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "travel",
ADD COLUMN     "travel" TEXT[];
