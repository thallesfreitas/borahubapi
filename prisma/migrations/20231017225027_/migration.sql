/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `costsusage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `packs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "costsusage_type_key" ON "costsusage"("type");

-- CreateIndex
CREATE UNIQUE INDEX "packs_type_key" ON "packs"("type");
