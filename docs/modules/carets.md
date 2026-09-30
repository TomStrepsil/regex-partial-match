# Carets

Everything here belongs to the carets module, `regex-partial-match/modules/carets`. `regex-partial-match/core` without it accepts a caret only where its position is fixed, as [How It Works](../how-it-works.md#-a-caret-whose-position-is-fixed) describes, and throws `TypeError: Needs the carets module` for any other.

## ⏱️ When the rules run

A pattern that compiles without the rules compiles the same with them, so the module applies them only where a cheap look at the source finds a `^` that doesn't start the pattern, follow a `|` before any `(`, or open a class. A wrong guess costs a second walk, not a wrong result: the walk without the rules refuses the pattern, and it is walked again with them.

## ⚓ A start anchor leading a group

A group's truncation branch, where it keeps one, would skip a `^` leading its body: wrapped naively, `/(^x)/` would match `""` at the end of `"a"`, losing the start anchor's [empty-match mitigation](../caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match). So where every alternative of the body starts with a caret, behind nothing but assertions or empty groups — quantified or not, since neither consumes anything either way — or under `m` a quantified atom that cannot end a line, a group that is entered at least once takes the caret in front of it. Under `m` that caret is judged against the part before the group by the [rule below](#--under-the-m-flag).

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

A caret only holds after a line terminator, so the rule first asks whether the part before it can end with one, under that part's own `i`, `s` and `u`/`v` scope. Where it cannot, no continuation completes the path, and the path is refused: `/ba^/m` on `"b"`, `/^a+^b/m` on `"a"` and `/\W*(a)^/m` on `"-"` all return `null`. A refused path stays refused for any later caret on it, however many alternatives the group before it has, so `/(a|b|c)^^x/m` is `null` exactly as `/(a|b|c)^x/m` is. A quantifier that allows zero repetitions of such an atom can only satisfy the caret by repeating zero times, so the caret is judged against the part before it instead: `/\na*^/m` on `"\na"` matches `"\n"`. The atom keeps its quantifier for any later caret, so `/(?:\s*a?|b)^^/m` on `"a"` matches at index 0, as `/(?:\s*a?|b)^/m` does.

### Groups

A group is judged by the end of its body, and a group whose body consumes nothing, such as `(\b)`, is looked through. The caret is folded into the body's last atom, takes a branch of its own after a quantifier or backreference ending the body, and wraps the whole body where it ends in anything else. A body that alternates is judged by the end of each alternative the same way, and wrapped where any alternative ends in anything else or consumes nothing. Each stays inside the group, spelled `(?m:^)` where the group turns multiline off, so a group the input ran out in front of, or part way through, still captures what it has:

```javascript
/(a\n)^/m  → /((?:a|$(?![\s\S]))(?:\n^|$(?![\s\S])))/
/(a\n?)^/m → /((?:a|$(?![\s\S]))(?:\n|$(?![\s\S]))?(?:^|$(?![\s\S])))/
/(a|\n)^/m → /((?:a|$(?![\s\S]))[]|(?:\n^|$(?![\s\S])))/
```

A caret the body leaves verbatim, because nothing consuming precedes it inside the group, is judged where the group starts. Where it leads every alternative it moves in front of the group, as [above](#-a-start-anchor-leading-a-group): `/\W(\S*^)/m` on `"-"` matches `""` at index 1. Otherwise the group keeps its truncation branch, a modifier group included. Only a caret this rule left verbatim does: one inside a `(?-m:...)` scope can hold nowhere but the start of the input, and one the rule has already settled needs nothing from outside the group, so `/((?-m:^x))/m` and `/a(b^(?-m:^x))/m` on `"a"` are both `null`.

A caret leading an unquantified lookahead body is judged against the part before the lookahead, unless the body alternates at its top level, where it would guard every alternative; there, as at the start of any later alternative, it stays verbatim. A caret leading a group body is covered [above](#-a-start-anchor-leading-a-group).

### Where the position can move

After a quantifier on an atom that can end a line, or after a backreference, the position genuinely can move, so the caret takes a branch of its own, `(?:^|$(?![\s\S]))`. That branch, and the wrap where the rule cannot see the end of a group's body, over-accept in the safe direction after a bounded quantifier saturated at the end, a backreference, a quantified or nested group, an alternative that ends in one or consumes nothing, a group that consumes nothing behind another group, or a later repetition of a group its caret leads whose body can end a line: `/(a)+^b/m` keeps `"a"`, and `/(^a\s){2}/m` keeps `"a "`.

Where nothing consuming precedes the caret on its path, its position is fixed and it stays verbatim; see [How It Works](../how-it-works.md#-a-caret-whose-position-is-fixed).

### Scope

Outside `m` this rule doesn't apply, because past index 0 a caret is false whatever arrives: `/\W^/` can never match, and the transform still reports nothing viable. The only caret moved outside `m` is one [leading a group](#-a-start-anchor-leading-a-group). A `(?m:...)` group turns the rule on and a `(?-m:...)` group turns it back off, following the same nesting as the `i` flag.
