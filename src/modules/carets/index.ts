import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import caretRecorder from "./caretRecorder.ts";
import needsCaretRules from "./needsCaretRules.ts";
import { scopeWithModifiers } from "../../partialMatchRegExp/scope.ts";

/**
 * The carets module: the rules for `^` anywhere other than the start of
 * the pattern or of a top-level alternative — inside a group or lookaround, and
 * after other input under the `m` flag. Bind it with `withModules` from
 * `regex-partial-match/core` to render `^` exactly as the default
 * `PartialMatchRegExp` does.
 */
const carets: Hooks = {
  caret: (source) =>
    source === undefined || needsCaretRules(source)
      ? caretRecorder()
      : undefined,
  modifiers: scopeWithModifiers
};

export default carets;
