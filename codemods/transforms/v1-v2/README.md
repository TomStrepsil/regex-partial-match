# v1 → v2 migration codemods

Two breaking changes:

1. `isComplete(partial, match)` is replaced by `hitEnd(partial, match)`, which answers the opposite question. A codemod rewrites it.
2. The `features` getter is replaced by the `features(partial)` function. A report lists the reads, because a codemod can't tell which `.features` belongs to a `PartialMatchRegExp`.

They don't depend on each other, and each is idempotent, so running one again is safe.

## Step 1 — `isComplete-to-hitEnd`

Before:

```ts
import PartialMatchRegExp, { isComplete } from "regex-partial-match";

if (!isComplete(partial, match)) wait();
const done = isComplete(partial, match);
```

After:

```ts
import PartialMatchRegExp, { hitEnd } from "regex-partial-match";

if (hitEnd(partial, match)) wait();
const done = !hitEnd(partial, match);
```

### Read this before applying it

The rename is mechanical. The answer is not always the same. `hitEnd()` is `true` when the match **read the end of the input**, so more input could change it. A greedy quantifier, `$`, `\b` or `\B` that read the end now makes `hitEnd()` `true`, where `isComplete()` was `true` too. So `!hitEnd()` is `false` where `isComplete()` was `true`:

```ts
const greedy = new PartialMatchRegExp(/hello \w+/);
isComplete(greedy, greedy.exec("hello world")); // true  (v1)
!hitEnd(greedy, greedy.exec("hello world")); // false (v2): \w+ read the end looking for more

const anchored = new PartialMatchRegExp(/^[a-z]+$/);
isComplete(anchored, anchored.exec("abc")); // true  (v1)
!hitEnd(anchored, anchored.exec("abc")); // false (v2): $ read the end
```

The codemod fixes the call shape. It cannot tell you whether this widened case matters to your caller, so check each rewritten site against your patterns. The [`hitEnd()` section of the README](../../../README.md#hitend) has the contract.

### Usage

**Unix/macOS**

```bash
curl -fsSL -o rpm-codemod.js https://raw.githubusercontent.com/TomStrepsil/regex-partial-match/v2.0.0/codemods/transforms/v1-v2/isComplete-to-hitEnd.js

# Dry run
npx jscodeshift -t rpm-codemod.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs --dry --print ./src

# Apply
npx jscodeshift -t rpm-codemod.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs ./src

rm rpm-codemod.js
```

**Windows (PowerShell)**

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/TomStrepsil/regex-partial-match/v2.0.0/codemods/transforms/v1-v2/isComplete-to-hitEnd.js" -OutFile rpm-codemod.js

# Dry run
npx jscodeshift -t rpm-codemod.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs --dry --print ./src

# Apply
npx jscodeshift -t rpm-codemod.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs ./src

del rpm-codemod.js
```

### Notes

- Only the `isComplete` import from `"regex-partial-match"` is handled, which is the only place v1 exported it. Imports from `"regex-partial-match/extend"` and `"regex-partial-match/partialMatchRegExp"` are left alone.
- A call through a namespace import (`rpm.isComplete(...)`) is rewritten the same way.
- If `hitEnd` is already imported, `isComplete` is dropped from the imports rather than imported twice.
- A local function that happens to be called `isComplete` is not touched.
- An aliased import (`isComplete as done`) becomes `hitEnd as done`, and its calls are rewritten like any other (`done(p, m)` becomes `!done(p, m)`). The alias now names the opposite meaning, so the import is printed with its file and line for you to rename.
- Each of these is left as it is and printed with its file and line, for you to migrate by hand:
  - `isComplete` used as a value rather than called: a callback, an assignment, a re-export, or destructured from a namespace import
  - `require()` and dynamic `import()` of the package
  - a call where `hitEnd` is bound to something else, or the file's own `hitEnd` is already taken
- Direct calls in the same file are still rewritten when one of those sites is printed, so the file may need finishing by hand.

---

## Step 2 — `features-getter-to-function` (report)

Before:

```ts
const used = partial.features;
```

After:

```ts
import { features } from "regex-partial-match";

const used = features(partial);
```

`features` is also imported from `"regex-partial-match/features"`.

This **reports** and leaves every file untouched. `.features` is an ordinary property name, and a codemod can't tell whether the object it is read from is a `PartialMatchRegExp`. It prints each read, with the replacement and the import line written out:

```
src/validate.ts:12: likely: `partial.features` is a getter in v1 and a function in v2; write `features(partial)`
    add: import { features } from "regex-partial-match";
```

- **likely**: the object is visibly a `PartialMatchRegExp`. It was bound in scope from `new PartialMatchRegExp(...)`, `new` of the default import, or `.toPartialMatchRegex()`, or it is annotated `PartialMatchRegExp`.
- **possible**: every other `.features` in a file that imports anything from `"regex-partial-match"` (any entry point, including `/extend`).

A file that imports nothing from the package reports nothing.

### Usage

Run it over your source. Nothing is changed, so there is no dry-run flag to remember.

**Unix/macOS**

```bash
curl -fsSL -o rpm-report.js https://raw.githubusercontent.com/TomStrepsil/regex-partial-match/v2.0.0/codemods/reports/v1-v2/features-getter-to-function.js

npx jscodeshift -t rpm-report.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs --dry ./src

rm rpm-report.js
```

**Windows (PowerShell)**

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/TomStrepsil/regex-partial-match/v2.0.0/codemods/reports/v1-v2/features-getter-to-function.js" -OutFile rpm-report.js

npx jscodeshift -t rpm-report.js --parser=tsx --extensions=js,jsx,ts,tsx,mjs --dry ./src

del rpm-report.js
```

### Notes

- A `features` destructured from an instance (`const { features } = partial`) is not found. Search for it by hand.
- If a variable called `features` is already in scope, the import line suggests `features as featuresOf`.
- A file that reads the package only through `require()` is not reported on.
