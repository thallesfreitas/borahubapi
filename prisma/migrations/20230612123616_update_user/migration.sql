-- AlterTable
ALTER TABLE "users" ADD COLUMN     "descriptionFreelancer" TEXT,
ADD COLUMN     "descriptionRecruiter" TEXT,
ADD COLUMN     "descriptionServiceProvider" TEXT,
ADD COLUMN     "is_candidate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_freelancer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_recruiter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_service_provider" BOOLEAN NOT NULL DEFAULT false;
