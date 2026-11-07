import type { CSSProperties } from "react";

/** The sunburst from the Sustainability artwork. */
export function Sunburst({
  rays = 30,
  className,
  style,
}: {
  rays?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const half = (Math.PI / rays) * 0.52;
  const inner = 42;
  const outer = 100;
  const points = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2;
    const p = (r: number, t: number) =>
      `${(Math.cos(t) * r).toFixed(2)},${(Math.sin(t) * r).toFixed(2)}`;
    return [
      p(inner, a - half * 0.72),
      p(outer, a - half),
      p(outer, a + half),
      p(inner, a + half * 0.72),
    ].join(" ");
  });
  return (
    <svg viewBox="-100 -100 200 200" className={className} style={style} aria-hidden="true">
      {points.map((polygon) => (
        <polygon key={polygon} points={polygon} fill="currentColor" />
      ))}
    </svg>
  );
}
