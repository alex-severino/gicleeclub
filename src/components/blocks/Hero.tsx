import { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { fitVw } from "@/lib/fit";
import { Action, type ActionProps } from "./Action";

type HeroProps = {
  /** File name in /media/hero. Each has a wide and a tall (-m) composition. */
  name: string;
  alt: string;
  eyebrow?: string;
  title: string[];
  credit?: string;
  action?: ActionProps;
  children?: ReactNode;
};

/** Page opening: the title runs edge to edge, then the art prints in under it. */
export function Hero({ name, alt, eyebrow, title, credit, action, children }: HeroProps) {
  const image = {
    alt,
    sizes: "100vw",
    quality: 88,
    loading: "eager",
    fetchPriority: "high",
  } as const;
  const {
    props: { srcSet: wide },
  } = getImageProps({ ...image, src: `/media/hero/${name}.png`, width: 2560, height: 1100 });
  const {
    props: { srcSet: tall, ...rest },
  } = getImageProps({ ...image, src: `/media/hero/${name}-m.png`, width: 780, height: 1600 });

  return (
    <section className="hero" style={{ "--fit": fitVw(title) } as CSSProperties}>
      <div className="hero__head">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="hero__title">
          {title.map((line, i) => (
            <span className="line" key={line} style={{ "--i": i } as CSSProperties}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
      </div>

      <figure className="print hero__art">
        <span className="print__frame">
          <span className="print__sheet">
            <picture>
              <source media="(min-width: 761px)" srcSet={wide} />
              <source srcSet={tall} />
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img {...rest} style={{ width: "100%", height: "auto" }} />
            </picture>
          </span>
          <span className="print__head" aria-hidden="true" />
        </span>
      </figure>

      {(children || action) && (
        <div className="hero__card">
          <div className="prose-sheet">{children}</div>
          {action && <Action {...action} />}
        </div>
      )}
      {credit && <p className="hero__credit label">{credit}</p>}
    </section>
  );
}
