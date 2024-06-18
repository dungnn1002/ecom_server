/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoomMessage" DROP CONSTRAINT "RoomMessage_userOneId_fkey";

-- DropForeignKey
ALTER TABLE "RoomMessage" DROP CONSTRAINT "RoomMessage_userTwoId_fkey";

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "isPaymentOnline" BOOLEAN;

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "RoomMessage";
