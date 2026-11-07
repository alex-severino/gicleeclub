"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Action } from "@/components/blocks/Action";
import { PaintedFrame } from "@/components/blocks/PaintedFrame";
import { Money } from "@/components/shell/Money";
import { artworks, isDark, paintNamed } from "@/lib/frames";
import { framesFrom } from "@/lib/pricing";

const picks = [
  "Hague Blue",
  "Setting Plaster",
  "Green Smoke",
  "India Yellow",
  "Railings",
  "Sulking Room Pink",
  "Card Room Green",
  "Charlotte's Locks",
].map(paintNamed);

const art = artworks[0];

/** The print on the wall changes colour on its own until someone picks one. */
export function FrameShowcase() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const root = useRef<HTMLElement>(null);
  const paint = picks[index];

  useEffect(() => {
    const el = root.current;
    if (!el || held || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const watcher = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => setIndex((i) => (i + 1) % picks.length), 2400);
      }
    });
    watcher.observe(el);
    return () => {
      window.clearInterval(timer);
      watcher.disconnect();
    };
  }, [held]);

  return (
    <section className="showcase" ref={root} data-ink="frames" aria-labelledby="showcase-title">
      <div className="showcase__art">
        <div className="fp__wall">
          <PaintedFrame
            paint={paint.hex}
            art={{ src: art.src, w: art.w, h: art.h }}
            size="A3"
            mount
            label={`A print in a ${paint.name} frame with a white mount`}
          />
        </div>
        <p className="label" style={{ marginTop: "0.7rem" }}>
          {art.credit}
        </p>
      </div>
      <div className="showcase__text" data-reveal="rise">
        <p className="eyebrow">New · Farrow &amp; Ball colours</p>
        <h2 className="h-lg" id="showcase-title">
          Hand-painted
          <br />
          frames
        </h2>
        <div className="prose-sheet">
          <p>
            Your print can arrive ready to hang, in a solid wood frame we paint by hand in the Farrow
            &amp; Ball colour of your choice.
          </p>
        </div>
        <div className="showcase__swatches" role="radiogroup" aria-label="Frame colour">
          {picks.map((pick, i) => (
            <button
              key={pick.no}
              type="button"
              role="radio"
              aria-checked={i === index}
              aria-label={`${pick.name} No. ${pick.no}`}
              title={`${pick.name} No. ${pick.no}`}
              className="fp__swatch"
              data-dark={isDark(pick.hex) ? "" : undefined}
              style={{ "--c": pick.hex } as CSSProperties}
              onClick={() => {
                setHeld(true);
                setIndex(i);
              }}
            />
          ))}
        </div>
        <p className="showcase__name label" aria-live={held ? "polite" : "off"}>
          {paint.name} No. {paint.no}
        </p>
        <Action href="/painted-frames" label="Choose your colour" />
        <p className="label" style={{ marginTop: "1rem" }}>
          Frames from <Money gbp={framesFrom} />, any Farrow &amp; Ball colour.
        </p>
      </div>
    </section>
  );
}
