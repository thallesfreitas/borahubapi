/*
  Warnings:

  - The `approved` column on the `messageApprovalSystem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `sentToGroups` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AprovalType" AS ENUM ('WAITING', 'APPROVED', 'DISAPPROVED');

-- DropForeignKey
ALTER TABLE "sentToGroups" DROP CONSTRAINT "sentToGroups_approvalSystemId_fkey";

-- DropForeignKey
ALTER TABLE "sentToGroups" DROP CONSTRAINT "sentToGroups_userId_fkey";

-- AlterTable
ALTER TABLE "messageApprovalSystem" ADD COLUMN     "status" BOOLEAN[],
DROP COLUMN "approved",
ADD COLUMN     "approved" "AprovalType" NOT NULL DEFAULT 'WAITING';

-- DropTable
DROP TABLE "sentToGroups";
