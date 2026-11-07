/** Krona One advance widths in em, read from the font file. */
const advance: Record<string, number> = {
  A: 0.912, B: 0.917, C: 0.917, D: 0.915, E: 0.832, F: 0.832, G: 1, H: 1.001,
  I: 0.333, J: 0.333, K: 0.832, L: 0.749, M: 1.082, N: 1, O: 1, P: 0.915,
  Q: 1, R: 0.915, S: 1, T: 0.832, U: 0.915, V: 0.835, W: 1.247, X: 0.832,
  Y: 0.835, Z: 0.835, É: 0.832, Ü: 0.915, " ": 0.332, "-": 0.582, "'": 0.419,
};

function widthOf(line: string) {
  return [...line.toUpperCase()].reduce((sum, ch) => sum + (advance[ch] ?? 0.9), 0);
}

/**
 * Font size in vw that makes the widest line span `span` percent of the sheet,
 * so every page title is set edge to edge however long it is.
 */
export function fitVw(lines: string[], span = 90, max = 14) {
  const widest = Math.max(...lines.map(widthOf));
  return `${Math.min(span / widest, max).toFixed(3)}vw`;
}
