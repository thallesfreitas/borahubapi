-- CreateTable
CREATE TABLE "jobapplication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "description" TEXT,
    "terms" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "jobsId" INTEGER NOT NULL,

    CONSTRAINT "jobapplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobapplication" ADD CONSTRAINT "jobapplication_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
