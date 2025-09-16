-- AlterTable
ALTER TABLE `about` ADD COLUMN `ctaMessage` VARCHAR(191) NULL,
    ADD COLUMN `ctaTitle` VARCHAR(191) NULL,
    ADD COLUMN `quoteAuthor` VARCHAR(191) NULL,
    ADD COLUMN `quoteText` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `program` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `updatedAt` DROP DEFAULT;
