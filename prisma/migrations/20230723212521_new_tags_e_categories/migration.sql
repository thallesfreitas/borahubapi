/*
  Warnings:

  - You are about to drop the column `tags` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `recruiters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "recruiters" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "tags" (
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

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnCandidate" (
    "candidateId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnCandidate_pkey" PRIMARY KEY ("candidateId","tagsId")
);

-- CreateTable
CREATE TABLE "TagsOnRecruiter" (
    "recruiterId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnRecruiter_pkey" PRIMARY KEY ("recruiterId","tagsId")
);

-- AddForeignKey
ALTER TABLE "TagsOnCandidate" ADD CONSTRAINT "TagsOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnCandidate" ADD CONSTRAINT "TagsOnCandidate_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnRecruiter" ADD CONSTRAINT "TagsOnRecruiter_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
