# Partial Match Parity

Several widely-used regex libraries offer native partial-match support. This document maps their concepts and test cases to this library's behaviour.

> [!NOTE]
> The parity tests added in `src/createPartialMatchRegex.test.ts` ("parity with reference implementations") vary in how directly they reflect each source:
>
> - **JDK** — test cases are explicit: the `hitEndTest`, `caretAtEndTest`, and `wordSearchTest` methods in `RegExTest.java` name specific patterns and inputs (e.g. `/^squidattack/` on `"squid"` / `"squack"`, `/^x?/m` on `"\r"`, `/\b/` on `"word1 word2 word3"`), which are reproduced directly.
> - **Lucene** — test cases are derived: `TestRegExp.java` describes what each test method exercises (patterns like `[^y]*{1,2}`, `"(a)|".repeat(50000)`, and character sets σ/Σ/ῼ/ﬗ), but the specific assertions in the test suite here are our own translations of those properties.
> - **RE2** — test cases are conceptual only: `tester.cc` and `exhaustive_tester.cc` implement a parametric consistency framework (NFA/DFA/backtracking agreement), not a fixed set of `(pattern, input, expected)` tuples. The RE2 rows below document semantic alignment rather than quoting specific test cases.

## Apache Lucene (`TestRegExp.java`)

Lucene implements partial matching via a deterministic finite automaton (DFA). Parity tests are **derived** from the described behaviour of each test method — not direct quotations of Lucene assertions.

Lucene's automaton-based regex dialect **cannot express backreferences** (finite automata cannot represent them). `TestRegExp.java` contains no backreference tests.

| Lucene test method                 | Property tested                                                      | This library                                                      |
| ---------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------- | 
| `testSmoke`                        | Basic grouping — `a(b+\|c+)d`matches`abbbbbd`, `acd`; rejects `ad`   | ✅ Covered — quantifiers, groups, disjunctions                     |
| `testUnicodeAsciiInsensitiveFlags` | Unicode case folding — `σ`/`Σ`, `ῼ`, `ﬗ`                            | ✅ Covered — `i` + `u` flags delegate to JS Unicode case folding  |
| `testRepeatWithEmptyString`        | Quantifiers over empty-matching sub-expressions — `[^y]*{1,2}`       | ✅ Covered — `a*suffix`, `a?suffix`, `^[^y]*suffix`               |
| `testRegExpNoStackOverflow`        | Deep nesting / stack safety — `(a)` × 50 000                         | ✅ Covered — wide alternation (× 1 000) and deeply nested groups (depth 100) |
| `testCoreJavaParity`               | 2 000 random expressions validated against `java.util.regex.Pattern` | ✅ Covered structurally — every prefix of every pattern is tested |
| Backreferences                     | Not in scope — unsupported by the automaton dialect                  | See `PartialMatchRegExp` below                                    |

## Google RE2 (`tester.cc`, `exhaustive_tester.cc`)

RE2 exposes partial matching via `UNANCHORED` mode (match anywhere in the string) versus `ANCHOR_BOTH` (full-string match). `tester.cc` and `exhaustive_tester.cc` implement a parametric testing framework that validates NFA, DFA, and backtracking engines against each other across exhaustively-generated patterns — there are **no fixed `(pattern, input, expected)` test cases to quote**. Parity is therefore assessed **conceptually** against RE2's semantics.

RE2 **explicitly excludes backreferences by design**. From `re2.h`: _"backreferences and generalized assertions are not available"_. This is a deliberate trade-off to guarantee linear-time matching; there are therefore no backreference tests anywhere in RE2's test suite.

| RE2 concept                                          | This library                                                                            |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `UNANCHORED` — match substring anywhere              | ✅ Use the pattern without `^`/`$` anchors                                              |
| `ANCHOR_START` — match from beginning                | ✅ Use `^` anchor                                                                       |
| `ANCHOR_BOTH` — full-string match                    | ✅ Use `^…$` anchors                                                                    |
| First-match (NFA) vs longest-match (POSIX) semantics | ✅ ECMAScript / NFA first-match — `(a\|aa)\1` on `"aaaa"` yields `m[1]="a"`, not `"aa"` |
| Capturing groups across anchoring modes              | ✅ Covered — see groups tests                                                           |
| Backreferences                                       | ⚠️ full match only                                                                      |
| Multi-engine consistency                             | N/A — JS has a single engine per runtime                                                |

## OpenJDK (`java.util.regex` — `RegExTest.java`)

