/**
 * DRAFT PRINT PRICES. Replace before launch.
 *
 * No price list for prints exists in the source material: the old Prices page
 * was a "Calculator HERE" placeholder. The A-size figures below are the last
 * live Shopify variants (May 2026), and those were the fee for the "Giclée
 * Printing Quality Check", not for a print. They are here so the calculator
 * has real numbers to work with. Set `confirmed: true` once they are real and
 * the "indicative" note disappears from the calculator and order forms.
 *
 * The €5 sample pack and proof strip prices are confirmed by the website copy.
 */
export const pricing = {
  confirmed: false,
  sizes: [
    { id: "A5", mm: [148, 210], price: 2 },
    { id: "A4", mm: [210, 297], price: 4 },
    { id: "A3", mm: [297, 420], price: 9 },
    { id: "A2", mm: [420, 594], price: 19 },
    { id: "A1", mm: [594, 841], price: 29 },
    { id: "A0", mm: [841, 1189], price: 39 },
  ],
  samplePack: 5,
  proofStrip: 5,
} as const;

export type SizeId = (typeof pricing.sizes)[number]["id"];

export const euro = (value: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value % 1 ? 2 : 0,
  }).format(value);
