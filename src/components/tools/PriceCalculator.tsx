"use client";

import Link from "next/link";
import { useState } from "react";
import { CurrencySelect } from "@/components/shell/CurrencySelect";
import { Money } from "@/components/shell/Money";
import { pricing, type SizeId } from "@/lib/pricing";
import { contactHref, papers, type PaperId } from "@/lib/site";
import { useCurrency } from "@/lib/useCurrency";

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

function RateNote() {
  const { code, date } = useCurrency();
  const day = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(date));
  return (
    <p className="label" style={{ marginTop: "0.6rem" }} aria-live="polite">
      {code === "GBP"
        ? "Prices are in pounds sterling."
        : `Converted from pounds at the ${day} rate, as a guide. We charge in pounds sterling.`}
    </p>
  );
}

export function PriceCalculator() {
  const [size, setSize] = useState<SizeId>("A2");
  const [paper, setPaper] = useState<PaperId>("photo-rag");
  const [quantity, setQuantity] = useState(1);
  const [sticker, setSticker] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const chosen = pricing.sizes.find((s) => s.id === size) ?? pricing.sizes[0];
  const paperName = papers.find((p) => p.id === paper)?.name;
  const extras = [sticker && "branded package sticker", certificate && "Certificate of Authenticity"]
    .filter(Boolean)
    .join(" and ");
  const about = `${quantity} × ${size} art print on ${paperName}${extras ? `, with ${extras}` : ""}`;

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
              <Money gbp={chosen.price * quantity} />
            </output>
            <span>
              {quantity} × {size} on {paperName}
            </span>
            <CurrencySelect />
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
              <th scope="row">Art print {id}</th>
              <td>
                {mm[0]} × {mm[1]} mm
              </td>
              <td>
                <Money gbp={price} />
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row">Sample pack</th>
            <td>4 artworks on 4 papers</td>
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
