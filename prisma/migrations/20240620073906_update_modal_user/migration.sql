/*
  Warnings:

  - You are about to drop the column `isActiveEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userToken` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetaill" DROP CONSTRAINT "OrderDetaill_productId_fkey";

-- AlterTable
ALTER TABLE "OrderDetaill" ADD COLUMN     "productSizeId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActiveEmail",
DROP COLUMN "userToken";

-- AddForeignKey
ALTER TABLE "OrderDetaill" ADD CONSTRAINT "OrderDetaill_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetaill" ADD CONSTRAINT "OrderDetaill_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
