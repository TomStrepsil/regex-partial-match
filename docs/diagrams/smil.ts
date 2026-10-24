type Attributes = Readonly<Record<string, string | number>>;

export interface Span {
  readonly from: number;
  readonly to: number;
}

export interface Keyframe {
  readonly at: number;
  readonly x: number;
  readonly y: number;
}

export interface Tween {
  readonly attribute: string;
  readonly at: number;
  readonly value: number;
}

export interface Cdata {
  readonly cdata: string;
}

type Child = SvgNode | Cdata | string;

export interface SvgNode {
  readonly tag: string;
  readonly attributes: Attributes;
  readonly children: readonly Child[];
  readonly shown: Span[];
  readonly moves: Keyframe[];
  readonly tweens: Tween[];
}

export interface Clock {
  readonly duration: number;
  readonly fade: number;
  readonly poster: number;
}

export function node(
  tag: string,
  attributes: Attributes = {},
  children: readonly Child[] = []
): SvgNode {
  return { tag, attributes, children, shown: [], moves: [], tweens: [] };
}

export function cdata(text: string): Cdata {
  if (text.includes("]]>")) throw new Error("CDATA can't hold ]]>");
  return { cdata: text };
}

export function during(target: SvgNode, ...spans: readonly Span[]) {
  target.shown.push(...spans);
  return target;
}

export function moving(target: SvgNode, ...keyframes: readonly Keyframe[]) {
  target.moves.push(...keyframes);
  return target;
}

export function tweening(target: SvgNode, ...tweens: readonly Tween[]) {
  target.tweens.push(...tweens);
  return target;
}

export const spanning = (first: Span, last: Span): Span => ({
  from: first.from,
  to: last.to
});

export class Timeline {
  #now = 0;

  next(duration: number): Span {
    const span = { from: this.#now, to: this.#now + duration };
    this.#now = span.to;
    return span;
  }

  get duration() {
    return this.#now;
  }
}

const rounded = (value: number) => String(Math.round(value * 1000) / 1000);

const escaped = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function merged(spans: readonly Span[]) {
  const ordered = [...spans].sort((a, b) => a.from - b.from);
  const result: Span[] = [];
  for (const span of ordered) {
    const last = result.length - 1;
    if (last >= 0 && span.from <= result[last].to)
      result[last] = { from: result[last].from, to: Math.max(result[last].to, span.to) };
    else result.push(span);
  }
  return result;
}

const visibleAt = (spans: readonly Span[], time: number) =>
  spans.some(({ from, to }) => from <= time && time < to);

function keyframed(
  attributes: Attributes,
  points: readonly (readonly [number, string])[],
  { duration }: Clock
) {
  const distinct = points.filter(
    ([time, value], index) =>
      index === 0 || time !== points[index - 1][0] || value !== points[index - 1][1]
  );
  return node(attributes.attributeName === "transform" ? "animateTransform" : "animate", {
    ...attributes,
    dur: rounded(duration) + "s",
    repeatCount: "indefinite",
    keyTimes: distinct.map(([time]) => rounded(time / duration)).join(";"),
    values: distinct.map(([, value]) => value).join(";")
  });
}

function opacityAnimation(spans: readonly Span[], clock: Clock) {
  const points: [number, string][] = [[0, "0"]];
  for (const { from, to } of merged(spans)) {
    const fade = Math.min(clock.fade, (to - from) / 2);
    points.push([from, "0"], [from + fade, "1"], [to - fade, "1"], [to, "0"]);
  }
  points.push([clock.duration, "0"]);
  return keyframed({ attributeName: "opacity" }, points, clock);
}

function motionAnimation(keyframes: readonly Keyframe[], clock: Clock) {
  const ordered = [...keyframes].sort((a, b) => a.at - b.at);
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  const points: [number, string][] = [
    [0, `${rounded(first.x)} ${rounded(first.y)}`],
    ...ordered.map(({ at, x, y }): [number, string] => [at, `${rounded(x)} ${rounded(y)}`]),
    [clock.duration, `${rounded(last.x)} ${rounded(last.y)}`]
  ];
  return keyframed(
    { attributeName: "transform", type: "translate", additive: "sum" },
    points,
    clock
  );
}

const TEXT_CONTENT = new Set(["text", "tspan"]);

function tweenAnimations(tweens: readonly Tween[], clock: Clock) {
  const attributes = [...new Set(tweens.map(({ attribute }) => attribute))];
  return attributes.map((attribute) => {
    const ordered = tweens
      .filter((tween) => tween.attribute === attribute)
      .sort((a, b) => a.at - b.at);
    const first = rounded(ordered[0].value);
    const last = rounded(ordered[ordered.length - 1].value);
    return keyframed(
      { attributeName: attribute },
      [
        [0, first],
        ...ordered.map(({ at, value }): [number, string] => [at, rounded(value)]),
        [clock.duration, last]
      ],
      clock
    );
  });
}

function serialised(target: Child, clock: Clock): string {
  if (typeof target === "string") return escaped(target);
  if ("cdata" in target) return `<![CDATA[\n${target.cdata}\n]]>`;
  const attributes: Record<string, string | number> = { ...target.attributes };
  const children = [...target.children];
  if (target.shown.length > 0) {
    attributes.opacity = visibleAt(target.shown, clock.poster) ? 1 : 0;
    children.push(opacityAnimation(target.shown, clock));
  }
  if (target.moves.length > 0) children.push(motionAnimation(target.moves, clock));
  children.push(...tweenAnimations(target.tweens, clock));
  const opening =
    "<" +
    target.tag +
    Object.keys(attributes)
      .map((name) => {
        const value = attributes[name];
        return ` ${name}="${escaped(typeof value === "number" ? rounded(value) : value)}"`;
      })
      .join("");
  if (children.length === 0) return opening + "/>";
  const inline =
    TEXT_CONTENT.has(target.tag) || children.every((child) => typeof child === "string");
  const body = children.map((child) => serialised(child, clock));
  return inline
    ? opening + ">" + body.join("") + "</" + target.tag + ">"
    : opening + ">\n" + body.join("\n") + "\n</" + target.tag + ">";
}

export function rendered(root: SvgNode, clock: Clock) {
  return serialised(root, clock) + "\n";
}

export type Palette = Readonly<Record<string, readonly [light: string, dark: string]>>;

export function paletteStyle(palette: Palette, washOpacity: number) {
  const rules = (scheme: 0 | 1) =>
    Object.keys(palette)
      .map((name) => {
        const colour = palette[name][scheme];
        return (
          `.${name}{fill:${colour}}` +
          `.${name}-line{stroke:${colour}}` +
          `.${name}-wash{fill:${colour};fill-opacity:${rounded(washOpacity)}}`
        );
      })
      .join("\n");
  return rules(0) + "\n@media (prefers-color-scheme: dark){\n" + rules(1) + "\n}";
}
