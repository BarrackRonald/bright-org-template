/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `ImpactStat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `program` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `ImpactStat_label_key` ON `ImpactStat`(`label`);
