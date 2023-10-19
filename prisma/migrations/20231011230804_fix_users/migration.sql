/*
  Warnings:

  - You are about to drop the column `is_candidate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_freelancer` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_recruiter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_service_provider` on the `users` table. All the data in the column will be lost.
  - Made the column `is_email_confirmed` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_phone_confirmed` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_candidate",
DROP COLUMN "is_freelancer",
DROP COLUMN "is_recruiter",
DROP COLUMN "is_service_provider",
ALTER COLUMN "is_active" SET DEFAULT false,
ALTER COLUMN "is_email_confirmed" SET NOT NULL,
ALTER COLUMN "is_email_confirmed" SET DEFAULT false,
ALTER COLUMN "is_phone_confirmed" SET NOT NULL,
ALTER COLUMN "is_phone_confirmed" SET DEFAULT false;
