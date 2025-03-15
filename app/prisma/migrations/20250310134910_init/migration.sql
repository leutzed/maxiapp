-- CreateTable
CREATE TABLE "athletes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "athleteId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nationId" INTEGER NOT NULL,
    "owner" INTEGER NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "fans" INTEGER NOT NULL,
    "maxid" TEXT NOT NULL,
    "form" INTEGER NOT NULL,
    "care" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "mood" INTEGER NOT NULL,
    "specialtyId" INTEGER NOT NULL,
    "favoriteEventId" INTEGER NOT NULL,
    "strenght" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "agility" INTEGER NOT NULL,
    "jump" INTEGER NOT NULL,
    "throw" INTEGER NOT NULL,
    "specialty1" INTEGER NOT NULL,
    "specialty2" INTEGER NOT NULL,
    "youth" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AthleteHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "athleteId" INTEGER NOT NULL,
    "attribute" TEXT NOT NULL,
    "oldValue" TEXT NOT NULL,
    "newValue" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "season" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    CONSTRAINT "AthleteHistory_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes" ("athleteId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "athletes_athleteId_key" ON "athletes"("athleteId");
