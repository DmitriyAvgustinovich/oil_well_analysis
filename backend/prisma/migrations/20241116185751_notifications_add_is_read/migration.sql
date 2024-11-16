/*
  Warnings:

  - Added the required column `is_read` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "is_read" BOOLEAN NOT NULL;
