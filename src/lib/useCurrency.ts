"use client";

import { useSyncExternalStore } from "react";
import { currencies, fallbackRates, type CurrencyCode, type RateTable } from "./currency";

type State = RateTable & { code: CurrencyCode };

const initial: State = { code: "GBP", ...fallbackRates };
let state = initial;
let restored = false;
let requested = false;
const listeners = new Set<() => void>();

function publish(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

/** Today's rates come from our own route, so visitors never talk to the rate service. */
function loadRates() {
  if (requested) return;
  requested = true;
  fetch("/api/rates")
    .then((response) => {
      if (!response.ok) throw new Error("Rates unavailable");
      return response.json() as Promise<RateTable>;
    })
    .then((table) => publish(table))
    .catch(() => {
      // The stored rates still give a fair guide.
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!restored) {
    restored = true;
    void fetch("/api/currency", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Currency lookup unavailable");
        return response.json() as Promise<{ code: CurrencyCode }>;
      })
      .then(({ code }) => {
        if (!currencies.includes(code)) return;
        publish({ code });
        if (code !== "GBP") loadRates();
      })
      .catch(() => {
        // Without a country lookup, keep the sterling source prices.
      });
  }
  return () => {
    listeners.delete(listener);
  };
}

export function useCurrency() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}
