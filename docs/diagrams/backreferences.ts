import { writeFileSync } from "node:fs";
import renderBackreference from "../../src/modules/backreferences/renderBackreference.ts";
import { CONTROL_IDS, stepControlScript } from "./stepControls.ts";
import {
  Timeline,
  cdata,
  during,
  moving,
  node,
  paletteStyle,
  rendered,
  spanning,
  tweening,
  type Palette,
  type Span,
  type SvgNode
} from "./smil.ts";

const CAPTURE = "abc";
const PREFIX = `^(${CAPTURE})-`;
const MATCHED_INPUT = "abc-ab";
const REJECTED_INPUT = "abc-ax";
const LONGEST_PARTIAL = 64;
const BACKREFERENCE = "\\1";
const REST_GROUP = 2;
const OUTPUT = new URL("../modules/backreferences.svg", import.meta.url);

function check(condition: boolean, claim: string): asserts condition {
  if (!condition)
    throw new Error(`The diagram claims ${claim}, which the regex contradicts`);
}

const quoted = (text: string) => `"${text}"`;
const at = (position: number) => String(position);

const longest = Math.min(LONGEST_PARTIAL, CAPTURE.length - 1);
const rewrite = renderBackreference(
  BACKREFERENCE,
  longest,
  () => REST_GROUP,
  () => ""
);

const HIDDEN_NAMES: Readonly<Record<string, string>> = {
  [REST_GROUP]: "H",
  [REST_GROUP + 1]: "G"
};
const shown = (source: string) =>
  source.replace(/\\(\d+)/g, (escape, group: string) =>
    group in HIDDEN_NAMES ? "\\" + HIDDEN_NAMES[group] : escape
  );
const display = shown(rewrite);
const REST = "\\H";
const STEP_BACK = "\\G";

function atomEnd(source: string, from: number) {
  if (source[from] === "\\") {
    let end = from + 2;
    while (/\d/.test(source[end] ?? "")) end++;
    return end;
  }
  if (source[from] !== "(") return from + 1;
  let depth = 0;
  let inClass = false;
  for (let index = from; index < source.length; index++) {
    const character = source[index];
    if (character === "\\") index++;
    else if (inClass) inClass = character !== "]";
    else if (character === "[") inClass = true;
    else if (character === "(") depth++;
    else if (character === ")" && --depth === 0) return index + 1;
  }
  throw new Error(`Unbalanced group at ${String(from)} in ${source}`);
}

function atomsOf(source: string) {
  const atoms: string[] = [];
  for (let index = 0; index < source.length; index = atomEnd(source, index))
    atoms.push(source.slice(index, atomEnd(source, index)));
  return atoms;
}

const OPENING = "(?:";
check(rewrite.startsWith(OPENING) && rewrite.endsWith(")"), "the rewrite is one group");
const alternatives: string[][] = [[]];
for (const atom of atomsOf(rewrite.slice(OPENING.length, -1))) {
  if (atom === "|") alternatives.push([]);
  else alternatives[alternatives.length - 1].push(atom);
}

interface Placed {
  readonly text: string;
  readonly source: string;
  readonly line: number;
  readonly column: number;
}

const BRANCH_COLUMN = PREFIX.length + OPENING.length;
const PREFIX_LINE = 0;
const lines = [
  { column: 0, text: PREFIX },
  ...alternatives.map((atoms, index) => {
    const lead = index === 0 ? OPENING : "|";
    const trail = index === alternatives.length - 1 ? ")" : "";
    return {
      column: BRANCH_COLUMN - lead.length,
      text: lead + shown(atoms.join("")) + trail
    };
  })
];
const branches = alternatives.map((atoms, index) => {
  let column = BRANCH_COLUMN;
  return atoms.map((source): Placed => {
    const placed = { text: shown(source), source, line: index + 1, column };
    column += placed.text.length;
    return placed;
  });
});

check(
  branches.length === 3 && branches[0].length === 1 && branches[1].length === 6,
  "the rewrite has three choices, the second of six steps"
);
const [
  [wholeCapture],
  secondChoice,
  inputEnded
] = branches;
const [doesNotFit, atMostL, captureRest, findOccurrence, stepBackAndCheck, consumeRest] =
  secondChoice;
const endCheck = joined(inputEnded.slice(0, 2));

function within(atom: Placed, part: string): Placed {
  const offset = atom.text.indexOf(part);
  check(offset !== -1, `${atom.text} contains ${part}`);
  const source = atom.source.slice(offset, offset + part.length);
  check(shown(source) === part, `${part} lines up with ${source}`);
  return { text: part, source, line: atom.line, column: atom.column + offset };
}

function joined(atoms: readonly Placed[]): Placed {
  return {
    text: atoms.map(({ text }) => text).join(""),
    source: atoms.map(({ source }) => source).join(""),
    line: atoms[0].line,
    column: atoms[0].column
  };
}

