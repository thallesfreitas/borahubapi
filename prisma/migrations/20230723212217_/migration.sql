/*
  Warnings:

  - You are about to drop the column `category` on the `recruiters` table. All the data in the column will be lost.
  - Changed the type of `type` on the `category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('CANDIDATE', 'RECRUITER', 'JOB', 'SERVICE_PROVIDER', 'FREELANCER');

-- AlterTable
ALTER TABLE "category" DROP COLUMN "type",
ADD COLUMN     "type" "ProfileType" NOT NULL;

-- AlterTable
ALTER TABLE "recruiters" DROP COLUMN "category";

-- DropEnum
DROP TYPE "CategoryType";

-- CreateTable
CREATE TABLE "CategoriesOnRecruiter" (
    "recruiterId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnRecruiter_pkey" PRIMARY KEY ("recruiterId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
