-- AlterTable
ALTER TABLE `sitesettings` ADD COLUMN `heroVideoUrl` VARCHAR(191) NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;