const upTo = (atom: Placed) => secondChoice.slice(0, secondChoice.indexOf(atom) + 1);

const matchOf = (input: string, atoms: readonly Placed[]) =>
  new RegExp(PREFIX + atoms.map(({ source }) => source).join("")).exec(input);

function claim(input: string, atoms: readonly Placed[], holds: boolean) {
  check(
    (matchOf(input, atoms) !== null) === holds,
    `\`${PREFIX}${joined(atoms).text}\` ${holds ? "matches" : "fails"} on ${quoted(input)}`
  );
}

interface Pass {
  readonly input: string;
  readonly start: number;
  readonly rest: string;
  readonly stepBack: string;
  readonly nearest: number;
}

function passOver(input: string): Pass {
  const prefixMatch = new RegExp(PREFIX).exec(input);
  check(prefixMatch !== null, `${PREFIX} matches the start of ${quoted(input)}`);
  const occurrence = matchOf(input, upTo(findOccurrence));
  check(occurrence !== null, `the second choice finds the capture before the rest of ${quoted(input)}`);
  const [, captured, rest, stepBack] = occurrence;
  check(captured === CAPTURE, `group 1 captures ${quoted(CAPTURE)}`);
  const start = prefixMatch[0].length;
  return { input, start, rest, stepBack, nearest: start - stepBack.length };
}

const matching = passOver(MATCHED_INPUT);
const rejected = passOver(REJECTED_INPUT);
const fullMatch = new RegExp(PREFIX + rewrite).exec(MATCHED_INPUT);
check(fullMatch?.[0] === MATCHED_INPUT, `${quoted(MATCHED_INPUT)} matches in full`);
check(new RegExp(PREFIX + rewrite).exec(REJECTED_INPUT) === null, `${quoted(REJECTED_INPUT)} doesn't match`);

const WIDTH = 960;
const HEIGHT = 540;
const CHAR = 9.6;
const PATTERN_X = 60;
const PATTERN_TOP = 100;
const LINE_GAP = 30;
const CELL = 52;
const SLOTS = Math.max(
  ...[matching, rejected].map(({ input, start }) => Math.max(input.length, start + CAPTURE.length))
);
const TAPE_X = (WIDTH - SLOTS * CELL) / 2;
const TAPE_TOP = 266;
const INDEX_Y = TAPE_TOP + CELL + 18;
const BRACKET_Y = INDEX_Y + 14;
const GHOST_TOP = BRACKET_Y + 40;
const GHOST_HEIGHT = 44;
const CAPTION_Y = GHOST_TOP + GHOST_HEIGHT + 40;

const PALETTE: Palette = {
  paper: ["#ffffff", "#0d1117"],
  ink: ["#1f2328", "#e6edf3"],
  muted: ["#59636e", "#9198a1"],
  rule: ["#d1d9e0", "#3d444d"],
  focus: ["#0969da", "#4493f8"],
  capture: ["#8250df", "#ab7df8"],
  rest: ["#bc4c00", "#f0883e"],
  back: ["#1b7c83", "#39c5cf"],
  pass: ["#1a7f37", "#3fb950"],
  fail: ["#cf222e", "#f85149"]
};

const STYLE = `
.mono{font-family:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace}
.sans{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif}
.outline{fill:none}
.dashed{stroke-dasharray:4 3}
.bold{font-weight:600}
.button{cursor:pointer}
.button:hover .face{stroke-width:3}
.pip-target{cursor:pointer;fill:transparent}
${paletteStyle(PALETTE, 0.16)}
`;

const REFERENCE_CLASSES: Readonly<Record<string, string>> = {
  [BACKREFERENCE]: "capture",
  [REST]: "rest",
  [STEP_BACK]: "back"
};

function coloured(code: string, base: string) {
  return code
    .split(/(\\[1HG])/)
    .filter((piece) => piece !== "")
    .map((piece) =>
      node("tspan", { class: REFERENCE_CLASSES[piece] ?? base }, [piece])
    );
}

function prose(text: string) {
  return text
    .split("`")
    .flatMap((piece, index) =>
      index % 2 === 1
        ? [node("tspan", { class: "mono" }, coloured(piece, "ink"))]
        : piece === ""
          ? []
          : [node("tspan", {}, [piece])]
    );
}

const columnX = (column: number) => PATTERN_X + column * CHAR;
const lineY = (line: number) => PATTERN_TOP + line * LINE_GAP;
const slotX = (slot: number) => TAPE_X + slot * CELL;

const patternLayer: SvgNode[] = [];
const highlightLayer: SvgNode[] = [];
const tapeBackLayer: SvgNode[] = [];
const tapeLayer: SvgNode[] = [];
const overlayLayer: SvgNode[] = [];

const activeBranchSpans: Span[][] = lines.map(() => []);

