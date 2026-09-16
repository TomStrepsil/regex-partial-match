# How It Works

## 🔧 The transform

The library transforms a regular expression by wrapping each [atomic element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions#atoms) in a [non-capturing group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group) with a [disjunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction) to a true-end-of-input sentinel, `$(?![\s\S])`:

```javascript
/abc/ → /(?:a|$(?![\s\S]))(?:b|$(?![\s\S]))(?:c|$(?![\s\S]))/
```

This allows the pattern to match prefixes of the original pattern, enabling validation of incomplete input.

A group needs a truncation branch of its own only where its body cannot run out by itself. Where every alternative of the body starts with such an atom or with a group that can run out by itself, or holds nothing but carets, the group does without one, so a body nothing can complete is not skipped at the end of the input: `/a(b^)/` on `"a"` and `/((a)^)/m` on `""` are `null`. A body containing a lookbehind keeps the branch, since a lookbehind judged at the end of the input can fail where a continuation would satisfy it: `/(a(?<=a))b/` on `"b"` still matches `""` at index 1.

```javascript
/(ab)/      → /((?:a|$(?![\s\S]))(?:b|$(?![\s\S])))/
/(a(?<=a))/ → /((?:a|$(?![\s\S]))(?<=a)|$(?![\s\S]))/
```

Since the library accepts only valid regular expressions, this enables the algorithm to make lots of unguarded assumptions about the source of the expression. To remain lightweight, no runtime type validation is applied, so non-TypeScript consumers will be reliant on underlying errors thrown if used incorrectly.

The library has been stress-tested with various regular expression features in isolation, and some in likely combination, but obviously it's an unbounded test space.

### Why `$(?![\s\S])` and not `$`

A bare `$` alone isn't sufficient here: under the `m` (multiline) flag, including one turned on locally via a `(?m:...)` [modifier](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Modifier), `$` also matches immediately before *any* line terminator, not just the true end of input. That would let a `"\n"` the source pattern never allowed for be silently accepted as if the input had simply run out, e.g. `new PartialMatchRegExp(/^foobar/m)` would wrongly accept `"foo\nbaz"`. Appending `(?![\s\S])` narrows the disjunction down to strict end-of-input, regardless of multiline state.

See [chromium issue 536420076](https://issues.chromium.org/u/2/issues/536420076) for the underlying V8 bug that requires `$` to precede `(?![\s\S])` rather than using the lookahead alone.

A shorter option, `(?-m:$)` (disabling multiline locally so `$` means strict end-of-input on its own) also sidesteps the bug and saves a few bytes per atom. However, modifier groups are new enough that support isn't universal, and feature-detecting them would add a fallback branch the test suite can't exercise honestly, since every engine that can realistically be tested against already supports them.

## ⚖️ Assertions at the end of the input

The transform answers a two-valued question: does the input match the wrapped pattern? for what is really a three-valued one, could *some* continuation make the original match? The two agree except in one situation. An assertion evaluated where the input runs out — `\b`, `\B`, a mid-pattern `$`, or a lookaround body — sees the end of the input as a fixed fact rather than an unknown continuation. `\b` after a word character at end of input is true; `$` there is true; a lookahead body is accepted once it runs out. When the rest of the pattern then requires something those assertions have just ruled out, the input is accepted although no continuation can complete it:

- `/^\b$/` accepts `""` — `\b` wants a word character next, `$` wants none
- `/$[^a]/` accepts `""` — `$` wants the end, `[^a]` wants a character
- `/(?=-)+a+/` accepts `""` — the next character would have to be both `-` and `a`
- `/[]/` accepts `""` — an atom that can never match still gets a truncation branch

The over-acceptance only arises on a path that is contradictory at that point, and it is always in the safe direction for a validator: keep buffering. It has one visible side effect — a contradictory *branch* can win an earlier index than a later, viable one, as in `/^b\ba|a/` on `"b"`. Nothing short of a full matcher can decide the three-valued question, so this is stated as a limit rather than patched case by case.

A lookbehind body judged at a truncated end is the remaining case that runs the other way, and is covered under [Positive Lookbehinds](./caveats.md#positive-lookbehinds).

## ⚓ A start anchor leading a group

A group's truncation branch, where it keeps one, would skip a `^` leading its body: wrapped naively, `/(^x)/` would match `""` at the end of `"a"`, losing the start anchor's [empty-match mitigation](./caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match). So where every alternative of the body starts with a caret, behind nothing but assertions or empty groups — quantified or not, since neither consumes anything either way — or under `m` a quantified atom that cannot end a line, a group that is entered at least once takes the caret in front of it. Under `m` that caret is judged against the part before the group by the [rule below](#--under-the-m-flag).

A group entered once drops the carets from its body. A repeated group keeps them for its later repetitions: outside `m` it does without its own truncation branch, so a later repetition cannot skip its caret, and under `m` they take the branch `(?:^|$(?![\s\S]))` described below. A group that must repeat at least twice, whose body cannot end a line in any alternative, can never reach a later repetition, so under `m` it is refused: `/(^a){2}/m` on `"a"` is `null`. A group that may repeat zero times cannot take the caret in front, and is otherwise treated the same way:

```javascript
/(^a|^b)/   → /^((?:a|$(?![\s\S]))|(?:b|$(?![\s\S])))/
/((?!b)^a)/ → /^((?!b)(?:a|$(?![\s\S]))|$(?![\s\S]))/
/(^a)+/     → /^(^(?:a|$(?![\s\S])))+/
/(^a)*/     → /(^(?:a|$(?![\s\S])))*/
```

The first three return `null` on `"c"`, and the last matches `""` at index 0, as the original does. A body with an alternative that does not start with a caret is left alone, and so is a `(?-m:^...)` group inside a multiline pattern, where a caret in front of the group would mean a line start. A caret a `(?m:...)` group moves in front of itself inside a pattern without `m` is still a line start, judged by the [rule below](#--under-the-m-flag), so a group around it keeps its truncation branch: `/\n((?m:^a))/` on `"a"` matches `""` at index 1.

## ⚓ `^` under the `m` flag

The one assertion that can run the other way — false at a truncated end, true one character later — is `^` under the `m` flag. A line start depends on the character *before* it, which is always in hand, so a caret is decidable even at the end of the input — unless the atom before it took a truncation branch, in which case the caret is being judged at the wrong position: in the full input that atom would have consumed something and the caret would have been evaluated later. Refusing it there is unsafe for a validator, since it rejects input a continuation would complete. So under `m` a caret is folded into the taken branch of the nearest consuming part before it on its own path:

```javascript
/\W^/m     → /(?:\W^|$(?![\s\S]))/
/a\n^/m    → /(?:a|$(?![\s\S]))(?:\n^|$(?![\s\S]))/
```

Taken, the atom is followed by the caret and the real character decides; truncated, the caret is skipped along with the rest of the atom. `/\W^/m` therefore keeps `"a"` viable at index 1, where the continuation `"\n"` does double duty, satisfying `\W` and creating the line start — and still refuses `"-"` at index 0, where `\W` was taken and the character before the caret is known.

### A part that cannot end a line

A caret only holds after a line terminator, so the rule first asks whether the part before it can end with one, under that part's own `i`, `s` and `u`/`v` scope. Where it cannot, no continuation completes the path, and the path is refused: `/ba^/m` on `"b"`, `/^a+^b/m` on `"a"` and `/\W*(a)^/m` on `"-"` all return `null`. A quantifier that allows zero repetitions of such an atom can only satisfy the caret by repeating zero times, so the caret is judged against the part before it instead: `/\na*^/m` on `"\na"` matches `"\n"`.

### Groups

A group is judged by the end of its body, and a group whose body consumes nothing, such as `(\b)`, is looked through. The caret is folded into the body's last atom, takes a branch of its own after a quantifier or backreference ending the body, and wraps the whole body where it ends in anything else. A body that alternates is judged by the end of each alternative the same way, and wrapped where any alternative ends in anything else or consumes nothing. Each stays inside the group, spelled `(?m:^)` where the group turns multiline off, so a group the input ran out in front of, or part way through, still captures what it has:

```javascript
/(a\n)^/m  → /((?:a|$(?![\s\S]))(?:\n^|$(?![\s\S])))/
/(a\n?)^/m → /((?:a|$(?![\s\S]))(?:\n|$(?![\s\S]))?(?:^|$(?![\s\S])))/
/(a|\n)^/m → /((?:a|$(?![\s\S]))[]|(?:\n^|$(?![\s\S])))/
```

A caret the body leaves verbatim, because nothing consuming precedes it inside the group, is judged where the group starts. Where it leads every alternative it moves in front of the group, as [above](#-a-start-anchor-leading-a-group): `/\W(\S*^)/m` on `"-"` matches `""` at index 1. Otherwise the group keeps its truncation branch, a modifier group included. Only a caret the `m` flag reaches does: one left inside a `(?-m:...)` scope can hold nowhere but the start of the input, so the group around it is refused rather than skipped — `/((?-m:^x))/m` on `"a"` is `null`.

A caret leading an unquantified lookahead body is judged against the part before the lookahead, unless the body alternates at its top level, where it would guard every alternative; there, as at the start of any later alternative, it stays verbatim. A caret leading a group body is covered [above](#-a-start-anchor-leading-a-group).

### Where the position can move

After a quantifier on an atom that can end a line, or after a backreference, the position genuinely can move, so the caret takes a branch of its own, `(?:^|$(?![\s\S]))`. That branch, and the wrap where the rule cannot see the end of a group's body, over-accept in the safe direction after a bounded quantifier saturated at the end, a backreference, a quantified or nested group, an alternative that ends in one or consumes nothing, a group that consumes nothing behind another group, or a later repetition of a group its caret leads whose body can end a line: `/(a)+^b/m` keeps `"a"`, and `/(^a\s){2}/m` keeps `"a "`.

### Where the position is fixed

Where nothing consuming precedes the caret on its path — at the start of the pattern or of an alternative, or behind only lookarounds — its position is fixed and it stays verbatim, which is what keeps the start anchor's [empty-match mitigation](./caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match) working for `/^x/m` and `/^a|^b/m` alike.

Assertions at one position commute, so a `$`, `\b`, `\B`, a lookaround or another caret between the part and the caret is looked through.

### Scope

Outside `m` this rule doesn't apply, because past index 0 a caret is false whatever arrives: `/\W^/` can never match, and the transform still reports nothing viable. The only caret moved outside `m` is one [leading a group](#-a-start-anchor-leading-a-group). A `(?m:...)` group turns the rule on and a `(?-m:...)` group turns it back off, following the same nesting as the `i` flag.

## 🔁 Patterns with backreferences

Backreferences cannot be handled by the `|$(?![\s\S])` transform alone because they are atomic — `\1` must match the entire captured string or fail, and its length is only known at runtime. `PartialMatchRegExp` first tries a full match natively, but that native result only wins outright if nothing earlier in the input could still be a viable partial — a cheap bound check settles that without needing to resolve the backreference's actual value, so the common case (no earlier partial exists) stays fast. Otherwise it runs a "capture scan": a variant of the pattern with each backreference swapped for a lazy `(?:[\s\S]*?)` wildcard, so the group it depends on can still capture against a partial input — matching anything, or nothing at all, without needing to already know the backreference's value.

Whatever that scan captures (or leaves `undefined`, if the group hasn't been reached yet) is then used to build a fresh partial-matching regex for this specific input, expanding the backreference character-by-character from the captured value with the same per-atom transform as the rest of the pattern. See [backreferences.md](./backreferences.md) for the full algorithm.

## 🎯 `hitEnd()`

[`hitEnd()`](../README.md#hitendpartial-partialmatchregexp-match-regexpexecarray-boolean) reports whether a match read the end of the input, so more input could still change it.

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

The information only exists during matching. `hitEnd()` recovers it by re-running the compiled pattern, [sticky](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) at `match.index`, with an empty named group in front of each truncation branch, after each greedy quantifier and after `$`, `\b` and `\B`, the latter three placed so that they can only match at the true end of the input; an empty group is zero-width and always succeeds, so the twin walks the identical path, and any marker that comes back defined is a read of the end the match actually made.

Recognising a truncation branch, a raw lookaround, or a group open back out of the rendered pattern is one classification, shared by every pass that needs it, rather than re-derived independently wherever it's needed.

The twin is built lazily, on first use, and never escapes the library — the array, `groups`, numbering and `d`-flag indices you hold are the ones `exec()` produced. It is cached once per instance for a pattern without [backreferences](./caveats.md#backreferences); for one with them the pattern is re-expanded per input, so the twin belongs to an expansion. A match the native pattern found outright has no expansion behind it, so the capture scan is re-run sticky at its index and the twin built from what that resolves, which is how a backreference that ran out part way through its capture is seen (`/(ab)\1|a/` on `"aba"` returns `"a"` and `hitEnd()` is `true`). The last expansion is kept per instance, whether `exec()` expanded the match or `hitEnd()` resolved it, so a caller whose capture is stable as the input grows builds that twin once. Where the scan resolves nothing, the un-expanded twin is used, which follows the transformed pattern's own alternative order, so a higher-priority alternative that ran out of input behind a native match is still reported (`/(a)\1b|a/` on `"aa"` returns `"a"` and `hitEnd()` is `true`).

> [!NOTE]
> See [Partial Match Parity](./partial-match-parity.md) for full details on how the library compares to reference implementations
