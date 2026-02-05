/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `attitude` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `execution` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `expression` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `habit` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `selfControl` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Checkin` table. All the data in the column will be lost.
  - You are about to drop the column `attitude` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `execution` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `expression` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `habit` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `questsCompleted` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `relationship` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `selfControl` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `sessionsAttended` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `StatSnapshot` table. All the data in the column will be lost.
  - You are about to drop the column `totalXp` on the `StatSnapshot` table. All the data in the column will be lost.
  - Added the required column `worldKey` to the `StatSnapshot` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Session";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "World" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colorHex" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "worldId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "avatarSeed" TEXT NOT NULL,
    CONSTRAINT "Coach_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LessonNode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "worldId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "xpReward" INTEGER NOT NULL DEFAULT 20,
    CONSTRAINT "LessonNode_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "worldId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "optionsJson" TEXT,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Question_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Question_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LessonSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "lessonNodeId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'in_progress',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "LessonSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LessonSession_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LessonSession_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LessonSession_lessonNodeId_fkey" FOREIGN KEY ("lessonNodeId") REFERENCES "LessonNode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rawText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Answer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LessonSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Answer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RewardEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "metaJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RewardEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "worldKey" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "worldId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "evidence" TEXT,
    "keywords" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReportEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReportEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LessonSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReportEntry_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Checkin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "mood" INTEGER NOT NULL DEFAULT 3,
    "energy" INTEGER NOT NULL DEFAULT 3,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Checkin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Checkin" ("createdAt", "energy", "id", "mood", "note", "userId") SELECT "createdAt", "energy", "id", "mood", "note", "userId" FROM "Checkin";
DROP TABLE "Checkin";
ALTER TABLE "new_Checkin" RENAME TO "Checkin";
CREATE TABLE "new_StatSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "worldId" TEXT,
    "worldKey" TEXT NOT NULL,
    "level0to4" REAL NOT NULL DEFAULT 0,
    "confidence0to1" REAL NOT NULL DEFAULT 0,
    "evidenceSnippet" TEXT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StatSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StatSnapshot_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "World" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_StatSnapshot" ("id", "userId") SELECT "id", "userId" FROM "StatSnapshot";
DROP TABLE "StatSnapshot";
ALTER TABLE "new_StatSnapshot" RENAME TO "StatSnapshot";
CREATE UNIQUE INDEX "StatSnapshot_userId_worldKey_key" ON "StatSnapshot"("userId", "worldKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "World_key_key" ON "World"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_worldId_key" ON "Coach"("worldId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonNode_worldId_order_key" ON "LessonNode"("worldId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ReportEntry_sessionId_key" ON "ReportEntry"("sessionId");
