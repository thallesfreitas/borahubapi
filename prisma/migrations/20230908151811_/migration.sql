/*
  Warnings:

  - You are about to drop the column `finished` on the `sentToGroups` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `sentToGroups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messageApprovalSystem" ADD COLUMN     "finished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sentToGroups" DROP COLUMN "finished",
DROP COLUMN "times";
