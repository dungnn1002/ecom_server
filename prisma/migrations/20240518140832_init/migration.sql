/*
  Warnings:

  - You are about to drop the column `productDetailSizeId` on the `ShopCart` table. All the data in the column will be lost.
  - You are about to drop the `ProductDetailSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('CHO_XAC_NHAN', 'CHO_LAY_HANG', 'DANG_GIAO_HANG', 'DA_GIAO_HANG', 'HUY_DON');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'SHIPPER';
ALTER TYPE "Role" ADD VALUE 'SALER';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Size" ADD VALUE 'XL';
ALTER TYPE "Size" ADD VALUE 'XXL';

-- DropForeignKey
ALTER TABLE "ProductDetailSize" DROP CONSTRAINT "ProductDetailSize_productDetailId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShopCart" DROP CONSTRAINT "ShopCart_productDetailSizeId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "discountPrice" BIGINT,
ADD COLUMN     "originalPrice" BIGINT;

-- AlterTable
ALTER TABLE "ShopCart" DROP COLUMN "productDetailSizeId",
ADD COLUMN     "productSizeId" INTEGER;

-- DropTable
DROP TABLE "ProductDetailSize";

-- DropTable
DROP TABLE "ProductDetails";

-- CreateTable
CREATE TABLE "ProductSize" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "width" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "size" "Size",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopCart" ADD CONSTRAINT "ShopCart_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
