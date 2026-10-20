import { it, expect } from "vitest";
import PartialMatchRegExp from "../../partialMatchRegExp/index.ts";
import { compiledOf } from "../../partialMatchRegExp/partialMatchInternals.ts";
import type { CompiledStatic } from "../../partialMatchRegExp/compilePartial/compiled.ts";

const E = "$(?![\\s\\S])";

const sourceOf = (pattern: RegExp) =>
  (compiledOf(new PartialMatchRegExp(pattern)) as CompiledStatic).regex.source;

it.each([
  [/x\S+^a/m, `(?:x|${E})(?:\\S|${E})[]*[](?:a|${E})`],
  [/\w*^b/m, `[]*^(?:b|${E})`],
  [/(^a\w{2,})/, `^((?:a|${E})(?:\\w|${E}){2}\\w*)`]
])("keeps a looped atom optional while the caret rules read %s, and unwraps it once they have run", (pattern, source) => {
  expect(sourceOf(pattern)).toBe(source);
});