function highlight({ text, line, column }: Placed, ...spans: Span[]) {
  const box = {
    x: columnX(column) - 3,
    y: lineY(line) - 19,
    width: text.length * CHAR + 6,
    height: 30,
    rx: 5
  };
  highlightLayer.push(
    during(
      node("g", {}, [
        node("rect", { ...box, class: "focus-wash", style: "fill-opacity:0.3" }),
        node("rect", { ...box, class: "focus-line outline", "stroke-width": 2 })
      ]),
      ...spans
    )
  );
  if (column >= BRANCH_COLUMN) activeBranchSpans[line].push(...spans);
}

function underline({ text, line, column }: Placed, ...spans: Span[]) {
  highlightLayer.push(
    during(
      node("rect", {
        class: "focus",
        x: columnX(column),
        y: lineY(line) + 5,
        width: text.length * CHAR,
        height: 3,
        rx: 1.5
      }),
      ...spans
    )
  );
}

function tapeWash(from: number, to: number, tone: string, ...spans: Span[]) {
  tapeBackLayer.push(
    during(
      node("rect", {
        class: `${tone}-wash`,
        x: slotX(from) + 2,
        y: TAPE_TOP + 2,
        width: (to - from) * CELL - 4,
        height: CELL - 4,
        rx: 6
      }),
      ...spans
    )
  );
}

function bracket(
  from: number,
  to: number,
  y: number,
  direction: 1 | -1,
  tone: string,
  label: string
) {
  const left = slotX(from) + 4;
  const right = slotX(to) - 4;
  return node("g", {}, [
    node("path", {
      class: `${tone}-line outline`,
      "stroke-width": 2,
      d: `M${String(left)} ${String(y - 6 * direction)}V${String(y)}H${String(right)}V${String(y - 6 * direction)}`
    }),
    node(
      "text",
      {
        class: "sans ink",
        "font-size": 13,
        x: (left + right) / 2,
        y: direction === 1 ? y + 17 : y - 8,
        "text-anchor": "middle"
      },
      prose(label)
    )
  ]);
}

const ARC_RISE = 36;
const ARROW_HEAD = 8;

function referBack(reference: Placed, capture: Placed, tone: "rest" | "back", span: Span) {
  const baseline = lineY(capture.line) - 20;
  const from = columnX(reference.column) + (reference.text.length * CHAR) / 2;
  const to = columnX(capture.column) + (capture.text.length * CHAR) / 2;
  const control = baseline - ARC_RISE;
  const drawn = { from: span.from + 0.3, to: span.from + 1.1 };
  highlightLayer.push(
    during(
      node("rect", {
        class: `${tone}-wash ${tone}-line`,
        "stroke-width": 1.5,
        x: columnX(capture.column) - 2,
        y: lineY(capture.line) - 18,
        width: capture.text.length * CHAR + 4,
        height: 26,
        rx: 4
      }),
      { from: drawn.to - 0.1, to: span.to }
    )
  );
  overlayLayer.push(
    during(
      tweening(
        node("path", {
          class: `${tone}-line outline`,
          "stroke-width": 2,
          "stroke-linecap": "round",
          pathLength: 1,
          "stroke-dasharray": 1,
          d:
            `M${String(from)} ${String(baseline)}` +
            `C${String(from)} ${String(control)} ${String(to)} ${String(control)} ${String(to)} ${String(baseline - ARROW_HEAD)}`
        }),
        { attribute: "stroke-dashoffset", at: drawn.from, value: 1 },
        { attribute: "stroke-dashoffset", at: drawn.to, value: 0 }
      ),
      span
    ),
    during(
      node("path", {
        class: tone,
        d: `M${String(to)} ${String(baseline + 1)}l-5 ${String(-ARROW_HEAD - 1)}h10z`
      }),
      { from: drawn.to - 0.1, to: span.to }
    )
  );
}

type Verdict = "pass" | "fail" | "missing" | "neutral" | "rest";

const unitsOf = (text: string) =>
  Array.from({ length: text.length }, (_, index) => text.charAt(index));

const characterAt = ({ input }: Pass, slot: number) => input[slot] as string | undefined;

function ghost(characters: readonly string[], at: number, verdicts: readonly Verdict[], label: string) {
  return node("g", {}, [
    node(
      "text",
      {
        class: "mono muted",
        "font-size": 13,
        x: slotX(at) - 8,
        y: GHOST_TOP + GHOST_HEIGHT / 2 + 5,
        "text-anchor": "end"
      },
      coloured(label, "muted")
    ),
    ...characters.map((character, index) => {
      const verdict = verdicts[index];
      const x = slotX(at + index);
      const outline =
        verdict === "missing"
          ? "rule-line outline dashed"
          : verdict === "neutral"
            ? "focus-line outline"
            : `${verdict}-line outline`;
      return node("g", {}, [
        ...(verdict === "missing" || verdict === "neutral"
          ? []
          : [
              node("rect", {
                class: `${verdict}-wash`,
                x: x + 4,
                y: GHOST_TOP,
                width: CELL - 8,
                height: GHOST_HEIGHT,
                rx: 6
              })
            ]),
        node("rect", {
          class: outline,
          "stroke-width": 1.5,
          x: x + 4,
          y: GHOST_TOP,
          width: CELL - 8,
          height: GHOST_HEIGHT,
          rx: 6
        }),
        node(
          "text",
          {
            class: `mono ${verdict === "missing" ? "muted" : "ink"}`,
            "font-size": 20,
            x: x + CELL / 2,
            y: GHOST_TOP + GHOST_HEIGHT / 2 + 7,
            "text-anchor": "middle"
          },
          [character]
        )
      ]);
    })
  ]);
}

