-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "PreferenceStatus" AS ENUM ('PREFERRED', 'AVOIDED');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('QUICK_FACT', 'MINI_EXPLANATION', 'ANALOGY', 'ACTIVE_RECALL', 'MINI_QUIZ', 'MNEMONIC', 'DID_YOU_KNOW', 'EXPLAIN_BACK', 'MISCONCEPTION', 'ONE_EXAMPLE');

-- CreateEnum
CREATE TYPE "InteractionKind" AS ENUM ('LEARNING', 'ACTIVITY');

-- CreateEnum
CREATE TYPE "Feedback" AS ENUM ('KNEW_THIS', 'NOT_RELEVANT', 'INTERESTING', 'SHOW_ANOTHER', 'TOO_EASY', 'TOO_HARD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "status" "PreferenceStatus" NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publisher" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "cardType" "CardType" NOT NULL,
    "content" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "prompt" TEXT,
    "answer" TEXT,
    "answerOptions" JSONB,
    "mnemonic" TEXT,
    "analogy" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningItemSource" (
    "learningItemId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "LearningItemSource_pkey" PRIMARY KEY ("learningItemId","sourceId")
);

-- CreateTable
CREATE TABLE "ActivityItem" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "homeVersion" TEXT NOT NULL,
    "officeVersion" TEXT NOT NULL,
    "remoteVersion" TEXT,
    "why" TEXT NOT NULL,
    "safetyNote" TEXT NOT NULL,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItemInteraction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "InteractionKind" NOT NULL,
    "learningItemId" TEXT,
    "activityItemId" TEXT,
    "shownAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback" "Feedback",
    "quizAnswer" TEXT,
    "quizCorrect" BOOLEAN,
    "batchNumber" INTEGER NOT NULL,

    CONSTRAINT "UserItemInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recap" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "batchNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "itemIds" JSONB NOT NULL,
    "activityIds" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_categoryId_key" ON "UserPreference"("userId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");

-- CreateIndex
CREATE UNIQUE INDEX "LearningItem_slug_key" ON "LearningItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityItem_slug_key" ON "ActivityItem"("slug");

-- CreateIndex
CREATE INDEX "UserItemInteraction_userId_batchNumber_idx" ON "UserItemInteraction"("userId", "batchNumber");

-- CreateIndex
CREATE INDEX "UserItemInteraction_learningItemId_idx" ON "UserItemInteraction"("learningItemId");

-- CreateIndex
CREATE INDEX "UserItemInteraction_activityItemId_idx" ON "UserItemInteraction"("activityItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Recap_userId_batchNumber_key" ON "Recap"("userId", "batchNumber");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningItem" ADD CONSTRAINT "LearningItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningItemSource" ADD CONSTRAINT "LearningItemSource_learningItemId_fkey" FOREIGN KEY ("learningItemId") REFERENCES "LearningItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningItemSource" ADD CONSTRAINT "LearningItemSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItemInteraction" ADD CONSTRAINT "UserItemInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItemInteraction" ADD CONSTRAINT "UserItemInteraction_learningItemId_fkey" FOREIGN KEY ("learningItemId") REFERENCES "LearningItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItemInteraction" ADD CONSTRAINT "UserItemInteraction_activityItemId_fkey" FOREIGN KEY ("activityItemId") REFERENCES "ActivityItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recap" ADD CONSTRAINT "Recap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
