import {
  GROUP_CLOSING,
  OPTIONAL_ATOM_OPENING
} from "../../partialMatchRegExp/atomSyntax.ts";

export const RUN_OUT_BRANCH_GROUPS = 2;

function runOutBranch(token: string, hiddenGroup: number, longest: number) {
  const rest = "\\" + String(hiddenGroup);
  return (
    "(?!" +
    token +
    ")(?![\\s\\S]{" +
    String(longest + 1) +
    "})(?=([\\s\\S]+))(?<=(?=" +
    token +
    ")([\\s\\S]*?))(?<=(?=" +
    rest +
    ")\\" +
    String(hiddenGroup + 1) +
    ")" +
    rest
  );
}

export default function renderBackreference(
  token: string,
  longest: number,
  hiddenGroup: () => number,
  mark: () => string
) {
  return (
    OPTIONAL_ATOM_OPENING +
    token +
    (longest > 0 ? "|" + runOutBranch(token, hiddenGroup(), longest) + mark() : "") +
    "|" +
    mark() +
    "$(?![\\s\\S])(?!" +
    token +
    ")" +
    GROUP_CLOSING
  );
}
