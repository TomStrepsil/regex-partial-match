# 👇 Carets

_The carets module, `regex-partial-match/modules/carets`. To bind it, and to see which carets `core` accepts without it, see [the lean entry](../../README.md#the-lean-entry-regex-partial-matchcore)._

## ⏱️ When the rules run

The rules never change a pattern that compiles without them, so the module applies them only where a quick look at the source finds a `^` other than one at the start, one right after a `|` with no `(` before it, or one negating a class (`[^`). If that guess is wrong, the pattern is walked again with the rules. A wrong guess costs time, never a wrong result.

## ⚓ A start anchor leading a group

A group's truncation branch would skip a `^` leading its body: `/(^x)/`, wrapped naively, matches `""` at the end of `"a"`, losing the start anchor's [empty-match mitigation](../caveats.md#test-behaviour-and-non-matching-results-from-exec-and-match). A caret can lead a body's alternative behind assertions, or behind empty groups, quantified or not. Under `m` it can also stand behind a quantified atom that can't end a line. Where a caret leads every alternative of the body, a group entered at least once takes the caret in front of it. Under `m`, that caret is judged by the [rule below](#--under-the-m-flag).

- **Entered once:** the carets leave the body.
- **Repeated:** the body keeps them for later repetitions. Outside `m` the group drops its truncation branch, so a later repetition can't skip its caret. Under `m` they take the branch `(?:^|$(?![\s\S]))`.
- **Must repeat twice or more, under `m`, with no alternative able to end a line:** refused, since a later repetition is unreachable. `/(^a){2}/m` on `"a"` is `null`.
- **May repeat zero times:** it can't take the caret in front, so the carets stay in the body, as for a repeated group.

```javascript
/(^a|^b)/   → /^((?:a|$(?![\s\S]))|(?:b|$(?![\s\S])))/
/((?!b)^a)/ → /^((?!b)(?:a|$(?![\s\S]))|$(?![\s\S]))/
/(^a)+/     → /^(^(?:a|$(?![\s\S])))+/
/(^a)*/     → /(^(?:a|$(?![\s\S])))*/
```

The first three return `null` on `"c"`. The last matches `""` at index 0, as the original does.

A body with any alternative that doesn't start with a caret is left alone. So is a `(?-m:^...)` group in a multiline pattern, where a caret in front of the group would mean a line start. A `(?m:...)` group in a pattern without `m` moves its caret in front, but that caret is still a line start, so an enclosing group keeps its truncation branch: `/\n((?m:^a))/` on `"a"` matches `""` at index 1.

This rule lives in the module, so `core` refuses `/(^\d+)/` even without `m`. Writing the caret in front, `/^(\d+)/`, matches the same and needs no module.

## ⚓ `^` under the `m` flag

Under `m`, `^` is the one assertion that can be false at a truncated end and true a character later. A line start depends on the character before it, which is always in hand. But if the atom before the caret took its truncation branch, the caret is being judged too early: in the full input, that atom would have consumed something first. So a caret is folded into the taken branch of the nearest consuming part before it on its own path:

```javascript
/\W^/m  → /(?:\W^|$(?![\s\S]))/
/a\n^/m → /(?:a|$(?![\s\S]))(?:\n^|$(?![\s\S]))/
```

So `/\W^/m` keeps `"a"` viable at index 1, since a continuation of `"\n"` would both satisfy `\W` and start a line. It refuses `"-"` at index 0, because there `\W` was taken and the character before the caret is known.

### A part that can't end a line

A caret holds only after a line terminator. If the part before it can't end with one, under that part's own `i`, `s` and `u`/`v` scope, the path is refused. `/ba^/m` on `"b"`, `/^a+^b/m` on `"a"` and `/\W*(a)^/m` on `"-"` are all `null`.

A refused path stays refused for every later caret on it, so `/(a|b|c)^^x/m` is `null` just as `/(a|b|c)^x/m` is.

An atom that can't end a line, under a quantifier that allows zero repetitions, can only satisfy the caret by repeating zero times. So the caret is judged against the part before it: `/\na*^/m` on `"\na"` matches `"\n"`. The atom keeps its quantifier for later carets, so `/(?:\s*a?|b)^^/m` on `"a"` matches at index 0, like `/(?:\s*a?|b)^/m`.

### Groups

A group is judged by the end of its body. A body that consumes nothing, such as `(\b)`, is looked through. How the caret is placed depends on how the body ends:

- **an atom:** the caret is folded into it;
- **a quantifier or a backreference:** the caret takes its own branch after it;
- **anything else:** the caret wraps the whole body.

An alternating body is judged alternative by alternative, and wrapped if any alternative ends in something else or consumes nothing. The caret stays inside the group, spelled `(?m:^)` where the group turns `m` off, so a group the input ran out in front of, or inside, still captures what it has:

```javascript
/(a\n)^/m  → /((?:a|$(?![\s\S]))(?:\n^|$(?![\s\S])))/
/(a\n?)^/m → /((?:a|$(?![\s\S]))(?:\n|$(?![\s\S]))?(?:^|$(?![\s\S])))/
/(a|\n)^/m → /((?:a|$(?![\s\S]))[]|(?:\n^|$(?![\s\S])))/
```

A caret with nothing consuming before it inside the group is judged where the group starts. Where it leads every alternative it moves in front of the group, as [above](#-a-start-anchor-leading-a-group): `/\W(\S*^)/m` on `"-"` matches `""` at index 1. Otherwise the group keeps its truncation branch, a modifier group included, except in two cases:
- the caret is inside `(?-m:...)`, where it can only hold at the start of the input;
- the rule has already settled it.

So `/((?-m:^x))/m` and `/a(b^(?-m:^x))/m` on `"a"` are both `null`.

A caret leading an unquantified lookahead body is judged against the part before the lookahead. That doesn't apply where the body alternates at its top level, since there the caret guards every alternative and stays as written, as it does at the start of any later alternative.

### Where the position can move

After a quantifier on an atom that can end a line, or after a backreference, the position really can move, so the caret takes its own branch, `(?:^|$(?![\s\S]))`. That branch, and the wrap where the rule can't see the end of a group's body, accept too much in some cases. That is the safe direction. They are:
- a bounded quantifier saturated at the end;
- a backreference;
- a quantified or nested group;
- an alternative that ends in one of those, or consumes nothing;
- a group that consumes nothing, behind another group;
- a later repetition of a group whose body can end a line and which its caret leads.

So `/(a)+^b/m` keeps `"a"`, and `/(^a\s){2}/m` keeps `"a "`.

Where nothing consuming precedes the caret on its path, its position is fixed and it stays as written; see [How It Works](../how-it-works.md#-a-caret-whose-position-is-fixed).

### Scope

Outside `m` the rule doesn't apply. Past index 0, a caret is false whatever arrives, so `/\W^/` can never match and reports nothing viable. The only caret moved outside `m` is one [leading a group](#-a-start-anchor-leading-a-group). `(?m:...)` turns the rule on and `(?-m:...)` turns it off, nesting as `i` does.
