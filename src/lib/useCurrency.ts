"use client";

import { useSyncExternalStore } from "react";
import { currencies, fallbackRates, type CurrencyCode, type RateTable } from "./currency";

const KEY = "gc-currency";

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
    .then((response) => response.json() as Promise<RateTable>)
    .then((table) => publish(table))
    .catch(() => {
      // The stored rates still give a fair guide.
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!restored) {
    restored = true;
    try {
      const saved = localStorage.getItem(KEY) as CurrencyCode | null;
      if (saved && saved !== "GBP" && currencies.includes(saved)) {
        publish({ code: saved });
        loadRates();
      }
    } catch {
      // Private mode: stay in pounds.
    }
  }
  return () => {
    listeners.delete(listener);
  };
}

export function setCurrency(code: CurrencyCode) {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // The choice just lasts for this visit.
  }
  publish({ code });
  if (code !== "GBP") loadRates();
}

export function useCurrency() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}
