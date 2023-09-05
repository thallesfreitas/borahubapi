/*
  Warnings:

  - You are about to drop the column `type` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "type",
ADD COLUMN     "local" TEXT;
