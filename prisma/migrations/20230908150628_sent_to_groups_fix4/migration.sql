/*
  Warnings:

  - You are about to drop the column `finished` on the `messageApprovalSystem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messageApprovalSystem" DROP COLUMN "finished";

-- AlterTable
ALTER TABLE "sentToGroups" ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "times" INTEGER NOT NULL DEFAULT 0;
