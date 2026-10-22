export const RUN_OUT_BRANCH_GROUPS = 2;

export const endOfInputUnmatchedBy = (token: string) =>
  "$(?![\\s\\S])(?!" + token + ")";

export default function runOutBranch(
  token: string,
  hiddenGroup: number,
  longest: number
) {
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
