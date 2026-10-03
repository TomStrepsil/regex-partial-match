export default function execFrom(
  regex: RegExp,
  input: string,
  start: number
) {
  regex.lastIndex = start;
  return regex.exec(input);
}
