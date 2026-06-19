"use client";

import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { categoryThemeStyle } from "@/lib/category-theme";

export function PreferenceGrid({
  preferred,
  avoided
}: {
  preferred: Set<string>;
  avoided: Set<string>;
}) {
  const initialChoices = useMemo(() => {
    return Object.fromEntries(categories.map((category) => [category.slug, preferred.has(category.slug) && !avoided.has(category.slug)])) as Record<
      string,
      boolean
    >;
  }, [avoided, preferred]);
  const [choices, setChoices] = useState(initialChoices);

  function toggleChoice(slug: string) {
    setChoices((current) => {
      return { ...current, [slug]: !current[slug] };
    });
  }

  return (
    <div className="preference-grid">
      {categories.map((category) => {
        const isValidated = choices[category.slug] ?? false;
        return (
          <button
            className={`preference-card ${isValidated ? "preference-card-validated" : "preference-card-unvalidated"}`}
            key={category.slug}
            onClick={() => toggleChoice(category.slug)}
            style={categoryThemeStyle(category.slug)}
            type="button"
            aria-pressed={isValidated}
          >
            <span className="preference-check" aria-hidden>
              {isValidated ? <Check size={16} /> : null}
            </span>
            <strong>{category.name}</strong>
          </button>
        );
      })}
      {Object.entries(choices).map(([slug, isValidated]) =>
        isValidated ? <input key={`preferred-${slug}`} name="preferred" type="hidden" value={slug} /> : null
      )}
      {Object.entries(choices).map(([slug, isValidated]) =>
        isValidated ? null : <input key={`avoided-${slug}`} name="avoided" type="hidden" value={slug} />
      )}
    </div>
  );
}
