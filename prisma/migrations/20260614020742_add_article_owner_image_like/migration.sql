/*
  Warnings:

  - Added the required column `owner_id` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "image" TEXT,
ADD COLUMN     "like_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "owner_id" INTEGER NOT NULL;
