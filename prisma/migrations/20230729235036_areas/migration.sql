/*
  Warnings:

  - You are about to drop the column `areas` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `areas` on the `freelancers` table. All the data in the column will be lost.
  - You are about to drop the column `areas` on the `recruiters` table. All the data in the column will be lost.
  - You are about to drop the column `areas` on the `serviceproviders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "areas";

-- AlterTable
ALTER TABLE "freelancers" DROP COLUMN "areas";

-- AlterTable
ALTER TABLE "recruiters" DROP COLUMN "areas";

-- AlterTable
ALTER TABLE "serviceproviders" DROP COLUMN "areas";

-- CreateTable
CREATE TABLE "areas" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "type" "ProfileType" NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "deletedBy" INTEGER,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreasOnCandidate" (
    "candidateId" INTEGER NOT NULL,
    "areasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AreasOnCandidate_pkey" PRIMARY KEY ("candidateId","areasId")
);

-- CreateTable
CREATE TABLE "AreasOnJobs" (
    "jobsId" INTEGER NOT NULL,
    "areasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AreasOnJobs_pkey" PRIMARY KEY ("jobsId","areasId")
);

-- CreateTable
CREATE TABLE "AreasOnServiceProvider" (
    "serviceProviderId" INTEGER NOT NULL,
    "areasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AreasOnServiceProvider_pkey" PRIMARY KEY ("serviceProviderId","areasId")
);

-- CreateTable
CREATE TABLE "AreasOnFreelancer" (
    "freelancerId" INTEGER NOT NULL,
    "areasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AreasOnFreelancer_pkey" PRIMARY KEY ("freelancerId","areasId")
);

-- CreateTable
CREATE TABLE "AreasOnRecruiter" (
    "recruiterId" INTEGER NOT NULL,
    "areasId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AreasOnRecruiter_pkey" PRIMARY KEY ("recruiterId","areasId")
);

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnCandidate" ADD CONSTRAINT "AreasOnCandidate_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnJobs" ADD CONSTRAINT "AreasOnJobs_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "serviceproviders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnServiceProvider" ADD CONSTRAINT "AreasOnServiceProvider_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnFreelancer" ADD CONSTRAINT "AreasOnFreelancer_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreasOnRecruiter" ADD CONSTRAINT "AreasOnRecruiter_areasId_fkey" FOREIGN KEY ("areasId") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
