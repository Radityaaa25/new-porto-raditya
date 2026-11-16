import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextCoreWebVitals,
  prettier,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "public/**",
    "docs/**",
    "next-env.d.ts",
  ]),
]);
