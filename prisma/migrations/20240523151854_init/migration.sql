/*
  Warnings:

  - The `dob` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `fromDate` column on the `Voucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `toDate` column on the `Voucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "fromDate",
ADD COLUMN     "fromDate" TIMESTAMP(3),
DROP COLUMN "toDate",
ADD COLUMN     "toDate" TIMESTAMP(3);
