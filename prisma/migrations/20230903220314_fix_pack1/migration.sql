/*
  Warnings:

  - You are about to drop the column `nameunit_amount` on the `packs` table. All the data in the column will be lost.
  - Added the required column `unit_amount` to the `packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "packs" DROP COLUMN "nameunit_amount",
ADD COLUMN     "unit_amount" DOUBLE PRECISION NOT NULL;
