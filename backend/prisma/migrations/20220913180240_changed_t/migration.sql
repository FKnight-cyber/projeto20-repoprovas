/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tests_name_key" ON "Tests"("name");
