import type { CSSProperties, ReactNode } from "react";
import { fitVw } from "@/lib/fit";
import { Motion } from "@/components/shell/Motion";
import type { InkName } from "@/lib/site";

export function Sheet({ ink, children }: { ink: InkName; children: ReactNode }) {
  return (
    <div data-ink={ink}>
      {children}
      <Motion />
    </div>
  );
}

export function Statement({
  title,
  align,
  children,
}: {
  title: string;
  align?: "start";
  children?: ReactNode;
}) {
  return (
    <section className={align === "start" ? "statement statement--start" : "statement"} data-reveal="rise">
      <h2 className="h-lg">{title}</h2>
      {typeof children === "string" ? <p>{children}</p> : children}
    </section>
  );
}

/** A heading set to the full width of the sheet. */
export function FitHeading({ children, span = 80 }: { children: string; span?: number }) {
  return (
    <h2
      className="fit-heading"
      data-reveal="rise"
      style={{ "--fit": fitVw(children.split("|"), span, 9) } as CSSProperties}
    >
      {children.split("|").map((line) => (
        <span className="block" key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}

export function Specs({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="specs">
      {rows.map(([term, value]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Ticks({ items }: { items: readonly string[] }) {
  return (
    <ul className="ticks">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>;
}
