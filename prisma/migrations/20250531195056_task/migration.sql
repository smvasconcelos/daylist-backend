-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_noteId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "noteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
