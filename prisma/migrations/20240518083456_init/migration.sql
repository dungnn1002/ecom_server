/*
  Warnings:

  - You are about to drop the column `description` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";
