/*
  Warnings:

  - Added the required column `approvalSystemId` to the `sentToGroups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sentToGroups" ADD COLUMN     "approvalSystemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sentToGroups" ADD CONSTRAINT "sentToGroups_approvalSystemId_fkey" FOREIGN KEY ("approvalSystemId") REFERENCES "messageApprovalSystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
