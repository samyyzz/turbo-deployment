-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "dsa" TEXT NOT NULL,
    "liveProjects" TEXT[],
    "openSource" TEXT[],

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_github_key" ON "Card"("github");

-- CreateIndex
CREATE UNIQUE INDEX "Card_twitter_key" ON "Card"("twitter");

-- CreateIndex
CREATE UNIQUE INDEX "Card_linkedIn_key" ON "Card"("linkedIn");

-- CreateIndex
CREATE UNIQUE INDEX "Card_dsa_key" ON "Card"("dsa");

-- CreateIndex
CREATE UNIQUE INDEX "Card_liveProjects_key" ON "Card"("liveProjects");

-- CreateIndex
CREATE UNIQUE INDEX "Card_openSource_key" ON "Card"("openSource");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
