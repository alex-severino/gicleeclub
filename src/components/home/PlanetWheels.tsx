import { Sunburst } from "@/components/blocks/Shapes";

/** The original sunbursts turn closely together, with rays offset to face each other's gaps. */
export function PlanetWheels() {
  return (
    <div className="planet__wheels" aria-hidden="true">
      <Sunburst className="planet__wheel planet__wheel--pink" />
      <Sunburst className="planet__wheel planet__wheel--orange" />
    </div>
  );
}
