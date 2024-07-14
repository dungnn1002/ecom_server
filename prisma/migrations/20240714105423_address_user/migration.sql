/*
  Warnings:

  - You are about to drop the column `shipAddress` on the `AddressUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AddressUser" DROP COLUMN "shipAddress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "ward" TEXT;
