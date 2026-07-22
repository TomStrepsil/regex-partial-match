import tseslint from "typescript-eslint";
import markdown from "@eslint/markdown";

export default [
  {
    ignores: ["lib/**", "node_modules/**", "types/**"]
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown
    },
    language: "markdown/commonmark",
    rules: {
      "markdown/no-html": "error"
    }
  },
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.ts"]
  })),
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json", "./benchmarking/tsconfig.json"]
      }
    }
  },
  {
    files: ["**/*.test.ts", "test/**/*.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  }
];
