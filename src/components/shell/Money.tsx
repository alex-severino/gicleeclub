"use client";

import { formatMoney } from "@/lib/currency";
import { useCurrency } from "@/lib/useCurrency";

/** A price in pounds, shown in whichever currency the visitor has chosen. */
export function Money({ gbp }: { gbp: number }) {
  const { code, rates } = useCurrency();
  return <>{formatMoney(gbp, code, rates)}</>;
}
