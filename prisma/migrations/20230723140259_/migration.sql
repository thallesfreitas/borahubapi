/*
  Warnings:

  - You are about to drop the column `createdBy` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `recruiters` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `recruiters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `recruiters` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `serviceproviders` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `serviceproviders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `serviceproviders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `freelancers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `recruiters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `serviceproviders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `freelancers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `recruiters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `serviceproviders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_updatedBy_fkey";

-- AlterTable
ALTER TABLE "freelancers" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "recruiters" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "serviceproviders" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "freelancers_userId_key" ON "freelancers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "recruiters_userId_key" ON "recruiters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "serviceproviders_userId_key" ON "serviceproviders"("userId");

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceproviders" ADD CONSTRAINT "serviceproviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancers" ADD CONSTRAINT "freelancers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
