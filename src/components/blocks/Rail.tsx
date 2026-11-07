import type { CSSProperties } from "react";

const process = ["#00aeef", "#ec008c", "#fff200", "#231f20"];
const SEGMENTS = Array.from({ length: 28 }, (_, i) => i);

/** The checker ramps from a classical print test page: the source of the Giclée Club identity. */
export function Rail({ dark }: { dark?: boolean }) {
  return (
    <div className="rail" aria-hidden="true">
      {SEGMENTS.map((i) => {
        const ink = process[i % 4];
        return (
          <i key={i} style={{ "--c": dark && ink === "#231f20" ? "#fff" : ink } as CSSProperties} />
        );
      })}
    </div>
  );
}
