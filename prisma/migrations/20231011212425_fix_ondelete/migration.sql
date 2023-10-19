-- DropForeignKey
ALTER TABLE "CategoriesOnCandidate" DROP CONSTRAINT "CategoriesOnCandidate_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnFreelancer" DROP CONSTRAINT "CategoriesOnFreelancer_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnJobs" DROP CONSTRAINT "CategoriesOnJobs_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnJobs" DROP CONSTRAINT "CategoriesOnJobs_jobsId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnRecruiter" DROP CONSTRAINT "CategoriesOnRecruiter_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnServiceProvider" DROP CONSTRAINT "CategoriesOnServiceProvider_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnCandidate" DROP CONSTRAINT "TagsOnCandidate_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnRecruiter" DROP CONSTRAINT "TagsOnRecruiter_tagsId_fkey";

-- DropForeignKey
ALTER TABLE "TagsOnServiceProvider" DROP CONSTRAINT "TagsOnServiceProvider_tagsId_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnRecruiter" ADD CONSTRAINT "CategoriesOnRecruiter_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCandidate" ADD CONSTRAINT "TagsOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
