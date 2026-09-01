/**
 * Scenario 6: isComplete() — truncation probe build and per-call cost
 *
 * isComplete() answers a question exec() throws away: did this match depend on
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
 *                         belongs to the expansion behind one specific match.
 *                         A second call on the *same match* is cached; a fresh
 *                         match builds a fresh probe. The last two benches in
 *                         that group are the difference between those.
 *
 * The "construct + exec" benches are baselines for the ones below them: the
 * probe build is the delta between a group's first and second bench, since
 * both pay the same construction and exec cost.
 */

import { bench, group } from "mitata";
import PartialMatchRegExp from "../../src/partialMatchRegExp.ts";

// A bench whose match is null would time isComplete() answering nothing at
// all, and would read as a large improvement rather than a broken setup.
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

const isoDatePartial = new PartialMatchRegExp(isoDate);
const isoDateIncompleteMatch = matchOrThrow(isoDatePartial, isoDateIncomplete);
const isoDateCompleteMatch = matchOrThrow(isoDatePartial, isoDateComplete);

group("isComplete — static path (ISO date)", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(isoDate).exec(isoDateIncomplete)
  );
  bench("construct + exec + isComplete (includes probe build)", () => {
    const partial = new PartialMatchRegExp(isoDate);
    const match = partial.exec(isoDateIncomplete);
    return match && partial.isComplete(match);
  });
  bench("isComplete — warm instance, incomplete match", () =>
    isoDatePartial.isComplete(isoDateIncompleteMatch)
  );
  bench("isComplete — warm instance, complete match", () =>
    isoDatePartial.isComplete(isoDateCompleteMatch)
  );
});

// "foo fo" — ends inside the backreference, so exec() takes the expansion path
// and records an expansion the probe can be built from. A full match returns
// via the native fast path with no expansion at all, and isComplete() answers
// from that alone.
const repeatedWord = /^(\w+) \1$/;
const repeatedWordMidRef = "foo fo";

const repeatedWordPartial = new PartialMatchRegExp(repeatedWord);
const repeatedWordMatch = matchOrThrow(repeatedWordPartial, repeatedWordMidRef);

group("isComplete — backreference path (repeated word)", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(repeatedWord).exec(repeatedWordMidRef)
  );
  bench("construct + exec + isComplete (includes probe build)", () => {
    const partial = new PartialMatchRegExp(repeatedWord);
    const match = partial.exec(repeatedWordMidRef);
    return match && partial.isComplete(match);
  });
  bench("isComplete — same match, expansion probe cached", () =>
    repeatedWordPartial.isComplete(repeatedWordMatch)
  );
  bench("exec + isComplete — fresh match, probe rebuilt per match", () => {
    const match = repeatedWordPartial.exec(repeatedWordMidRef);
    return match && repeatedWordPartial.isComplete(match);
  });
});

// A raw lookaround is copied into the probe verbatim, so its backreferences
// have to be renumbered past every marker inserted before them — the one place
// probe construction does more than splice in a marker per truncation branch.
const rawLookaroundBackref = /^v(a)(b)(?<=\1\2)c/;
const rawLookaroundInput = "vab";

const rawLookaroundPartial = new PartialMatchRegExp(rawLookaroundBackref);
const rawLookaroundMatch = matchOrThrow(rawLookaroundPartial, rawLookaroundInput);

group("isComplete — raw lookaround backreference renumbering", () => {
  bench("construct + exec (baseline, never asks)", () =>
    new PartialMatchRegExp(rawLookaroundBackref).exec(rawLookaroundInput)
  );
  bench("construct + exec + isComplete (includes probe build)", () => {
    const partial = new PartialMatchRegExp(rawLookaroundBackref);
    const match = partial.exec(rawLookaroundInput);
    return match && partial.isComplete(match);
  });
  bench("isComplete — warm instance", () =>
    rawLookaroundPartial.isComplete(rawLookaroundMatch)
  );
});
