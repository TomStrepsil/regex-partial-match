import carets from "../../modules/carets/index.ts";
import backreferences from "../../modules/backreferences/index.ts";
import features from "../../modules/features/index.ts";
import type { Hooks } from "../walk.ts";
import compileWith from "./compileWith.ts";
import type { CompiledPartial } from "./compiled.ts";

export const fullHooks: Hooks = Object.assign(
  {},
  carets,
  backreferences,
  features
);

export default function compilePartial(regex: RegExp): CompiledPartial {
  return compileWith(regex, fullHooks);
}
