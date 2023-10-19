-- AlterTable
ALTER TABLE "users" ALTER COLUMN "is_email_confirmed" DROP NOT NULL,
ALTER COLUMN "is_phone_confirmed" DROP NOT NULL;
