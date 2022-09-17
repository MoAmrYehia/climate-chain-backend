/*
  Warnings:

  - Added the required column `topicId` to the `TopicInstance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TopicInstance" ADD COLUMN     "topicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TopicInstance" ADD CONSTRAINT "TopicInstance_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
