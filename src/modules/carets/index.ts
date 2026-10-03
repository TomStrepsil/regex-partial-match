import type { Module } from "../../partialMatchRegExp/opaqueModule.ts";
import {
  CARETS_MODULE,
  defineModule
} from "../../partialMatchRegExp/moduleHooks.ts";
import caretRecorder from "./caretRecorder.ts";
import needsCaretRules from "./needsCaretRules.ts";
import { scopeWithModifiers } from "../../partialMatchRegExp/scope.ts";

/**
 * The carets module: the rules for a `^` inside a group or positive
 * lookahead, or after other input under the `m` flag. Bind it with
 * `withModules` from `regex-partial-match/core` to render `^` exactly as the
 * default `PartialMatchRegExp` does.
 */
const carets: Module = defineModule({
  bit: CARETS_MODULE,
  caret: (source) =>
    source === undefined || needsCaretRules(source)
      ? caretRecorder()
      : undefined,
  modifiers: scopeWithModifiers
});

export default carets;
