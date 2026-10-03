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
  let closedGroupNames: Set<string> | undefined;
  let duplicatedNames: Set<string> | undefined;
  let referencesToUnduplicatedName: Map<string, Backreference[]> | undefined;

  return {
    groupClosed(groupNumber, opening) {
      (closedGroupNumbers ??= new Set()).add(groupNumber);
      if (opening === UNNAMED_GROUP_OPENING) return;
      const name = decodeGroupName(groupNameOf(opening));
      if (!closedGroupNames?.has(name)) {
        (closedGroupNames ??= new Set()).add(name);
        return;
      }
      (duplicatedNames ??= new Set()).add(name);
      const earlierReferences = referencesToUnduplicatedName?.get(name) ?? [];
      for (const earlier of earlierReferences) earlier.forward = true;
      referencesToUnduplicatedName?.delete(name);
    },
    backreference(backreference, scope) {
      backreference.caseInsensitive = (scope & CASE_INSENSITIVE) !== 0;
      if (isNumericBackreference(backreference)) {
        backreference.forward = !closedGroupNumbers?.has(backreference.ref);
        return;
      }
      const name = decodeGroupName(backreference.ref);
      if (duplicatedNames?.has(name)) {
        backreference.forward = true;
        return;
      }
      backreference.forward = !closedGroupNames?.has(name);
      referencesToUnduplicatedName ??= new Map();
      const references = referencesToUnduplicatedName.get(name);
      if (references === undefined) {
        referencesToUnduplicatedName.set(name, [backreference]);
        return;
      }
      references.push(backreference);
    }
  };
}
