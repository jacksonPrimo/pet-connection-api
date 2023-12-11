-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificaion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificaionLat" DOUBLE PRECISION,
ADD COLUMN     "notificaionLng" DOUBLE PRECISION,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profileImage" TEXT,
ALTER COLUMN "encryptPassword" DROP NOT NULL;
