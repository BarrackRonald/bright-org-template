-- AlterTable
ALTER TABLE `program` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `coordinatorId` INTEGER NULL,
    ADD COLUMN `donationLink` VARCHAR(191) NULL,
    ADD COLUMN `galleryUrls` JSON NULL,
    ADD COLUMN `signupLink` VARCHAR(191) NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_coordinatorId_fkey` FOREIGN KEY (`coordinatorId`) REFERENCES `TeamMember`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
