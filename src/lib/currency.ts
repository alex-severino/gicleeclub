export const currencies = ["GBP", "EUR", "USD", "CAD", "AUD", "CHF", "SEK", "NOK", "DKK", "JPY"] as const;

export type CurrencyCode = (typeof currencies)[number];
export type Rates = Record<CurrencyCode, number>;
export type RateTable = { date: string; rates: Rates };

/** Pounds to each currency. Used until the day's rates load, or if the rate service is down. */
export const fallbackRates: RateTable = {
  date: "2026-11-06",
  rates: {
    GBP: 1,
    EUR: 1.1988,
    USD: 1.3385,
    CAD: 1.8828,
    AUD: 1.9481,
    CHF: 1.0961,
    SEK: 13.2182,
    NOK: 12.6188,
    DKK: 8.9615,
    JPY: 211.92,
  },
};

export function formatMoney(gbp: number, code: CurrencyCode, rates: Rates) {
  const whole = code === "GBP" ? Number.isInteger(gbp) : code === "JPY";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: code,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(gbp * rates[code]);
}

/** Supported local currencies; other destinations keep the sterling price. */
export function currencyForCountry(country: string | null): CurrencyCode {
  const code = country?.trim().toUpperCase();
  const local: Record<string, CurrencyCode> = {
    GB: "GBP", US: "USD", CA: "CAD", AU: "AUD", CH: "CHF", LI: "CHF",
    SE: "SEK", NO: "NOK", DK: "DKK", GL: "DKK", FO: "DKK", JP: "JPY",
  };
  const euro = new Set([
    "AT", "BE", "BG", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
    "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "AD", "MC", "SM", "VA",
  ]);
  if (code && euro.has(code)) return "EUR";
  return (code && local[code]) || "GBP";
}
