import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "codemods/**"],
    setupFiles: ["./test/vitest.setup.ts"]
  }
});
