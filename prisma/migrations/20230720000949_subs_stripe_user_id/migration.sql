/*
  Warnings:

  - Added the required column `user_stripe_id` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "user_stripe_id" TEXT NOT NULL;
