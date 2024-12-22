/*
  Warnings:

  - You are about to drop the column `userId` on the `BookingRequests` table. All the data in the column will be lost.
  - Added the required column `userBkId` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Made the column `promoted` on table `Hostel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `available` on table `RoomType` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookingRequests" DROP CONSTRAINT "BookingRequests_userId_fkey";

-- AlterTable
ALTER TABLE "BookingRequests" DROP COLUMN "userId",
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "checkOutDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userBkId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hostel" ALTER COLUMN "promoted" SET NOT NULL;

-- AlterTable
ALTER TABLE "RoomType" ALTER COLUMN "available" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BookingRequests" ADD CONSTRAINT "BookingRequests_userBkId_fkey" FOREIGN KEY ("userBkId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