function compared(pass: Pass, text: string, at: number) {
  return unitsOf(text).map((character, index): Verdict => {
    const found = characterAt(pass, at + index);
    return found === undefined ? "missing" : found === character ? "pass" : "fail";
  });
}

const captions: SvgNode[] = [];

function caption(span: Span, title: string, body: readonly string[], verdict?: boolean) {
  captions.push(
    during(
      node("g", { class: "sans" }, [
        node(
          "text",
          { class: "ink bold", "font-size": 16, x: 32, y: CAPTION_Y },
          [
            ...prose(title),
            ...(verdict === undefined
              ? []
              : [node("tspan", { class: verdict ? "pass" : "fail" }, [verdict ? "  ✓" : "  ✗"])])
          ]
        ),
        ...body.map((text, index) =>
          node(
            "text",
            { class: "ink", "font-size": 14, x: 32, y: CAPTION_Y + 26 + index * 21 },
            prose(text)
          )
        )
      ]),
      span
    )
  );
}

function drawTape(pass: Pass, span: Span) {
  const { input } = pass;
  tapeLayer.push(
    during(
      node("g", {}, [
        ...unitsOf(input).flatMap((character, slot) => [
          node("rect", {
            class: "rule-line outline",
            "stroke-width": 1.5,
            x: slotX(slot),
            y: TAPE_TOP,
            width: CELL,
            height: CELL
          }),
          node(
            "text",
            {
              class: "mono ink",
              "font-size": 24,
              x: slotX(slot) + CELL / 2,
              y: TAPE_TOP + CELL / 2 + 8,
              "text-anchor": "middle"
            },
            [character]
          ),
          node(
            "text",
            { class: "mono muted", "font-size": 12, x: slotX(slot) + CELL / 2, y: INDEX_Y, "text-anchor": "middle" },
            [String(slot)]
          )
        ]),
        node("rect", {
          class: "muted",
          x: slotX(input.length) - 1.5,
          y: TAPE_TOP - 6,
          width: 3,
          height: CELL + 12
        }),
        node(
          "text",
          { class: "sans muted", "font-size": 12, x: slotX(input.length) + 8, y: INDEX_Y },
          ["end of input"]
        ),
        bracket(0, CAPTURE.length, TAPE_TOP - 12, -1, "capture", `group 1 = ${quoted(CAPTURE)}`)
      ]),
      span
    )
  );
}

function drawCursor({ input, start }: Pass, span: Span, consumedAt?: number) {
  overlayLayer.push(
    during(
      node(
        "text",
        {
          class: "sans focus",
          "font-size": 13,
          x: slotX(start),
          y: TAPE_TOP - 26,
          "text-anchor": "middle"
        },
        [`${BACKREFERENCE} at ${at(start)}`]
      ),
      { from: span.from, to: consumedAt === undefined ? span.to : consumedAt + 0.4 }
    )
  );
  const cursor = node("g", {}, [
    node("rect", {
      class: "focus",
      x: slotX(start) - 1.5,
      y: TAPE_TOP - 14,
      width: 3,
      height: CELL + 24,
      rx: 1.5
    }),
    node("path", {
      class: "focus",
      d: `M${String(slotX(start) - 6)} ${String(TAPE_TOP - 18)}h12l-6 7z`
    })
  ]);
  if (consumedAt !== undefined)
    moving(
      cursor,
      { at: consumedAt + 0.4, x: 0, y: 0 },
      { at: consumedAt + 1.6, x: (input.length - start) * CELL, y: 0 }
    );
  overlayLayer.push(during(cursor, span));
}

function introduce(pass: Pass, span: Span, body: readonly string[]) {
  caption(span, `\`${PREFIX}${BACKREFERENCE}\` on ${quoted(pass.input)}`, body);
  highlight({ text: PREFIX, source: PREFIX, line: PREFIX_LINE, column: 0 }, span);
  tapeWash(0, pass.start, "focus", span);
}

function showRest({ input, start, rest }: Pass, until: Span, from: Span) {
  overlayLayer.push(
    during(
      bracket(start, input.length, BRACKET_Y, 1, "rest", `\`${REST}\` = ${quoted(rest)}`),
      spanning(from, until)
    )
  );
}

