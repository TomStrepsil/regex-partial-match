import { describe, it, expect } from "vitest";
import isPartialMatchRegExp from "./isPartialMatchRegExp.ts";
import withModules from "./withModules.ts";
import PartialMatchRegExp from "../core/corePartialMatchRegExp.ts";
import FullPartialMatchRegExp from "./index.ts";
import carets from "../modules/carets/index.ts";
import backreferences from "../modules/backreferences/index.ts";
import { isPartialMatchRegExp as fromFeatures } from "../features/index.ts";
import { isPartialMatchRegExp as fromRoot } from "../index.ts";

describe("isPartialMatchRegExp", () => {
  it.each([
    ["core", new PartialMatchRegExp(/a/)],
    ["withModules(carets)", new (withModules(carets))(/a/)],
    ["withModules(backreferences)", new (withModules(backreferences))(/a/)],
    ["the default class", new FullPartialMatchRegExp(/a/)],
    ["an instance with flags", new FullPartialMatchRegExp(/^a/gimsuy)]
  ])("is true for an instance of %s", (_, value) => {
    expect(isPartialMatchRegExp(value)).toBe(true);
  });

  it.each([
    ["a plain RegExp", /a/],
    ["a RegExp from a string", new RegExp("a")],
    ["an instance of a RegExp subclass", new (class extends RegExp {})(/a/)],
    [
      "an object inheriting from a PartialMatchRegExp instance",
      Object.create(new PartialMatchRegExp(/a/))
    ],
    [
      "a plain RegExp that Object.assign has copied an instance's state onto",
      Object.assign(new RegExp("a"), new PartialMatchRegExp(/b/))
    ],
    ["a string", "a"],
    ["a number", 1],
    ["null", null],
    ["undefined", undefined],
    ["a plain object", {}],
    ["a function", () => {}],
    ["a PartialMatchRegExp prototype", PartialMatchRegExp.prototype]
  ])("is false for %s", (_, value) => {
    expect(isPartialMatchRegExp(value)).toBe(false);
  });

  it("is the same guard from the features entry and the root entry", () => {
    expect(fromFeatures).toBe(isPartialMatchRegExp);
    expect(fromRoot).toBe(isPartialMatchRegExp);
  });
});
