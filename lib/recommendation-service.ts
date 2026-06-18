import { InteractionKind } from "@prisma/client";
import { prisma } from "@/lib/db";
import { selectRecommendation } from "@/lib/recommendation";

export async function getCurrentBatchNumber(userId: string) {
  const recapCount = await prisma.recap.count({
    where: { userId }
  });
  return recapCount + 1;
}

export async function getCurrentBatchCount(userId: string) {
  const batchNumber = await getCurrentBatchNumber(userId);
  return prisma.userItemInteraction.count({
    where: {
      userId,
      batchNumber
    }
  });
}

export async function createRecommendedInteraction(userId: string) {
  const [preferences, learningItems, activityItems, interactions] = await Promise.all([
    prisma.userPreference.findMany({
      where: { userId },
      include: { category: true }
    }),
    prisma.learningItem.findMany({
      where: { approved: true },
      include: { category: true }
    }),
    prisma.activityItem.findMany(),
    prisma.userItemInteraction.findMany({
      where: { userId },
      include: {
        learningItem: {
          include: {
            category: true
          }
        }
      },
      orderBy: { shownAt: "asc" },
      take: 100
    })
  ]);

  const recommendation = selectRecommendation({
    preferredCategorySlugs: preferences
      .filter((preference) => preference.status === "PREFERRED")
      .map((preference) => preference.category.slug),
    avoidedCategorySlugs: preferences
      .filter((preference) => preference.status === "AVOIDED")
      .map((preference) => preference.category.slug),
    learningItems: learningItems.map((item) => ({
      id: item.id,
      slug: item.slug,
      categorySlug: item.category.slug,
      cardType: item.cardType,
      approved: item.approved
    })),
    activityItems: activityItems.map((item) => ({
      id: item.id,
      slug: item.slug
    })),
    interactions: interactions.map((interaction) => ({
      kind: interaction.kind,
      learningItemId: interaction.learningItemId,
      activityItemId: interaction.activityItemId,
      categorySlug: interaction.learningItem?.category.slug,
      cardType: interaction.learningItem?.cardType,
      feedback: interaction.feedback,
      quizCorrect: interaction.quizCorrect,
      shownAt: interaction.shownAt
    }))
  });

  const batchNumber = await getCurrentBatchNumber(userId);
  return prisma.userItemInteraction.create({
    data:
      recommendation.kind === "ACTIVITY"
        ? {
            userId,
            kind: InteractionKind.ACTIVITY,
            activityItemId: recommendation.item.id,
            batchNumber
          }
        : {
            userId,
            kind: InteractionKind.LEARNING,
            learningItemId: recommendation.item.id,
            batchNumber
          }
  });
}