function showStepBack({ start, nearest, stepBack }: Pass, until: Span, from: Span) {
  overlayLayer.push(
    during(
      bracket(nearest, start, BRACKET_Y, 1, "back", `\`${STEP_BACK}\` = ${quoted(stepBack)}`),
      spanning(from, until)
    )
  );
}

const lazy = within(findOccurrence, "([\\s\\S]*?)");
const startsHere = within(findOccurrence, `(?=${BACKREFERENCE})`);
const stepOver = within(stepBackAndCheck, STEP_BACK);
const restFollows = within(stepBackAndCheck, `(?=${REST})`);
const restCapture = within(captureRest, "([\\s\\S]+)");

function slideBack(pass: Pass, span: Span) {
  const { start, nearest, stepBack, rest } = pass;
  const distance = (start - nearest) * CELL;
  const travel = { from: span.from + 0.5, to: span.to - 0.5 };
  caption(span, `\`${stepBackAndCheck.text}\`: step back over \`${STEP_BACK}\``, [
    `Read right to left, \`${STEP_BACK}\` steps back over the same ${quoted(stepBack)}, landing on the occurrence at ${at(nearest)}.`,
    `\`${REST}\` is carried along, to be laid over the capture there.`
  ]);
  highlight(stepBackAndCheck, span);
  underline(stepOver, span);
  tapeWash(nearest, start, "back", span);
  referBack(stepOver, lazy, "back", span);
  overlayLayer.push(
    during(
      moving(
        node("path", {
          class: "back",
          d: `M${String(slotX(start))} ${String(BRACKET_Y - 1)}l12 -8v16z`
        }),
        { at: travel.from, x: 0, y: 0 },
        { at: travel.to, x: -distance, y: 0 }
      ),
      span
    ),
    during(
      moving(
        ghost(unitsOf(rest), start, unitsOf(rest).map((): Verdict => "rest"), ""),
        { at: travel.from, x: 0, y: 0 },
        { at: travel.to, x: -distance, y: 0 }
      ),
      span
    )
  );
}

function layOver(pass: Pass, span: Span, holds: boolean) {
  const { input, nearest, rest } = pass;
  claim(input, upTo(stepBackAndCheck), holds);
  const there = input.slice(nearest, nearest + rest.length);
  caption(
    span,
    `\`${stepBackAndCheck.text}\`: does the rest follow there?`,
    holds
      ? [
          `\`${restFollows.text}\` reads forwards from ${at(nearest)}: ${quoted(rest)} follows. The occurrence holds the whole capture, and the rest`,
          "is shorter, so this holds exactly when the rest is the start of the capture."
        ]
      : [
          `\`${restFollows.text}\` reads forwards from ${at(nearest)}: ${quoted(there)} follows, not ${quoted(rest)}.`,
          "The rest isn't the start of the capture, so the second choice fails."
        ],
    holds
  );
  highlight(stepBackAndCheck, span);
  underline(restFollows, span);
  referBack(within(stepBackAndCheck, REST), restCapture, "rest", span);
  overlayLayer.push(
    during(ghost(unitsOf(rest), nearest, compared(pass, rest, nearest), `${REST} at ${at(nearest)}`), span)
  );
}

const FADE = 0.2;
const timeline = new Timeline();

const intro = timeline.next(5);
const tryWhole = timeline.next(4);
const notWhole = timeline.next(3.5);
const limit = timeline.next(4.5);
const captureTheRest = timeline.next(4.5);
const tried: number[] = [];
for (let position = matching.start; position >= matching.nearest; position--) tried.push(position);
const tries = tried.map(() => timeline.next(1.6));
const found = timeline.next(4.5);
const slide = timeline.next(3.5);
const follows = timeline.next(5);
const consume = timeline.next(3.5);
const result = timeline.next(6);

const secondIntro = timeline.next(5);
const replay = timeline.next(7.5);
const secondSlide = timeline.next(3.5);
const secondFollows = timeline.next(5);
const thirdChoice = timeline.next(5);
const secondResult = timeline.next(6);

const firstPass = spanning(intro, result);
const secondPass = spanning(secondIntro, secondResult);
const passes = [
  [
    intro,
    tryWhole,
    notWhole,
    limit,
    captureTheRest,
    spanning(tries[0], tries[tries.length - 1]),
    found,
    slide,
    follows,
    consume,
    result
  ],
  [secondIntro, replay, secondSlide, secondFollows, thirdChoice, secondResult]
];
const steps = passes.flat();

drawTape(matching, firstPass);
drawCursor(matching, firstPass, consume.from);

introduce(matching, intro, [
  `\`${PREFIX}\` has matched ${quoted(MATCHED_INPUT.slice(0, matching.start))}, capturing ${quoted(CAPTURE)}. \`${BACKREFERENCE}\` is tried at ${at(matching.start)}, where only ${quoted(matching.rest)} is left.`,
  `At construction, \`${BACKREFERENCE}\` was rewritten as the three choices above, tried in order. Nothing is built per input.`
]);

