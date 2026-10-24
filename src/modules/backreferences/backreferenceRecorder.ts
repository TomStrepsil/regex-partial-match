import {
  decodeGroupName,
  groupNameOf
} from "./groupName.ts";
import {
  isNumericBackreference,
  type Backreference,
  type Part
} from "../../partialMatchRegExp/part.ts";
import {
  CASE_INSENSITIVE,
  WITHIN_LOOKAROUND,
  WITHIN_RAW_LOOKAROUND
} from "../../partialMatchRegExp/scope.ts";
import type { BackreferenceRecorder } from "../../partialMatchRegExp/backreferenceHook.ts";

const UNNAMED_GROUP_OPENING = "(";

export default function backreferenceRecorder(): BackreferenceRecorder {
  let closedGroupNumbers: Set<number> | undefined;
  let referencesSinceLastClose: Map<string, Backreference[]> | undefined;
  const bodyOfGroup: (readonly Part[] | undefined)[] = [];
  let bodiesOfName: Map<string, (readonly Part[] | undefined)[]> | undefined;
  let groupsInLookahead: Set<number> | undefined;
  let namesInLookahead: Set<string> | undefined;

  return {
    groupClosed(groupNumber, opening, body, scope) {
      (closedGroupNumbers ??= new Set()).add(groupNumber);
      const measurable = scope & WITHIN_RAW_LOOKAROUND ? undefined : body;
      bodyOfGroup[groupNumber] = measurable;
      const inLookahead =
        (scope & (WITHIN_LOOKAROUND | WITHIN_RAW_LOOKAROUND)) ===
        WITHIN_LOOKAROUND;
      if (inLookahead) (groupsInLookahead ??= new Set()).add(groupNumber);
      if (opening === UNNAMED_GROUP_OPENING) return;
      const name = decodeGroupName(groupNameOf(opening));
      if (inLookahead) (namesInLookahead ??= new Set()).add(name);
      bodiesOfName ??= new Map();
      const bodies = bodiesOfName.get(name);
      if (bodies === undefined) bodiesOfName.set(name, [measurable]);
      else bodies.push(measurable);
      const earlierReferences = referencesSinceLastClose?.get(name);
      if (earlierReferences === undefined) return;
      for (const earlier of earlierReferences) earlier.capture = undefined;
      referencesSinceLastClose?.delete(name);
    },
    backreference(backreference, scope, groupsBefore) {
      backreference.caseInsensitive = (scope & CASE_INSENSITIVE) !== 0;
      if (isNumericBackreference(backreference)) {
        if (closedGroupNumbers?.has(backreference.ref))
          backreference.capture = {
            groupsBefore,
            groupBodies: [bodyOfGroup[backreference.ref]],
            readsLookaheadCapture:
              groupsInLookahead?.has(backreference.ref) === true
          };
        return;
      }
      const name = decodeGroupName(backreference.ref);
      const groupBodies = bodiesOfName?.get(name);
      if (groupBodies !== undefined)
        backreference.capture = {
          groupsBefore,
          groupBodies,
          readsLookaheadCapture: namesInLookahead?.has(name) === true
        };
      referencesSinceLastClose ??= new Map();
      const references = referencesSinceLastClose.get(name);
      if (references === undefined) {
        referencesSinceLastClose.set(name, [backreference]);
        return;
      }
      references.push(backreference);
    }
  };
}
