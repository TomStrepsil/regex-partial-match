/**
 * Verifies the built `lib/` output, in two passes. Called by the CI workflow
 * after `build`:
 *
 *   npm run build && npm run ci:smoke-test-built-package
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
 * `regex-partial-match/partialMatchRegExp` never reach `hitEnd` or
 * `features`, even transitively and even if some file along the way imported
 * one without re-exporting it, which a check of the loaded module's own
 * exports alone couldn't catch.
 */

import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { Linter } from "eslint";
import type PartialMatchRegExpInstance from "../../src/partialMatchRegExp/index.ts";
import type hitEndType from "../../src/partialMatchRegExp/hitEnd/index.ts";
import type featuresType from "../../src/partialMatchRegExp/features/index.ts";
import type withModulesType from "../../src/partialMatchRegExp/withModules.ts";

const SUPPORTED_ECMA_VERSION = 2015;

const BUILT_OUTPUT = new URL("../../lib/", import.meta.url);

const MODULE_FILES = {
  carets: ["/modules/carets/", "/lineTerminator.js"],
  backreferences: ["/modules/backreferences/"]
};

type ModuleName = keyof typeof MODULE_FILES;

const MODULE_NAMES = Object.keys(MODULE_FILES) as ModuleName[];

const FUNCTION_FILES = {
  hitEnd: ["/hitEnd/"],
  features: ["/features/", "/regexFeatures.js"]
};

type FunctionName = keyof typeof FUNCTION_FILES;

const FUNCTION_NAMES = Object.keys(FUNCTION_FILES) as FunctionName[];

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

function fileIn(
  reached: Set<string>,
  files: readonly string[]
): string | undefined {
  return [...reached].find((href) => files.some((file) => href.includes(file)));
}

async function assertNeverReaches(
  specifier: string,
  builtFile: URL,
  names: readonly FunctionName[]
): Promise<void> {
  const reached = await transitiveRuntimeImports(builtFile);
  for (const name of names) {
    const file = fileIn(reached, FUNCTION_FILES[name]);
    assert.equal(
      file,
      undefined,
      `${specifier}'s runtime import graph reaches ${String(file)} — ${name} must not be reachable even transitively, whether or not it's re-exported`
    );
  }
}

async function assertNeverReachesModules(
  specifier: string,
  builtFile: URL
): Promise<void> {
  const reached = await transitiveRuntimeImports(builtFile);
  for (const module of MODULE_NAMES) {
    const file = fileIn(reached, MODULE_FILES[module]);
    assert.equal(
      file,
      undefined,
      `${specifier}'s runtime import graph reaches ${String(file)} — it must not load the ${module} module`
    );
  }
}

async function importCore(): Promise<{
  default: PartialMatchRegExpConstructor;
  withModules: typeof withModulesType;
}> {
  return (await import(`${packageName}/core`)) as {
    default: PartialMatchRegExpConstructor;
    withModules: typeof withModulesType;
  };
}

async function bundledBytes(contents: string): Promise<number> {
  const { outputFiles } = await build({
    stdin: { contents, resolveDir: fileURLToPath(BUILT_OUTPUT) },
    bundle: true,
    write: false,
    // identifier mangling differs by module count, so it would hide equal shaking
    minifySyntax: true,
    minifyWhitespace: true,
    platform: "neutral",
    format: "esm",
    logLevel: "silent"
  });
  return outputFiles[0].contents.length;
}

async function assertBindsTheCaretsModule(
  carets: unknown
): Promise<void> {
  const { withModules } = await importCore();
  const PartialMatchRegExp = withModules(
    carets as Parameters<typeof withModulesType>[0]
  );
  assert.equal(
    new PartialMatchRegExp(/x^a/m).test("x"),
    false,
    "the carets module does not decide a caret after a consuming part"
  );
}

function assertFeaturesBehaves(
  PartialMatchRegExp: PartialMatchRegExpConstructor,
  features: typeof featuresType
): void {
  const partial = new PartialMatchRegExp(/^a/);
  assert.deepEqual(
    [...features(partial)],
    ["patternCharacter", "startAnchor"],
    "does not name a pattern's features"
  );
  assert.equal(
    features(partial),
    features(partial),
    "does not return the same set on every call"
  );
}

