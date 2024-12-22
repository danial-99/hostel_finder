/*
  Warnings:

  - Added the required column `hostelBkId` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingRequests" ADD COLUMN     "hostelBkId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hostel" ADD COLUMN     "promoted" BOOLEAN DEFAULT false,
ADD COLUMN     "subcriptionEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RoomType" ADD COLUMN     "available" BOOLEAN DEFAULT true;

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userFdId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userRtId" TEXT NOT NULL,
    "hostelRtId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingRequests" ADD CONSTRAINT "BookingRequests_hostelBkId_fkey" FOREIGN KEY ("hostelBkId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRequests" ADD CONSTRAINT "BookingRequests_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "RoomType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userFdId_fkey" FOREIGN KEY ("userFdId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userRtId_fkey" FOREIGN KEY ("userRtId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_hostelRtId_fkey" FOREIGN KEY ("hostelRtId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
