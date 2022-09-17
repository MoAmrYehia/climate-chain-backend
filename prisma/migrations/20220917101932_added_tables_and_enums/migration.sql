/*
  Warnings:

  - You are about to drop the `Tree` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Cantons" AS ENUM ('baselStadt', 'baselLandschaft', 'zug', 'geneve', 'zurich', 'neuchatel', 'schaffhausen', 'ticino', 'bern', 'sanktGallen', 'vaud', 'nidwalden', 'graubuenden', 'lucerne', 'jura', 'glarus', 'solothurn', 'obwalden', 'aargau', 'appenzellInnerrhoden', 'thurgau', 'schwyz', 'fribourg', 'appenzellAusserrhoden', 'valais', 'uri');

-- CreateEnum
CREATE TYPE "Years" AS ENUM ('year2020', 'year2030', 'year2040', 'year2050', 'year2060', 'year2070', 'year2080');

-- DropTable
DROP TABLE "Tree";

-- DropEnum
DROP TYPE "TreeKind";

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(26) NOT NULL,
    "subTitle" VARCHAR(52),
    "contextImageUrl" TEXT NOT NULL,
    "graphImageUrl" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "affectedCantons" "Cantons"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicInstance" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(26) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "difference" INTEGER NOT NULL,
    "year" "Years" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_title_key" ON "Topic"("title");

-- CreateIndex
CREATE UNIQUE INDEX "TopicInstance_title_key" ON "TopicInstance"("title");
