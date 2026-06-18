import { validateSeedContent } from "../lib/content-validation";

const result = validateSeedContent();
console.log(
  `Content validation passed: ${result.learningItemCount} learning items and ${result.activityItemCount} activity items.`
);
