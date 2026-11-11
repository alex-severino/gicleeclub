"use client";

import Link from "next/link";
import { useState } from "react";
import { Money, RateNote } from "@/components/shell/Money";
import { framesFrom, pricing, sizeFor, type SizeId } from "@/lib/pricing";
import { contactHref, papers, type PaperId } from "@/lib/site";

/** Every A size is half the one before it, so they nest into one sheet. */
function Nest({ size, onPick }: { size: SizeId; onPick: (id: SizeId) => void }) {
  return (
    <svg viewBox="-2 -2 845 1193" aria-hidden="true">
      <defs>
        <linearGradient id="nest-ink" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--ink-a)" }} />
          <stop offset="1" style={{ stopColor: "var(--ink-b)" }} />
        </linearGradient>
      </defs>
      {[...pricing.sizes].reverse().map(({ id, mm: [w, h] }) => (
        <g key={id}>
          <rect
            x={0}
            y={1189 - h}
            width={w}
            height={h}
            data-on={id === size ? "" : undefined}
            onClick={() => onPick(id)}
          />
          <text x={w - 14} y={1189 - h + 44} fontSize={34} textAnchor="end">
            {id}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function PriceCalculator() {
  const [size, setSize] = useState<SizeId>("A2");
  const [paper, setPaper] = useState<PaperId>("photo-rag");
  const [quantity, setQuantity] = useState(1);
  const [framed, setFramed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sticker, setSticker] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const chosen = sizeFor(size);
  const paperName = papers.find((p) => p.id === paper)?.name;
  const canFrame = chosen.frame !== null && chosen.mount !== null;
  const frame = framed && canFrame ? chosen.frame + (mounted ? chosen.mount : 0) : 0;
  const framing = framed && (mounted ? "hand-painted frame with a window mount" : "hand-painted frame");
  const extras = [sticker && "branded package sticker", certificate && "Certificate of Authenticity"]
    .filter(Boolean)
    .join(" and ");
  const about = `${quantity} × ${size} Giclée print on ${paperName}${framing ? `, in a ${framing}` : ""}${extras ? `, with ${extras}` : ""}`;

  return (
    <section className="tool" id="calculator" aria-labelledby="calculator-title">
      <h2 className="h-lg" id="calculator-title" style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
        Print price calculator
      </h2>
      <div className="calc">
        <div className="calc__nest">
          <Nest size={size} onPick={setSize} />
        </div>

        <div>
          <div className="calc__group">
            <span>Size</span>
            <div className="calc__chips" role="group" aria-label="Print size">
              {pricing.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="chip"
                  aria-pressed={s.id === size}
                  onClick={() => setSize(s.id)}
                >
                  {s.id}
                </button>
              ))}
            </div>
            <p className="label" style={{ marginTop: "0.6rem" }}>
              {chosen.mm[0]} × {chosen.mm[1]} mm
            </p>
          </div>

          <div className="calc__group">
            <span>Hahnemühle paper</span>
            <div className="calc__chips" role="group" aria-label="Paper">
              {papers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="chip"
                  aria-pressed={p.id === paper}
                  onClick={() => setPaper(p.id)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="calc__group">
            <span>Quantity</span>
            <div className="stepper">
              <button
                type="button"
                aria-label="One fewer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <output aria-live="polite">{quantity}</output>
              <button type="button" aria-label="One more" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="calc__group">
            <span>Frame</span>
            <label className="check">
              <input
                type="checkbox"
                checked={framed && canFrame}
                disabled={!canFrame}
                onChange={(e) => setFramed(e.target.checked)}
              />
              <span>
                Hand-painted Farrow &amp; Ball frame
                {canFrame ? (
                  <>
                    {" "}
                    (+<Money gbp={chosen.frame} />)
                  </>
                ) : (
                  ` (${size} on request)`
                )}
              </span>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={mounted && framed && canFrame}
                disabled={!framed || !canFrame}
                onChange={(e) => setMounted(e.target.checked)}
              />
              <span>
                With a white window mount
                {canFrame && (
                  <>
                    {" "}
                    (+<Money gbp={chosen.mount} />)
                  </>
                )}
              </span>
            </label>
            <p className="label" style={{ marginTop: "0.3rem" }}>
              <Link className="inline" href="/painted-frames">
                Choose the colour
              </Link>{" "}
              on our frames page.
            </p>
          </div>

          <div className="calc__group">
            <span>Extras</span>
            <label className="check">
              <input
                type="checkbox"
                checked={sticker}
                onChange={(e) => setSticker(e.target.checked)}
              />
              Branded package sticker
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={certificate}
                onChange={(e) => setCertificate(e.target.checked)}
              />
              Certificate of Authenticity
            </label>
          </div>

          <div className="calc__total">
            <output className="calc__price" aria-live="polite">
              <Money gbp={(chosen.price + frame) * quantity} />
            </output>
            <span>
              {quantity} × {size} on {paperName}
              {frame ? ", framed" : ""}
            </span>
          </div>
          <RateNote />
          {extras && (
            <p className="label" style={{ marginTop: "0.4rem" }}>
              We will confirm the price of your extras with you.
            </p>
          )}
          {!pricing.confirmed && (
            <p className="label" style={{ marginTop: "0.4rem" }}>
              Indicative prices. We confirm the final price when we have approved your file.
            </p>
          )}
          <Link className="btn" href={contactHref(about)} style={{ marginTop: "1.5rem" }}>
            Contact us about this print
          </Link>
          <p className="label" style={{ marginTop: "1rem" }}>
            If you wish to order custom sizes, please{" "}
            <Link className="inline" href="/contact-us">
              email us
            </Link>
            .
          </p>
        </div>
      </div>

      <table className="price-list">
        <caption className="eyebrow">Our prices at a glance</caption>
        <tbody>
          {pricing.sizes.map(({ id, mm, price }) => (
            <tr key={id}>
              <th scope="row">Giclée print {id}</th>
              <td>
                {mm[0]} × {mm[1]} mm
              </td>
              <td>
                <Money gbp={price} />
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row">
              <Link href="/painted-frames">Hand-painted frame</Link>
            </th>
            <td>Farrow &amp; Ball colours, A5 to A1</td>
            <td>
              from <Money gbp={framesFrom} />
            </td>
          </tr>
          <tr>
            <th scope="row">Sample pack</th>
            <td>4 prints on 4 papers</td>
            <td>
              <Money gbp={pricing.samplePack} />
            </td>
          </tr>
          <tr>
            <th scope="row">Proof printing strip</th>
            <td>1100 × 100 mm</td>
            <td>
              <Money gbp={pricing.proofStrip} />
            </td>
          </tr>
          <tr>
            <th scope="row">Premium Portfolio Set</th>
            <td>A5 | A4 | A3</td>
            <td>On request</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
