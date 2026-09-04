import tseslint from "typescript-eslint";
import markdown from "@eslint/markdown";

export default [
  {
    ignores: ["lib/**", "node_modules/**", "types/**", "coverage/**"]
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
        project: ["./tsconfig.json", "./test/benchmarking/tsconfig.json"]
      }
    }
  },
  {
    files: ["src/**/*.ts"],
    ignores: ["src/**/*.test.ts"],
    rules: {
      "no-restricted-properties": [
        "error",
        ...[
          ["padStart", "ES2017"],
          ["padEnd", "ES2017"],
          ["trimStart", "ES2019"],
          ["trimEnd", "ES2019"],
          ["flat", "ES2019"],
          ["flatMap", "ES2019"],
          ["matchAll", "ES2020"],
          ["replaceAll", "ES2021"],
          ["at", "ES2022"],
          ["findLast", "ES2023"],
          ["findLastIndex", "ES2023"]
        ].map(([property, since]) => ({
          property,
          message: `${property}() is ${since}; src/ ships to the ES2015 floor the README states. RegExp properties newer than that are read behind a runtime guard — plain library methods are not.`
        })),
        ...["entries", "values", "fromEntries", "hasOwn"].map((property) => ({
          object: "Object",
          property,
          message: `Object.${property}() is past the ES2015 floor src/ ships to.`
        }))
      ]
    }
  },
  {
    files: ["**/*.test.ts", "test/**/*.ts"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off"
    }
  }
];
