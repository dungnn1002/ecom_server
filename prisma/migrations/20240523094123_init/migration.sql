/*
  Warnings:

  - The `typeVoucher` column on the `TypeVoucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TypeVoucher" DROP COLUMN "typeVoucher",
ADD COLUMN     "typeVoucher" "Discount";
