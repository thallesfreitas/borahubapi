/*
  Warnings:

  - The required column `uuid` was added to the `token` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "token" ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "token_pkey" PRIMARY KEY ("id");
