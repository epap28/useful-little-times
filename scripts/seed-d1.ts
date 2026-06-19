import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { activityItems } from "../data/activity-items";
import { categories } from "../data/categories";
import { learningItems, retiredLearningItemSlugs } from "../data/learning-items";
import { validateSeedContent } from "../lib/content-validation";

function sql(value: string | null | undefined) {
  if (value === null || value === undefined) {
    return "NULL";
  }
  return `'${value.replaceAll("'", "''")}'`;
}

function json(value: unknown) {
  return sql(JSON.stringify(value));
}

function sourceIdForUrl(url: string) {
  return `source-${createHash("sha256").update(url).digest("hex").slice(0, 16)}`;
}

function upsert(table: string, columns: string[], values: string[], conflict: string, updates: string[]) {
  return `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${values.join(", ")})
ON CONFLICT(${conflict}) DO UPDATE SET ${updates.join(", ")};`;
}

validateSeedContent();

const statements: string[] = ["PRAGMA foreign_keys = ON;"];
for (const category of categories) {
  statements.push(
    upsert(
      "categories",
      ["id", "slug", "name"],
      [sql(category.slug), sql(category.slug), sql(category.name)],
      "slug",
      ["name = excluded.name"]
    )
  );
}

for (const item of learningItems) {
  for (const source of item.sources) {
    const id = sourceIdForUrl(source.url);
    if (!statements.some((statement) => statement.includes(sql(source.url)))) {
      statements.push(
        upsert(
          "sources",
          ["id", "title", "url", "publisher"],
          [sql(id), sql(source.title), sql(source.url), sql(source.publisher ?? null)],
          "url",
          ["title = excluded.title", "publisher = excluded.publisher"]
        )
      );
    }
  }
}

if (retiredLearningItemSlugs.length > 0) {
  statements.push(`UPDATE learning_items SET approved = 0 WHERE slug IN (${retiredLearningItemSlugs.map(sql).join(", ")});`);
}

for (const item of learningItems) {
  statements.push(
    upsert(
      "learning_items",
      [
        "id",
        "slug",
        "title",
        "category_id",
        "card_type",
        "content",
        "explanation",
        "prompt",
        "answer",
        "answer_options",
        "mnemonic",
        "analogy",
        "approved"
      ],
      [
        sql(item.slug),
        sql(item.slug),
        sql(item.title),
        sql(item.categorySlug),
        sql(item.cardType),
        sql(item.content),
        sql(item.explanation),
        sql(item.prompt ?? null),
        sql(item.answer ?? null),
        item.answerOptions ? json(item.answerOptions) : "NULL",
        sql(item.mnemonic ?? null),
        sql(item.analogy ?? null),
        "1"
      ],
      "slug",
      [
        "title = excluded.title",
        "category_id = excluded.category_id",
        "card_type = excluded.card_type",
        "content = excluded.content",
        "explanation = excluded.explanation",
        "prompt = excluded.prompt",
        "answer = excluded.answer",
        "answer_options = excluded.answer_options",
        "mnemonic = excluded.mnemonic",
        "analogy = excluded.analogy",
        "approved = excluded.approved"
      ]
    )
  );
  statements.push(`DELETE FROM learning_item_sources WHERE learning_item_id = ${sql(item.slug)};`);
  for (const source of item.sources) {
    statements.push(
      `INSERT OR IGNORE INTO learning_item_sources (learning_item_id, source_id)
VALUES (${sql(item.slug)}, (SELECT id FROM sources WHERE url = ${sql(source.url)}));`
    );
  }
}

for (const activity of activityItems) {
  statements.push(
    upsert(
      "activity_items",
      ["id", "slug", "title", "home_version", "office_version", "remote_version", "why", "safety_note", "tags"],
      [
        sql(activity.slug),
        sql(activity.slug),
        sql(activity.title),
        sql(activity.homeVersion),
        sql(activity.officeVersion),
        sql(activity.remoteVersion ?? null),
        sql(activity.why),
        sql(activity.safetyNote),
        json(activity.tags)
      ],
      "slug",
      [
        "title = excluded.title",
        "home_version = excluded.home_version",
        "office_version = excluded.office_version",
        "remote_version = excluded.remote_version",
        "why = excluded.why",
        "safety_note = excluded.safety_note",
        "tags = excluded.tags"
      ]
    )
  );
}

mkdirSync("worker/.generated", { recursive: true });
const output = join("worker", ".generated", "seed.sql");
writeFileSync(output, `${statements.join("\n\n")}\n`);

if (process.argv.includes("--dry-run")) {
  console.log(`Seed dry-run passed: ${learningItems.length} learning items, ${activityItems.length} activity items.`);
  console.log(`Generated SQL at ${output}. No D1 database was modified.`);
  process.exit(0);
}

const remote = process.argv.includes("--remote");
const result = spawnSync(
  "npx",
  ["wrangler", "d1", "execute", "useful-little-times", remote ? "--remote" : "--local", "--file", output, "--config", "worker/wrangler.jsonc"],
  {
    stdio: "inherit",
    shell: process.platform === "win32"
  }
);

process.exit(result.status ?? 1);
