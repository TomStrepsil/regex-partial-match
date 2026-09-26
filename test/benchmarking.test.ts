import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const benchmarkDirectory = new URL("./benchmarking/src/", import.meta.url);
const benchmarkFiles = readdirSync(benchmarkDirectory).filter((file) =>
  file.endsWith(".bench.ts")
);

it("benchmarks the built package instead of TypeScript source", () => {
  expect(benchmarkFiles).not.toHaveLength(0);

  for (const file of benchmarkFiles) {
    const source = readFileSync(new URL(file, benchmarkDirectory), "utf8");
    expect(source, file).not.toContain("../../../src/");
  }
});

it("builds the package before running CI benchmarks", () => {
  const action = readFileSync(
    fileURLToPath(
      new URL("../.github/actions/run-benchmarks/action.yml", import.meta.url)
    ),
    "utf8"
  );

  const buildIndex = action.indexOf("npm run build");
  const benchmarkIndex = action.indexOf("npm run bench");

  expect(buildIndex).toBeGreaterThanOrEqual(0);
  expect(benchmarkIndex).toBeGreaterThan(buildIndex);
});