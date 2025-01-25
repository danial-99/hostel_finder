/*
  Warnings:

  - You are about to alter the column `discount` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "discount" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
