/*
  Warnings:

  - A unique constraint covering the columns `[experience_id]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "image_experience_id_key" ON "image"("experience_id");
