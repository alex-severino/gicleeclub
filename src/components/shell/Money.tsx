"use client";

import { formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/useCurrency";

/** A price in pounds, shown in the supported currency for the visitor’s country. */
export function Money({ gbp }: { gbp: number }) {
  const { code, rates } = useCurrency();
  return <>{formatMoney(gbp, code, rates)}</>;
}

/** Says which currency the prices beside it are in, and that pounds are what we charge. */
export function RateNote() {
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
