-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '123';

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
