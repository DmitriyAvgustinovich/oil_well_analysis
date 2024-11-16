-- CreateEnum
CREATE TYPE "notification_type" AS ENUM ('plan_failure', 'potential_break_warning', 'report_ready');

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "type" "notification_type" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
