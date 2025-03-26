-- CreateTable
CREATE TABLE "cloud" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "image" TEXT,
    "allocatedStorage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cloud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SharedWith" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SharedWith_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SharedWith_B_index" ON "_SharedWith"("B");

-- AddForeignKey
ALTER TABLE "cloud" ADD CONSTRAINT "cloud_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedWith" ADD CONSTRAINT "_SharedWith_A_fkey" FOREIGN KEY ("A") REFERENCES "cloud"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedWith" ADD CONSTRAINT "_SharedWith_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
