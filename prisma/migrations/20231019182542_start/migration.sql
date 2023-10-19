/*
  Warnings:

  - You are about to drop the column `type` on the `CreditTransaction` table. All the data in the column will be lost.
  - You are about to drop the `jobapplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `messageApprovalSystem` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `transactionType` on table `CreditTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AreasOnCandidate" DROP CONSTRAINT "AreasOnCandidate_areasId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnCandidate" DROP CONSTRAINT "AreasOnCandidate_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnFreelancer" DROP CONSTRAINT "AreasOnFreelancer_areasId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnFreelancer" DROP CONSTRAINT "AreasOnFreelancer_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnJobs" DROP CONSTRAINT "AreasOnJobs_areasId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnJobs" DROP CONSTRAINT "AreasOnJobs_jobsId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnRecruiter" DROP CONSTRAINT "AreasOnRecruiter_areasId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnRecruiter" DROP CONSTRAINT "AreasOnRecruiter_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnServiceProvider" DROP CONSTRAINT "AreasOnServiceProvider_areasId_fkey";

-- DropForeignKey
ALTER TABLE "AreasOnServiceProvider" DROP CONSTRAINT "AreasOnServiceProvider_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnCandidate" DROP CONSTRAINT "CategoriesOnCandidate_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFreelancer" DROP CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnJobs" DROP CONSTRAINT "CategoriesOnJobs_jobsId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnRecruiter" DROP CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnServiceProvider" DROP CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "CreditTransaction" DROP CONSTRAINT "CreditTransaction_creditId_fkey";

-- DropForeignKey
ALTER TABLE "CreditTransaction" DROP CONSTRAINT "CreditTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnCandidate" DROP CONSTRAINT "TagsOnCandidate_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnFreelancer" DROP CONSTRAINT "TagsOnFreelancer_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnJobs" DROP CONSTRAINT "TagsOnJobs_jobsId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnRecruiter" DROP CONSTRAINT "TagsOnRecruiter_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnServiceProvider" DROP CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "candidates" DROP CONSTRAINT "candidates_userId_fkey";

-- DropForeignKey
ALTER TABLE "credits" DROP CONSTRAINT "credits_userId_fkey";

-- DropForeignKey
ALTER TABLE "freelancers" DROP CONSTRAINT "freelancers_userId_fkey";

-- DropForeignKey
ALTER TABLE "jobapplication" DROP CONSTRAINT "jobapplication_created_by_fkey";

-- DropForeignKey
ALTER TABLE "jobapplication" DROP CONSTRAINT "jobapplication_jobId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_created_by_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "messageApprovalSystem" DROP CONSTRAINT "messageApprovalSystem_userId_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_userId_fkey";

-- DropForeignKey
ALTER TABLE "reset_password_tokens" DROP CONSTRAINT "reset_password_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_userId_fkey";

-- DropForeignKey
ALTER TABLE "usage" DROP CONSTRAINT "usage_userId_fkey";

-- DropIndex
DROP INDEX "costsusage_type_key";

-- DropIndex
DROP INDEX "packs_type_key";

-- AlterTable
ALTER TABLE "CreditTransaction" DROP COLUMN "type",
ALTER COLUMN "transactionType" SET NOT NULL;

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "send_to_all_groups" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "send_to_selected_group" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_candidate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_freelancer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_recruiter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_service_provider" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripe_id" TEXT,
ALTER COLUMN "is_active" SET DEFAULT true;

-- DropTable
DROP TABLE "jobapplication";

-- DropTable
DROP TABLE "messageApprovalSystem";

-- DropEnum
DROP TYPE "AprovalType";

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stripe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,
    "user_stripe_id" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage" ADD CONSTRAINT "usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCandidate" ADD CONSTRAINT "TagsOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnJobs" ADD CONSTRAINT "TagsOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFreelancer" ADD CONSTRAINT "TagsOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password_tokens" ADD CONSTRAINT "reset_password_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceproviders" ADD CONSTRAINT "serviceproviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancers" ADD CONSTRAINT "freelancers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
