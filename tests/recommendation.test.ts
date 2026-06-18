import { describe, expect, it } from "vitest";
import { selectRecommendation, shouldInsertActivity, type RecommendationLearningItem } from "@/lib/recommendation";

function item(overrides: Partial<RecommendationLearningItem>): RecommendationLearningItem {
  return {
    id: "item-1",
    slug: "item-1",
    categorySlug: "science",
    cardType: "QUICK_FACT",
    approved: true,
    ...overrides
  };
}

describe("recommendation logic", () => {
  it("does not insert activity before five learning uses", () => {
    expect(shouldInsertActivity(4, () => 0)).toBe(false);
  });

  it("always inserts activity after ten uses when activity cards exist", () => {
    const result = selectRecommendation({
      random: () => 0.5,
      preferredCategorySlugs: ["science"],
      avoidedCategorySlugs: [],
      learningItems: [item({ id: "learn-1", slug: "learn-1" })],
      activityItems: [{ id: "activity-1", slug: "activity-1" }],
      interactions: Array.from({ length: 10 }, (_, index) => ({
        kind: "LEARNING",
        learningItemId: `previous-${index}`,
        categorySlug: "science",
        shownAt: new Date(index)
      }))
    });

    expect(result.kind).toBe("ACTIVITY");
  });

  it("filters avoided categories", () => {
    const result = selectRecommendation({
      random: () => 0.1,
      preferredCategorySlugs: ["science"],
      avoidedCategorySlugs: ["cybersecurity"],
      activityItems: [],
      learningItems: [
        item({ id: "blocked", slug: "blocked", categorySlug: "cybersecurity" }),
        item({ id: "allowed", slug: "allowed", categorySlug: "science" })
      ],
      interactions: []
    });

    expect(result.kind).toBe("LEARNING");
    if (result.kind === "LEARNING") {
      expect(result.item.id).toBe("allowed");
    }
  });

  it("prioritizes preferred categories when no review item is due", () => {
    const result = selectRecommendation({
      random: () => 0,
      preferredCategorySlugs: ["space"],
      avoidedCategorySlugs: [],
      activityItems: [],
      learningItems: [
        item({ id: "science", slug: "science", categorySlug: "science" }),
        item({ id: "space", slug: "space", categorySlug: "space" })
      ],
      interactions: []
    });

    expect(result.kind).toBe("LEARNING");
    if (result.kind === "LEARNING") {
      expect(result.item.id).toBe("space");
    }
  });

  it("brings back interesting items for spaced repetition after they leave the recent window", () => {
    const interactions = [
      {
        kind: "LEARNING" as const,
        learningItemId: "interesting",
        categorySlug: "science",
        feedback: "INTERESTING" as const,
        shownAt: new Date(1)
      },
      ...Array.from({ length: 5 }, (_, index) => ({
        kind: "LEARNING" as const,
        learningItemId: `recent-${index}`,
        categorySlug: "space",
        shownAt: new Date(index + 2)
      }))
    ];

    const result = selectRecommendation({
      random: () => 0,
      preferredCategorySlugs: [],
      avoidedCategorySlugs: [],
      activityItems: [],
      learningItems: [
        item({ id: "interesting", slug: "interesting", categorySlug: "science" }),
        item({ id: "fresh", slug: "fresh", categorySlug: "space" })
      ],
      interactions
    });

    expect(result.kind).toBe("LEARNING");
    if (result.kind === "LEARNING") {
      expect(result.item.id).toBe("interesting");
    }
  });
});
