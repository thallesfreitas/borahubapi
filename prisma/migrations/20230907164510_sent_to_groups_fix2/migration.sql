/*
  Warnings:

  - Changed the type of `id_message` on the `sentToGroups` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "sentToGroups" DROP COLUMN "id_message",
ADD COLUMN     "id_message" INTEGER NOT NULL;
