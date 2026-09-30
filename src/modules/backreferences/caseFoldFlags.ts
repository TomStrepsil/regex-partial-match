export default function caseFoldFlags(flags: string) {
  return flags.replace(/[^iuv]/g, "");
}
