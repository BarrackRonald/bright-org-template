/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `program` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Partner_name_key` ON `Partner`(`name`);
