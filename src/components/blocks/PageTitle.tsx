import type { CSSProperties, ReactNode } from "react";
import { fitVw } from "@/lib/fit";

/** A page opening with no picture: just the title, edge to edge. */
export function PageTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string[];
  children?: ReactNode;
}) {
  return (
    <header className="hero__head" style={{ "--fit": fitVw(title), paddingTop: "clamp(8rem, 11vw, 11.5rem)" } as CSSProperties}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="hero__title">
        {title.map((line, i) => (
          <span className="line" key={line} style={{ "--i": i } as CSSProperties}>
            <span>{line}</span>
          </span>
        ))}
      </h1>
      {children && (
        <div className="prose-sheet" style={{ maxWidth: "42rem", marginTop: "1.4rem" }}>
          {children}
        </div>
      )}
    </header>
  );
}
