-- AlterTable
ALTER TABLE "CreditTransaction" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "credits" ALTER COLUMN "status" SET DEFAULT 'pending';
