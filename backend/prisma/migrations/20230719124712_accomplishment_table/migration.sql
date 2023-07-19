/*
  Warnings:

  - You are about to drop the `Accomplishment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accomplishment" DROP CONSTRAINT "Accomplishment_experience_id_fkey";

-- DropTable
DROP TABLE "Accomplishment";

-- CreateTable
CREATE TABLE "accomplishment" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "experience_id" UUID NOT NULL,

    CONSTRAINT "accomplishment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accomplishment" ADD CONSTRAINT "accomplishment_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
