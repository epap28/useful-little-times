import { z } from "zod";
import { activityItems } from "@/data/activity-items";
import { categories } from "@/data/categories";
import { cardTypes, learningItems } from "@/data/learning-items";

const categorySlugs = categories.map((category) => category.slug);

const sourceSchema = z.object({
  title: z.string().min(3),
  url: z.string().url(),
  publisher: z.string().min(2).optional()
});

export const learningSeedItemSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(4),
    categorySlug: z.string().refine((value) => categorySlugs.includes(value as never), {
      message: "categorySlug must match a known category"
    }),
    cardType: z.enum(cardTypes),
    content: z.string().min(20),
    explanation: z.string().min(30),
    prompt: z.string().min(8).optional(),
    answer: z.string().min(1).optional(),
    answerOptions: z.array(z.string().min(1)).min(2).optional(),
    mnemonic: z.string().min(8).optional(),
    analogy: z.string().min(8).optional(),
    sources: z.array(sourceSchema).min(1)
  })
  .superRefine((item, context) => {
    if (item.cardType === "MINI_QUIZ") {
      if (!item.prompt) {
        context.addIssue({
          code: "custom",
          path: ["prompt"],
          message: "Mini quiz cards need a prompt."
        });
      }
      if (!item.answer) {
        context.addIssue({
          code: "custom",
          path: ["answer"],
          message: "Mini quiz cards need an answer."
        });
      }
      if (!item.answerOptions?.includes(item.answer ?? "")) {
        context.addIssue({
          code: "custom",
          path: ["answerOptions"],
          message: "Mini quiz answerOptions must include the answer."
        });
      }
    }

    if (item.cardType === "ACTIVE_RECALL" && (!item.prompt || !item.answer)) {
      context.addIssue({
        code: "custom",
        path: ["prompt"],
        message: "Active recall cards need both a prompt and an answer."
      });
    }
  });

export const activitySeedItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(4),
  homeVersion: z.string().min(12),
  officeVersion: z.string().min(12),
  remoteVersion: z.string().min(12).optional(),
  why: z.string().min(20),
  safetyNote: z
    .string()
    .min(20)
    .refine((value) => value.toLowerCase().includes("pain"), {
      message: "Activity safety notes must mention pain or personal suitability."
    }),
  tags: z.array(z.string().min(2)).min(1)
});

export function validateSeedContent() {
  const learningResults = learningItems.map((item) => learningSeedItemSchema.safeParse(item));
  const activityResults = activityItems.map((item) => activitySeedItemSchema.safeParse(item));
  const failures = [
    ...learningResults
      .map((result, index) => ({ result, label: `learningItems[${index}]` }))
      .filter(({ result }) => !result.success),
    ...activityResults
      .map((result, index) => ({ result, label: `activityItems[${index}]` }))
      .filter(({ result }) => !result.success)
  ];

  if (failures.length > 0) {
    const details = failures
      .map(({ label, result }) => `${label}: ${JSON.stringify(result.error?.format(), null, 2)}`)
      .join("\n\n");
    throw new Error(`Seed content validation failed:\n\n${details}`);
  }

  const slugs = new Set<string>();
  for (const item of [...learningItems, ...activityItems]) {
    if (slugs.has(item.slug)) {
      throw new Error(`Duplicate seed slug: ${item.slug}`);
    }
    slugs.add(item.slug);
  }

  return {
    learningItemCount: learningItems.length,
    activityItemCount: activityItems.length
  };
}
