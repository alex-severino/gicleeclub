"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

/** The label's four corners in the 1000 × 1120 photograph. */
const corners = "490,337 766,366 731,580 454,531";
/** The photo's perspective, flattened to an affine for the lettering. */
const onLabel = "matrix(.991 .1398 -.1715 .9855 610.25 453.5)";

function lettering(text: string) {
  const words = text.trim().toUpperCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [] as string[];
  // Greedy wrap into at most three lines.
  const target = Math.max(4, Math.ceil(words.join(" ").length / 3));
  const lines: string[] = [];
  for (const word of words) {
    const last = lines[lines.length - 1];
    if (last && lines.length && `${last} ${word}`.length <= target) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else if (lines.length < 3) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = `${last} ${word}`;
    }
  }
  return lines;
}

export function StickerDemo() {
  const [name, setName] = useState("Your logo here");
  const lines = lettering(name);
  const longest = Math.max(1, ...lines.map((line) => line.length));
  const size = Math.min(52, 214 / longest, 150 / Math.max(1, lines.length));
  const start = -((lines.length - 1) * size * 1.14) / 2 + size * 0.36;

  return (
    <section className="split guide__step" data-scroll="">
      <div className="split__art" data-drift="" style={{ "--drift": -44 } as CSSProperties}>
        <figure className="print" data-reveal="">
          <span className="print__frame">
            <span className="print__sheet sticker">
              <Image
                src="/media/section/sticker.png"
                alt="A triangular cardboard tube with a white label on it"
                width={1000}
                height={1120}
                sizes="(max-width: 860px) 92vw, 46vw"
                quality={88}
              />
              <svg
                viewBox="0 0 1000 1120"
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                <polygon points={corners} fill="#fbfbf9" />
                <g transform={onLabel}>
                  <rect x={-122} y={-90} width={244} height={180} fill="none" stroke="#231f20" strokeWidth={1} />
                  {lines.map((line, i) => (
                    <text
                      key={`${line}-${i}`}
                      y={start + i * size * 1.14}
                      textAnchor="middle"
                      fontSize={size}
                      fill="#0e0e0e"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              </svg>
            </span>
            <span className="print__head" aria-hidden="true" />
          </span>
        </figure>
      </div>

      <div className="split__text" data-reveal="rise">
        <p className="eyebrow">Branded package sticker</p>
        <h2 className="h-md">Your art, your way</h2>
        <div className="split__body prose-sheet">
          <p>
            When ordering your art print you can choose to add your name, logo, pattern or signature
            to the packaging. We will print it full colour on a sustainable sticker and place it on
            the package.
          </p>
        </div>
        <label className="field" style={{ marginTop: "1.5rem" }}>
          <span>Try your name</span>
          <input
            value={name}
            maxLength={28}
            onChange={(event) => setName(event.target.value)}
            onFocus={(event) => event.target.select()}
          />
        </label>
      </div>
    </section>
  );
}
