import { prisma } from "@/lib/db";
import { getCurrentBatchNumber } from "@/lib/recommendation-service";

function makeQuestion(title: string, prompt?: string | null) {
  if (prompt) {
    return prompt;
  }
  return `What is one useful thing you remember from "${title}"?`;
}

export async function createRecapForCurrentBatch(userId: string) {
  const batchNumber = await getCurrentBatchNumber(userId);
  const interactions = await prisma.userItemInteraction.findMany({
    where: {
      userId,
      batchNumber
    },
    include: {
      learningItem: {
        include: {
          category: true
        }
      },
      activityItem: true
    },
    orderBy: {
      shownAt: "asc"
    }
  });

  if (interactions.length === 0) {
    throw new Error("No interactions are available for the current recap.");
  }

  const learningItems = interactions.flatMap((interaction) => (interaction.learningItem ? [interaction.learningItem] : []));
  const activityItems = interactions.flatMap((interaction) => (interaction.activityItem ? [interaction.activityItem] : []));
  const categories = [...new Set(learningItems.map((item) => item.category.name))];
  const questions: string[] = learningItems.slice(0, 4).map((item) => makeQuestion(item.title, item.prompt));
  const itemIds: string[] = learningItems.map((item) => item.id);
  const activityIds: string[] = activityItems.map((item) => item.id);
  const interestingTitles = interactions
    .filter((interaction) => interaction.feedback === "INTERESTING")
    .flatMap((interaction) => (interaction.learningItem?.title ? [interaction.learningItem.title] : []));

  const summaryParts = [
    `You saw ${learningItems.length} learning card${learningItems.length === 1 ? "" : "s"}`,
    activityItems.length > 0 ? `${activityItems.length} movement reset${activityItems.length === 1 ? "" : "s"}` : null,
    categories.length > 0 ? `across ${categories.join(", ")}` : null
  ].filter(Boolean);

  const summary = `${summaryParts.join(" ")}. ${
    interestingTitles.length > 0
      ? `Worth revisiting: ${interestingTitles.join(", ")}.`
      : "Pick one idea that felt useful and retrieve it once before moving on."
  }`;

  return prisma.recap.upsert({
    where: {
      userId_batchNumber: {
        userId,
        batchNumber
      }
    },
    update: {
      title: `Little recap #${batchNumber}`,
      summary,
      questions,
      itemIds,
      activityIds
    },
    create: {
      userId,
      batchNumber,
      title: `Little recap #${batchNumber}`,
      summary,
      questions,
      itemIds,
      activityIds
    }
  });
}
