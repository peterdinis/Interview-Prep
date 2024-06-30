/*
  Warnings:

  - You are about to drop the column `description` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `expirience` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `jsonMockResponse` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `jsonPosition` on the `Interview` table. All the data in the column will be lost.
  - Added the required column `jobDesc` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobExperience` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobPosition` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mockInterview` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "description",
DROP COLUMN "expirience",
DROP COLUMN "jsonMockResponse",
DROP COLUMN "jsonPosition",
ADD COLUMN     "jobDesc" TEXT NOT NULL,
ADD COLUMN     "jobExperience" TEXT NOT NULL,
ADD COLUMN     "jobPosition" TEXT NOT NULL,
ADD COLUMN     "mockInterview" TEXT NOT NULL;
