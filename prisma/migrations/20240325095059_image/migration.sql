/*
  Warnings:

  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `content` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "title",
ADD COLUMN     "image" JSONB,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "content" SET DATA TYPE VARCHAR(250);
