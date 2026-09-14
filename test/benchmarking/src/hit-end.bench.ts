/**
 * Scenario 6: hitEnd() — truncation probe build and per-call cost
 *
 * hitEnd() answers a question exec() throws away: did this match depend on
 * the input running out, or is it a match of the original pattern? It does so
 * by re-running a twin of the compiled pattern, sticky at match.index, with an
 * empty named group in front of each truncation branch. The twin is built
 * lazily, so the cost splits in two and both halves need tracking:
 *
 *   - the one-off probe build, paid on the first call that needs it
 *   - the steady-state cost thereafter: one anchored exec per call
 *
 * The two paths cache the probe at different granularities, which is the whole
 * point of measuring them separately:
 *
 *   - static path:        one probe per instance, cached on the instance, so
 *                         every later call on that instance is steady state
 *   - backreference path: the pattern is re-expanded per input, so the probe
 *                         belongs to the expansion behind a match. The instance
 *                         keeps the probe of the last expansion asked about, so
 *                         fresh matches whose captures expand alike share it,
 *                         and a capture that differs builds a new one. The last
 *                         three benches in that group are the difference
 *                         between those.
 *
 * The "construct + exec" benches are baselines for the ones below them: the
 * probe build is the delta between a group's first and second bench, since
 * both pay the same construction and exec cost.
 *
 * Three groups cover marking kinds this refactor added over isComplete()'s
 * probe, none of which the groups above exercise: a word boundary at a
 * truncation point (two markers instead of one), a greedy open-ended
 * quantifier or a trailing $ reading the end on their own, and an optional
 * atom right at the end (spliced in by rewriting the previous probed segment
 * rather than appending a marker).
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../../src/partialMatchRegExp/index.ts";
import hitEnd from "../../../src/partialMatchRegExp/hitEnd/index.ts";

// A bench whose match is null would time hitEnd() answering nothing at all, and would read as a large improvement rather than a broken setup.
function matchOrThrow(
  partial: PartialMatchRegExp,
  input: string
): RegExpExecArray {
  const match = partial.exec(input);
  if (match === null) {
    throw new Error(`no match for ${JSON.stringify(input)}`);
  }
  return match;
}

const isoDate = /^\d{4}-\d{2}-\d{2}/;
const isoDateIncomplete = "2024-06";
const isoDateComplete = "2024-12-31";

group("hitEnd — static path (ISO date)", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(isoDate).exec(isoDateIncomplete)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(isoDate);
    const match = partial.exec(isoDateIncomplete);
    return match && hitEnd(partial, match);
  });
  bench("construct + exec + hitEnd (complete, includes probe build)", () => {
    const partial = new PartialMatchRegExp(isoDate);
    const match = partial.exec(isoDateComplete);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — incomplete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(isoDate);
    const match = matchOrThrow(partial, isoDateIncomplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
  bench("hitEnd — complete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(isoDate);
    const match = matchOrThrow(partial, isoDateComplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
});

// A word boundary at a truncation point is the one marking hitEnd() adds that isComplete() never had: it splices in two markers (a read-at-end plus the truncation branch) rather than one, so its probe is bigger than a plain truncation atom's at both construction and match time.
const wordBoundary = /^ab\b/;
const wordBoundaryIncomplete = "ab";
const wordBoundaryComplete = "ab-";

group("hitEnd — word boundary at truncation end", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(wordBoundary).exec(wordBoundaryIncomplete)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(wordBoundary);
    const match = partial.exec(wordBoundaryIncomplete);
    return match && hitEnd(partial, match);
  });
  bench("construct + exec + hitEnd (complete, includes probe build)", () => {
    const partial = new PartialMatchRegExp(wordBoundary);
    const match = partial.exec(wordBoundaryComplete);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — incomplete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(wordBoundary);
    const match = matchOrThrow(partial, wordBoundaryIncomplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
  bench("hitEnd — complete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(wordBoundary);
    const match = matchOrThrow(partial, wordBoundaryComplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
});

// isComplete() had no notion of a greedy open-ended quantifier or a trailing $ reading the end on their own — both are markings hitEnd() introduced (readAtEnd, endAnchor), and a realistic pattern exercises three of them in one probe: two unbounded `+`, one `{2,}`, and the `$`.
const emailLike = /^[a-z]+@[a-z]+\.[a-z]{2,}$/;
const emailLikeIncomplete = "user@example";
const emailLikeComplete = "user@example.com";

group("hitEnd — open-ended quantifiers and end anchor (email-like pattern)", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(emailLike).exec(emailLikeIncomplete)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(emailLike);
    const match = partial.exec(emailLikeIncomplete);
    return match && hitEnd(partial, match);
  });
  bench("construct + exec + hitEnd (complete, includes probe build)", () => {
    const partial = new PartialMatchRegExp(emailLike);
    const match = partial.exec(emailLikeComplete);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — incomplete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(emailLike);
    const match = matchOrThrow(partial, emailLikeIncomplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
  bench("hitEnd — complete match, warm probe", function* () {
    const partial = new PartialMatchRegExp(emailLike);
    const match = matchOrThrow(partial, emailLikeComplete);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
});

// An optional atom right at the end (optionalAtEnd) is spliced in by rewriting the previous probed segment in place, rather than appending a marker the way every other marking does — the one construction path worth its own bench.
const optionalAtEnd = /^abc?/;
const optionalAtEndUntaken = "ab";
const optionalAtEndTaken = "abc";

group("hitEnd — optional atom at truncation end", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(optionalAtEnd).exec(optionalAtEndUntaken)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(optionalAtEnd);
    const match = partial.exec(optionalAtEndUntaken);
    return match && hitEnd(partial, match);
  });
  bench("construct + exec + hitEnd (taken, includes probe build)", () => {
    const partial = new PartialMatchRegExp(optionalAtEnd);
    const match = partial.exec(optionalAtEndTaken);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — untaken atom, warm probe", function* () {
    const partial = new PartialMatchRegExp(optionalAtEnd);
    const match = matchOrThrow(partial, optionalAtEndUntaken);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
  bench("hitEnd — taken atom, warm probe", function* () {
    const partial = new PartialMatchRegExp(optionalAtEnd);
    const match = matchOrThrow(partial, optionalAtEndTaken);
    hitEnd(partial, match);
    yield () => hitEnd(partial, match);
  });
});

// "foo fo" — ends inside the backreference, so exec() takes the expansion path and records an expansion the probe can be built from. A full match returns via the native fast path with no expansion at all, and hitEnd() answers from that alone.
const repeatedWord = /^(\w+) \1$/;
const repeatedWordMidRef = "foo fo";
const repeatedWordOtherMidRef = "bar ba";

const repeatedWordPartial = new PartialMatchRegExp(repeatedWord);
const repeatedWordMatch = matchOrThrow(repeatedWordPartial, repeatedWordMidRef);

group("hitEnd — backreference path (repeated word)", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(repeatedWord).exec(repeatedWordMidRef)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(repeatedWord);
    const match = partial.exec(repeatedWordMidRef);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — same match, expansion probe cached", () =>
    hitEnd(repeatedWordPartial, repeatedWordMatch)
  );
  bench("exec + hitEnd — fresh match, same capture, probe shared", () => {
    const match = repeatedWordPartial.exec(repeatedWordMidRef);
    return match && hitEnd(repeatedWordPartial, match);
  });
  bench("exec + hitEnd — fresh match, alternating capture, probe rebuilt per match", function* () {
    const partial = new PartialMatchRegExp(repeatedWord);
    let alternate = false;
    yield () => {
      alternate = !alternate;
      const match = partial.exec(
        alternate ? repeatedWordOtherMidRef : repeatedWordMidRef
      );
      return match && hitEnd(partial, match);
    };
  });
});

// A raw lookaround is copied into the probe verbatim, so its backreferences have to be renumbered past every marker inserted before them — the one place probe construction does more than splice in a marker per truncation branch.
const rawLookaroundBackref = /^v(a)(b)(?<=\1\2)c/;
const rawLookaroundInput = "vab";

const rawLookaroundPartial = new PartialMatchRegExp(rawLookaroundBackref);
const rawLookaroundMatch = matchOrThrow(rawLookaroundPartial, rawLookaroundInput);

group("hitEnd — raw lookaround backreference renumbering", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(rawLookaroundBackref).exec(rawLookaroundInput)
  );
  bench("construct + exec + hitEnd (includes probe build)", () => {
    const partial = new PartialMatchRegExp(rawLookaroundBackref);
    const match = partial.exec(rawLookaroundInput);
    return match && hitEnd(partial, match);
  });
  bench("hitEnd — warm instance", () =>
    hitEnd(rawLookaroundPartial, rawLookaroundMatch)
  );
});
