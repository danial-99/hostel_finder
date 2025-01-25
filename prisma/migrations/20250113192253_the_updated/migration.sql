/*
  Warnings:

  - Added the required column `message` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "message" TEXT NOT NULL;
