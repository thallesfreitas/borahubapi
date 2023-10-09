/*
  Warnings:

  - You are about to drop the column `approved` on the `sentToGroups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sentToGroups" DROP COLUMN "approved";

-- CreateTable
CREATE TABLE "messageApprovalSystem" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "id_message" INTEGER NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messageApprovalSystem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messageApprovalSystem" ADD CONSTRAINT "messageApprovalSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
