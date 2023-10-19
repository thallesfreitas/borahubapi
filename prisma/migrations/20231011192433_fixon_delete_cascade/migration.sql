/*
  Warnings:

  - You are about to drop the `subscription` table. If the table is not empty, all the data it contains will be lost.

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
ALTER TABLE "CategoriesOnCandidate" DROP CONSTRAINT "CategoriesOnCandidate_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFreelancer" DROP CONSTRAINT "CategoriesOnFreelancer_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFreelancer" DROP CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnJobs" DROP CONSTRAINT "CategoriesOnJobs_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnRecruiter" DROP CONSTRAINT "CategoriesOnRecruiter_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnRecruiter" DROP CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnServiceProvider" DROP CONSTRAINT "CategoriesOnServiceProvider_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnServiceProvider" DROP CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "CreditTransaction" DROP CONSTRAINT "CreditTransaction_creditId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnFreelancer" DROP CONSTRAINT "TagsOnFreelancer_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnRecruiter" DROP CONSTRAINT "TagsOnRecruiter_recruiterId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnRecruiter" DROP CONSTRAINT "TagsOnRecruiter_tagsId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnServiceProvider" DROP CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnServiceProvider" DROP CONSTRAINT "TagsOnServiceProvider_tagsId_fkey";

-- DropForeignKey
ALTER TABLE "jobapplication" DROP CONSTRAINT "jobapplication_jobId_fkey";

-- DropForeignKey
ALTER TABLE "recruiters" DROP CONSTRAINT "recruiters_userId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_updatedBy_fkey";

-- DropTable
DROP TABLE "subscription";

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFreelancer" ADD CONSTRAINT "TagsOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
