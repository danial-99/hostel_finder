/*
  Warnings:

  - The values [BOYS,GIRLS] on the enum `HostelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HostelType_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "Hostel" ALTER COLUMN "type" TYPE "HostelType_new" USING ("type"::text::"HostelType_new");
ALTER TYPE "HostelType" RENAME TO "HostelType_old";
ALTER TYPE "HostelType_new" RENAME TO "HostelType";
DROP TYPE "HostelType_old";
COMMIT;
