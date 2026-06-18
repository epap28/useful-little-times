import { categories } from "@/data/categories";

export function PreferenceGrid({
  preferred,
  avoided
}: {
  preferred: Set<string>;
  avoided: Set<string>;
}) {
  return (
    <div className="preference-grid">
      {categories.map((category) => (
        <div className="preference-item" key={category.slug}>
          <strong>{category.name}</strong>
          <div className="choice-row">
            <label>
              <input name="preferred" type="checkbox" value={category.slug} defaultChecked={preferred.has(category.slug)} />
              Prefer
            </label>
            <label>
              <input name="avoided" type="checkbox" value={category.slug} defaultChecked={avoided.has(category.slug)} />
              Avoid
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
