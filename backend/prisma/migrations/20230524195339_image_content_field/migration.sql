/*
  Warnings:

  - You are about to drop the column `data` on the `image` table. All the data in the column will be lost.
  - Added the required column `content` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" DROP COLUMN "data",
ADD COLUMN     "content" BYTEA NOT NULL;
