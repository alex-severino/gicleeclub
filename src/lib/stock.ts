"use client";

import { useSyncExternalStore } from "react";
import { stocks, type StockId } from "./site";

const KEY = "gc-stock";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function read(): StockId {
  const value = document.documentElement.dataset.stock;
  return stocks.some((s) => s.id === value) ? (value as StockId) : "photo-rag";
}

/** Reprints the whole site on another stock, and remembers the choice. */
export function setStock(id: StockId) {
  const paper = document.querySelector(".paper");
  paper?.setAttribute("data-swapping", "");
  window.setTimeout(() => {
    document.documentElement.dataset.stock = id;
    try {
      localStorage.setItem(KEY, id);
    } catch {
      // Private mode: the choice just lasts for this visit.
    }
    listeners.forEach((listener) => listener());
    paper?.removeAttribute("data-swapping");
  }, 260);
}

export function useStock(): StockId {
  return useSyncExternalStore(subscribe, read, () => "photo-rag");
}
