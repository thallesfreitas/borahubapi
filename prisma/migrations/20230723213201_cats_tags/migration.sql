/*
  Warnings:

  - You are about to drop the column `category` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `serviceproviders` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `serviceproviders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "freelancers" DROP COLUMN "category",
DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "category",
DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "serviceproviders" DROP COLUMN "category",
DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "CategoriesOnJobs" (
    "jobsId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnJobs_pkey" PRIMARY KEY ("jobsId","categoryId")
);

-- CreateTable
CREATE TABLE "CategoriesOnServiceProvider" (
    "serviceProviderId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnServiceProvider_pkey" PRIMARY KEY ("serviceProviderId","categoryId")
);

-- CreateTable
CREATE TABLE "CategoriesOnFreelancer" (
    "freelancerId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnFreelancer_pkey" PRIMARY KEY ("freelancerId","categoryId")
);

-- CreateTable
CREATE TABLE "TagsOnJobs" (
    "jobsId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnJobs_pkey" PRIMARY KEY ("jobsId","tagsId")
);

-- CreateTable
CREATE TABLE "TagsOnServiceProvider" (
    "serviceProviderId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnServiceProvider_pkey" PRIMARY KEY ("serviceProviderId","tagsId")
);

-- CreateTable
CREATE TABLE "TagsOnFreelancer" (
    "freelancerId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnFreelancer_pkey" PRIMARY KEY ("freelancerId","tagsId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnJobs" ADD CONSTRAINT "CategoriesOnJobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnServiceProvider" ADD CONSTRAINT "CategoriesOnServiceProvider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFreelancer" ADD CONSTRAINT "CategoriesOnFreelancer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnJobs" ADD CONSTRAINT "TagsOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnJobs" ADD CONSTRAINT "TagsOnJobs_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnServiceProvider" ADD CONSTRAINT "TagsOnServiceProvider_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFreelancer" ADD CONSTRAINT "TagsOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnFreelancer" ADD CONSTRAINT "TagsOnFreelancer_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
