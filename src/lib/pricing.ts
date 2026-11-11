/**
 * DRAFT PRICES. Confirm before relying on them.
 *
 * All prices are in pounds sterling and are what the customer pays. They were
 * set in November 2026 against theprintspace's published Giclée prices
 * (VAT included): A5 £8.66, A4 £12.13, A3 £15.73, A2 £30.38, A1 £58.03,
 * A0 £121.61, plus their delivery from £5.75. Ours sit above theirs on the
 * label and about level once their delivery is added, because ours includes
 * delivery. The sample pack and proof strip were "only €5" in the old copy.
 *
 * Set `confirmed: true` once the prices are real and the "indicative" note
 * disappears from the calculators.
 */
export const pricing = {
  confirmed: false,
  sizes: [
    { id: "A5", mm: [148, 210], price: 12 },
    { id: "A4", mm: [210, 297], price: 18 },
    { id: "A3", mm: [297, 420], price: 24 },
    { id: "A2", mm: [420, 594], price: 42 },
    { id: "A1", mm: [594, 841], price: 75 },
    { id: "A0", mm: [841, 1189], price: 145 },
  ],
  samplePack: 5,
  proofStrip: 5,
} as const;

export type SizeId = (typeof pricing.sizes)[number]["id"];

export function sizeFor(id: SizeId) {
  return pricing.sizes.find((s) => s.id === id) ?? pricing.sizes[0];
}
