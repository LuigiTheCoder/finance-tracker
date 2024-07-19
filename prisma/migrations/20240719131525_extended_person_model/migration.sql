/*
  Warnings:

  - Added the required column `eMail` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "eMail" TEXT NOT NULL
);
INSERT INTO "new_Person" ("id") SELECT "id" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
