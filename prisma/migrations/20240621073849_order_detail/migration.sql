/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderDetaill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetaill" DROP CONSTRAINT "OrderDetaill_productId_fkey";

-- AlterTable
ALTER TABLE "OrderDetaill" DROP COLUMN "productId";
