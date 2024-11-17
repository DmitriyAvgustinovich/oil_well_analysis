/*
  Warnings:

  - The primary key for the `well_day_plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date_fact` on the `well_day_plans` table. All the data in the column will be lost.
  - Added the required column `date_plan` to the `well_day_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "well_day_plans" DROP CONSTRAINT "well_day_plans_pkey",
DROP COLUMN "date_fact",
ADD COLUMN     "date_plan" DATE NOT NULL,
ADD CONSTRAINT "well_day_plans_pkey" PRIMARY KEY ("well", "date_plan");