function assertHitEndBehaves(
  PartialMatchRegExp: PartialMatchRegExpConstructor,
  hitEnd: typeof hitEndType
): void {
  const partial = new PartialMatchRegExp(/(\w+) \1 end/);

  const prefix = partial.exec("abc ab");
  assert.ok(prefix, "no match for a prefix");
  assert.equal(
    hitEnd(partial, prefix),
    true,
    "does not report that the prefix ran out of input"
  );

  const settled = partial.exec("abc abc end.");
  assert.ok(settled, "no match for a settled match");
  assert.equal(
    hitEnd(partial, settled),
    false,
    "reports a settled match as having run out of input"
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

    const hitEnd = loaded.hitEnd as typeof hitEndType | undefined;
    assert.ok(hitEnd, "no hitEnd named export");
    assertHitEndBehaves(PartialMatchRegExp, hitEnd);

    const features = loaded.features as typeof featuresType | undefined;
    assert.ok(features, "no features named export");
    assertFeaturesBehaves(PartialMatchRegExp, features);

    const reached = await transitiveRuntimeImports(builtFile);
    for (const name of FUNCTION_NAMES) {
      assert.ok(
        fileIn(reached, FUNCTION_FILES[name]),
        `the default entry point's runtime import graph never reaches ${name}, though it re-exports it — transitiveRuntimeImports() may be broken, since the other direction is what ./partialMatchRegExp relies on`
      );
    }
    for (const module of MODULE_NAMES) {
      assert.ok(
        fileIn(reached, MODULE_FILES[module]),
        `the default entry point's runtime import graph never reaches the ${module} module, though it binds it — the check ./core relies on may be broken`
      );
    }
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

    await assertNeverReaches(
      "regex-partial-match/extend",
      builtFile,
      FUNCTION_NAMES
    );
  },

  "./partialMatchRegExp": async (loaded, builtFile) => {
    const PartialMatchRegExp = loaded.default as
      | PartialMatchRegExpConstructor
      | undefined;
    assert.ok(PartialMatchRegExp, "no default export");
    assertPartialMatchRegExpBehaves(PartialMatchRegExp);

    for (const name of FUNCTION_NAMES) {
      assert.equal(
        loaded[name],
        undefined,
        `${name} leaked into the partialMatchRegExp-only entry point's exports`
      );
    }

    await assertNeverReaches(
      "regex-partial-match/partialMatchRegExp",
      builtFile,
      FUNCTION_NAMES
    );
  },

  "./hitEnd": async (loaded, builtFile) => {
    const hitEnd = loaded.default as typeof hitEndType | undefined;
    assert.ok(hitEnd, "no default export");
    const full = (await import(packageName)) as {
      default: PartialMatchRegExpConstructor;
    };
    assertHitEndBehaves(full.default, hitEnd);
    const lean = new (await importCore()).default(/^ab/);
    const leanPrefix = lean.exec("a");
    assert.ok(leanPrefix, "no match for a prefix on the ./core class");
    assert.equal(
      hitEnd(lean, leanPrefix),
      true,
      "does not accept an instance of the ./core class"
    );

    await assertNeverReachesModules("regex-partial-match/hitEnd", builtFile);
    await assertNeverReaches("regex-partial-match/hitEnd", builtFile, [
      "features"
    ]);
  },

  "./features": async (loaded, builtFile) => {
    const features = loaded.default as typeof featuresType | undefined;
    assert.ok(features, "no default export");
    assertFeaturesBehaves((await importCore()).default, features);

    await assertNeverReachesModules("regex-partial-match/features", builtFile);
    await assertNeverReaches("regex-partial-match/features", builtFile, [
      "hitEnd"
    ]);
  },

  "./core": async (loaded, builtFile) => {
    const PartialMatchRegExp = loaded.default as
      | PartialMatchRegExpConstructor
      | undefined;
    assert.ok(PartialMatchRegExp, "no default export");
    assert.equal(
      new PartialMatchRegExp(/^hello world$/).test("hel"),
      true,
      "does not accept a prefix"
    );
    assert.throws(
      () => new PartialMatchRegExp(/x^a/m),
      /carets module/,
      "accepts a caret after a consuming part under m without the carets module"
    );
    assert.equal(
      new PartialMatchRegExp(/^foo/m).test("f"),
      true,
      "does not accept a caret leading the pattern under m"
    );

    const withModules = loaded.withModules as
      | typeof withModulesType
      | undefined;
    assert.ok(withModules, "no withModules named export");
    assert.equal(
      withModules(),
      PartialMatchRegExp,
      "withModules() is not the ./core class"
    );

    assert.throws(
      () => new PartialMatchRegExp(/(a)\1/),
      /backreferences module/,
      "accepts a backreference without the backreferences module"
    );
    assert.equal(
      new PartialMatchRegExp("x\\8y").test("x8"),
      true,
      "refuses a statically compiled escape"
    );

    await assertNeverReachesModules("regex-partial-match/core", builtFile);
    await assertNeverReaches(
      "regex-partial-match/core",
      builtFile,
      FUNCTION_NAMES
    );
  },

  "./modules/carets": async (loaded) => {
    assert.ok(loaded.default, "no default export");
    await assertBindsTheCaretsModule(loaded.default);
  },

  "./modules": async (loaded) => {
    assert.ok(loaded.carets, "no carets named export");
    await assertBindsTheCaretsModule(loaded.carets);
    assert.ok(loaded.backreferences, "no backreferences named export");
    const Both = (await importCore()).withModules(
      loaded.carets,
      loaded.backreferences
    ) as unknown as PartialMatchRegExpConstructor;
    assertPartialMatchRegExpBehaves(Both);
    assert.equal(
      Both,
      ((await import(packageName)) as { default: unknown }).default,
      "binding both modules does not return the default entry point's class"
    );
    assert.equal(
      new Both(/x^a/m).test("x"),
      false,
      "binding both modules does not decide a caret after a consuming part"
    );
    for (const module of MODULE_NAMES) {
      const fromBarrel = await bundledBytes(
        `import { ${module} } from "${packageName}/modules"; export default ${module};`
      );
      const fromSubpath = await bundledBytes(
        `import ${module} from "${packageName}/modules/${module}"; export default ${module};`
      );
      assert.equal(
        fromBarrel,
        fromSubpath,
        `importing ${module} from the ./modules barrel bundles to a different size than from ./modules/${module}`
      );
    }
  },

  "./modules/backreferences": async (loaded) => {
    const PartialMatchRegExp = (await importCore()).withModules(
      loaded.default as Parameters<typeof withModulesType>[0]
    ) as unknown as PartialMatchRegExpConstructor;
    assertPartialMatchRegExpBehaves(PartialMatchRegExp);
  }
};

async function assertBuiltOutputParsesAtSupportedEcmaVersion(): Promise<void> {
  const linter = new Linter();
  const entries = await readdir(BUILT_OUTPUT, { recursive: true });
  const emitted = entries.filter((entry) => entry.endsWith(".js"));
  assert.ok(
    emitted.length > 0,
    "lib/ holds no JavaScript — was build run?"
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
