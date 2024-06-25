/*
  Warnings:

  - You are about to drop the column `status` on the `Banner` table. All the data in the column will be lost.
  - You are about to drop the `Receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceiptDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "status";

-- DropTable
DROP TABLE "Receipt";

-- DropTable
DROP TABLE "ReceiptDetail";

-- DropTable
DROP TABLE "Supplier";

-- DropEnum
DROP TYPE "StatusOrder";

-- DropEnum
DROP TYPE "Subject";
