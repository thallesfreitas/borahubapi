/*
  Warnings:

  - You are about to drop the column `local` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "local",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT;