claim(MATCHED_INPUT, [wholeCapture], false);
caption(tryWhole, `\`${wholeCapture.text}\`: the whole capture`, [
  `Only ${quoted(matching.rest)} is left, so ${quoted(CAPTURE)} can't match here.`
], false);
highlight(wholeCapture, tryWhole);
overlayLayer.push(
  during(
    ghost(unitsOf(CAPTURE), matching.start, compared(matching, CAPTURE, matching.start), `${BACKREFERENCE} at ${at(matching.start)}`),
    tryWhole
  )
);

claim(MATCHED_INPUT, upTo(doesNotFit), true);
caption(notWhole, `\`${doesNotFit.text}\`: the whole capture doesn't fit`, [
  "So the second choice may run out of input part way through the capture."
], true);
highlight(doesNotFit, notWhole);

claim(MATCHED_INPUT, upTo(atMostL), true);
const limitWidth = longest + 1;
caption(limit, `\`${atMostL.text}\`: at most L = ${String(longest)} characters are left`, [
  `L is the smaller of \`longestPartial\` (${String(LONGEST_PARTIAL)}) and the longest the group can capture, less one.`,
  `\`(${CAPTURE})\` captures ${String(CAPTURE.length)} at most, so L is ${String(longest)}, and ${String(limitWidth)} characters must not fit. ${String(matching.rest.length)} are left.`
], true);
highlight(atMostL, limit);
overlayLayer.push(
  during(
    ghost(
      Array.from({ length: limitWidth }, (_, index) => characterAt(matching, matching.start + index) ?? "?"),
      matching.start,
      Array.from({ length: limitWidth }, (_, index) =>
        characterAt(matching, matching.start + index) === undefined ? "missing" : "neutral"
      ),
      `[\\s\\S]{${String(limitWidth)}} at ${at(matching.start)}`
    ),
    limit
  )
);

claim(MATCHED_INPUT, upTo(captureRest), true);
caption(captureTheRest, `\`${captureRest.text}\`: capture the rest as \`${REST}\``, [
  `\`${REST}\` = ${quoted(matching.rest)}. It's captured inside a lookahead, so the position stays at ${at(matching.start)},`,
  "and both lookbehinds that follow look back from there."
]);
highlight(captureRest, captureTheRest);
showRest(matching, firstPass, captureTheRest);

const growing = 0.6;
check(
  tried.every(
    (position) => MATCHED_INPUT.startsWith(CAPTURE, position) === (position === matching.nearest)
  ),
  `the nearest occurrence of the capture is at ${at(matching.nearest)}`
);
tried.forEach((position, index) => {
  const span = tries[index];
  const grow = { from: span.from, to: span.from + growing };
  const look = { from: span.from + growing, to: span.to };
  caption(span, `\`${findOccurrence.text}\`: find the nearest occurrence`, [
    `Read right to left, the lazy \`${lazy.text}\` grows one character at a time, from ${at(matching.start)}.`,
    `After each, \`${startsHere.text}\` reads forwards: does ${quoted(CAPTURE)} start at ${at(position)}?`
  ], position === matching.nearest);
  highlight(findOccurrence, span);
  underline(lazy, grow);
  underline(startsHere, look);
  if (position < matching.start) tapeWash(position, matching.start, "back", span);
  overlayLayer.push(
    during(
      ghost(unitsOf(CAPTURE), position, compared(matching, CAPTURE, position), `${BACKREFERENCE} at ${at(position)}`),
      look
    )
  );
});

caption(found, `\`${findOccurrence.text}\`: \`${STEP_BACK}\` = ${quoted(matching.stepBack)}`, [
  `${quoted(CAPTURE)} starts at ${at(matching.nearest)}, the nearest occurrence of the capture. \`${STEP_BACK}\` holds the text from there to ${at(matching.start)}.`,
  "A lookbehind isn't re-entered once it holds, so the search never reads further back than this."
], true);
highlight(findOccurrence, found);
showStepBack(matching, firstPass, found);

slideBack(matching, slide);
layOver(matching, follows, true);

claim(MATCHED_INPUT, secondChoice, true);
caption(consume, `\`${consumeRest.text}\`: consume the rest`, [
  `The match moves to the end of the input. The third choice, \`${joined(inputEnded).text}\`,`,
  "is tried only when nothing is left at all."
]);
highlight(consumeRest, consume);
referBack(consumeRest, restCapture, "rest", consume);
tapeWash(0, MATCHED_INPUT.length, "pass", spanning(consume, result));

caption(result, `Result: ${quoted(fullMatch[0])}, a partial match`, [
  `\`m[0]\` = ${quoted(fullMatch[0])}, \`m[1]\` = ${quoted(CAPTURE)}. \`exec()\` splices \`${REST}\` and \`${STEP_BACK}\` out of the match before returning it.`,
  `Next, the same steps on ${quoted(REJECTED_INPUT)}.`
]);

