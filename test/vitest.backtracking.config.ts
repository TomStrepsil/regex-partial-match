import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/backtracking/**/*.timing.ts"],
    testTimeout: 60_000
  }
});
