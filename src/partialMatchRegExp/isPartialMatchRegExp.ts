import { constructedPartials } from "./partialMatchInternals.ts";
import type { PartialMatchRegExp } from "./index.ts";

/**
 * Whether `value` is an instance of a `PartialMatchRegExp` class, from any
 * entry point or `withModules`, without importing any of those classes.
 *
 * @param value - Any value
 * @returns `true` for a `PartialMatchRegExp` instance; `false` for a plain
 * `RegExp` or any other value
 *
 * @example
 * ```typescript
 * import PartialMatchRegExp from "regex-partial-match/core";
 * import { isPartialMatchRegExp } from "regex-partial-match/features";
 *
 * isPartialMatchRegExp(new PartialMatchRegExp(/a/)); // true
 * isPartialMatchRegExp(/a/); // false
 * ```
 */
export default function isPartialMatchRegExp(
  value: unknown
): value is PartialMatchRegExp {
  return (
    typeof value === "object" &&
    value !== null &&
    constructedPartials.has(value)
  );
}
