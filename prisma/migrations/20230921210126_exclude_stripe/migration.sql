/*
  Warnings:

  - You are about to drop the column `stripe_id` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `user_stripe_id` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "stripe_id",
DROP COLUMN "user_stripe_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "stripe_id";
