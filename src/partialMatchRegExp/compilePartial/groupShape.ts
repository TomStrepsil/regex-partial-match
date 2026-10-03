import { FLAGS_IRRELEVANT_TO_REBUILD } from "../constants.ts";

export default function groupShape(regex: RegExp) {
  const emptyMatch = new RegExp(
    "|" + regex.source,
    regex.flags.replace(FLAGS_IRRELEVANT_TO_REBUILD, "")
  ).exec("");
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- match must succeed, since pattern starts with empty alternative
    groupLimit: emptyMatch!.length - 1,
    declaresNamedGroup: emptyMatch?.groups !== undefined,
    namedGroups: emptyMatch?.groups
  };
}
