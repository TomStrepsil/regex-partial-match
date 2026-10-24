interface Listening<Event> {
  addEventListener(type: string, listener: (event: Event) => void): void;
}

interface ControlElement extends Listening<unknown> {
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
}

interface KeyEvent {
  readonly key: string;
  preventDefault(): void;
}

export interface ControlledSvg {
  readonly ownerDocument: Listening<KeyEvent>;
  getElementById(id: string): ControlElement;
  querySelectorAll(selectors: string): Iterable<ControlElement>;
  pauseAnimations(): void;
  unpauseAnimations(): void;
  animationsPaused(): boolean;
  getCurrentTime(): number;
  setCurrentTime(seconds: number): void;
}

export type StepTimes = readonly (readonly [from: number, to: number])[];

export const CONTROL_IDS = {
  controls: "controls",
  previous: "control-previous",
  toggle: "control-toggle",
  next: "control-next",
  playIcon: "icon-play",
  pauseIcon: "icon-pause",
  stepAttribute: "data-step"
} as const;

export function controlSteps(
  svg: ControlledSvg,
  steps: StepTimes,
  fade: number,
  ids: typeof CONTROL_IDS,
  nextFrame: (callback: () => void) => void
) {
  const duration = steps[steps.length - 1][1];
  let holdAt: number | undefined;

  function showToggle() {
    const paused = svg.animationsPaused() || holdAt !== undefined;
    svg.getElementById(ids.playIcon).setAttribute("visibility", paused ? "visible" : "hidden");
    svg.getElementById(ids.pauseIcon).setAttribute("visibility", paused ? "hidden" : "visible");
  }

  function currentStep() {
    const looped = svg.getCurrentTime() % duration;
    const index = steps.findIndex(([from, to]) => from <= looped && looped < to);
    return index === -1 ? steps.length - 1 : index;
  }

  function holdWhenDone() {
    if (holdAt === undefined) return;
    if (svg.getCurrentTime() < holdAt) {
      nextFrame(holdWhenDone);
      return;
    }
    svg.pauseAnimations();
    svg.setCurrentTime(holdAt);
    holdAt = undefined;
    showToggle();
  }

  function playStep(index: number) {
    const [from, to] = steps[(index + steps.length) % steps.length];
    svg.setCurrentTime(from + fade);
    holdAt = to - fade - 0.02;
    svg.unpauseAnimations();
    showToggle();
    nextFrame(holdWhenDone);
  }

  function toggle() {
    if (svg.animationsPaused()) svg.unpauseAnimations();
    else svg.pauseAnimations();
    holdAt = undefined;
    showToggle();
  }

  svg.getElementById(ids.previous).addEventListener("click", () => {
    playStep(currentStep() - 1);
  });
  svg.getElementById(ids.next).addEventListener("click", () => {
    playStep(currentStep() + 1);
  });
  svg.getElementById(ids.toggle).addEventListener("click", toggle);
  for (const pip of svg.querySelectorAll(`[${ids.stepAttribute}]`))
    pip.addEventListener("click", () => {
      playStep(Number(pip.getAttribute(ids.stepAttribute)));
    });
  svg.ownerDocument.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") playStep(currentStep() - 1);
    else if (event.key === "ArrowRight") playStep(currentStep() + 1);
    else if (event.key === " ") toggle();
    else return;
    event.preventDefault();
  });
  svg.getElementById(ids.controls).setAttribute("visibility", "visible");
  showToggle();
}

const rounded = (seconds: number) => Math.round(seconds * 1000) / 1000;

const STRIPPED_TYPE_PADDING = / +(?=[,;)\n])/g;

export function stepControlScript(steps: StepTimes, fade: number) {
  const times = steps.map(([from, to]) => [rounded(from), rounded(to)]);
  const controller = controlSteps.toString().replace(STRIPPED_TYPE_PADDING, "");
  return `(${controller})(document.querySelector("svg"), ${JSON.stringify(times)}, ${String(fade)}, ${JSON.stringify(CONTROL_IDS)}, requestAnimationFrame);`;
}
