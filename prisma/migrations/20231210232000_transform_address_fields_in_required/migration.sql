/*
  Warnings:

  - Made the column `addressLabel` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addressLat` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addressLng` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "addressLabel" SET NOT NULL,
ALTER COLUMN "addressLat" SET NOT NULL,
ALTER COLUMN "addressLng" SET NOT NULL;
