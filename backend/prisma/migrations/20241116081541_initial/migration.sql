-- CreateTable
CREATE TABLE "objects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(42) NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "objects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objects_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(42) NOT NULL,

    CONSTRAINT "objects_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "well" (
    "well" INTEGER NOT NULL,
    "ngdu" INTEGER NOT NULL,
    "cdng" INTEGER NOT NULL,
    "kust" INTEGER NOT NULL,
    "mest" INTEGER NOT NULL,

    CONSTRAINT "well_pkey" PRIMARY KEY ("well")
);

-- CreateTable
CREATE TABLE "well_day_histories" (
    "date_fact" TIMESTAMP(3) NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "ee_consume" DOUBLE PRECISION NOT NULL,
    "expences" DOUBLE PRECISION NOT NULL,
    "pump_operating" DOUBLE PRECISION NOT NULL,
    "well" INTEGER NOT NULL,

    CONSTRAINT "well_day_histories_pkey" PRIMARY KEY ("well","date_fact")
);

-- CreateTable
CREATE TABLE "well_day_plans" (
    "well" INTEGER NOT NULL,
    "date_fact" TIMESTAMP(3) NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL,
    "ee_consume" DOUBLE PRECISION NOT NULL,
    "expences" DOUBLE PRECISION NOT NULL,
    "pump_operating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "well_day_plans_pkey" PRIMARY KEY ("well","date_fact")
);

-- AddForeignKey
ALTER TABLE "objects" ADD CONSTRAINT "objects_type_fkey" FOREIGN KEY ("type") REFERENCES "objects_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_well_fkey" FOREIGN KEY ("well") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_ngdu_fkey" FOREIGN KEY ("ngdu") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_cdng_fkey" FOREIGN KEY ("cdng") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_kust_fkey" FOREIGN KEY ("kust") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well" ADD CONSTRAINT "well_mest_fkey" FOREIGN KEY ("mest") REFERENCES "objects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well_day_histories" ADD CONSTRAINT "well_day_histories_well_fkey" FOREIGN KEY ("well") REFERENCES "well"("well") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "well_day_plans" ADD CONSTRAINT "well_day_plans_well_fkey" FOREIGN KEY ("well") REFERENCES "well"("well") ON DELETE RESTRICT ON UPDATE CASCADE;
