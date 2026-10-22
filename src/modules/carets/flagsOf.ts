import {
  CASE_INSENSITIVE,
  DOT_ALL,
  MULTILINE,
  UNICODE,
  UNICODE_SETS
} from "../../partialMatchRegExp/scope.ts";

export default function flagsOf(scope: number) {
  return (
    (scope & CASE_INSENSITIVE ? "i" : "") +
    (scope & MULTILINE ? "m" : "") +
    (scope & DOT_ALL ? "s" : "") +
    (scope & UNICODE_SETS ? "v" : scope & UNICODE ? "u" : "")
  );
}
