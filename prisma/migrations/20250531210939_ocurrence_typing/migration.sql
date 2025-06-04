/*
  Warnings:

  - Added the required column `recurrenceType` to the `TaskOccurrence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TaskOccurrence" ADD COLUMN     "dayOfWeek" "DayOfWeek",
ADD COLUMN     "recurrenceType" "Recurrence" NOT NULL,
ADD COLUMN     "timeOfDay" TEXT;
