import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "worker/.wrangler/**",
      "worker/src/worker-configuration.d.ts"
    ]
  },
  ...nextVitals,
  ...nextTypescript
];

export default eslintConfig;
