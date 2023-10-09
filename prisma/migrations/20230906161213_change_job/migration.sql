/*
  Warnings:

  - You are about to drop the column `send_to_all_groups` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `send_to_selected_group` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "send_to_all_groups",
DROP COLUMN "send_to_selected_group";
