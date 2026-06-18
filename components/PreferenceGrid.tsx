"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { categoryThemeStyle } from "@/lib/category-theme";

type PreferenceChoice = "neutral" | "preferred" | "avoided";

export function PreferenceGrid({
  preferred,
  avoided
}: {
  preferred: Set<string>;
  avoided: Set<string>;
}) {
  const initialChoices = useMemo(() => {
    return Object.fromEntries(
      categories.map((category) => [
        category.slug,
        preferred.has(category.slug) ? "preferred" : avoided.has(category.slug) ? "avoided" : "neutral"
      ])
    ) as Record<string, PreferenceChoice>;
  }, [avoided, preferred]);
  const [choices, setChoices] = useState(initialChoices);

  function toggleChoice(slug: string) {
    setChoices((current) => {
      const nextChoice = current[slug] === "neutral" ? "preferred" : current[slug] === "preferred" ? "avoided" : "neutral";
      return { ...current, [slug]: nextChoice };
    });
  }

  return (
    <div className="preference-grid">
      {categories.map((category) => {
        const choice = choices[category.slug] ?? "neutral";
        return (
          <button
            className={`preference-card preference-card-${choice}`}
            key={category.slug}
            onClick={() => toggleChoice(category.slug)}
            style={categoryThemeStyle(category.slug)}
            type="button"
          >
            <span className="preference-check" aria-hidden>
              {choice === "neutral" ? null : <Check size={16} />}
            </span>
            <strong>{category.name}</strong>
            <span>{choice === "preferred" ? "Want" : choice === "avoided" ? "Skip" : "Open"}</span>
          </button>
        );
      })}
      {Object.entries(choices).map(([slug, choice]) =>
        choice === "preferred" ? <input key={`preferred-${slug}`} name="preferred" type="hidden" value={slug} /> : null
      )}
      {Object.entries(choices).map(([slug, choice]) =>
        choice === "avoided" ? <input key={`avoided-${slug}`} name="avoided" type="hidden" value={slug} /> : null
      )}
    </div>
  );
}
