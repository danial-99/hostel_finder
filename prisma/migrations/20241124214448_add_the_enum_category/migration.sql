/*
  Warnings:

  - The values [FIVE_BED,SIX_BED,SEVEN_BED,EIGHT_BED,NINE_BEDa,TEN_BED] on the enum `RoomTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('STUDENT', 'PROFESSIONAL', 'FAMILY', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "RoomTypes_new" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_BED');
ALTER TYPE "RoomTypes" RENAME TO "RoomTypes_old";
ALTER TYPE "RoomTypes_new" RENAME TO "RoomTypes";
DROP TYPE "RoomTypes_old";
COMMIT;

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'STUDENT';
