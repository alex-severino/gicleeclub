"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const DEFAULT_ART = "/art/calvin-lupiya.jpg";
/** 1100 × 100 mm */
const STRIP_RATIO = 11;

/** Slide the strip over an artwork and see what would come out of the printer. */
export function ProofStripTool() {
  const [src, setSrc] = useState(DEFAULT_ART);
  const [ratio, setRatio] = useState(2 / 3);
  const [position, setPosition] = useState(0.13);
  const art = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (src === DEFAULT_ART) return;
    return () => URL.revokeObjectURL(src);
  }, [src]);

  /** Strip height as a share of the artwork height. */
  const share = Math.min(1, ratio / STRIP_RATIO);
  const top = position * (1 - share);

  const follow = (event: ReactPointerEvent) => {
    const box = art.current?.getBoundingClientRect();
    if (!box) return;
    const y = (event.clientY - box.top) / box.height - share / 2;
    setPosition(Math.min(1, Math.max(0, y / (1 - share))));
  };

  return (
    <section className="tool" aria-labelledby="strip-title">
      <div className="strip-tool">
        <div
          ref={art}
          className="strip-tool__art"
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            follow(event);
          }}
          onPointerMove={(event) => dragging.current && follow(event)}
          onPointerUp={() => {
            dragging.current = false;
          }}
        >
          {/* A local preview of the visitor's own file, so next/image does not apply. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="The artwork the proof strip is placed on"
            onLoad={(event) =>
              setRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)
            }
          />
          <div
            className="strip-tool__window"
            style={{ top: `${top * 100}%`, height: `${share * 100}%` }}
          />
        </div>

        <div>
          <p className="eyebrow">Try it</p>
          <h2 className="h-md" id="strip-title" style={{ marginTop: "0.7rem" }}>
            Select the most important area of your image
          </h2>
          <div className="strip-tool__proof">
            <div
              role="img"
              aria-label="Preview of the selected strip"
              style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: "100% auto",
                backgroundPosition: `0 ${position * 100}%`,
              }}
            />
          </div>
          <label className="field" style={{ marginTop: "1.4rem" }}>
            <span>Strip position</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.005}
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              style={{ padding: 0, boxShadow: "none", accentColor: "var(--color-ultra)" }}
            />
          </label>
          <label className="btn btn--ghost" style={{ marginTop: "1.2rem" }}>
            Try your own image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) setSrc(URL.createObjectURL(file));
              }}
            />
          </label>
          <p className="label" style={{ marginTop: "0.8rem" }}>
            Art by Calvin Lupiya. Your own file stays in your browser.
          </p>
        </div>
      </div>
    </section>
  );
}
