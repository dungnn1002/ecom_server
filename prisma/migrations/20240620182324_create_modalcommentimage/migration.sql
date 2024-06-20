/*
  Warnings:

  - You are about to drop the `CommentImgae` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentImgae" DROP CONSTRAINT "CommentImgae_commentId_fkey";

-- DropTable
DROP TABLE "CommentImgae";

-- CreateTable
CREATE TABLE "CommentImage" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT,
    "commentId" INTEGER,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "CommentImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentImage" ADD CONSTRAINT "CommentImage_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
