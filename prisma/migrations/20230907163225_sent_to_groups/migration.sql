-- CreateTable
CREATE TABLE "sentToGroups" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "id_message" TEXT NOT NULL,
    "status" JSONB[],
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sentToGroups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sentToGroups" ADD CONSTRAINT "sentToGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
