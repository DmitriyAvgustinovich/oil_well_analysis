/*
  Warnings:

  - The primary key for the `well_day_histories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `well_day_plans` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "well_day_histories" DROP CONSTRAINT "well_day_histories_pkey",
ALTER COLUMN "date_fact" SET DATA TYPE DATE,
ADD CONSTRAINT "well_day_histories_pkey" PRIMARY KEY ("well", "date_fact");

-- AlterTable
ALTER TABLE "well_day_plans" DROP CONSTRAINT "well_day_plans_pkey",
ALTER COLUMN "date_fact" SET DATA TYPE DATE,
ADD CONSTRAINT "well_day_plans_pkey" PRIMARY KEY ("well", "date_fact");
