import type { BackreferenceProbe } from "../../partialMatchRegExp/backreferenceHook.ts";
import type { CompiledPartial } from "../../partialMatchRegExp/compilePartial/compiled.ts";
import { CompiledBackreferences } from "./compiledBackreferences.ts";
import renderBackreference, {
  RUN_OUT_BRANCH_GROUPS
} from "./renderBackreference.ts";

export default function probeBackreference(
  compiled: CompiledPartial,
  index: number
): BackreferenceProbe {
  const longest =
    compiled instanceof CompiledBackreferences
      ? compiled.partialLengths[index]
      : 0;
  return {
    groups: longest > 0 ? RUN_OUT_BRANCH_GROUPS + 2 : 1,
    render: (token, groups) =>
      renderBackreference(
        token,
        longest,
        () => groups.hidden(RUN_OUT_BRANCH_GROUPS),
        groups.marker
      )
  };
}
