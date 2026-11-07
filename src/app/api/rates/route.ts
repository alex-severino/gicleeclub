import { cacheLife } from "next/cache";
import { currencies, fallbackRates, type RateTable, type Rates } from "@/lib/currency";

/** Daily European Central Bank reference rates, fetched here so visitors never leave our domain. */
async function latestRates(): Promise<RateTable> {
  "use cache";
  cacheLife("days");

  const symbols = currencies.filter((code) => code !== "GBP").join(",");
  try {
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=GBP&symbols=${symbols}`);
    if (!response.ok) return fallbackRates;
    const { date, rates } = (await response.json()) as { date: string; rates: Omit<Rates, "GBP"> };
    return { date, rates: { GBP: 1, ...rates } };
  } catch {
    return fallbackRates;
  }
}

export async function GET() {
  return Response.json(await latestRates());
}
