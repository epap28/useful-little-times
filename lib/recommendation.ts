export type FeedbackValue =
  | "KNEW_THIS"
  | "NOT_RELEVANT"
  | "INTERESTING"
  | "SHOW_ANOTHER"
  | "TOO_EASY"
  | "TOO_HARD";

export type RecommendationLearningItem = {
  id: string;
  slug: string;
  categorySlug: string;
  cardType: string;
  approved: boolean;
};

export type RecommendationActivityItem = {
  id: string;
  slug: string;
};

export type RecommendationInteraction = {
  kind: "LEARNING" | "ACTIVITY";
  learningItemId?: string | null;
  activityItemId?: string | null;
  categorySlug?: string | null;
  cardType?: string | null;
  feedback?: FeedbackValue | null;
  quizCorrect?: boolean | null;
  shownAt: Date;
};

export type RecommendationInput = {
  learningItems: RecommendationLearningItem[];
  activityItems: RecommendationActivityItem[];
  interactions: RecommendationInteraction[];
  preferredCategorySlugs: string[];
  avoidedCategorySlugs: string[];
  random?: () => number;
};

export type RecommendationResult =
  | { kind: "LEARNING"; item: RecommendationLearningItem; reason: string }
  | { kind: "ACTIVITY"; item: RecommendationActivityItem; reason: string };

export function countSinceLastActivity(interactions: RecommendationInteraction[]) {
  let count = 0;
  for (const interaction of [...interactions].reverse()) {
    if (interaction.kind === "ACTIVITY") {
      break;
    }
    count += 1;
  }
  return count;
}

export function shouldInsertActivity(usesSinceLastActivity: number, random = Math.random) {
  if (usesSinceLastActivity < 5) {
    return false;
  }

  const probabilityByUse: Record<number, number> = {
    5: 0.25,
    6: 0.4,
    7: 0.55,
    8: 0.75,
    9: 0.9
  };
  const probability = probabilityByUse[usesSinceLastActivity] ?? 1;
  return random() < probability;
}

export function selectRecommendation(input: RecommendationInput): RecommendationResult {
  const random = input.random ?? Math.random;
  const interactions = [...input.interactions].sort((a, b) => a.shownAt.getTime() - b.shownAt.getTime());

  if (input.activityItems.length > 0 && shouldInsertActivity(countSinceLastActivity(interactions), random)) {
    const index = Math.floor(random() * input.activityItems.length);
    return {
      kind: "ACTIVITY",
      item: input.activityItems[index],
      reason: "Movement break inserted after several learning uses."
    };
  }

  const avoided = new Set(input.avoidedCategorySlugs);
  const preferred = new Set(input.preferredCategorySlugs);
  const recentLearningIds = new Set(
    interactions
      .filter((interaction) => interaction.kind === "LEARNING" && interaction.learningItemId)
      .slice(-5)
      .map((interaction) => interaction.learningItemId)
  );
  const discouragedIds = new Set(
    interactions
      .filter((interaction) => interaction.feedback === "KNEW_THIS" || interaction.feedback === "NOT_RELEVANT")
      .map((interaction) => interaction.learningItemId)
      .filter(Boolean) as string[]
  );
  const dueReviewIds = new Set(
    interactions
      .filter((interaction) => interaction.feedback === "INTERESTING" || interaction.quizCorrect === false)
      .filter((interaction) => !recentLearningIds.has(interaction.learningItemId ?? ""))
      .map((interaction) => interaction.learningItemId)
      .filter(Boolean) as string[]
  );

  const recentCategories = interactions
    .filter((interaction) => interaction.kind === "LEARNING" && interaction.categorySlug)
    .slice(-2)
    .map((interaction) => interaction.categorySlug);
  const categoryToAvoidForStreak =
    recentCategories.length === 2 && recentCategories[0] === recentCategories[1] ? recentCategories[0] : null;

  const eligible = input.learningItems.filter(
    (item) =>
      item.approved &&
      !avoided.has(item.categorySlug) &&
      !recentLearningIds.has(item.id) &&
      !discouragedIds.has(item.id)
  );
  const fallback = input.learningItems.filter((item) => item.approved && !avoided.has(item.categorySlug));
  const pool = eligible.length > 0 ? eligible : fallback.length > 0 ? fallback : input.learningItems;

  if (pool.length === 0) {
    throw new Error("No learning items are available for recommendation.");
  }

  const scored = pool.map((item) => {
    let score = random();
    if (preferred.has(item.categorySlug)) {
      score += 4;
    }
    if (dueReviewIds.has(item.id)) {
      score += 6;
    }
    if (categoryToAvoidForStreak && item.categorySlug !== categoryToAvoidForStreak) {
      score += 2;
    }
    if (!recentCategories.includes(item.categorySlug)) {
      score += 1;
    }
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const winner = scored[0].item;
  return {
    kind: "LEARNING",
    item: winner,
    reason: dueReviewIds.has(winner.id)
      ? "Spaced repetition brought back an item worth revisiting."
      : "Selected from preferred categories while avoiding recent repetition."
  };
}
