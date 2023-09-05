-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_email_confirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_phone_confirmed" BOOLEAN NOT NULL DEFAULT false;
