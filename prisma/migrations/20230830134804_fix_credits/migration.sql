/*
  Warnings:

  - You are about to drop the column `details` on the `CreditTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `credits` table. All the data in the column will be lost.
  - Added the required column `stripe_id_transaction` to the `CreditTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_id_transaction` to the `credits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "details",
ADD COLUMN     "stripe_id_transaction" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "credits" DROP COLUMN "details",
ADD COLUMN     "stripe_id_transaction" TEXT NOT NULL;
