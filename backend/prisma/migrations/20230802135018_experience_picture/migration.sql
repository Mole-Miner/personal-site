/*
  Warnings:

  - You are about to drop the `experience_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laptop_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mobile_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tablet_image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "experience_image" DROP CONSTRAINT "experience_image_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "laptop_image" DROP CONSTRAINT "laptop_image_experience_image_map_id_fkey";

-- DropForeignKey
ALTER TABLE "laptop_image" DROP CONSTRAINT "laptop_image_image_id_fkey";

-- DropForeignKey
ALTER TABLE "mobile_image" DROP CONSTRAINT "mobile_image_experience_image_map_id_fkey";

-- DropForeignKey
ALTER TABLE "mobile_image" DROP CONSTRAINT "mobile_image_image_id_fkey";

-- DropForeignKey
ALTER TABLE "tablet_image" DROP CONSTRAINT "tablet_image_experience_image_map_id_fkey";

-- DropForeignKey
ALTER TABLE "tablet_image" DROP CONSTRAINT "tablet_image_image_id_fkey";

-- DropTable
DROP TABLE "experience_image";

-- DropTable
DROP TABLE "laptop_image";

-- DropTable
DROP TABLE "mobile_image";

-- DropTable
DROP TABLE "tablet_image";

-- CreateTable
CREATE TABLE "experience_picture" (
    "id" UUID NOT NULL,
    "side" TEXT NOT NULL,
    "screen" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "experience_id" UUID NOT NULL,

    CONSTRAINT "experience_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience_picture_on_image" (
    "experience_picture_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,

    CONSTRAINT "experience_picture_on_image_pkey" PRIMARY KEY ("experience_picture_id","image_id")
);

-- AddForeignKey
ALTER TABLE "experience_picture" ADD CONSTRAINT "experience_picture_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_picture_on_image" ADD CONSTRAINT "experience_picture_on_image_experience_picture_id_fkey" FOREIGN KEY ("experience_picture_id") REFERENCES "experience_picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_picture_on_image" ADD CONSTRAINT "experience_picture_on_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
