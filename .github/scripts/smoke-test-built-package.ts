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
 *
 * `SMOKE_TESTS` also receives each entry point's built file as a `URL`, for
 * cases that need to check its runtime import graph rather than just its
 * exports — e.g. that `regex-partial-match/extend` and
 * `regex-partial-match/partialMatchRegExp` never reach `isComplete`, even
 * transitively and even if some file along the way imported it without
 * re-exporting it, which a check of the loaded module's own exports alone
 * couldn't catch.
 */

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { Linter } from "eslint";
import type PartialMatchRegExpInstance from "../../src/partialMatchRegExp/index.ts";
import type isCompleteType from "../../src/partialMatchRegExp/isComplete/index.ts";

const SUPPORTED_ECMA_VERSION = 2015;

const BUILT_OUTPUT = new URL("../../lib/", import.meta.url);

const packageName = "regex-partial-match";
const require = createRequire(import.meta.url);

type LoadedModule = Record<string, unknown>;

type PartialMatchRegExpConstructor = new (
  pattern: RegExp | string,
  flags?: string
) => PartialMatchRegExpInstance;

interface ExportEntry {
  types?: string;
  import?: string;
  default?: string;
}

/**
 * The full set of built files reachable from `entry` by following relative
 * `import`/`export ... from` specifiers, recursively — i.e. what actually
 * loads at runtime when `entry` is imported, not just what it re-exports.
 *
 * esbuild has to resolve and read every one of these before it can even
 * begin deciding what to tree-shake, so `metafile.inputs` names exactly this
 * set regardless of what a bundle built from `entry` would keep or drop —
 * the same reasoning a manual `esbuild --bundle` check would apply by hand,
 * automated instead of eyeballed.
 */
async function transitiveRuntimeImports(entry: URL): Promise<Set<string>> {
  const { metafile } = await build({
    entryPoints: [fileURLToPath(entry)],
    absWorkingDir: fileURLToPath(BUILT_OUTPUT),
    bundle: true,
    write: false,
    metafile: true,
    platform: "neutral",
    format: "esm",
    logLevel: "silent"
  });
  return new Set(
    Object.keys(metafile.inputs).map(
      (relativePath) => new URL(relativePath, BUILT_OUTPUT).href
    )
  );
}

function builtEntryUrl(entry: ExportEntry): URL {
  const path = entry.import ?? entry.default;
  assert.ok(path, `"exports" entry has neither "import" nor "default"`);
  return new URL(path.replace(/^\.\/lib\//, ""), BUILT_OUTPUT);
}

function assertPartialMatchRegExpBehaves(
  PartialMatchRegExp: PartialMatchRegExpConstructor
): void {
  const partial = new PartialMatchRegExp(/^(\w+) \1 end$/);
  assert.equal(partial.test("abc ab"), true, "does not accept a prefix");
  assert.equal(
    partial.test("abc abc end"),
    true,
    "does not accept a full match"
  );
  assert.equal(
    partial.test("abc xyz end"),
    false,
    "accepts an impossible input"
  );
}

async function assertNeverReachesIsComplete(
  specifier: string,
  builtFile: URL
): Promise<void> {
  const reached = await transitiveRuntimeImports(builtFile);
  const isCompleteModule = [...reached].find((href) =>
    href.includes("/isComplete/")
  );
  assert.equal(
    isCompleteModule,
    undefined,
    `${specifier}'s runtime import graph reaches ${String(isCompleteModule)} — isComplete must not be reachable even transitively, whether or not it's re-exported`
  );
}

function assertIsCompleteBehaves(
  PartialMatchRegExp: PartialMatchRegExpConstructor,
  isComplete: typeof isCompleteType
): void {
  const partial = new PartialMatchRegExp(/^(\w+) \1 end$/);

  const prefix = partial.exec("abc ab");
  assert.ok(prefix, "no match for a prefix");
  assert.equal(
    isComplete(partial, prefix),
    false,
    "does not identify the prefix as incomplete"
  );

  const full = partial.exec("abc abc end");
  assert.ok(full, "no match for a full match");
  assert.equal(
    isComplete(partial, full),
    true,
    "does not identify the full match as complete"
  );
}

const SMOKE_TESTS: Record<
  string,
  (loaded: LoadedModule, builtFile: URL) => void | Promise<void>
> = {
  ".": async (loaded, builtFile) => {
    const PartialMatchRegExp = loaded.default as
      | PartialMatchRegExpConstructor
      | undefined;
    assert.ok(PartialMatchRegExp, "no default export");
    assertPartialMatchRegExpBehaves(PartialMatchRegExp);

    const isComplete = loaded.isComplete as typeof isCompleteType | undefined;
    assert.ok(isComplete, "no isComplete named export");
    assertIsCompleteBehaves(PartialMatchRegExp, isComplete);

    const reached = await transitiveRuntimeImports(builtFile);
    assert.ok(
      [...reached].some((href) => href.includes("/isComplete/")),
      "the default entry point's runtime import graph never reaches isComplete, though it re-exports it — transitiveRuntimeImports() may be broken, since the other direction is what ./partialMatchRegExp relies on"
    );
  },

  "./extend": async (_loaded, builtFile) => {
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

    await assertNeverReachesIsComplete("regex-partial-match/extend", builtFile);
  },

  "./partialMatchRegExp": async (loaded, builtFile) => {
    const PartialMatchRegExp = loaded.default as
      | PartialMatchRegExpConstructor
      | undefined;
    assert.ok(PartialMatchRegExp, "no default export");
    assertPartialMatchRegExpBehaves(PartialMatchRegExp);

    assert.equal(
      loaded.isComplete,
      undefined,
      "isComplete leaked into the partialMatchRegExp-only entry point's exports"
    );

    await assertNeverReachesIsComplete(
      "regex-partial-match/partialMatchRegExp",
      builtFile
    );
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
    console.log(
      `  ✓ lib/${file} parses as ES${String(SUPPORTED_ECMA_VERSION)}`
    );
  }
}

async function readExportsManifest(): Promise<Record<string, ExportEntry>> {
  const manifest = await readFile(
    new URL("../../package.json", import.meta.url),
    "utf8"
  );
  const { exports } = JSON.parse(manifest) as {
    exports: Record<string, ExportEntry>;
  };
  return exports;
}

function toSpecifier(packageName: string, subpath: string): string {
  return subpath === "." ? packageName : `${packageName}${subpath.slice(1)}`;
}

async function main(): Promise<void> {
  await assertBuiltOutputParsesAtSupportedEcmaVersion();

  const exportsManifest = await readExportsManifest();

  for (const [subpath, entry] of Object.entries(exportsManifest)) {
    const specifier = toSpecifier(packageName, subpath);
    const smokeTest = SMOKE_TESTS[subpath];
    assert.ok(
      smokeTest,
      `"exports" declares ${subpath} but SMOKE_TESTS has no case for it`
    );

    const builtFile = builtEntryUrl(entry);

    await smokeTest((await import(specifier)) as LoadedModule, builtFile);
    console.log(`  ✓ import("${specifier}")`);

    await smokeTest(require(specifier) as LoadedModule, builtFile);
    console.log(`  ✓ require("${specifier}")`);
  }

  console.log(
    `Smoke tested ${String(Object.keys(exportsManifest).length)} entry points from lib/`
  );
}

await main();
