"use client";

import { stocks } from "@/lib/site";
import { useStock } from "@/lib/stock";

/** The paper this very page is "printed" on. */
export function StockName() {
  const id = useStock();
  const stock = stocks.find((s) => s.id === id) ?? stocks[0];
  return (
    <>
      Hahnemühle {stock.name} {stock.gsm} gsm
    </>
  );
}
