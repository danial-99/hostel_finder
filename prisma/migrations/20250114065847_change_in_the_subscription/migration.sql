/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Plan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_planId_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
