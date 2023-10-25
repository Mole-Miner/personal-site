/*
  Warnings:

  - You are about to drop the `image_experience_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "image_experience_relation" DROP CONSTRAINT "image_experience_relation_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "image_experience_relation" DROP CONSTRAINT "image_experience_relation_image_id_fkey";

-- DropTable
DROP TABLE "image_experience_relation";

-- CreateTable
CREATE TABLE "mobile_image" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "image_id" UUID NOT NULL,
    "experience_image_map_id" UUID NOT NULL,

    CONSTRAINT "mobile_image_pkey" PRIMARY KEY ("experience_image_map_id","image_id")
);

-- CreateTable
CREATE TABLE "tablet_image" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "image_id" UUID NOT NULL,
    "experience_image_map_id" UUID NOT NULL,

    CONSTRAINT "tablet_image_pkey" PRIMARY KEY ("experience_image_map_id","image_id")
);

-- CreateTable
CREATE TABLE "laptop_image" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "image_id" UUID NOT NULL,
    "experience_image_map_id" UUID NOT NULL,

    CONSTRAINT "laptop_image_pkey" PRIMARY KEY ("experience_image_map_id","image_id")
);

-- CreateTable
CREATE TABLE "experience_image_map" (
    "id" UUID NOT NULL,
    "side" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "experience_id" UUID NOT NULL,

    CONSTRAINT "experience_image_map_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "experience_image_map_experience_id_key" ON "experience_image_map"("experience_id");

-- AddForeignKey
ALTER TABLE "mobile_image" ADD CONSTRAINT "mobile_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mobile_image" ADD CONSTRAINT "mobile_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image_map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablet_image" ADD CONSTRAINT "tablet_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablet_image" ADD CONSTRAINT "tablet_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image_map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laptop_image" ADD CONSTRAINT "laptop_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laptop_image" ADD CONSTRAINT "laptop_image_experience_image_map_id_fkey" FOREIGN KEY ("experience_image_map_id") REFERENCES "experience_image_map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_image_map" ADD CONSTRAINT "experience_image_map_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
