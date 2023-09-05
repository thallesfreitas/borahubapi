-- DropForeignKey
ALTER TABLE "CreditTransaction" DROP CONSTRAINT "CreditTransaction_creditId_fkey";

-- AlterTable
ALTER TABLE "CreditTransaction" ALTER COLUMN "creditId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
