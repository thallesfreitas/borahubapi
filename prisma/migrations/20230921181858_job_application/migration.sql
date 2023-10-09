/*
  Warnings:

  - You are about to drop the column `jobsId` on the `jobapplication` table. All the data in the column will be lost.
  - Added the required column `jobId` to the `jobapplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jobapplication" DROP CONSTRAINT "jobapplication_jobsId_fkey";

-- AlterTable
ALTER TABLE "jobapplication" DROP COLUMN "jobsId",
ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
