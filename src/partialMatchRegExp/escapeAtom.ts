export default function escapeAtom(atom: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- support for RegExp.escape is not yet widespread, so fallback to manual escape
  return RegExp.escape?.(atom) ?? atom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
