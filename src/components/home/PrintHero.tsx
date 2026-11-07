import type { CSSProperties } from "react";
import { preload } from "react-dom";
import { Action } from "@/components/blocks/Action";
import { Rail } from "@/components/blocks/Rail";
import { PointerDepth } from "./PointerDepth";

const ribbons = [0, 1, 2, 3, 4];
const rings = [0, 1, 2, 3];
const stripes = [0, 1, 2, 3];
const lines = ["Highest quality", "printing"];

function Type({ onAmber }: { onAmber?: boolean }) {
  const Title = onAmber ? "p" : "h1";
  return (
    <div className={onAmber ? "ph__type ph__type--amber" : "ph__type"} aria-hidden={onAmber || undefined}>
      <p className="eyebrow ph__eyebrow">Museum quality Giclée printing</p>
      <Title className="ph__title">
        {lines.map((line, i) => (
          <span className="line" key={line} style={{ "--i": i } as CSSProperties}>
            <span>{line}</span>
          </span>
        ))}
      </Title>
      <p className="ph__sub">Hand-printed in London – Delivered Worldwide</p>
      <div className="ph__action">
        {!onAmber && <Action href="/contact-us" label="Contact us" />}
      </div>
    </div>
  );
}

/**
 * The opening print: Angelina's home artwork rebuilt from its source layers, so
 * each ink lands in its own pass. Amber first, then the coral, the black, and
 * the violet accents last. The type changes colour where the two fields meet.
 */
export function PrintHero() {
  preload("/textures/slate.webp", { as: "image" });
  preload("/textures/plaster.webp", { as: "image" });
  return (
    <section className="ph" id="opening" data-ink="home" aria-label="Highest quality printing">
      <div className="ph__sep" style={{ "--at": "0.2s" } as CSSProperties}>
        <div className="ph__plaster" />
      </div>
      <div className="ph__band">
        <div className="ph__sep" style={{ "--at": "0.55s" } as CSSProperties}>
          <div className="ph__slate" />
        </div>
        <div className="ph__sep" style={{ "--at": "0.12s" } as CSSProperties}>
          <div className="ph__amber">
            <div className="ph__sep" style={{ "--at": "0.36s" } as CSSProperties}>
              <div className="ph__stripes" aria-hidden="true">
                {stripes.map((i) => (
                  <i key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ph__ribbons" aria-hidden="true">
        {ribbons.map((i) => (
          <i key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>
      <div className="ph__rings" aria-hidden="true">
        {rings.map((i) => (
          <svg key={i} viewBox="0 0 122 100" style={{ "--i": i } as CSSProperties}>
            <ellipse cx="61" cy="50" rx="59.5" ry="48.5" pathLength="1" />
          </svg>
        ))}
      </div>

      <Type />
      <Type onAmber />

      <div className="ph__rail">
        <Rail />
      </div>
      <span className="ph__head" aria-hidden="true" />
      <PointerDepth target="opening" />
    </section>
  );
}
