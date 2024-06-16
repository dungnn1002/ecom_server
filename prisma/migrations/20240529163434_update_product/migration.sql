/*
  Warnings:

  - You are about to drop the column `productdetailId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productdetailId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productdetailId",
ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
