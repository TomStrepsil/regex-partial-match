# regex-partial-match

A zero-dependency regular expression transform for partial matching, enabling validation of incomplete input strings against regex patterns.

## 🧩 Problem statement

Unlike C/C++ (via [PCRE/PCRE2](https://www.pcre.org/original/doc/html/pcrepartial.html), [RE2](https://github.com/google/re2?tab=readme-ov-file#matching-interface), [Boost.Regex](https://www.boost.org/doc/libs/1_34_1/libs/regex/doc/partial_matches.html)), Python ([via third party regex module](https://pypi.org/project/regex/#:~:text=Added%20partial%20matches)) or Java (via [`hitEnd`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--)), Javascript has no canonical / innate partial-matching for regular expressions.

## 📖 Overview

This library transforms regular expressions to best-effort support **partial matching**, allowing you to test if an incomplete string could potentially match the full pattern. This is particularly useful for real-time input validation, autocomplete systems, progressive form validation, stream chunk matching, etc.

## 📦 Installation

```bash
npm install regex-partial-match
```

## 🚀 Usage

### Basic Usage

```javascript
import PartialMatchRegExp from "regex-partial-match";

const pattern = /^hello world/;
const partial = new PartialMatchRegExp(pattern);

partial.test("h"); // true - could match
partial.test("hello"); // true - could match
partial.test("hello world"); // true - full match
partial.test("goodbye"); // false - cannot match
```

### Telling a settled match from one still reading

`test()` and `exec()` answer "could this match?", which is `true` for a prefix and for a complete match alike. [`hitEnd()`](./docs/api.md#hitend), modelled on the JDK's [`Matcher.hitEnd()`](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#hitEnd--), reports whether the engine reached the end of the input while producing the match, so more input could still change it. Together they give progressive validation its three states:

```javascript
import PartialMatchRegExp, { hitEnd } from "regex-partial-match";

const partial = new PartialMatchRegExp(/^\d{4}-\d{2}-\d{2}/);

function state(input) {
  const match = partial.exec(input);

  if (match === null) return "invalid";
  return hitEnd(partial, match) ? "incomplete" : "complete";
}

state("20xx"); // 'invalid'    - reject
state("2024"); // 'incomplete' - no error, keep typing
state("2024-06"); // 'incomplete' - no error, keep typing
state("2024-06-15"); // 'complete'   - accept, enable submit
```

> [!NOTE]
> [`hitEnd()`](./docs/api.md#hitend) answers "could more input change this match?", not "is this text a match?". `/hello \w+/` matches `"hello world"` in full, and `hitEnd()` is still `true`: `\w+` read the end of the input looking for more. For an exact-length pattern like the date above the two questions coincide, which is what makes the three states work; a validator for an open-ended pattern that wants "valid so far" should test the original pattern as well.

Upgrading from 1.x, where this was `isComplete()`? See the [migration guide](./codemods/transforms/v1-v2/README.md).

### Smaller bundles

Each export has its own subpath for environments that don't tree-shake, and `regex-partial-match/core` leaves out the rules for carets and backreferences until you bind them back. See [Entry points](./docs/entry-points.md).

## ⚙️ How It Works

The library wraps each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a non-capturing group with a disjunction to the true end of the input, so the pattern matches any prefix of what the original would match:

```javascript
/abc/ → /(?:a|$(?![\s\S]))(?:b|$(?![\s\S]))(?:c|$(?![\s\S]))/
```

See [How It Works](./docs/how-it-works.md) for the full transform, where it over-accepts, how `^` is handled in groups and under the `m` flag, and how backreferences are matched.

## ✅ Supported syntax

Every regular expression feature up to ES2025 is supported, including lookarounds, backreferences, unicode sets and modifiers, except that a `\q{...}` string in a `v`-flag class matches only in full. The library is compiled to ES2015, and a pattern needs only what its own syntax needs. See [Compatibility](./docs/compatibility.md) for the full list, and the version each feature needs.

## ⚠️ Caveats

The one most people meet: an unanchored pattern always matches `""` at the end of the input, so `test()` returns `true` for any input. Anchor with `^`, or ask [`hitEnd()`](./docs/api.md#hitend). [Caveats](./docs/caveats.md) lists the rest, with examples and workarounds.

## 💡 Example

### Stream Processing

```javascript
import PartialMatchRegExp, { hitEnd } from "regex-partial-match";

const partial = new PartialMatchRegExp(/\{"[^"]+":"[^"]+"\}/);
let buffer = "";

function processChunk(chunk) {
  buffer += chunk;
  const matches = [];

  let match;
  while ((match = partial.exec(buffer)) && !hitEnd(partial, match)) {
    matches.push(match[0]);
    buffer = buffer.slice(match.index + match[0].length);
  }

  buffer = match ? buffer.slice(match.index) : "";

  return matches;
}

processChunk('{"na'); // [] - buffer: '{"na'
processChunk('me":"Jo'); // [] - buffer: '{"name":"Jo'
processChunk('hn"}{"age":'); // ['{"name":"John"}'] - buffer: '{"age":'
processChunk('25}{"ok'); // [] - '{"age":25}' can't match, buffer: '{"ok'
processChunk('":"yes"}'); // ['{"ok":"yes"}'] - buffer: ''
```

Each `exec()` finds the earliest match. One that didn't reach the end of the input is complete, so it's taken. The first one that did is a record still arriving, so the buffer keeps it and drops everything before it.

Useful for parsing log files, network streams, or any chunked data where records may be split across boundaries.


## 🔌 API

| Export | Import from | |
| --- | --- | --- |
| [`PartialMatchRegExp`](./docs/api.md#new-partialmatchregexp) | `regex-partial-match`, `regex-partial-match/partialMatchRegExp` | A `RegExp` that also matches any prefix of a possible match |
| [`hitEnd(partial, match)`](./docs/api.md#hitend) | `regex-partial-match`, `regex-partial-match/hitEnd` | Whether a match read the end of the input, so more input could change it |
| [`features(partial)`](./docs/api.md#features) | `regex-partial-match`, `regex-partial-match/features` | The syntactic constructs a pattern uses |
| [`isPartialMatchRegExp(value)`](./docs/api.md#ispartialmatchregexp) | `regex-partial-match`, `regex-partial-match/features` | Whether a value is a `PartialMatchRegExp` from any entry point |
| [`RegExp.prototype.toPartialMatchRegex()`](./docs/api.md#topartialmatchregex) | `regex-partial-match/extend` | A `PartialMatchRegExp` from an existing `RegExp` |
| [`withModules(...modules)`](./docs/entry-points.md#the-lean-entry-regex-partial-matchcore) | `regex-partial-match/core` | A `PartialMatchRegExp` class with only the modules you bind |

## 📜 License

ISC License - see [LICENSE](./LICENSE) file for details.

## 🙌 Credits

**Based on an algorithm created by [Lucas Trzesniewski](https://github.com/ltrzesniewski)**, re-created for NPM via ISC license, with permission.

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request on [GitHub](https://github.com/TomStrepsil/regex-partial-match), and see [Contributing](./docs/CONTRIBUTING.md).

## 🔗 Related projects

| Project                                                                                     | Description                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`incr-regex-package`](https://www.npmjs.com/package/incr-regex-package)                    | Incremental regex matcher                                                                                                                                                            |
| [`dfa`](https://github.com/foliojs/dfa)                                                     | Compiles a regular expression like syntax to fast deterministic finite automata, which could be used to partial match?                                                               |
| [`refa`](https://github.com/RunDevelopment/refa)                                            | Can [convert regular expressions to an Abstract Syntax Tree](https://rundevelopment.github.io/refa/docs/latest/classes/JS.Parser.html), which might afford partial-match capability? |
| [`@eslint-community/regexpp`](https://github.com/eslint-community/regexpp)                  | A regular expression parser for ECMAScript with AST generation and visitor implementation                                                                                            |
| [`Regex+`](https://www.npmjs.com/package/regex)                                             | template literal, transforming native regular expressions                                                                                                                            |
| [`Awesome Regex`](https://github.com/slevithan/awesome-regex)                               | Curated list of tools, tutorials, libraries, and other resources, covering all major regex flavours                                                                                  |
| [`replace-content-transformer`](https://github.com/TomStrepsil/replace-content-transformer) | A toolkit for stream content replacement, underpinned by `regex-partial-match`                                                                                                       |
