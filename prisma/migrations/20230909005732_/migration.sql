/*
  Warnings:

  - You are about to drop the column `id_message` on the `messageApprovalSystem` table. All the data in the column will be lost.
  - You are about to drop the column `id_message` on the `sentToGroups` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[approvalSystemId]` on the table `sentToGroups` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "messageApprovalSystem" DROP COLUMN "id_message";

-- AlterTable
ALTER TABLE "sentToGroups" DROP COLUMN "id_message";

-- CreateIndex
CREATE UNIQUE INDEX "sentToGroups_approvalSystemId_key" ON "sentToGroups"("approvalSystemId");
