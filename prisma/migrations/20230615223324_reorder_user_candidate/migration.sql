/*
  Warnings:

  - You are about to drop the column `actualRole` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `areas` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `contractMode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionFreelancer` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionRecruiter` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionServiceProvider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `seniority` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `travel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `workMode` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "actualRole",
DROP COLUMN "areas",
DROP COLUMN "category",
DROP COLUMN "city",
DROP COLUMN "contractMode",
DROP COLUMN "description",
DROP COLUMN "descriptionFreelancer",
DROP COLUMN "descriptionRecruiter",
DROP COLUMN "descriptionServiceProvider",
DROP COLUMN "link",
DROP COLUMN "role",
DROP COLUMN "salary",
DROP COLUMN "seniority",
DROP COLUMN "state",
DROP COLUMN "tags",
DROP COLUMN "travel",
DROP COLUMN "workMode";

-- CreateTable
CREATE TABLE "candidates" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "salary" TEXT[],
    "areas" TEXT[],
    "contractMode" TEXT[],
    "actualRole" TEXT,
    "category" TEXT[],
    "tags" TEXT[],
    "role" TEXT[],
    "city" TEXT,
    "state" TEXT,
    "workMode" TEXT[],
    "seniority" TEXT[],
    "travel" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "createdById" INTEGER,
    "updatedById" INTEGER,
    "deletedById" INTEGER,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
