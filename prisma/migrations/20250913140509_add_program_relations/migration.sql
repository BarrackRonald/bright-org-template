/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `GalleryItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `program` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Event_title_key` ON `Event`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `GalleryItem_title_key` ON `GalleryItem`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `TeamMember_name_key` ON `TeamMember`(`name`);
