import { describe, expect, it } from "vitest";
import jscodeshift from "jscodeshift";
import transform from "./isComplete-to-hitEnd.js";

function runTransform(source, path = "fixture.ts") {
  const j = jscodeshift.withParser("tsx");
  const reports = [];
  const output = transform(
    { path, source },
    {
      jscodeshift: j,
      j,
      stats: () => undefined,
      report: (message) => reports.push(message)
    },
    {}
  );
  return { output, report: reports.join("\n") };
}

const lines = (...rows) => [...rows, ""].join("\n");

describe("isComplete-to-hitEnd codemod", () => {
  describe("imports", () => {
    it("renames the specifier", () => {
      const { output } = runTransform(
        lines(
          'import PartialMatchRegExp, { isComplete } from "regex-partial-match";'
        )
      );

      expect(output).toBe(
        lines('import PartialMatchRegExp, { hitEnd } from "regex-partial-match";')
      );
    });

    it("does not import hitEnd twice", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete, hitEnd } from "regex-partial-match";',
          "const a = isComplete(p, m);",
          "const b = hitEnd(p, m);"
        )
      );

      expect(output).toBe(
        lines(
          'import { hitEnd } from "regex-partial-match";',
          "const a = !hitEnd(p, m);",
          "const b = hitEnd(p, m);"
        )
      );
    });

    it("drops an import declaration that only held isComplete when hitEnd is imported elsewhere", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          'import { hitEnd } from "regex-partial-match";',
          "isComplete(p, m);"
        )
      );

      expect(output).toBe(
        lines('import { hitEnd } from "regex-partial-match";', "!hitEnd(p, m);")
      );
    });

    it("keeps an alias and flags it", () => {
      const { output, report } = runTransform(
        lines(
          'import { isComplete as done } from "regex-partial-match";',
          "if (done(p, m)) ok();"
        )
      );

      expect(output).toBe(
        lines(
          'import { hitEnd as done } from "regex-partial-match";',
          "if (!done(p, m)) ok();"
        )
      );
      expect(report).toContain("fixture.ts:1");
      expect(report).toContain('"done" is now `hitEnd`, the opposite of what it meant');
    });

    it("does not reuse a type-only hitEnd import", () => {
      for (const typeOnly of [
        'import type { hitEnd } from "regex-partial-match";',
        'import { type hitEnd } from "regex-partial-match";'
      ]) {
        const { output, report } = runTransform(
          lines(
            typeOnly,
            'import { isComplete } from "regex-partial-match";',
            "isComplete(p, m);"
          )
        );

        expect(output).toBeNull();
        expect(report).toContain('"hitEnd" is already bound');
      }
    });

    it("drops the alias when hitEnd is already imported", () => {
      const { output, report } = runTransform(
        lines(
          'import { isComplete as done, hitEnd } from "regex-partial-match";',
          "done(p, m);"
        )
      );

      expect(output).toBe(
        lines('import { hitEnd } from "regex-partial-match";', "!hitEnd(p, m);")
      );
      expect(report).toBe("");
    });

    it("leaves other entry points untouched", () => {
      for (const entry of [
        "regex-partial-match/partialMatchRegExp",
        "regex-partial-match/extend",
        "other-package"
      ]) {
        const { output } = runTransform(
          lines(
            `import { isComplete } from "${entry}";`,
            "isComplete(p, m);"
          )
        );

        expect(output).toBeNull();
      }
    });

    it("leaves an import without isComplete untouched", () => {
      const { output, report } = runTransform(
        lines(
          'import PartialMatchRegExp, { hitEnd } from "regex-partial-match";',
          "!hitEnd(p, m);"
        )
      );

      expect(output).toBeNull();
      expect(report).toBe("");
    });

    it("is idempotent", () => {
      const first = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const done = isComplete(p, m);"
        )
      );

      expect(runTransform(first.output).output).toBeNull();
    });
  });

  describe("calls", () => {
    it("negates a bare call", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const done = isComplete(partial, partial.exec(input));"
        )
      );

      expect(output).toBe(
        lines(
          'import { hitEnd } from "regex-partial-match";',
          "const done = !hitEnd(partial, partial.exec(input));"
        )
      );
    });

    it("collapses a negated call in an if", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "if (!isComplete(p, m)) {",
          "  wait();",
          "}"
        )
      );

      expect(output).toBe(
        lines(
          'import { hitEnd } from "regex-partial-match";',
          "if (hitEnd(p, m)) {",
          "  wait();",
          "}"
        )
      );
    });

    it("collapses a negated call in a while", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "while (!isComplete(p, m = p.exec(read()))) {}"
        )
      );

      expect(output).toContain("while (hitEnd(p, m = p.exec(read()))) {}");
    });

    it("collapses a negated call in a ternary test", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          'const state = !isComplete(p, m) ? "incomplete" : "complete";'
        )
      );

      expect(output).toContain(
        'const state = hitEnd(p, m) ? "incomplete" : "complete";'
      );
    });

    it("negates a call in a ternary test that was not negated", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          'const state = isComplete(p, m) ? "complete" : "incomplete";'
        )
      );

      expect(output).toContain(
        'const state = !hitEnd(p, m) ? "complete" : "incomplete";'
      );
    });

    it("turns a double negation into one", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const done = !!isComplete(p, m);"
        )
      );

      expect(output).toContain("const done = !hitEnd(p, m);");
    });

    it("keeps its place inside a larger expression", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const ok = m !== null && isComplete(p, m) || fallback;",
          "const text = String(isComplete(p, m));"
        )
      );

      expect(output).toContain(
        "const ok = m !== null && !hitEnd(p, m) || fallback;"
      );
      expect(output).toContain("const text = String(!hitEnd(p, m));");
    });

    it("rewrites every call and leaves other lines byte for byte", () => {
      const source = lines(
        'import { isComplete } from "regex-partial-match";',
        "",
        "// untouched   spacing",
        "const   kept  =  { a:1 };",
        "const a = isComplete(p, m);",
        "const b = !isComplete(p, m);"
      );

      const { output } = runTransform(source);

      expect(output).toBe(
        lines(
          'import { hitEnd } from "regex-partial-match";',
          "",
          "// untouched   spacing",
          "const   kept  =  { a:1 };",
          "const a = !hitEnd(p, m);",
          "const b = hitEnd(p, m);"
        )
      );
    });

    it("handles a TypeScript file with an annotated match", () => {
      const { output } = runTransform(
        lines(
          'import PartialMatchRegExp, { isComplete } from "regex-partial-match";',
          "",
          "export function check(partial: PartialMatchRegExp, input: string): boolean {",
          "  const match: RegExpExecArray | null = partial.exec(input);",
          "  return match !== null && isComplete(partial, match as RegExpExecArray);",
          "}"
        ),
        "fixture.ts"
      );

      expect(output).toContain(
        "return match !== null && !hitEnd(partial, match as RegExpExecArray);"
      );
      expect(output).toContain("const match: RegExpExecArray | null = partial.exec(input);");
    });

    it("handles a JSX-free JavaScript file", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "export const done = (p, m) => isComplete(p, m);"
        ),
        "fixture.js"
      );

      expect(output).toContain("export const done = (p, m) => !hitEnd(p, m);");
    });

    it("leaves a local function named isComplete alone", () => {
      const { output, report } = runTransform(
        lines(
          'import { hitEnd } from "regex-partial-match";',
          "function isComplete(task) {",
          "  return task.done;",
          "}",
          "if (isComplete(task)) finish();"
        )
      );

      expect(output).toBeNull();
      expect(report).toBe("");
    });

    it("leaves a local isComplete alone in a file with no package import", () => {
      const { output } = runTransform(
        lines("const isComplete = (task) => task.done;", "isComplete(task);")
      );

      expect(output).toBeNull();
    });

    it("leaves a shadowing parameter named isComplete alone", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const a = isComplete(p, m);",
          "const f = (isComplete) => isComplete(1, 2);"
        )
      );

      expect(output).toContain("const a = !hitEnd(p, m);");
      expect(output).toContain("const f = (isComplete) => isComplete(1, 2);");
    });

    it("leaves the import and every call alone when one call has hitEnd shadowed", () => {
      const { output, report } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const a = isComplete(p, m);",
          "function f(hitEnd) {",
          "  return isComplete(p, hitEnd);",
          "}"
        )
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.ts:4");
      expect(report).not.toContain("fixture.ts:2");
      expect(report).toContain('"hitEnd" is shadowed here');
      expect(report).toContain("throughout this file");
    });

    it("still rewrites namespace calls when a direct call is shadowed", () => {
      const { output } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          'import * as rpm from "regex-partial-match";',
          "const a = rpm.isComplete(p, m);",
          "function f(hitEnd) {",
          "  return isComplete(p, hitEnd);",
          "}"
        )
      );

      expect(output).toContain("const a = !rpm.hitEnd(p, m);");
      expect(output).toContain('import { isComplete } from "regex-partial-match";');
      expect(output).toContain("return isComplete(p, hitEnd);");
    });

    it("leaves the file alone when hitEnd is already bound to something else", () => {
      const { output, report } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const hitEnd = 3;",
          "isComplete(p, m);"
        )
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.ts:1");
      expect(report).toContain('"hitEnd" is already bound');
    });
  });

  describe("namespace imports", () => {
    it("rewrites a call through the namespace", () => {
      const { output } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "const a = rpm.isComplete(p, m);",
          "if (!rpm.isComplete(p, m)) wait();"
        )
      );

      expect(output).toBe(
        lines(
          'import * as rpm from "regex-partial-match";',
          "const a = !rpm.hitEnd(p, m);",
          "if (rpm.hitEnd(p, m)) wait();"
        )
      );
    });

    it("flags the namespace member used as a value", () => {
      const { output, report } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "results.filter(rpm.isComplete);"
        )
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.ts:2");
      expect(report).toContain("other than by a direct call");
    });

    it("rewrites a literal computed call through the namespace as a plain member call", () => {
      const { output } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          'const a = rpm["isComplete"](p, m);',
          "if (!rpm['isComplete'](p, m)) wait();"
        )
      );

      expect(output).toBe(
        lines(
          'import * as rpm from "regex-partial-match";',
          "const a = !rpm.hitEnd(p, m);",
          "if (rpm.hitEnd(p, m)) wait();"
        )
      );
    });

    it("rewrites an optional call through the namespace", () => {
      const { output } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "const a = rpm?.isComplete(p, m);"
        )
      );

      expect(output).toContain("const a = !rpm?.hitEnd(p, m);");
    });

    it("flags a computed namespace member that is not called", () => {
      const { output, report } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          'results.filter(rpm["isComplete"]);'
        )
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.ts:2");
      expect(report).toContain("other than by a direct call");
    });

    it("leaves a dynamic computed namespace member alone", () => {
      const { output, report } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "rpm[name](p, m);"
        )
      );

      expect(output).toBeNull();
      expect(report).toBe("");
    });

    it("flags isComplete destructured from the namespace", () => {
      const { report } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "const { isComplete } = rpm;"
        )
      );

      expect(report).toContain("fixture.ts:2");
      expect(report).toContain("destructured from a namespace import");
    });

    it("leaves an unrelated member named isComplete alone", () => {
      const { output, report } = runTransform(
        lines(
          'import * as rpm from "regex-partial-match";',
          "task.isComplete(1, 2);",
          "other.isComplete(1, 2);"
        )
      );

      expect(output).toBeNull();
      expect(report).toBe("");
    });
  });

  describe("sites it flags instead of rewriting", () => {
    it("flags isComplete passed as a callback and still rewrites the calls", () => {
      const { output, report } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "pairs.every(([p, m]) => isComplete(p, m));",
          "pairs.map(isComplete);"
        )
      );

      expect(output).toContain("pairs.every(([p, m]) => !hitEnd(p, m));");
      expect(output).toContain("pairs.map(isComplete);");
      expect(report).toContain("fixture.ts:3");
      expect(report).not.toContain("fixture.ts:2");
    });

    it("flags isComplete assigned to another binding", () => {
      const { report } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "const check = isComplete;",
          "export default { isComplete };"
        )
      );

      expect(report).toContain("fixture.ts:2");
      expect(report).toContain("fixture.ts:3");
    });

    it("flags a re-export", () => {
      const { report } = runTransform(
        lines(
          'export { isComplete } from "regex-partial-match";',
          'export { isComplete as done } from "regex-partial-match";'
        )
      );

      expect(report).toContain("fixture.ts:1");
      expect(report).toContain("fixture.ts:2");
      expect(report).toContain("is re-exported");
    });

    it("flags an export of the imported binding", () => {
      const { report } = runTransform(
        lines(
          'import { isComplete } from "regex-partial-match";',
          "export { isComplete };"
        )
      );

      expect(report).toContain("fixture.ts:2");
    });

    it("flags a require() form and leaves it", () => {
      const { output, report } = runTransform(
        lines(
          'const { isComplete } = require("regex-partial-match");',
          "isComplete(p, m);"
        ),
        "fixture.cjs"
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.cjs:1");
      expect(report).toContain("without a static import");
    });

    it("flags a dynamic import() and leaves it", () => {
      const { output, report } = runTransform(
        lines(
          'const { isComplete } = await import("regex-partial-match");',
          "isComplete(p, m);"
        )
      );

      expect(output).toBeNull();
      expect(report).toContain("fixture.ts:1");
      expect(report).toContain("without a static import");
    });

    it("says nothing about a dynamic import of a file that never mentions isComplete", () => {
      const { report } = runTransform(
        lines('const rpm = await import("regex-partial-match");')
      );

      expect(report).toBe("");
    });
  });
});
