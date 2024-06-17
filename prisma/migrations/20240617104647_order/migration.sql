/*
  Warnings:

  - You are about to drop the column `isPaymentOnline` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `shipperId` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "isPaymentOnline",
DROP COLUMN "note",
DROP COLUMN "shipperId";
