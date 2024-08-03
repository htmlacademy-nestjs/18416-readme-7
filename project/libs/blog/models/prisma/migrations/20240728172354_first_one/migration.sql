-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('text', 'video', 'quote', 'link', 'photo');

-- CreateEnum
CREATE TYPE "PostStatusType" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "originalPublicationId" TEXT,
    "name" TEXT,
    "videoLink" TEXT,
    "user_id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicationStatus" "PostStatusType" NOT NULL,
    "isPublicationReposted" BOOLEAN NOT NULL DEFAULT false,
    "publicationRepostNumber" INTEGER NOT NULL,
    "postAnons" TEXT,
    "quoteText" TEXT,
    "quoteAuthor" TEXT,
    "photo" TEXT,
    "linkDescription" TEXT,
    "linkUrl" TEXT,
    "tags" TEXT[],

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_name_idx" ON "posts"("name");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
