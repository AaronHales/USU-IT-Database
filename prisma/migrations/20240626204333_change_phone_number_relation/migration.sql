/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Extension` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Extension" DROP CONSTRAINT "Extension_departmentId_fkey";

-- AlterTable
ALTER TABLE "Extension" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_DepartmentToExtension" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToExtension_AB_unique" ON "_DepartmentToExtension"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToExtension_B_index" ON "_DepartmentToExtension"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentToExtension" ADD CONSTRAINT "_DepartmentToExtension_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToExtension" ADD CONSTRAINT "_DepartmentToExtension_B_fkey" FOREIGN KEY ("B") REFERENCES "Extension"("id") ON DELETE CASCADE ON UPDATE CASCADE;
