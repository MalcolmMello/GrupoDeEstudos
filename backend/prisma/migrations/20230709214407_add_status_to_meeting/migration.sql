/*
  Warnings:

  - Added the required column `status` to the `Reuniao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reuniao` ADD COLUMN `status` VARCHAR(100) NOT NULL;
