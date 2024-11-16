/*
  Warnings:

  - Added the required column `well_id` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "well_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_well_id_fkey" FOREIGN KEY ("well_id") REFERENCES "well"("well") ON DELETE RESTRICT ON UPDATE CASCADE;
