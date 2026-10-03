import {
  decodeGroupName,
  groupNameOf
} from "./groupName.ts";
import {
  isNumericBackreference,
  type Backreference
} from "../../partialMatchRegExp/part.ts";
import { CASE_INSENSITIVE } from "../../partialMatchRegExp/scope.ts";
import type { BackreferenceRecorder } from "../../partialMatchRegExp/backreferenceHook.ts";

const UNNAMED_GROUP_OPENING = "(";

export default function backreferenceRecorder(): BackreferenceRecorder {
  let closedGroupNumbers: Set<number> | undefined;
  let referencesSinceLastClose: Map<string, Backreference[]> | undefined;

  return {
    groupClosed(groupNumber, opening) {
      (closedGroupNumbers ??= new Set()).add(groupNumber);
      if (opening === UNNAMED_GROUP_OPENING) return;
      const name = decodeGroupName(groupNameOf(opening));
      const earlierReferences = referencesSinceLastClose?.get(name);
      if (earlierReferences === undefined) return;
      for (const earlier of earlierReferences) earlier.forward = true;
      referencesSinceLastClose?.delete(name);
    },
    backreference(backreference, scope) {
      backreference.caseInsensitive = (scope & CASE_INSENSITIVE) !== 0;
      if (isNumericBackreference(backreference)) {
        backreference.forward = !closedGroupNumbers?.has(backreference.ref);
        return;
      }
      const name = decodeGroupName(backreference.ref);
      backreference.forward = false;
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
