/*
  Warnings:

  - You are about to drop the column `experience_id` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_experience_id_fkey";

-- DropIndex
DROP INDEX "image_experience_id_key";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "experience_id";

-- CreateTable
CREATE TABLE "image_experience_relation" (
    "experience_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,

    CONSTRAINT "image_experience_relation_pkey" PRIMARY KEY ("experience_id","image_id")
);

-- AddForeignKey
ALTER TABLE "image_experience_relation" ADD CONSTRAINT "image_experience_relation_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_experience_relation" ADD CONSTRAINT "image_experience_relation_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
