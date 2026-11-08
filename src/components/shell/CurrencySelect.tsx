"use client";

import { currencies, type CurrencyCode } from "@/lib/currency";
import { setCurrency, useCurrency } from "@/lib/useCurrency";

export function CurrencySelect() {
  const { code } = useCurrency();
  return (
    <label className="currency">
      <span className="sr-only">Show prices in</span>
      <select value={code} onChange={(event) => setCurrency(event.target.value as CurrencyCode)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 10 6" fill="none" aria-hidden="true">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </label>
  );
}

/** A quiet corner stamp so the bar can stay a menu. */
export function CurrencyDock() {
  return (
    <div className="currency-dock">
      <CurrencySelect />
    </div>
  );
}
