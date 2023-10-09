/*
  Warnings:

  - The `status` column on the `sentToGroups` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "sentToGroups" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN[];