drawTape(rejected, secondPass);
drawCursor(rejected, secondPass);

introduce(rejected, secondIntro, [
  `This time the input ends ${quoted(rejected.rest)}, which isn't how ${quoted(CAPTURE)} starts, so no more input can complete it.`,
  "The same three choices are tried, in the same order."
]);

const replayed = [wholeCapture, doesNotFit, atMostL, captureRest, findOccurrence];
const replayStep = (replay.to - replay.from) / replayed.length;
const replaySpans = replayed.map((atom, index): Span => ({
  from: replay.from + index * replayStep,
  to: replay.from + (index + 1) * replayStep
}));
claim(REJECTED_INPUT, [wholeCapture], false);
replayed.slice(1).forEach((atom) => {
  claim(REJECTED_INPUT, upTo(atom), true);
});
check(rejected.nearest === matching.nearest, "the capture is again found at the same place");
caption(replay, `The same steps, up to \`${STEP_BACK}\``, [
  `\`${BACKREFERENCE}\` fails, \`${doesNotFit.text}\` and \`${atMostL.text}\` hold, and \`${REST}\` = ${quoted(rejected.rest)}.`,
  `The nearest occurrence of ${quoted(CAPTURE)} is again at ${at(rejected.nearest)}, so \`${STEP_BACK}\` = ${quoted(rejected.stepBack)}.`
]);
replayed.forEach((atom, index) => {
  highlight(atom, replaySpans[index]);
});
const replayedRest = replaySpans[replayed.indexOf(captureRest)];
const replayedOccurrence = replaySpans[replayed.indexOf(findOccurrence)];
showRest(rejected, secondPass, replayedRest);
showStepBack(rejected, secondPass, replayedOccurrence);
tapeWash(rejected.nearest, rejected.start, "back", replayedOccurrence);

slideBack(rejected, secondSlide);
layOver(rejected, secondFollows, false);

claim(REJECTED_INPUT, inputEnded.slice(0, 2), false);
caption(thirdChoice, `\`${endCheck.text}\`: has the input ended?`, [
  `No: ${quoted(rejected.rest)} is left at ${at(rejected.start)}. The third choice fails too, so \`${BACKREFERENCE}\` can't match here,`,
  `and nothing before it can match another way.`
], false);
highlight(endCheck, thirdChoice);
tapeWash(rejected.start, REJECTED_INPUT.length, "fail", spanning(thirdChoice, secondResult));

caption(secondResult, "Result: `null`", [
  `No more input can make ${quoted(REJECTED_INPUT)} match, so \`exec()\` returns \`null\`.`,
  "Both answers come from the one regex built at construction, each in a single `exec()`."
]);

lines.forEach(({ column, text }, line) => {
  patternLayer.push(
    node(
      "text",
      {
        class: "mono",
        "font-size": 16,
        x: columnX(column),
        y: lineY(line),
        textLength: text.length * CHAR,
        lengthAdjust: "spacing"
      },
      coloured(text, "ink")
    )
  );
  if (line === PREFIX_LINE) return;
  const number = (circle: string, label: string, radius: number) =>
    node("g", {}, [
      node("circle", { class: circle, cx: 30, cy: lineY(line) - 5, r: radius }),
      node(
        "text",
        { class: label, "font-size": 12, x: 30, y: lineY(line) - 1, "text-anchor": "middle" },
        [String(line)]
      )
    ]);
  patternLayer.push(number("rule-line outline", "sans muted", 10));
  const active = activeBranchSpans[line];
  if (active.length > 0) patternLayer.push(during(number("focus", "sans paper bold", 11), ...active));
});

const COUNTER_RIGHT = WIDTH - 32;
const PIP_GAP = 14;
const PASS_GAP = 10;
const PIP_Y = 58;
const firstPipX =
  COUNTER_RIGHT - 8 - (steps.length - 1) * PIP_GAP - (passes.length - 1) * PASS_GAP;
const pipX = (index: number) => {
  const passIndex = passes.findIndex((_, pass) =>
    index < passes.slice(0, pass + 1).reduce((count, { length }) => count + length, 0)
  );
  return firstPipX + index * PIP_GAP + passIndex * PASS_GAP;
};
const everything = { from: 0, to: timeline.duration };
const counter = steps.flatMap((step, index) => {
  const x = pipX(index);
  return [
    node("circle", { class: "rule-line outline", "stroke-width": 1.5, cx: x, cy: PIP_Y, r: 4.5 }),
    during(
      node("circle", { class: "focus", cx: x, cy: PIP_Y, r: 4.5 }),
      spanning(step, everything)
    ),
    during(
      node("circle", { class: "focus-line outline", "stroke-width": 2, cx: x, cy: PIP_Y, r: 7 }),
      step
    ),
    during(
      node(
        "text",
        { class: "sans ink bold", "font-size": 14, x: COUNTER_RIGHT, y: 38, "text-anchor": "end" },
        [`Step ${String(index + 1)} of ${String(steps.length)}`]
      ),
      step
    )
  ];
});
const BUTTON_Y = 33;
const BUTTON_RADIUS = 12;

