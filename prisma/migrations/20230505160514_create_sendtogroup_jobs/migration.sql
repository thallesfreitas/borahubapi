-- AlterTable
ALTER TABLE "users" ADD COLUMN     "send_to_all_groups" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "send_to_selected_group" BOOLEAN NOT NULL DEFAULT false;
