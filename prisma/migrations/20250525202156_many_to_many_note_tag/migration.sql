/*
  Warnings:

  - You are about to drop the column `noteId` on the `Tag` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "NoteTag" (
    "noteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("noteId", "tagId"),
    CONSTRAINT "NoteTag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "NoteTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("color", "createdAt", "id", "title", "userId") SELECT "color", "createdAt", "id", "title", "userId" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
