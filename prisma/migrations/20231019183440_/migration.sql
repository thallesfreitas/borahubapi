/*
  Warnings:

  - You are about to drop the column `send_to_all_groups` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `send_to_selected_group` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `is_candidate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_freelancer` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_recruiter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_service_provider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type]` on the table `costsusage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `packs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AprovalType" AS ENUM ('WAITING', 'APPROVED', 'DISAPPROVED');

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
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_created_by_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_userId_fkey";

-- DropForeignKey
ALTER TABLE "reset_password_tokens" DROP CONSTRAINT "reset_password_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "serviceproviders" DROP CONSTRAINT "serviceproviders_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "usage" DROP CONSTRAINT "usage_userId_fkey";

-- AlterTable
ALTER TABLE "CreditTransaction" ADD COLUMN     "type" TEXT,
ALTER COLUMN "transactionType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "send_to_all_groups",
DROP COLUMN "send_to_selected_group";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_candidate",
DROP COLUMN "is_freelancer",
DROP COLUMN "is_recruiter",
DROP COLUMN "is_service_provider",
DROP COLUMN "stripe_id",
ALTER COLUMN "is_active" SET DEFAULT false;

-- DropTable
DROP TABLE "subscription";

-- CreateTable
CREATE TABLE "messageApprovalSystem" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "explain" TEXT,
    "userId" INTEGER NOT NULL,
    "idMessage" INTEGER,
    "approved" "AprovalType" NOT NULL DEFAULT 'WAITING',
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messageApprovalSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobapplication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "description" TEXT,
    "terms" BOOLEAN DEFAULT true,
    "feedback" TEXT,
    "feedbackrecruiter" TEXT,
    "evaluation" TEXT,
    "score" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "jobapplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "costsusage_type_key" ON "costsusage"("type");

-- CreateIndex
CREATE UNIQUE INDEX "packs_type_key" ON "packs"("type");

-- AddForeignKey
ALTER TABLE "messageApprovalSystem" ADD CONSTRAINT "messageApprovalSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credits" ADD CONSTRAINT "credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usage" ADD CONSTRAINT "usage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCandidate" ADD CONSTRAINT "TagsOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnJobs" ADD CONSTRAINT "TagsOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFreelancer" ADD CONSTRAINT "TagsOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password_tokens" ADD CONSTRAINT "reset_password_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceproviders" ADD CONSTRAINT "serviceproviders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freelancers" ADD CONSTRAINT "freelancers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
