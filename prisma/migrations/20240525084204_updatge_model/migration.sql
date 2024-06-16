/*
  Warnings:

  - You are about to drop the column `caption` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "caption",
DROP COLUMN "image",
ADD COLUMN     "image_url" TEXT;
