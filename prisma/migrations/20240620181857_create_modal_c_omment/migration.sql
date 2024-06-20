-- CreateTable
CREATE TABLE "CommentImgae" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT,
    "commentId" INTEGER,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),

    CONSTRAINT "CommentImgae_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentImgae" ADD CONSTRAINT "CommentImgae_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
