/*
  Warnings:

  - You are about to drop the column `createdById` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `deletedById` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `candidates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_createdById_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_deletedById_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_updatedById_fkey";

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "createdById",
DROP COLUMN "deletedById",
DROP COLUMN "updatedById",
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "deletedBy" INTEGER,
ADD COLUMN     "updatedBy" INTEGER;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
