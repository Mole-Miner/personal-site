/*
  Warnings:

  - You are about to drop the `experience_image_map` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "experience_image_map" DROP CONSTRAINT "experience_image_map_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "laptop_image" DROP CONSTRAINT "laptop_image_experience_image_map_id_fkey";

-- DropForeignKey
ALTER TABLE "mobile_image" DROP CONSTRAINT "mobile_image_experience_image_map_id_fkey";

-- DropForeignKey
ALTER TABLE "tablet_image" DROP CONSTRAINT "tablet_image_experience_image_map_id_fkey";

-- DropTable
DROP TABLE "experience_image_map";

-- CreateTable
CREATE TABLE "experience_image" (
    "id" UUID NOT NULL,
    "side" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "experience_id" UUID NOT NULL,

    CONSTRAINT "experience_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mobile_image" ADD CONSTRAINT "mobile_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablet_image" ADD CONSTRAINT "tablet_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laptop_image" ADD CONSTRAINT "laptop_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_image" ADD CONSTRAINT "experience_image_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
