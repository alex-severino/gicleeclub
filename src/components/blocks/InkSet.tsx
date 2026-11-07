import type { CSSProperties } from "react";

type Ink = { name: string; color: string; dark?: boolean };

export const zInks: Ink[] = [
  { name: "Cyan", color: "#00a7e1", dark: true },
  { name: "Magenta", color: "#e6007e" },
  { name: "Yellow", color: "#ffd205", dark: true },
  { name: "Matte Black", color: "#2b2b2c" },
  { name: "Photo Black", color: "#0e0e0e" },
  { name: "Chromatic Red", color: "#e4322b" },
  { name: "Chromatic Green", color: "#05b470", dark: true },
  { name: "Chromatic Blue", color: "#2466fd" },
  { name: "Grey", color: "#8d9499", dark: true },
];

export const epsonInks: Ink[] = [
  { name: "Cyan", color: "#00a7e1", dark: true },
  { name: "Light Cyan", color: "#7fd3f0", dark: true },
  { name: "Vivid Magenta", color: "#e6007e" },
  { name: "Vivid Light Magenta", color: "#f58ac0", dark: true },
  { name: "Yellow", color: "#ffd205", dark: true },
  { name: "Grey", color: "#8d9499", dark: true },
  { name: "Light Grey", color: "#c6cacc", dark: true },
  { name: "Violet", color: "#6f3fff" },
  { name: "Photo Black", color: "#0e0e0e" },
  { name: "Matte Black", color: "#2b2b2c" },
];

/** The cartridges, drawn as a row of accents dropping from the print head. */
export function InkSet({ inks }: { inks: Ink[] }) {
  return (
    <div className="inks" data-reveal="" style={{ "--n": inks.length } as CSSProperties}>
      {inks.map((ink, i) => (
        <div
          className="ink"
          key={ink.name}
          style={
            { "--c": ink.color, "--i": i, "--t": ink.dark ? "#0e0e0e" : "#fff" } as CSSProperties
          }
        >
          <i />
          <span>{ink.name}</span>
        </div>
      ))}
    </div>
  );
}
