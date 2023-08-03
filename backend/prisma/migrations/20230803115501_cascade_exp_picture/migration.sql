-- DropForeignKey
ALTER TABLE "accomplishment" DROP CONSTRAINT "accomplishment_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "experience_picture" DROP CONSTRAINT "experience_picture_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "experience_picture_on_image" DROP CONSTRAINT "experience_picture_on_image_experience_picture_id_fkey";

-- DropForeignKey
ALTER TABLE "experience_picture_on_image" DROP CONSTRAINT "experience_picture_on_image_image_id_fkey";

-- AddForeignKey
ALTER TABLE "accomplishment" ADD CONSTRAINT "accomplishment_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_picture" ADD CONSTRAINT "experience_picture_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_picture_on_image" ADD CONSTRAINT "experience_picture_on_image_experience_picture_id_fkey" FOREIGN KEY ("experience_picture_id") REFERENCES "experience_picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience_picture_on_image" ADD CONSTRAINT "experience_picture_on_image_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
