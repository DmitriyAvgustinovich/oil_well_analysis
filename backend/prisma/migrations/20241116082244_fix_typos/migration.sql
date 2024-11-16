/*
  Warnings:

  - You are about to drop the column `expences` on the `well_day_histories` table. All the data in the column will be lost.
  - You are about to drop the column `expences` on the `well_day_plans` table. All the data in the column will be lost.
  - Added the required column `expenses` to the `well_day_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenses` to the `well_day_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "well_day_histories" DROP COLUMN "expences",
ADD COLUMN     "expenses" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "well_day_plans" DROP COLUMN "expences",
ADD COLUMN     "expenses" DOUBLE PRECISION NOT NULL;
