-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_updatedBy_fkey";

-- CreateTable
CREATE TABLE "CategoriesOnCandidate" (
    "candidateId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnCandidate_pkey" PRIMARY KEY ("candidateId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnCandidate" ADD CONSTRAINT "CategoriesOnCandidate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
