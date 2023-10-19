-- DropForeignKey
ALTER TABLE "TagsOnJobs" DROP CONSTRAINT "TagsOnJobs_jobsId_fkey";

-- AddForeignKey
ALTER TABLE "TagsOnJobs" ADD CONSTRAINT "TagsOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
