/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TypeShip` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `TypeShip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TypeShip" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TypeShip_name_key" ON "TypeShip"("name");
