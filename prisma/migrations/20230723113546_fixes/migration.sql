-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_updatedBy_fkey";
