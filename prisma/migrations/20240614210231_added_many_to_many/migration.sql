/*
  Warnings:

  - You are about to drop the column `commonIssueId` on the `DesktopSupport` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `DesktopSupport` table. All the data in the column will be lost.
  - You are about to drop the column `softwareId` on the `DesktopSupport` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Software` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommonIssue" DROP CONSTRAINT "CommonIssue_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "DesktopSupport" DROP CONSTRAINT "DesktopSupport_commonIssueId_fkey";

-- DropForeignKey
ALTER TABLE "DesktopSupport" DROP CONSTRAINT "DesktopSupport_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "DesktopSupport" DROP CONSTRAINT "DesktopSupport_softwareId_fkey";

-- DropForeignKey
ALTER TABLE "Software" DROP CONSTRAINT "Software_departmentId_fkey";

-- AlterTable
ALTER TABLE "DesktopSupport" DROP COLUMN "commonIssueId",
DROP COLUMN "departmentId",
DROP COLUMN "softwareId";

-- AlterTable
ALTER TABLE "Software" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_DepartmentToDesktopSupport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_software-department" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_DesktopSupportToSoftware" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_issues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_departmentIssues" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepartmentToDesktopSupport_AB_unique" ON "_DepartmentToDesktopSupport"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartmentToDesktopSupport_B_index" ON "_DepartmentToDesktopSupport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_software-department_AB_unique" ON "_software-department"("A", "B");

-- CreateIndex
CREATE INDEX "_software-department_B_index" ON "_software-department"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DesktopSupportToSoftware_AB_unique" ON "_DesktopSupportToSoftware"("A", "B");

-- CreateIndex
CREATE INDEX "_DesktopSupportToSoftware_B_index" ON "_DesktopSupportToSoftware"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_issues_AB_unique" ON "_issues"("A", "B");

-- CreateIndex
CREATE INDEX "_issues_B_index" ON "_issues"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_departmentIssues_AB_unique" ON "_departmentIssues"("A", "B");

-- CreateIndex
CREATE INDEX "_departmentIssues_B_index" ON "_departmentIssues"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentToDesktopSupport" ADD CONSTRAINT "_DepartmentToDesktopSupport_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentToDesktopSupport" ADD CONSTRAINT "_DepartmentToDesktopSupport_B_fkey" FOREIGN KEY ("B") REFERENCES "DesktopSupport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_software-department" ADD CONSTRAINT "_software-department_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_software-department" ADD CONSTRAINT "_software-department_B_fkey" FOREIGN KEY ("B") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesktopSupportToSoftware" ADD CONSTRAINT "_DesktopSupportToSoftware_A_fkey" FOREIGN KEY ("A") REFERENCES "DesktopSupport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DesktopSupportToSoftware" ADD CONSTRAINT "_DesktopSupportToSoftware_B_fkey" FOREIGN KEY ("B") REFERENCES "Software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_issues" ADD CONSTRAINT "_issues_A_fkey" FOREIGN KEY ("A") REFERENCES "CommonIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_issues" ADD CONSTRAINT "_issues_B_fkey" FOREIGN KEY ("B") REFERENCES "DesktopSupport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_departmentIssues" ADD CONSTRAINT "_departmentIssues_A_fkey" FOREIGN KEY ("A") REFERENCES "CommonIssue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_departmentIssues" ADD CONSTRAINT "_departmentIssues_B_fkey" FOREIGN KEY ("B") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
