/*
  Warnings:

  - Changed the type of `type` on the `category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('CANDIDATE', 'RECRUITER', 'SERVICE_PROVIDER', 'FREELANCER');

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_updatedBy_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "type",
ADD COLUMN     "type" "CategoryType" NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
