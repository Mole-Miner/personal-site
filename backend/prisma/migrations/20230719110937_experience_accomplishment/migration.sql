-- CreateTable
CREATE TABLE "Accomplishment" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "experience_id" UUID NOT NULL,

    CONSTRAINT "Accomplishment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accomplishment" ADD CONSTRAINT "Accomplishment_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
