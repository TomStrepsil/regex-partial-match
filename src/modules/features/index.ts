import type { Hooks } from "../../partialMatchRegExp/walk.ts";
import { featureSet } from "../../partialMatchRegExp/regexFeatures.ts";

/**
 * The module that names the constructs a pattern uses, as its `features`
 * set, for `withModules` from `regex-partial-match/core`.
 *
 * Without it, reading `features` on the `core` class throws a `TypeError`.
 */
const features: Hooks = { features: featureSet };

export default features;
