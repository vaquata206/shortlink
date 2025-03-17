/*
  Warnings:

  - Added the required column `createAt` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shortLink" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_Link" ("id", "link", "shortLink") SELECT "id", "link", "shortLink" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_shortLink_key" ON "Link"("shortLink");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
