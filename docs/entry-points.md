# Entry points

## A note on Tree-Shaking

If your environment doesn't tree-shake (e.g. Deno, or unbundled Node), the default entry loads [`hitEnd`](./api.md#hitend) and [`features`](./api.md#features) with the class. Import each from its own subpath instead, and only the ones you use:

```javascript
import PartialMatchRegExp from "regex-partial-match/partialMatchRegExp";
import hitEnd from "regex-partial-match/hitEnd";
import features from "regex-partial-match/features";
```

[`hitEnd`](./api.md#hitend) and [`features`](./api.md#features) accept an instance of any `PartialMatchRegExp` class, including those from [`regex-partial-match/core`](#the-lean-entry-regex-partial-matchcore).

To tell an instance from a plain `RegExp` without importing a class, use [`isPartialMatchRegExp()`](./api.md#ispartialmatchregexp). It returns `true` for an instance of any `PartialMatchRegExp` class and `false` for anything else, including a plain `RegExp`:

```javascript
import PartialMatchRegExp from "regex-partial-match/core";
import { isPartialMatchRegExp } from "regex-partial-match/features";

isPartialMatchRegExp(new PartialMatchRegExp(/a/)); // true
isPartialMatchRegExp(/a/); // false
```

## The lean entry: `regex-partial-match/core`

`regex-partial-match/core` exports a `PartialMatchRegExp` without two sets of rules, so a bundle that doesn't need them can leave them out. Each set is a module you bind back with `withModules`:

| Module           | Import                                       | Supplies                                                                                                            |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `carets`         | `regex-partial-match/modules/carets`         | the rules for a `^` under the `m` flag that has something before it, and for a `^` in a group or positive lookahead |
| `backreferences` | `regex-partial-match/modules/backreferences` | matching a backreference against the text its group captured                                                        |

Both are also named exports of `regex-partial-match/modules`.

```javascript
import PartialMatchRegExp, { withModules } from "regex-partial-match/core";
import carets from "regex-partial-match/modules/carets";
import backreferences from "regex-partial-match/modules/backreferences";

new PartialMatchRegExp(/^\d{4}-\d{2}/).test("20"); // true

const WithBoth = withModules(carets, backreferences);
new WithBoth(/(a|b)\1/).test("a"); // true
```

The `backreferences` module, and so the default `PartialMatchRegExp`, lets a backreference stop part way through its group's capture only within 64 characters of the end of the input. Past that, the backreference matches in full or not at all. `backreferencesWith({ longestPartial })`, also exported from `regex-partial-match/modules/backreferences`, returns the module with another limit. See [Backreferences](./modules/backreferences.md#%EF%B8%8F-longestpartial) for what the value costs.

```javascript
import { backreferencesWith } from "regex-partial-match/modules/backreferences";

const LongPartials = withModules(carets, backreferencesWith({ longestPartial: 256 }));
```

`withModules` returns a `PartialMatchRegExp` class extending `RegExp`, and the same set of modules in any order returns the same class: `withModules()` is the `core` class, and `withModules(carets, backreferences)` is the default `PartialMatchRegExp`, so `instanceof` holds between them. [`hitEnd`](./api.md#hitend) and [`features`](./api.md#features) accept instances of any of these classes.

A module's type is `Module`, exported from both `regex-partial-match/core` and `regex-partial-match/modules`, for annotating a list of modules: `const modules: Module[] = [carets, backreferences]`. It is opaque, so what a module holds is not part of the API, and `withModules` throws a `TypeError` for anything that isn't a module.

### Choosing an entry point

If your patterns aren't known when you build, because they come from users or configuration, use `regex-partial-match`. If they are fixed, use `core`: construct each pattern once, and bind the modules construction asks for.

| Error when constructed                                   | Bind             |
| -------------------------------------------------------- | ---------------- |
| `TypeError: Needs the carets module`                     | `carets`         |
| `TypeError: Needs the backreferences module`             | `backreferences` |
| `TypeError: Needs the carets and backreferences modules` | both             |

The error names every module the pattern needs, and none that is already bound.

**Without `carets`**, a `^` is accepted outside every group and positive lookahead and, under the `m` flag, only at the start of the pattern or of a top-level alternative, with nothing before it but `^`, `$`, `\b`, `\B`, a negative lookahead or a lookbehind: `/^a|^b/m` and `/\b^a/m` compile. A `^` inside a lookbehind or negative lookahead is always accepted, since those are kept as written: `/(?<=^)a/` compiles. Any other `^` throws `TypeError: Needs the carets module` when constructed, as `/x^a/m` and `/(?=a)^a/m` do. So does a `^` inside a group or positive lookahead, even without `m`, as in `/(^a|^b)/` and `/(?m:^a)/`, since the rule that moves such a caret in front of its group is in the carets module. The rule stays there to keep `core` small. An unquantified group whose every alternative starts with `^` matches the same with the caret written once in front of it, and `core` accepts `/^(a|b)/` where it refuses `/(^a|^b)/`. Every pattern `core` accepts is transformed exactly as by the default class.

**Without `backreferences`**, a pattern whose backreference must be matched at run time throws `TypeError: Needs the backreferences module` when constructed, as `/(a)\1/` does. An escape that resolves without it still compiles: in `/x\8y/` there is no group 8, so `\8` is the literal `8`.
