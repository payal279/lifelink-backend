/*
  Warnings:

  - You are about to drop the column `bloodType` on the `Donor` table. All the data in the column will be lost.
  - Added the required column `age` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodGroup` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Donor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "bloodType",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BloodRequest" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "requiredBloodGroup" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BloodRequest_pkey" PRIMARY KEY ("id")
);
