/*
  Warnings:

  - You are about to drop the column `extension` on the `Department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "extension";

-- CreateTable
CREATE TABLE "Extension" (
    "id" SERIAL NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "departmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Extension_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extension" ADD CONSTRAINT "Extension_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