Java expresses partial matching through `Matcher.hitEnd()`, `Matcher.lookingAt()`, and `Matcher.find()`. Parity tests are **explicit**: the specific patterns and strings below are taken directly from named test methods in `RegExTest.java`.

The JDK **does** support backreferences, and `RegExTest.java` includes `backRefTest()` (~line 2520) and `ciBackRefTest()` (~line 2568) for numeric backreferences with `find()`. However, **neither method combines backreferences with `hitEnd()` or any other partial-match concept** — they test full-match correctness only. There are no JDK tests for the behaviour of `hitEnd()` on patterns containing backreferences.

| JDK test method / concept        | Specific case                                                  | This library equivalent                                                                      |
| -------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `hitEndTest` (lines 545–588)     | `/^squidattack/` on `"squid"` → `hitEnd=true`                  | `exec("squid")[0] === "squid"` (non-empty = prefix found)                                    |
| `hitEndTest`                     | `/^squidattack/` on `"squack"` → `hitEnd=false`                | `exec("squack") === null` (anchored, diverges early)                                         |
| `hitEndTest`                     | `/^abc/` on `"ab"` → `hitEnd=true`                             | `exec("ab")[0] === "ab"`                                                                     |
| `hitEndTest`                     | `/^abc/` on `"ad"` → `hitEnd=false`                            | `exec("ad") === null`                                                                        |
| `hitEndTest`                     | `/catattack/` on `"attackattackattackcatatta"` → `hitEnd=true` | `exec(...)[0] !== ""`                                                                        |
| `caretAtEndTest` (lines 506–513) | `/^x?/m` on `"\r"` — successive `find()` calls                 | First match at index 0; second (after manual `lastIndex++`) at index 1                       |
| `wordSearchTest` (lines 483–503) | `/\b/` on `"word1 word2 word3"` with progressive `find(pos)`   | `\bwor` with `g` flag and progressive `lastIndex` — finds matches at 0, 6, 12                |
| `backRefTest` (~line 2520)       | `(a*)bc\1`, `(abc)(def)\1` — full match via `find()`           | Full match only; no partial-match equivalent in the JDK test                                 |
| `ciBackRefTest` (~line 2568)     | Same patterns with `(?i)` case-insensitive flag                | Full match only; no partial-match equivalent in the JDK test                                 |
| `Matcher.hitEnd()`               | Semantic: did the engine exhaust input?                        | `exec(input)[0] !== ""` — non-empty result means valid prefix                                |
| `Matcher.lookingAt()`            | Prefix match from start                                        | `exec` with `^` anchor                                                                       |
| `Matcher.matches()`              | Full-string match                                              | `exec` with `^…$` anchors                                                                    |
| `Matcher.find()`                 | Next substring match                                           | `exec` on a `g`-flagged regex, advancing `lastIndex`                                         |
| `Matcher.find(pos)`              | Match from a given position                                    | Set `lastIndex` before calling `exec`                                                        |
| `Matcher.requireEnd()`           | More input could invalidate a current match                    | No direct equivalent; patterns ending with `$` or `\b` exhibit this — not explicitly exposed |

## Summary

| Feature                                  |         Lucene         |          RE2          |                JDK                 |        This library        |
| ---------------------------------------- | :--------------------: | :-------------------: | :--------------------------------: | :------------------------: |
| Literal prefix matching                  |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Character classes                        |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Quantifiers (including zero-match)       |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Disjunctions                             |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Groups (capturing, non-capturing, named) |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Lookahead / lookbehind                   |           —            |          ✅           |                 ✅                 |             ✅             |
| Unicode case folding                     |           ✅           |          ✅           |                 ✅                 |     ✅ (`i`+`u` flags)     |
| Deep nesting / stack safety              |           ✅           |          ✅           |                 ✅                 |             ✅             |
| Anchored full match                      |           ✅           |          ✅           |          ✅ (`matches()`)          |         ✅ (`^…$`)         |
| Unanchored substring match               |           ✅           |          ✅           |           ✅ (`find()`)            |       ✅ (no anchor)       |
| hitEnd() / prefix-only match             |           —            |           —           |                 ✅                 | ✅ (non-empty exec result) |
| requireEnd()                             |           —            |           —           |                 ✅                 |       ⚠️ Not exposed       |
| Backreference partial matching           | ❌ unsupported dialect | ❌ excluded by design | ⚠️ full match only (`backRefTest`) |     ⚠️ full match only     |
| Multi-engine consistency                 |           —            |          ✅           |                 —                  |            N/A             |
