import type PartialMatchRegExp from "../partialMatchRegExp/index.ts";
import { compiledOf } from "../partialMatchRegExp/partialMatchInternals.ts";
import {
  featureSet,
  type RegexFeature
} from "../partialMatchRegExp/regexFeatures.ts";

export type { RegexFeature };

/**
 * The syntactic constructs `partial`'s original pattern uses.
 *
 * The set iterates in `RegexFeature` declaration order, not the order the
 * constructs appear in the pattern.
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
