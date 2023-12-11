/*
  Warnings:

  - You are about to drop the column `notificaion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificaionLat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notificaionLng` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notificaion",
DROP COLUMN "notificaionLat",
DROP COLUMN "notificaionLng",
ADD COLUMN     "notification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationLat" DOUBLE PRECISION,
ADD COLUMN     "notificationLng" DOUBLE PRECISION;
