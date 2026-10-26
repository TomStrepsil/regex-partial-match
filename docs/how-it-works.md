# How It Works

## 🔧 The transform

The library transforms a regular expression by wrapping each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a [non-capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group) with a [disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) to a true-end-of-input sentinel, `$(?![\s\S])`:

```javascript
/abc/ → /(?:a|$(?![\s\S]))(?:b|$(?![\s\S]))(?:c|$(?![\s\S]))/
```

This allows the pattern to match prefixes of the original pattern, enabling validation of incomplete input.

We call the added `|$(?![\s\S])` alternative an atom's **truncation branch**. `$(?![\s\S])` matches only at the very end of the input and reads nothing, so the branch can be taken only where the input was cut short, or truncated, before that atom. We say the atom then *runs out* of input. Every atom after it runs out the same way, so a match of a prefix ends there. Wherever more input follows, the branch can't be taken, and the atom has to match just as it would in the original pattern:

```javascript
/^abc/ on "ab"  → "ab": a and b match, c runs out
/^abc/ on "abx" → null: c can't match x, and its truncation branch can't fire before the end
```

(Why `$(?![\s\S])` rather than `$`: see [below](#why-ss-and-not-).)

Since the library accepts only valid regular expressions, this enables the algorithm to make lots of unguarded assumptions about the source of the expression. To remain lightweight, no runtime type validation is applied, so non-TypeScript consumers will be reliant on underlying errors thrown if used incorrectly.

The library has been stress-tested with various regular expression features in isolation, and some in likely combination, but obviously it's an unbounded test space.

### Groups and truncation branches

A group gets a truncation branch of its own only if its body cannot run out by itself. It does without one when every alternative of the body starts with one of:

- an atom that has a truncation branch (a backreference, a lookbehind and a negative lookahead count, since they are given one too)
- a group that can run out by itself
- a positive lookahead whose body can run out by itself
- nothing but carets

A body that nothing can complete is then not skipped at the end of the input: `/a(b^)/` on `"a"` and `/((a)^)/m` on `""` are `null`.

```javascript
/(ab)/      → /((?:a|$(?![\s\S]))(?:b|$(?![\s\S])))/
/(a(?<=a))/ → /((?:a|$(?![\s\S]))(?:(?<=a)|$(?![\s\S])))/
```

### Quantified atoms

An atom with an unbounded quantifier (`*`, `+`, or `{n,}`) splits its minimum count from subsequent repetitions. The minimum keeps the truncation branch so a partial match cut short can still end at the end of input, and the remaining repetitions run as a native loop with no branch:

```javascript
/\S+/    → /(?:\S|$(?![\s\S]))\S*/
/\w{2,}/ → /(?:\w|$(?![\s\S])){2}\w*/
/a*b/    → /a*(?:b|$(?![\s\S]))/
```

Writing the bare atom after the group, rather than as a second alternative as in `(?:\w{2,}|\w{0,1}$(?![\s\S]))`, avoids a V8 fault: on Node.js 24 and 26 and Deno, a character class in a later alternative inside `(?i:…)` or `(?-i:…)` loses the modifier's case setting, so `/(?i:xx|[ab])/` doesn't match `"A"`.

Bounded counts, such as `{3}` or `{3,5}`, are left as they were, since they stop at their maximum. V8 also loses the modifier's case setting on a bounded lazy loop over a character class, so `/(?i:[ab]{0,2}?)B/` matches only `"B"` of `"AB"`, which the per-repetition form avoids. A bounded count in the millions can still overflow; see [Very long repetitions](./caveats.md#very-long-repetitions).

V8 15.8 gets both cases right, but no Node.js release has it yet. [nodejs/node#66277](https://github.com/nodejs/node/issues/66277) asks for the related modifier fix to be backported.

### Why `$(?![\s\S])` and not `$`

A bare `$` alone isn't sufficient here: under the `m` (multiline) flag, including one turned on locally via a `(?m:...)` [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier), `$` also matches immediately before *any* line terminator, not just the true end of input. That would let a `"\n"` the source pattern never allowed for be silently accepted as if the input had simply run out, e.g. `new PartialMatchRegExp(/^foobar/m)` would wrongly accept `"foo\nbaz"`. Appending `(?![\s\S])` narrows the disjunction down to strict end-of-input, regardless of multiline state.

See [chromium issue 536420076](https://issues.chromium.org/u/2/issues/536420076) for the underlying V8 bug that requires `$` to precede `(?![\s\S])` rather than using the lookahead alone.

A shorter option, `(?-m:$)` (disabling multiline locally so `$` means strict end-of-input on its own) also sidesteps the bug and saves a few bytes per atom. However, modifier groups are new enough that support isn't universal, and feature-detecting them would add a fallback branch the test suite can't exercise honestly, since every engine that can realistically be tested against already supports them.

## ⚖️ Assertions at the end of the input

The transform answers a two-valued question: does the input match the wrapped pattern? for what is really a three-valued one, could *some* continuation make the original match? The two agree except in one situation. An assertion evaluated where the input runs out — `\b`, `\B`, a mid-pattern `$`, or a lookaround — sees the end of the input as a fixed fact rather than an unknown continuation. `\b` after a word character at end of input is true; `$` there is true; a lookahead body is accepted once it runs out; a lookbehind or negative lookahead holds there. When the rest of the pattern then requires something those assertions have just ruled out, the input is accepted although no continuation can complete it:

- `/^\b$/` accepts `""` — `\b` wants a word character next, `$` wants none
- `/$[^a]/` accepts `""` — `$` wants the end, `[^a]` wants a character
- `/(?=-)+a+/` accepts `""` — the next character would have to be both `-` and `a`
- `/[]/` accepts `""` — an atom that can never match still gets a truncation branch
- `/abc(?<!c)/` accepts `"abc"` — the lookbehind is given a truncation branch, so it holds at the end of the input even though no continuation changes what it reads
- `/a(?!b)b/` accepts `"a"` — `(?!b)` holds at the end of the input, then `b` wants what it ruled out

A lookbehind or negative lookahead holds at the end of the input because, wherever the input ran out before it, a continuation decides it: `/(?:\d|[a-f]){24}(?<![a-f])/` on `"abc"` matches, since 21 more digits complete it. Judging it against the input instead would reject that, and a failure there would send the engine back through every way of reaching the end of the input, once per alternative for each repetition the input can't fill.

The over-acceptance only arises on a path that is contradictory at that point, and it is always in the safe direction for a validator: keep buffering. The truncation branch of a lookbehind or negative lookahead accepts wrongly only where no continuation could make the assertion hold: a lookbehind that fails on characters already read, or a negative lookahead whose body matches there whatever follows, as in `/a(?!a?)/`. A negative lookahead that holds at the end of the input by itself is like `\b` or `$`: the rest of the pattern can contradict it, as in `/a(?!b)b/`. Each pattern above is contradictory on every path, so it can never match at all. A pattern that can match may still have a contradictory path, and that path can win over a viable one, with [`hitEnd()`](../README.md#hitend) `true`:

- at an earlier index: `/^b\ba|a/` on `"b"` returns `"b"` at 0
- at the same index, where a greedy quantifier tries it first: `/[ab]+(?<!a)/` on `"ba"` returns `"ba"`, where the native pattern matches `"b"`, and on `"bac"` it returns `"b"`

Nothing short of a full matcher can decide the three-valued question, so this is stated as a limit rather than patched case by case.

Away from the end of the input, a lookbehind is judged as written, so a positive lookbehind must match in full before a match can start after it. See [Positive Lookbehinds](./caveats.md#positive-lookbehinds).

## ⚓ A caret whose position is fixed

Where nothing consuming precedes a caret on its path — at the start of the pattern or of an alternative, or behind only lookarounds — its position is fixed and it stays verbatim, which is what keeps the start anchor's [empty-match mitigation](./caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match) working for `/^x/m` and `/^a|^b/m` alike.

Assertions at one position commute, so a `$`, `\b`, `\B`, a lookaround or another caret between the part and the caret is looked through.

Any other caret needs the carets module, whose rules are in [Carets](./modules/carets.md): a caret leading a group body moves in front of the group, and under `m` a caret after something consuming is folded into that part. `regex-partial-match/core` without the module accepts a caret in a lookbehind or negative lookahead, which keeps it as written. Elsewhere it accepts a caret only outside every group and positive lookahead, and under `m` only at the start of the pattern or of a top-level alternative, with nothing before it but `^`, `$`, `\b`, `\B`, a negative lookahead or a lookbehind. Any other caret throws `TypeError: Needs the carets module`, as `/(^a|^b)/`, `/\W^/m` and `/(?=a)^a/m` do, so every pattern it accepts is transformed exactly as by the default class.

## 🔁 Patterns with backreferences

Backreferences cannot be handled by the `|$(?![\s\S])` transform alone because they are atomic — `\1` must match the entire captured string or fail, and its length is only known at runtime.

Each backreference that can run out part way through its group's capture gets a second alternative, built once with the pattern. It captures the rest of the input into a hidden group, provided that rest is no longer than [`longestPartial`](./modules/backreferences.md#longestpartial) characters, and lookbehinds check that the nearest occurrence of the capture starts with it. The engine therefore resolves partial backreferences in its own priority order, as it does every other atom. The hidden groups are removed from the match before it's returned. See [Backreferences](./modules/backreferences.md) for the full algorithm.

This path belongs to the backreferences module. `regex-partial-match/core` without it throws `TypeError: Needs the backreferences module` when a pattern needs the path, and compiles a pattern whose escapes resolve statically, such as `/x\8y/`, with the transform above.

## 🧩 Modules and derived instances

`withModules` keeps one class per set of modules, whatever their order, so `instanceof` holds between calls and between entry points. `regex-partial-match/core` exports `withModules()`, and `regex-partial-match` exports `withModules(carets, backreferences)`.

`split()` and `matchAll()` build their copies through `Symbol.species`. A class does not override it, so `RegExp`'s own getter returns the class it is read on, and a copy is constructed by the same class, with the same modules bound.

## 🎯 `hitEnd()`

[`hitEnd()`](../README.md#hitend) reports whether a match read the end of the input, so more input could still change it.

### Why the question can't be answered from the outside

Neither of the obvious workarounds answers it:

- **Checking whether the match ends at the end of input.** True for a greedy tail that ran out, but also for an exact-length match such as `/^\d{4}/` against `"2024"`, which read nothing past the last digit and which `hitEnd()` correctly reports `false`; and false for a read of the end inside a lookahead, which never moves the match's own end.
- **Re-running the original pattern.** That asks whether the original matches *at all* at that position, not whether *this result* was arrived at by reading the end. Where a truncation branch fires inside a zero-width assertion the two diverge, and the original can return an identical array by a different path:

  ```javascript
  const pattern = /a(?=(?:b(?:x|(c))d|b))/;
  const partial = new PartialMatchRegExp(pattern);

  partial.exec("ab");   // ['a', undefined] — truncated inside the assertion
  pattern.exec("ab");   // ['a', undefined] — identical, and complete
  pattern.exec("abcd"); // ['a', 'c']       — what more input actually produces
  ```

  Over `"ab"` the transformed pattern satisfies the atoms after `b` through *their* truncation branches — zero-width, so the match's own end never moves — before ever reaching the `(c)` group. Group 1 is left `undefined` where more input would define it.

### Recording a read of the end

The information only exists during matching. `hitEnd()` recovers it by re-running the compiled pattern, [sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) at `match.index`, with an empty group in front of each truncation branch, after each greedy quantifier and after `$`, `\b` and `\B`, the latter three placed so that they can only match at the true end of the input. A group with a minimum count of two or more that holds a lookbehind or negative lookahead gets one after it too, lazy or exact, because an iteration it requires can start at the end of the input after one that ran out, match nothing through that lookaround, and reset the earlier iteration's markers on the way in. With those markers gone, an iteration that ran out can't be told from one that ended exactly at the end, so this marker reports `true` whenever the repetition ends there: `/(?:(?<=b)|a){2}/` on `"aa"`, which no continuation changes. A negative lookahead repeated directly that way, which only patterns without `u` or `v` allow, gets the same marker. There it usually records a read of the end the lookahead itself made, which the probe otherwise can't see: `/a(?!b){2}/` on `"a"` is `true`, and `"ab"` changes the match. A greedy `?` after an atom that already has a marked truncation branch is written as a choice of the atom, or of nothing only where input remains, so the end of the input is read one way rather than three; an empty group is zero-width and always succeeds, so the twin walks the identical path, and any marker that comes back defined is a read of the end the match actually made.

Recognising a truncation branch or a raw lookaround back out of the rendered pattern is one classification, and numbering the capturing groups, including those a raw lookaround opens, is one count. Each is shared by every pass that needs it, the backreferences module's included, rather than re-derived independently wherever it's needed.

The marked copy, the twin, is built on first use and stays inside the library: the array, `groups`, numbering and `d`-flag indices you hold are the ones `exec()` produced.

Beyond the rendered pattern, the twin needs the numbered backreferences and groups inside each raw lookaround: its numbered backreferences are renumbered past the markers before it, and the markers after it are numbered past its groups. A `\k<name>` needs no renumbering and is copied unchanged. Construction records a raw lookaround only when it holds a numbered backreference or a group, so a pattern with neither records nothing.

One twin is cached per instance. A backreference in it keeps the branch that runs out part way through its capture, with a marker after it and its hidden groups numbered among the markers, so the twin follows the path `exec()` took whatever the group captured: `/(ab)\1|a/` on `"aba"` returns `"aba"`, and `hitEnd()` is `true`.

> [!NOTE]
> See [Partial Match Parity](./partial-match-parity.md) for full details on how the library compares to reference implementations
