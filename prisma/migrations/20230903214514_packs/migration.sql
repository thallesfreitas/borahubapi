-- CreateTable
CREATE TABLE "packs" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameunit_amount" DOUBLE PRECISION NOT NULL,
    "amount" INTEGER NOT NULL,
    "features" TEXT[],
    "phrases" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packs_pkey" PRIMARY KEY ("id")
);
