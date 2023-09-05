/*
  Warnings:

  - You are about to drop the column `createdBy` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `candidates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_updatedBy_fkey";

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "createdBy",
DROP COLUMN "deletedBy",
DROP COLUMN "updatedBy",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "candidates_userId_key" ON "candidates"("userId");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
