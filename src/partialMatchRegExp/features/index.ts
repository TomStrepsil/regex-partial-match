import type PartialMatchRegExp from "../partialMatchRegExp.ts";
import { compiledOf } from "../partialMatchInternals.ts";
import { featureSet } from "../featureMask.ts";
import type { RegexFeature } from "../regexFeatures.ts";

export type { RegexFeature };

/**
 * The syntactic constructs `partial`'s original pattern uses, recorded as a
 * side effect of the single walk that built it.
 *
 * The set is built on the first call for an instance and cached, so patterns
 * that are only ever matched against never pay for it. It iterates in
 * `RegexFeature` declaration order, not the order the constructs appear in
 * the pattern.
 *
 * @param partial - A `PartialMatchRegExp` instance, from any entry point
 * @returns The features the original pattern contains
 *
 * @example
 * ```typescript
 * import PartialMatchRegExp, { features } from "regex-partial-match";
 *
 * features(new PartialMatchRegExp(/^[a-z]+/)).has("startAnchor"); // true
 * ```
 */
export default function features(
  partial: PartialMatchRegExp
): ReadonlySet<RegexFeature> {
  const compiled = compiledOf(partial);
  return (compiled.features ??= featureSet(compiled.featureMask));
}
