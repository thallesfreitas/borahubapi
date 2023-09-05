/*
  Warnings:

  - You are about to drop the column `selectiveProcess` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "extra" TEXT;

-- AlterTable
ALTER TABLE "freelancers" ADD COLUMN     "extra" TEXT;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "selectiveProcess",
ADD COLUMN     "extra" TEXT;

-- AlterTable
ALTER TABLE "recruiters" ADD COLUMN     "extra" TEXT;

-- AlterTable
ALTER TABLE "serviceproviders" ADD COLUMN     "extra" TEXT;
