/*
  Warnings:

  - You are about to drop the column `shipAdress` on the `AddressUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AddressUser" DROP COLUMN "shipAdress",
ADD COLUMN     "shipAddress" TEXT;
