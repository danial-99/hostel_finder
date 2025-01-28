/*
  Warnings:

  - Added the required column `address` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnic` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `BookingRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingRequests" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cnic" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
