import { describe, it, expect, vi } from "vitest";
import withModules from "./withModules.ts";
import createPartialMatchRegExp from "./createPartialMatchRegExp.ts";
import PartialMatchRegExp from "../core/partialMatchRegExp.ts";
import FullPartialMatchRegExp from "./partialMatchRegExp.ts";
import carets from "../modules/carets/index.ts";
import backreferences from "../modules/backreferences/index.ts";
import * as everyModule from "../modules/index.ts";
import type { Module } from "./module.ts";
import { moduleHooks, type HooksOfModule } from "./moduleHooks.ts";
import { isBackreference } from "./part.ts";
import { compiledOf } from "./partialMatchInternals.ts";

function countedCaretHooks() {
  const append = vi.fn((carets as unknown as HooksOfModule)[moduleHooks].caret);
  return { append, hooks: { caret: append } };
}

const recordersBuilt = (append: ReturnType<typeof vi.fn>) =>
  append.mock.results.filter((result) => result.value !== undefined).length;

const moduleLists: [string, Module[]][] = [
  ["none", []],
  ["carets", [carets]],
  ["carets, carets", [carets, carets]],
  ["backreferences", [backreferences]],
  ["backreferences, backreferences", [backreferences, backreferences]],
  ["carets, backreferences", [carets, backreferences]],
  ["backreferences, carets", [backreferences, carets]],
  ["carets, backreferences, carets", [carets, backreferences, carets]],
  [
    "backreferences, carets, backreferences",
    [backreferences, carets, backreferences]
  ]
];

