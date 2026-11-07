import type { SizeId } from "@/lib/pricing";

export type Paint = { name: string; no: number; hex: string };

/**
 * The Farrow & Ball colours on our chart, six families of six, light to dark.
 * Any other Farrow & Ball colour can be asked for. The hex values are the
 * colornerd screen approximations, not the paint itself.
 */
export const families: { name: string; paints: Paint[] }[] = [
  {
    name: "Whites",
    paints: [
      { name: "All White", no: 2005, hex: "#fbf8f4" },
      { name: "Wimborne White", no: 239, hex: "#f7f3e8" },
      { name: "School House White", no: 291, hex: "#e6dfd1" },
      { name: "Skimming Stone", no: 241, hex: "#dfd6cb" },
      { name: "Cornforth White", no: 228, hex: "#d1cbc3" },
      { name: "Elephant's Breath", no: 229, hex: "#ccbfb3" },
    ],
  },
  {
    name: "Greys and blacks",
    paints: [
      { name: "Pigeon", no: 25, hex: "#a1a093" },
      { name: "Mole's Breath", no: 276, hex: "#8b857f" },
      { name: "London Clay", no: 244, hex: "#786963" },
      { name: "Down Pipe", no: 26, hex: "#626664" },
      { name: "Railings", no: 31, hex: "#45484b" },
      { name: "Off-Black", no: 57, hex: "#444546" },
    ],
  },
  {
    name: "Blues",
    paints: [
      { name: "Parma Gray", no: 27, hex: "#b2bfc5" },
      { name: "Cook's Blue", no: 237, hex: "#6a90b4" },
      { name: "De Nimes", no: 299, hex: "#6a7c80" },
      { name: "Inchyra Blue", no: 289, hex: "#586768" },
      { name: "Stiffkey Blue", no: 281, hex: "#4d5b6a" },
      { name: "Hague Blue", no: 30, hex: "#3d4e57" },
    ],
  },
  {
    name: "Greens",
    paints: [
      { name: "Breakfast Room Green", no: 81, hex: "#94a68a" },
      { name: "Arsenic", no: 214, hex: "#84b59c" },
      { name: "Card Room Green", no: 79, hex: "#899081" },
      { name: "Calke Green", no: 34, hex: "#768769" },
      { name: "Green Smoke", no: 47, hex: "#737c70" },
      { name: "Studio Green", no: 93, hex: "#464c49" },
    ],
  },
  {
    name: "Pinks and reds",
    paints: [
      { name: "Calamine", no: 230, hex: "#e6d1cb" },
      { name: "Setting Plaster", no: 231, hex: "#dfc2af" },
      { name: "Nancy's Blushes", no: 278, hex: "#ecb7b8" },
      { name: "Sulking Room Pink", no: 295, hex: "#a0837f" },
      { name: "Rectory Red", no: 217, hex: "#a53c49" },
      { name: "Brinjal", no: 222, hex: "#5d3b42" },
    ],
  },
  {
    name: "Yellows and earths",
    paints: [
      { name: "Hay", no: 37, hex: "#dfc795" },
      { name: "Babouche", no: 223, hex: "#ecc363" },
      { name: "Sudbury Yellow", no: 51, hex: "#dcb771" },
      { name: "India Yellow", no: 66, hex: "#cb9e59" },
      { name: "Red Earth", no: 64, hex: "#c57b67" },
      { name: "Charlotte's Locks", no: 268, hex: "#d65f3d" },
    ],
  },
];

export const paints = families.flatMap((family) => family.paints);

export function paintNamed(name: string) {
  return paints.find((paint) => paint.name === name) ?? paints[0];
}

export function familyOf(paint: Paint) {
  return families.find((family) => family.paints.includes(paint))?.name ?? "";
}

/** A tick or label on top of the colour needs to be light on the dark ones. */
export function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 140;
}

/** Frame geometry in millimetres. The mount border grows with the print. */
export const frame = {
  moulding: 22,
  mount: { A5: 40, A4: 50, A3: 60, A2: 70, A1: 80, A0: 90 } satisfies Record<SizeId, number>,
};

/** Outside size of the finished frame, in whole centimetres. */
export function outsideCm(mm: readonly [number, number], size: SizeId, mounted: boolean) {
  const edge = 2 * frame.moulding + (mounted ? 2 * frame.mount[size] : 0);
  return [Math.round((mm[0] + edge) / 10), Math.round((mm[1] + edge) / 10)] as const;
}

export type Artwork = { id: string; src: string; w: number; h: number; credit: string; title: string };

/** Pictures to try the frames with, from the prints already on the site. */
export const artworks: Artwork[] = [
  { id: "audubon", src: "/art/audubon.jpg", w: 727, h: 1100, credit: "Art by John James Audubon", title: "Illustration" },
  { id: "calvin-lupiya", src: "/art/calvin-lupiya.jpg", w: 1200, h: 1800, credit: "Art by Calvin Lupiya", title: "Portrait" },
  { id: "steve-johnson", src: "/art/steve-johnson.jpg", w: 869, h: 1100, credit: "Art by Steve Johnson", title: "Painting" },
  { id: "photo-boards", src: "/art/photo-boards.jpg", w: 1100, h: 732, credit: "Art by Photo Boards", title: "Photograph" },
];
