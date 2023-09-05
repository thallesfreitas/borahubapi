/*
  Warnings:

  - You are about to drop the column `send_to_all_groups` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `send_to_selected_group` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "send_to_all_groups" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "send_to_selected_group" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "send_to_all_groups",
DROP COLUMN "send_to_selected_group";