function button(id: string, x: number, label: string, icons: readonly SvgNode[]) {
  return node("g", { id, class: "button" }, [
    node("title", {}, [label]),
    node("circle", {
      class: "face paper rule-line",
      "stroke-width": 1.5,
      cx: x,
      cy: BUTTON_Y,
      r: BUTTON_RADIUS
    }),
    ...icons
  ]);
}

const triangle = (x: number, direction: 1 | -1) =>
  `M${String(x - 4 * direction)} ${String(BUTTON_Y - 6)}L${String(x + 5 * direction)} ${String(BUTTON_Y)}L${String(x - 4 * direction)} ${String(BUTTON_Y + 6)}z`;
const bar = (x: number) =>
  node("rect", { class: "ink", x: x - 1.25, y: BUTTON_Y - 6, width: 2.5, height: 12 });

const toggleX = COUNTER_RIGHT - 172;
const controls = node("g", { id: CONTROL_IDS.controls, visibility: "hidden" }, [
  button(CONTROL_IDS.previous, toggleX - 28, "Previous step (←)", [
    bar(toggleX - 34),
    node("path", { class: "ink", d: triangle(toggleX - 27, -1) })
  ]),
  button(CONTROL_IDS.toggle, toggleX, "Play or pause (space)", [
    node("g", { id: CONTROL_IDS.playIcon, visibility: "hidden" }, [
      node("path", { class: "ink", d: triangle(toggleX, 1) })
    ]),
    node("g", { id: CONTROL_IDS.pauseIcon }, [bar(toggleX - 3), bar(toggleX + 3)])
  ]),
  button(CONTROL_IDS.next, toggleX + 28, "Next step (→)", [
    node("path", { class: "ink", d: triangle(toggleX + 27, 1) }),
    bar(toggleX + 34)
  ]),
  ...steps.map((_, index) =>
    node("circle", {
      class: "pip-target",
      [CONTROL_IDS.stepAttribute]: index,
      cx: pipX(index),
      cy: PIP_Y,
      r: PIP_GAP / 2
    }, [node("title", {}, [`Step ${String(index + 1)}`])])
  )
]);

const labelX = columnX(Math.max(...lines.map(({ column, text }) => column + text.length)) + 2);
[`matched before ${BACKREFERENCE}`, "the whole capture", "run out part way", "the input has ended"].forEach((label, line) => {
  patternLayer.push(
    node("text", { class: "sans muted", "font-size": 12, x: labelX, y: lineY(line) }, [label])
  );
});

const svg = node(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: `0 0 ${String(WIDTH)} ${String(HEIGHT)}`,
    width: WIDTH,
    height: HEIGHT,
    role: "img",
    "aria-labelledby": "title description"
  },
  [
    node("title", { id: "title" }, ["How a backreference runs out of input part way"]),
    node("desc", { id: "description" }, [
      `${PREFIX}${BACKREFERENCE}: ${BACKREFERENCE} is rewritten as ${display}. ` +
        `On "${MATCHED_INPUT}", the rest of the input, "${matching.rest}", is captured, the nearest occurrence of "${CAPTURE}" before it is found at ${at(matching.nearest)}, ` +
        `and "${matching.rest}" starts that occurrence, so the input matches partially. ` +
        `On "${REJECTED_INPUT}", the same steps find "${rejected.rest}" doesn't start it, the input hasn't ended, and the match fails.`
    ]),
    node("style", {}, [STYLE]),
    node("rect", { class: "paper", width: WIDTH, height: HEIGHT, rx: 12 }),
    node("rect", {
      class: "rule-line outline",
      x: 0.5,
      y: 0.5,
      width: WIDTH - 1,
      height: HEIGHT - 1,
      rx: 12
    }),
    node("text", { class: "sans ink bold", "font-size": 18, x: 32, y: 38 }, [
      "How a backreference runs out of input part way"
    ]),
    node("text", { class: "sans muted", "font-size": 13, x: 32, y: 60 }, [
      `${BACKREFERENCE} is rewritten once, at construction. ${REST} and ${STEP_BACK} are hidden groups, removed from each match.`
    ]),
    ...counter,
    ...highlightLayer,
    ...patternLayer,
    ...tapeBackLayer,
    ...tapeLayer,
    ...overlayLayer,
    ...captions,
    controls,
    node("script", {}, [
      cdata(stepControlScript(steps.map(({ from, to }) => [from, to] as const), FADE))
    ])
  ]
);

writeFileSync(
  OUTPUT,
  rendered(svg, { duration: timeline.duration, fade: FADE, poster: follows.from + 1 })
);