describe("withModules", () => {
  it.each(moduleLists)(
    "returns the class every list of the same set of modules returns, for %s",
    (_, modules) => {
      const sameSet = moduleLists.filter(
        ([, other]) =>
          other.every((module) => modules.indexOf(module) !== -1) &&
          modules.every((module) => other.indexOf(module) !== -1)
      );
      for (const [, other] of sameSet)
        expect(withModules(...other)).toBe(withModules(...modules));
    }
  );

  it("returns the default export of regex-partial-match for the carets and backreferences modules, in any order", () => {
    expect(withModules(carets, backreferences)).toBe(FullPartialMatchRegExp);
    expect(withModules(backreferences, carets)).toBe(FullPartialMatchRegExp);
    expect(
      new (withModules(backreferences, carets))(/a/)
    ).toBeInstanceOf(FullPartialMatchRegExp);
  });

  it("returns the default export of regex-partial-match/core for no modules", () => {
    expect(withModules()).toBe(PartialMatchRegExp);
  });

  it("returns a different class for a different set of modules", () => {
    const classes = [
      withModules(),
      withModules(carets),
      withModules(backreferences),
      withModules(carets, backreferences)
    ];
    expect(new Set(classes).size).toBe(4);
  });

  it("holds at most one class for each of the 4 sets of modules", () => {
    const classes = new Set(
      moduleLists.map(([, modules]) => withModules(...modules))
    );
    for (let call = 0; call < 2000; call++)
      classes.add(withModules({ ...carets }, { ...backreferences }));
    expect(classes.size).toBe(4);
  });

  it("returns a RegExp subclass named as the ./core class is", () => {
    const Bound = withModules(carets);
    expect(new Bound(/a/)).toBeInstanceOf(Bound);
    expect(new Bound(/a/)).toBeInstanceOf(RegExp);
    expect(Bound).not.toBe(PartialMatchRegExp);
    expect(Bound.name).toBe(PartialMatchRegExp.name);
  });

  it("binds no rules when given no modules", () => {
    const Bound = withModules();
    expect(() => new Bound(/x^a/m)).toThrow(/carets module/);
    expect(() => new Bound(/(a)\1/)).toThrow(/backreferences module/);
  });

  it.each([
    ["carets", carets, /(a)\1/, "Needs the backreferences module"],
    ["carets", carets, /(a)\1(^b)/, "Needs the backreferences module"],
    ["backreferences", backreferences, /(^a)/, "Needs the carets module"],
    ["backreferences", backreferences, /(a)\1(^b)/, "Needs the carets module"]
  ])(
    "with only the %s module bound, refuses %s naming the other: %s",
    (_, module, pattern, message) => {
      const Bound = withModules(module);
      expect(() => new Bound(pattern)).toThrow(new TypeError(message));
    }
  );

  it.each([/^a/m, /x(^a)+/m, /(?:a|b)(?=^c)/m, /(a|^b){2}^c/m, /(?m:^a)/])(
    "binds the multiline caret rules the full class applies to %s",
    (pattern) => {
      const Bound = withModules(carets);
      expect(compiledOf(new Bound(pattern)).parts).toEqual(
        compiledOf(new FullPartialMatchRegExp(pattern)).parts
      );
    }
  );

  // A modifier group changes the flags its body is read under, and only the modules read those flags, so each module brings the rule itself: either alone reads a modifier group as the full class does.
  describe("reading a modifier group's flags", () => {
    it.each<[string, RegExp, string, { match: string; index: number } | null]>([
      ["a (?m:^) after a line break, still open", /x\n(?m:^y)/, "x\n", { match: "x\n", index: 0 }],
      ["a (?m:^) after a line break, complete", /x\n(?m:^y)/, "x\ny", { match: "x\ny", index: 0 }],
      ["a (?-m:^) after a line break under m", /x\n(?-m:^y)/m, "x\n", null],
      ["a (?m:^) after an alternative that may take a line break", /(?:a|\n)(?m:^b)/, "\n", { match: "\n", index: 0 }]
    ])("with the carets module alone, matches %s", (_, pattern, input, expected) => {
      const match = new (withModules(carets))(pattern).exec(input);
      if (expected === null) expect(match).toBeNull();
      else expect(match).toMatchAt(expected);
    });

    it.each([
      [/(a)(?i:\1)\1/, [true, false]],
      [/(a)(?-i:\1)/i, [false]]
    ])(
      "with the backreferences module alone, stamps each reference in %s as case-insensitive %j",
      (pattern, caseInsensitive) => {
        const parts = compiledOf(new (withModules(backreferences))(pattern))
          .parts;
        expect(
          parts.filter(isBackreference).map((part) => part.caseInsensitive)
        ).toEqual(caseInsensitive);
      }
    );
  });

  it.each([
    [/^a/m, 0],
    [/^a|^b/m, 0],
    [/a$/m, 0],
    [/[^a]b/m, 0],
    [/(^a)/, 1],
    [/\n^a/m, 1],
    [/a(?=^b)/m, 1],
    [/a|(^b)/m, 1],
    [/a\|^b/m, 1]
  ])(
    "builds the caret recorder for %s only when the pattern may need it (%i times)",
    (pattern, times) => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (createPartialMatchRegExp(hooks))(pattern);
      expect(recordersBuilt(append)).toBe(times);
      expect(compiledOf(partial).parts).toEqual(
        compiledOf(new FullPartialMatchRegExp(pattern)).parts
      );
    }
  );

  describe("keeps the modules bound through Symbol.species", () => {
    const input = "a\nb\nab\nb";

    it("in split()", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (createPartialMatchRegExp(hooks))(/\n^b/m);
      expect(append).toHaveBeenCalledTimes(1);
      expect(input.split(partial)).toEqual(
        input.split(new FullPartialMatchRegExp(/\n^b/m))
      );
      expect(append).toHaveBeenCalledTimes(2);
    });

    it("in matchAll()", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (createPartialMatchRegExp(hooks))(/\n^b/gm);
      expect(append).toHaveBeenCalledTimes(1);
      expect([...input.matchAll(partial)].map((match) => match.index)).toEqual(
        [...input.matchAll(new FullPartialMatchRegExp(/\n^b/gm))].map(
          (match) => match.index
        )
      );
      expect(append).toHaveBeenCalledTimes(2);
    });

    it("in replace(), which rebuilds nothing", () => {
      const { append, hooks } = countedCaretHooks();
      const partial = new (createPartialMatchRegExp(hooks))(/\n^b/gm);
      expect(input.replace(partial, "x")).toBe(
        input.replace(new FullPartialMatchRegExp(/\n^b/gm), "x")
      );
      expect(append).toHaveBeenCalledTimes(1);
    });
  });
});

