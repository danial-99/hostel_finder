/*
  Warnings:

  - You are about to drop the column `beds` on the `RoomType` table. All the data in the column will be lost.
  - You are about to drop the column `roomImages` on the `RoomType` table. All the data in the column will be lost.
  - Added the required column `address` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `Hostel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedCount` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfRooms` to the `RoomType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "electercityBill" BYTEA,
ADD COLUMN     "gasBill" BYTEA,
ADD COLUMN     "latitude" INTEGER NOT NULL,
ADD COLUMN     "longitude" INTEGER NOT NULL,
ADD COLUMN     "ownerName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomType" DROP COLUMN "beds",
DROP COLUMN "roomImages",
ADD COLUMN     "bedCount" INTEGER NOT NULL,
ADD COLUMN     "image" BYTEA,
ADD COLUMN     "numberOfRooms" INTEGER NOT NULL;
