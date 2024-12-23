/*
  Warnings:

  - You are about to drop the column `comment` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userFdId` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `description` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostelAddress` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostelName` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userFdId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "comment",
DROP COLUMN "userFdId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hostelAddress" TEXT NOT NULL,
ADD COLUMN     "hostelName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 4;
