-- CreateTable
CREATE TABLE "TempUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "TempUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "TempPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempUser_email_key" ON "TempUser"("email");

-- AddForeignKey
ALTER TABLE "TempPost" ADD CONSTRAINT "TempPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "TempUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
