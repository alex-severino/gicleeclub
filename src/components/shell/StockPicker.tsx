"use client";

import { useEffect, useRef, useState } from "react";
import { stocks } from "@/lib/site";
import { setStock, useStock } from "@/lib/stock";

/** Choose the paper the whole site is printed on. */
export function StockPicker() {
  const stock = useStock();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = stocks.find((s) => s.id === stock) ?? stocks[0];

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== "Escape") return;
      if (event instanceof PointerEvent && root.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div className="stock" ref={root}>
      {open && (
        <div className="stock__panel" role="radiogroup" aria-label="Paper this site is printed on">
          <p className="eyebrow" style={{ marginBottom: "0.7rem" }}>
            Print this site on
          </p>
          {stocks.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={s.id === stock}
              className="stock__option"
              onClick={() => setStock(s.id)}
            >
              <span
                className="stock__swatch"
                style={{ backgroundImage: `url(/textures/paper/${s.id}-height.jpg)` }}
              />
              <span>
                <span className="block font-semibold" style={{ lineHeight: 1.25 }}>
                  {s.name}
                </span>
                <span className="label block">
                  {s.gsm} gsm · {s.white}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="stock__button"
        aria-expanded={open}
        aria-label={`Printed on ${current.name}. Choose another paper`}
        onClick={() => setOpen((value) => !value)}
      >
        <i />
        <span className="stock__name">Printed on {current.name}</span>
      </button>
    </div>
  );
}