describe("withModules refuses anything but a module from regex-partial-match/modules, so nothing else can change the class a set of modules returns", () => {
  interface Graph {
    withModules: typeof withModules;
    carets: Module;
    backreferences: Module;
    brand: symbol;
  }

  const notModules: [string, (graph: Graph) => unknown[]][] = [
    ["a bit naming both modules", () => [{ bit: 3 }]],
    ["the carets module's bit", () => [{ bit: 1 }]],
    ["a bit no module has", () => [{ bit: 4 }]],
    ["a bit as a string", () => [{ bit: "1" }]],
    ["a fractional bit", () => [{ bit: 0.5 }]],
    ["an empty object", () => [{}]],
    ["null", () => [null]],
    ["undefined", () => [undefined]],
    [
      "an object holding what the carets module holds",
      () => [
        {
          bit: 1,
          caret: () => undefined,
          modifiers: (scope: number) => scope
        }
      ]
    ],
    ["a module and an empty object", ({ carets }) => [carets, {}]],
    [
      "the internal brand holding a bit naming both modules",
      ({ brand }) => [{ [brand]: { bit: 3 } }]
    ],
    [
      "the internal brand holding a bit as a string",
      ({ brand }) => [{ [brand]: { bit: "1" } }]
    ],
    ["the internal brand holding nothing", ({ brand }) => [{ [brand]: null }]],
    [
      "the carets module's brand, found by reflection, holding hooks of its own",
      ({ carets }) => [
        {
          [Object.getOwnPropertySymbols(carets)[0]]: {
            bit: 1,
            caret: () => undefined
          }
        }
      ]
    ]
  ];

  const loadedGraph: Graph = {
    withModules,
    carets,
    backreferences,
    brand: moduleHooks
  };

  async function inAFreshModuleGraph() {
    vi.resetModules();
    const fresh = await import("../modules/index.ts");
    return {
      withModules: (await import("./withModules.ts")).default,
      carets: fresh.carets,
      backreferences: fresh.backreferences,
      brand: (await import("./moduleHooks.ts")).moduleHooks,
      defaultClass: async () => (await import("./partialMatchRegExp.ts")).default
    };
  }

  it.each(notModules)("throws for %s", (_, modules) => {
    expect(() => withModules(...(modules(loadedGraph) as Module[]))).toThrow(
      new TypeError("Not a module")
    );
  });

  it.each(notModules)(
    "binds every module's rules after refusing %s before any class was built",
    async (_, modules) => {
      const graph = await inAFreshModuleGraph();
      expect(() => graph.withModules(...(modules(graph) as Module[]))).toThrow(
        new TypeError("Not a module")
      );

      expect(new (graph.withModules(graph.carets))(/x^a/m).test("x")).toBe(
        false
      );
      expect(
        new (graph.withModules(graph.backreferences))(/^(a)\1/).test("ab")
      ).toBe(false);
      const Both = graph.withModules(graph.carets, graph.backreferences);
      expect(new Both(/x^a/m).test("x")).toBe(false);
      expect(new Both(/^(a)\1/).test("ab")).toBe(false);
      expect(Both).toBe(await graph.defaultClass());
    }
  );

  it("binds a copy of a module as the module itself", () => {
    expect(withModules({ ...carets })).toBe(withModules(carets));
    expect(withModules({ ...carets }, { ...backreferences })).toBe(
      FullPartialMatchRegExp
    );
  });

  it("binds an object holding the carets module's own hooks under its brand as the module itself", () => {
    const [brand] = Object.getOwnPropertySymbols(carets);
    const sharingHooks = {
      [brand]: (carets as unknown as Record<symbol, unknown>)[brand]
    } as unknown as Module;
    expect(withModules(sharingHooks)).toBe(withModules(carets));
  });

  it("binds the module's own rules from a copy whose visible members were changed before any class was built", async () => {
    const graph = await inAFreshModuleGraph();
    const altered = Object.assign(
      { ...graph.carets },
      { bit: 3, caret: () => undefined, backreferences: undefined }
    );

    const Altered = graph.withModules(altered);

    expect(Altered).toBe(graph.withModules(graph.carets));
    expect(new Altered(/x^a/m).test("x")).toBe(false);
    expect(() => new Altered(/(a)\1/)).toThrow(
      new TypeError("Needs the backreferences module")
    );
    expect(graph.withModules(graph.carets, graph.backreferences)).toBe(
      await graph.defaultClass()
    );
  });

  describe("freezes the rules a module and a class hold, so reflection that finds them can't change them", () => {
    const hooksOf = (module: Module, brand: symbol) =>
      (module as unknown as Record<symbol, Record<string, unknown>>)[brand];

    it.each<[string, (graph: Graph) => unknown]>([
      ["the carets module", ({ carets }) => carets],
      ["the carets module's hooks", ({ carets, brand }) => hooksOf(carets, brand)],
      ["the backreferences module", ({ backreferences }) => backreferences],
      [
        "the backreferences module's hooks",
        ({ backreferences, brand }) => hooksOf(backreferences, brand)
      ],
    ])("%s", (_, held) => {
      expect(Object.isFrozen(held(loadedGraph))).toBe(true);
    });

    it.each(Object.entries(everyModule))(
      "every object the %s module's hooks hold",
      (_, module) => {
        const held = Object.values(hooksOf(module, moduleHooks)).filter(
          (value) => typeof value === "object" && value !== null
        );
        for (const value of held) expect(Object.isFrozen(value)).toBe(true);
      }
    );

    it("throws when a module's hook, found by reflection, is replaced before any class was built, and binds the module's own rules", async () => {
      const graph = await inAFreshModuleGraph();
      const hooks = hooksOf(graph.carets, graph.brand);

      expect(() => {
        hooks.caret = () => undefined;
      }).toThrow(TypeError);
      expect(new (graph.withModules(graph.carets))(/x^a/m).test("x")).toBe(
        false
      );
    });

    it("throws when the hooks a class holds, found through an instance, are replaced, and keeps the class's rules", () => {
      const hooks = compiledOf(new (withModules(carets))(/x^a/m))
        .hooks as Record<string, unknown>;

      expect(() => {
        hooks.caret = () => undefined;
      }).toThrow(TypeError);
      expect(new (withModules(carets))(/x^a/m).test("x")).toBe(false);
    });
  });
});
