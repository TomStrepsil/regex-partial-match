import { ALTERNATION } from "./constants.ts";
import {
  DISJUNCTION_TO_END_OF_INPUT,
  END_ANCHOR,
  GROUP_CLOSING,
  LOOKAHEAD_OPENING,
  START_ANCHOR,
  isOptionalAtom,
  isRawLookaround
} from "../../partialMatchRegExp/atomSyntax.ts";
import {
  LAZY_MARK,
  isQuantifier
} from "../../partialMatchRegExp/quantifier.ts";
import { maximumOf, minimumOf } from "../quantifierBounds.ts";
import {
  isBackreference,
  type Backreference,
  type Part
} from "../../partialMatchRegExp/part.ts";

interface Group {
  opening: string;
  longest: number;
  alternative: number;
}

const groupOpenedBy = (opening: string): Group => ({
  opening,
  longest: 0,
  alternative: 0
});

const opensGroup = (part: string) =>
  part[0] === "(" && part[part.length - 1] !== GROUP_CLOSING;

const closesGroup = (part: string) =>
  part[0] === GROUP_CLOSING || part === DISJUNCTION_TO_END_OF_INPUT;

const MAY_MATCH_A_STRING = /\\[pq]\{/;

const consumesNothing = (part: string) =>
  part === START_ANCHOR ||
  part === END_ANCHOR ||
  (part[0] === "(" && !isOptionalAtom(part)) ||
  isRawLookaround(part);

export default function longestCaptureOf(
  unicodeSets: boolean
) {
  const longestOfBody = new Map<readonly Part[], number>();

  function measured(body: readonly Part[]) {
    const enclosing: Group[] = [];
    let group = groupOpenedBy("");
    for (let index = 0; index < body.length; index++) {
      const part = body[index];
      let longest = 1;
      if (isBackreference(part)) {
        longest = longestCapture(part);
      } else if (opensGroup(part)) {
        enclosing.push(group);
        group = groupOpenedBy(part);
        continue;
      } else if (part === ALTERNATION) {
        group.longest = Math.max(group.longest, group.alternative);
        group.alternative = 0;
        continue;
      } else if (closesGroup(part)) {
        const closed = group;
        group = enclosing.pop() as Group;
        longest =
          closed.opening === LOOKAHEAD_OPENING
            ? 0
            : Math.max(closed.longest, closed.alternative);
      } else if (consumesNothing(part)) {
        longest = 0;
      } else if (unicodeSets && MAY_MATCH_A_STRING.test(part)) {
        longest = Infinity;
      }
      const quantifier = body[index + 1];
      if (isQuantifier(quantifier)) {
        index += body[index + 2] === LAZY_MARK ? 2 : 1;
        const maximum = maximumOf(quantifier, minimumOf(quantifier));
        if (longest !== 0) longest = maximum === 0 ? 0 : longest * maximum;
      }
      group.alternative += longest;
    }
    return Math.max(group.longest, group.alternative);
  }

  function longestOf(body: readonly Part[] | undefined) {
    if (body === undefined) return Infinity;
    let longest = longestOfBody.get(body);
    if (longest === undefined) {
      longest = measured(body);
      longestOfBody.set(body, longest);
    }
    return longest;
  }

  function longestCapture({ capture }: Backreference): number {
    if (capture === undefined) return Infinity;
    let longest = 0;
    for (const body of capture.groupBodies)
      longest = Math.max(longest, longestOf(body));
    return longest;
  }

  return longestCapture;
}
