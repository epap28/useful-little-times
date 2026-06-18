import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { activityItems } from "../data/activity-items";
import { categories } from "../data/categories";
import { learningItems } from "../data/learning-items";
import { validateSeedContent } from "../lib/content-validation";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString })
});

async function main() {
  validateSeedContent();

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name
      },
      create: {
        slug: category.slug,
        name: category.name
      }
    });
  }

  for (const item of learningItems) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: item.categorySlug }
    });
    const learningItem = await prisma.learningItem.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        categoryId: category.id,
        cardType: item.cardType,
        content: item.content,
        explanation: item.explanation,
        prompt: item.prompt,
        answer: item.answer,
        answerOptions: item.answerOptions ?? undefined,
        mnemonic: item.mnemonic,
        analogy: item.analogy,
        approved: true
      },
      create: {
        slug: item.slug,
        title: item.title,
        categoryId: category.id,
        cardType: item.cardType,
        content: item.content,
        explanation: item.explanation,
        prompt: item.prompt,
        answer: item.answer,
        answerOptions: item.answerOptions ?? undefined,
        mnemonic: item.mnemonic,
        analogy: item.analogy,
        approved: true
      }
    });

    await prisma.learningItemSource.deleteMany({
      where: { learningItemId: learningItem.id }
    });

    for (const sourceSeed of item.sources) {
      const source = await prisma.source.upsert({
        where: { url: sourceSeed.url },
        update: {
          title: sourceSeed.title,
          publisher: sourceSeed.publisher
        },
        create: {
          title: sourceSeed.title,
          url: sourceSeed.url,
          publisher: sourceSeed.publisher
        }
      });

      await prisma.learningItemSource.create({
        data: {
          learningItemId: learningItem.id,
          sourceId: source.id
        }
      });
    }
  }

  for (const activity of activityItems) {
    await prisma.activityItem.upsert({
      where: { slug: activity.slug },
      update: {
        title: activity.title,
        homeVersion: activity.homeVersion,
        officeVersion: activity.officeVersion,
        remoteVersion: activity.remoteVersion,
        why: activity.why,
        safetyNote: activity.safetyNote,
        tags: activity.tags
      },
      create: {
        slug: activity.slug,
        title: activity.title,
        homeVersion: activity.homeVersion,
        officeVersion: activity.officeVersion,
        remoteVersion: activity.remoteVersion,
        why: activity.why,
        safetyNote: activity.safetyNote,
        tags: activity.tags
      }
    });
  }
}

main()
  .then(async () => {
    console.log(`Seeded ${learningItems.length} learning items and ${activityItems.length} activity cards.`);
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
