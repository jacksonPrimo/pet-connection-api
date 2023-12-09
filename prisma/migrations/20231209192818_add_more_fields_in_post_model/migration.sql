/*
  Warnings:

  - Added the required column `gender` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `race` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situation` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "addressLabel" TEXT,
ADD COLUMN     "addressLat" DOUBLE PRECISION,
ADD COLUMN     "addressLng" DOUBLE PRECISION,
ADD COLUMN     "chip" TEXT,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "race" TEXT NOT NULL,
ADD COLUMN     "reward" DOUBLE PRECISION,
ADD COLUMN     "situation" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
