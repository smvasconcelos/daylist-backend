/*
  Warnings:

  - Made the column `startDate` on table `TaskOccurrence` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TaskOccurrence" ALTER COLUMN "startDate" SET NOT NULL;
