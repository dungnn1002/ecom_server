/*
  Warnings:

  - A unique constraint covering the columns `[name,brandId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- DropIndex
DROP INDEX "Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_brandId_key" ON "Category"("name", "brandId");
