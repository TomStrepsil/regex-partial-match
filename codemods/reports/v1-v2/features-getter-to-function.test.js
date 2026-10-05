import { describe, expect, it } from "vitest";
import jscodeshift from "jscodeshift";
import transform from "./features-getter-to-function.js";

const tsx = jscodeshift.withParser("tsx");

function runTransform(source, path = "fixture.ts") {
  const reports = [];
  const output = transform(
    { path, source },
    {
      jscodeshift: tsx,
      j: tsx,
      stats: () => undefined,
      report: (message) => reports.push(message)
    },
    {}
  );
  return { output, report: reports.join("\n") };
}

const lines = (...rows) => [...rows, ""].join("\n");

describe("features-getter report", () => {
  it("never edits the file", () => {
    const { output } = runTransform(
      lines(
        'import PartialMatchRegExp from "regex-partial-match";',
        "const re = new PartialMatchRegExp('a');",
        "const used = re.features;"
      )
    );

    expect(output).toBeNull();
  });

  it("writes the replacement and the import line out", () => {
    const { report } = runTransform(
      lines(
        'import PartialMatchRegExp from "regex-partial-match";',
        "const re = new PartialMatchRegExp('a');",
        "const used = re.features;"
      )
    );

    expect(report).toContain("fixture.ts:3");
    expect(report).toContain("write `features(re)`");
    expect(report).toContain(
      'add: import { features } from "regex-partial-match";'
    );
  });

  describe("ranking", () => {
    const header = 'import PartialMatchRegExp from "regex-partial-match";';

    it("ranks a binding from new PartialMatchRegExp as likely", () => {
      const { report } = runTransform(
        lines(header, "const re = new PartialMatchRegExp('a');", "re.features;")
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("ranks a binding from a shadowed constructor as possible", () => {
      const { report } = runTransform(
        lines(
          header,
          "function f(PartialMatchRegExp) {",
          "  const re = new PartialMatchRegExp('a');",
          "  return re.features;",
          "}"
        )
      );

      expect(report).toContain("fixture.ts:4: possible:");
    });

    it("ranks a binding from a renamed default import as likely", () => {
      const { report } = runTransform(
        lines(
          'import Partial from "regex-partial-match";',
          "const re = new Partial('a');",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("ranks a binding from a named PartialMatchRegExp import as likely", () => {
      const { report } = runTransform(
        lines(
          'import { PartialMatchRegExp as P } from "regex-partial-match";',
          "const re = new P('a');",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("ranks a binding from toPartialMatchRegex() as likely", () => {
      const { report } = runTransform(
        lines(
          'import "regex-partial-match/extend";',
          "const re = /a/.toPartialMatchRegex();",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("ranks a parameter annotated PartialMatchRegExp as likely", () => {
      const { report } = runTransform(
        lines(
          header,
          "function f(re: PartialMatchRegExp) {",
          "  return re.features.has('x');",
          "}"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("write `features(re)`");
    });

    it("ranks a variable annotated PartialMatchRegExp as likely", () => {
      const { report } = runTransform(
        lines(header, "const re: PartialMatchRegExp = make();", "re.features;")
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("ranks a read straight off a new or a toPartialMatchRegex() call as likely", () => {
      const { report } = runTransform(
        lines(
          header,
          "new PartialMatchRegExp('a').features;",
          "/a/.toPartialMatchRegex().features;"
        )
      );

      expect(report).toContain("fixture.ts:2: likely:");
      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("write `features(new PartialMatchRegExp('a'))`");
    });

    it("resolves a binding from an enclosing scope", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "function f() {",
          "  return re.features;",
          "}"
        )
      );

      expect(report).toContain("fixture.ts:4: likely:");
    });

    it("ranks everything else as possible", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const other = makeSomething();",
          "other.features;",
          "config.product.features;",
          "function f(x: Product) { return x.features; }"
        )
      );

      expect(report).toContain("fixture.ts:4: possible:");
      expect(report).toContain("write `features(config.product)`");
      expect(report).toContain("fixture.ts:5: possible:");
      expect(report).toContain("fixture.ts:6: possible:");
      expect(report).not.toContain("likely");
    });

    it("does not rank a same-named binding in another scope as likely", () => {
      const { report } = runTransform(
        lines(
          header,
          "function a() { const re = new PartialMatchRegExp('a'); }",
          "function b(re) { return re.features; }"
        )
      );

      expect(report).toContain("fixture.ts:3: possible:");
    });
  });

  describe("import line", () => {
    it("reports for an import of any entry point", () => {
      for (const entry of [
        "regex-partial-match",
        "regex-partial-match/extend",
        "regex-partial-match/partialMatchRegExp",
        "regex-partial-match/features"
      ]) {
        const { report } = runTransform(
          lines(`import "${entry}";`, "thing.features;")
        );

        expect(report).toContain("fixture.ts:2: possible:");
      }
    });

    it("does not suggest an import the file already has", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp, { features } from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          "re.features;"
        )
      );

      expect(report).toContain("write `features(re)`");
      expect(report).not.toContain("add:");
    });

    it("recognises the default export of the /features subpath", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          'import featuresOf from "regex-partial-match/features";',
          "const re = new PartialMatchRegExp('a');",
          "re.features;"
        )
      );

      expect(report).toContain("write `featuresOf(re)`");
      expect(report).not.toContain("add:");
    });

    it("does not take the default export of another subpath for the class", () => {
      const { report } = runTransform(
        lines(
          'import hitEnd from "regex-partial-match/hitEnd";',
          "const re = new hitEnd('a');",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: possible:");
    });

    it("recognises the default export of the partialMatchRegExp subpath as the class", () => {
      const { report } = runTransform(
        lines(
          'import P from "regex-partial-match/partialMatchRegExp";',
          "const re = new P('a');",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("does not recommend an imported features that is shadowed at the read", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp, { features } from "regex-partial-match";',
          "function f(features, re: PartialMatchRegExp) {",
          "  return re.features;",
          "}",
          "const re = new PartialMatchRegExp('a');",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("write `featuresOf(re)`");
      expect(report).toContain(
        'add: import { features as featuresOf } from "regex-partial-match";'
      );
      expect(report).toMatch(/fixture\.ts:6: likely:.*write `features\(re\)`/);
    });

    it("picks an alias that is not bound either", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          "function f(features, featuresOf) {",
          "  return re.features;",
          "}",
          "const features = 1;",
          "const featuresOf2 = 2;",
          "re.features;"
        )
      );

      expect(report).toContain("fixture.ts:4: likely:");
      expect(report).toContain("write `featuresOf3(re)`");
      expect(report).toContain(
        'add: import { features as featuresOf3 } from "regex-partial-match";'
      );
      expect(report).toContain("fixture.ts:8: likely:");
      expect(report).toContain("write `featuresOf(re)`");
    });

    it("does not take a type-only features import for the function", () => {
      for (const typeOnly of [
        'import type { features } from "regex-partial-match";',
        'import { type features } from "regex-partial-match";',
        'import type features from "regex-partial-match/features";'
      ]) {
        const { report } = runTransform(
          lines(
            typeOnly,
            'import PartialMatchRegExp from "regex-partial-match";',
            "const re = new PartialMatchRegExp('a');",
            "re.features;"
          )
        );

        expect(report).toContain("write `featuresOf(re)`");
        expect(report).toContain(
          'add: import { features as featuresOf } from "regex-partial-match";'
        );
      }
    });

    it("uses the local name of an existing alias", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp, { features as featuresOfRegex } from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          "re.features;"
        )
      );

      expect(report).toContain("write `featuresOfRegex(re)`");
    });

    it("aliases the import when features is already a binding in scope", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          "const features = re.features;"
        )
      );

      expect(report).toContain("write `featuresOf(re)`");
      expect(report).toContain(
        'add: import { features as featuresOf } from "regex-partial-match";'
      );
    });
  });

  describe("silence", () => {
    it("reports nothing in a file that imports nothing from the package", () => {
      const { report, output } = runTransform(
        lines(
          'import { thing } from "other-package";',
          "const re = new Thing();",
          "re.features;"
        )
      );

      expect(report).toBe("");
      expect(output).toBeNull();
    });

    it("reports nothing in a file with no features read", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          "re.exec('b');"
        )
      );

      expect(report).toBe("");
    });

    it("ignores a features call and a features property key", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const o = { features: 1 };",
          "features(re);"
        )
      );

      expect(report).toBe("");
    });

    it("ignores write targets, which have no function replacement", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "config.features = value;",
          "config.features += 1;",
          "config.features++;",
          "delete config.features;",
          "[config.features] = list;",
          "({ a: config.features = fallback } = obj);",
          "[config.features = fallback] = list;",
          "({ a: config.features } = obj);",
          "for (config.features of list) {}"
        )
      );

      expect(report).toBe("");
    });
  });

  describe("computed access", () => {
    it("keeps the parentheses of a sequence-expression receiver", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const used = (prepare(), partial).features;"
        )
      );

      expect(report).toContain("write `features((prepare(), partial))`");
    });

    it("flags an optional read for manual migration", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const a = re?.features;",
          "const b = re?.inner.features;",
          "const c = re.features;"
        )
      );

      const [first, second, third] = report.split("\n").filter((row) => row.startsWith("fixture.ts"));
      expect(first).toContain("guard it by hand");
      expect(second).toContain("guard it by hand");
      expect(third).not.toContain("guard it by hand");
      expect(third).toContain("write `features(re)`");
    });

    it("reports a string-literal computed read", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "const re = new PartialMatchRegExp('a');",
          'const used = re["features"];'
        )
      );

      expect(report).toContain("fixture.ts:3");
      expect(report).toContain("write `features(re)`");
    });

    it("ignores a dynamic computed read", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp from "regex-partial-match";',
          "re[key];"
        )
      );

      expect(report).toBe("");
    });
  });

  describe("destructuring", () => {
    const header = 'import PartialMatchRegExp from "regex-partial-match";';

    it("reports a destructured features from an instance as likely", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { features } = re;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("`features` from `featuresOf(re)`");
      expect(report).toContain(
        'add: import { features as featuresOf } from "regex-partial-match";'
      );
    });

    it("reports a renamed destructuring", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { features: used } = re;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("`used` from `features(re)`");
    });

    it("reports a defaulted destructuring", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { features = fallback } = re;"
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
      expect(report).toContain("`features` from `featuresOf(re)`");
    });

    it("reports a string-literal key", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          'const { "features": used } = re;'
        )
      );

      expect(report).toContain("fixture.ts:3: likely:");
    });

    it("reports an assignment pattern", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "let used;",
          "({ features: used } = re);"
        )
      );

      expect(report).toContain("fixture.ts:4: likely:");
      expect(report).toContain("`used` from `features(re)`");
    });

    it("reports a destructured parameter annotated with the class as likely", () => {
      const { report } = runTransform(
        lines(
          header,
          "const f = ({ features }: PartialMatchRegExp) => features;"
        )
      );

      expect(report).toContain("fixture.ts:2: likely:");
    });

    it("reports a destructuring from an unknown object as possible", () => {
      const { report } = runTransform(
        lines(header, "const { features } = something;")
      );

      expect(report).toContain("fixture.ts:2: possible:");
    });

    it("reports a destructured parameter of unknown type as possible", () => {
      const { report } = runTransform(
        lines(header, "const f = ({ features }) => features;")
      );

      expect(report).toContain("fixture.ts:2: possible:");
      expect(report).toContain("`featuresOf(<object>)`");
    });

    it("reports one finding per features property, other properties ignored", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { source, features, flags } = re;"
        )
      );

      expect(report.split("\n").filter((l) => l.includes("destructures"))).toHaveLength(1);
    });

    it("uses the features import already visible", () => {
      const { report } = runTransform(
        lines(
          'import PartialMatchRegExp, { features } from "regex-partial-match";',
          "function f(re: PartialMatchRegExp) {",
          "  const { features: used } = re;",
          "}"
        )
      );

      expect(report).toContain("`used` from `features(re)`");
      expect(report).not.toContain("add: import");
    });

    it("ignores a destructuring with no features property", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { source, flags } = re;",
          "const { [key]: other } = re;"
        )
      );

      expect(report).toBe("");
    });

    it("ignores a rest element", () => {
      const { report } = runTransform(
        lines(
          header,
          "const re = new PartialMatchRegExp('a');",
          "const { ...rest } = re;"
        )
      );

      expect(report).toBe("");
    });
  });
});
