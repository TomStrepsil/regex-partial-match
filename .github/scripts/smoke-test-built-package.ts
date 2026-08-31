/**
 * Verifies the built `lib/` output, in two passes. Called by the CI workflow
 * after `prepublishOnly`:
 *
 *   npm run prepublishOnly && npm run ci:smoke-test-built-package
 *
 * First, every emitted file is parsed at the ECMAScript version the README
 * states the package is compiled to, so syntax newer than that floor fails the
 * build. Node is far newer than the floor and will happily run output the
 * stated environment could not, so this is checked statically rather than by
 * executing under an older engine — no ESM-capable runtime is that old.
 *
 * Second, every entry point declared in package.json "exports" is loaded under
 * both `import` and `require`, and asserted to behave. The unit tests run
 * against `src/`, so they cannot see defects introduced by the build itself —
 * v1.1.1 shipped a `lib/` that threw `SyntaxError: 'super' keyword unexpected
 * here` on load while all 408 tests passed. Specifiers are resolved by name
 * rather than by path so that Node applies the real "exports" map, exactly as
 * a consumer would.
 *
 * Adding an entry point to "exports" without adding a case to SMOKE_TESTS
 * fails this script.
 */

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Linter } from "eslint";

const SUPPORTED_ECMA_VERSION = 2015;

const BUILT_OUTPUT = new URL("../../lib/", import.meta.url);

type LoadedModule = Record<string, unknown>;

type PartialMatchRegExpConstructor = new (
  pattern: RegExp | string,
  flags?: string
) => RegExp;

const SMOKE_TESTS: Record<string, (loaded: LoadedModule) => void> = {
  ".": (loaded) => {
    const PartialMatchRegExp =
      loaded.default as PartialMatchRegExpConstructor | undefined;
    assert.ok(PartialMatchRegExp, "no default export");

    const partial = new PartialMatchRegExp(/^(\w+) \1 end$/);
    assert.equal(partial.test("abc ab"), true, "rejects a prefix");
    assert.equal(partial.test("abc abc end"), true, "rejects a full match");
    assert.equal(partial.test("abc xyz end"), false, "accepts an impossible input");
  },

  "./extend": () => {
    assert.equal(
      typeof RegExp.prototype.toPartialMatchRegex,
      "function",
      "toPartialMatchRegex was not added to RegExp.prototype"
    );
    assert.equal(
      /^hello world$/.toPartialMatchRegex().test("hel"),
      true,
      "extended regex rejects a prefix"
    );
  },

  "./matches-zero-length": (loaded) => {
    const matchesZeroLength = loaded.default as
      | ((regex: RegExp) => boolean)
      | undefined;
    assert.ok(matchesZeroLength, "no default export");

    assert.equal(
      matchesZeroLength(/(?=a)/),
      true,
      "misses a zero-width assertion"
    );
    assert.equal(matchesZeroLength(/\d{4}/), false, "false positive");
  }
};

async function assertBuiltOutputParsesAtSupportedEcmaVersion(): Promise<void> {
  const linter = new Linter();
  const entries = await readdir(BUILT_OUTPUT, { recursive: true });
  const emitted = entries.filter((entry) => entry.endsWith(".js"));
  assert.ok(
    emitted.length > 0,
    "lib/ holds no JavaScript — was prepublishOnly run?"
  );

  for (const file of emitted) {
    const source = await readFile(new URL(file, BUILT_OUTPUT), "utf8");
    const parseError = linter
      .verify(source, {
        languageOptions: {
          ecmaVersion: SUPPORTED_ECMA_VERSION,
          sourceType: "module"
        }
      })
      .find((message) => message.fatal);

    if (parseError) {
      assert.fail(
        `lib/${file} uses syntax newer than ES${String(SUPPORTED_ECMA_VERSION)} — ${parseError.message} (line ${String(parseError.line)})`
      );
    }
    console.log(`  ✓ lib/${file} parses as ES${String(SUPPORTED_ECMA_VERSION)}`);
  }
}

async function readExportedSubpaths(): Promise<string[]> {
  const manifest = await readFile(
    new URL("../../package.json", import.meta.url),
    "utf8"
  );
  const { exports } = JSON.parse(manifest) as {
    exports: Record<string, unknown>;
  };
  return Object.keys(exports);
}

function toSpecifier(packageName: string, subpath: string): string {
  return subpath === "." ? packageName : `${packageName}${subpath.slice(1)}`;
}

async function main(): Promise<void> {
  const packageName = "regex-partial-match";
  const require = createRequire(import.meta.url);

  await assertBuiltOutputParsesAtSupportedEcmaVersion();

  const subpaths = await readExportedSubpaths();

  for (const subpath of subpaths) {
    const specifier = toSpecifier(packageName, subpath);
    const smokeTest = SMOKE_TESTS[subpath];
    assert.ok(
      smokeTest,
      `"exports" declares ${subpath} but SMOKE_TESTS has no case for it`
    );

    smokeTest((await import(specifier)) as LoadedModule);
    console.log(`  ✓ import("${specifier}")`);

    smokeTest(require(specifier) as LoadedModule);
    console.log(`  ✓ require("${specifier}")`);
  }

  console.log(`Smoke tested ${String(subpaths.length)} entry points from lib/`);
}

await main();
