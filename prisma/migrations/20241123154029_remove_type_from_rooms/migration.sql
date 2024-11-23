-- Step 1: Remove the dependency by dropping the column using the enum type
BEGIN;
ALTER TABLE "RoomType" DROP COLUMN "type";
COMMIT;

-- Step 2: Safely replace the enum type
BEGIN;
CREATE TYPE "RoomTypes_new" AS ENUM (
  'SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_BED', 'FIVE_BED', 
  'SIX_BED', 'SEVEN_BED', 'EIGHT_BED', 'NINE_BEDa', 'TEN_BED'
);
ALTER TYPE "RoomTypes" RENAME TO "RoomTypes_old";
ALTER TYPE "RoomTypes_new" RENAME TO "RoomTypes";
DROP TYPE "RoomTypes_old";
COMMIT;
