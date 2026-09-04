/**
 * Scenario 1: exec() override dispatch cost
 *
 * Isolates the JavaScript wrapper overhead introduced by PartialMatchRegExp's
 * exec() override. All three candidates run the same underlying partial pattern 
 * — the only variable is whether a JS override function sits in the call chain.
 *
 * Baselines:
 *   - native RegExp.exec       — no partial transform, no override
 *   - compilePartial() result  — partial source baked in, plain RegExp, no override
 *   - PartialMatchRegExp.exec  — partial source via override
 */

import { bench, group } from "mitata";
import { compilePartial } from "../../../src/partialMatchRegExp/compilePartial.ts";
import PartialMatchRegExp from "../../../src/partialMatchRegExp/index.ts";

const pattern = /^[a-z]+(?:\s\w+){1,3}/;

const compiled = compilePartial(pattern);
if (compiled.kind !== "static") {
  throw new Error("expected a static (backreference-free) pattern");
}

const native = pattern;
const plainPartial = compiled.regex;
const classPartial = new PartialMatchRegExp(pattern);

const fullMatchInput = "hello world foo";
const partialInput = "hello";

group("dispatch overhead — full match input", () => {
  bench("native RegExp.exec", () => native.exec(fullMatchInput));
  bench("plain partial RegExp (no class wrapper)", () => plainPartial.exec(fullMatchInput));
  bench("PartialMatchRegExp.exec", () => classPartial.exec(fullMatchInput));
});

group("dispatch overhead — partial input (returns null on native)", () => {
  bench("native RegExp.exec", () => native.exec(partialInput));
  bench("plain partial RegExp (no class wrapper)", () => plainPartial.exec(partialInput));
  bench("PartialMatchRegExp.exec", () => classPartial.exec(partialInput));
});
