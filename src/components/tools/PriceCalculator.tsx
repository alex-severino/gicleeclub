"use client";

import Link from "next/link";
import { useState } from "react";
import { euro, pricing, type SizeId } from "@/lib/pricing";
import { stocks, type StockId } from "@/lib/site";

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
  const [paper, setPaper] = useState<StockId>("photo-rag");
  const [quantity, setQuantity] = useState(1);
  const [sticker, setSticker] = useState(false);
  const [certificate, setCertificate] = useState(false);

  const chosen = pricing.sizes.find((s) => s.id === size) ?? pricing.sizes[0];
  const total = chosen.price * quantity;
  const query = new URLSearchParams({
    size,
    paper,
    quantity: String(quantity),
    sticker: sticker ? "1" : "0",
    certificate: certificate ? "1" : "0",
  });

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
              {stocks.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="chip"
                  aria-pressed={s.id === paper}
                  onClick={() => setPaper(s.id)}
                >
                  {s.name}
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
              {euro(total)}
            </output>
            <span>
              {quantity} × {size} on {stocks.find((s) => s.id === paper)?.name}
            </span>
          </div>
          {(sticker || certificate) && (
            <p className="label" style={{ marginTop: "0.6rem" }}>
              We will confirm the price of your extras with your order.
            </p>
          )}
          {!pricing.confirmed && (
            <p className="label" style={{ marginTop: "0.6rem" }}>
              Indicative prices, final price confirmed with your order.
            </p>
          )}
          <Link
            className="btn"
            href={`/order/art-print?${query}`}
            style={{ marginTop: "1.5rem" }}
          >
            Order this print
          </Link>
          <p className="label" style={{ marginTop: "1rem" }}>
            If you wish to order custom sizes, please <Link className="inline" href="/contact-us">email us</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
