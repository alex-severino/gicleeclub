import Image from "next/image";
import type { CSSProperties } from "react";
import { Action } from "@/components/blocks/Action";

const requirements = [
  ["File format", "TIFF"],
  ["Size in", "mm | inches"],
  ["Resolution", "300 PPI"],
  ["Colour mode", "RGB Colour 8 Bit"],
  ["Colour profile", "sRGB | Adobe RGB (1998)"],
];

/** Every order is approved before it prints, shown on the test page the brand grew out of. */
export function Approval() {
  return (
    <section className="approval" data-scroll="" data-ink="icc">
      <div className="approval__grid">
        <div className="approval__text" data-reveal="rise">
          <p className="eyebrow">Unique</p>
          <h2 className="h-lg">AI technology</h2>
          <div className="split__body prose-sheet">
            <p>
              We have developed a special technology to immediately recognise whether the digital
              file is ready for print – amongst other things, it checks your file’s PPI.
            </p>
            <p>
              It will enable us to inform you in case your file still needs work or if it was sent to
              us with insufficient resolution. This way nothing leaves our printers unless it can
              meet museum quality.
            </p>
            <p>Every order passes through this approval before it is printed.</p>
          </div>
          <div className="approval__actions">
            <Action href="/contact-us" label="Contact us" />
            <Action href="/preparing-your-files" label="See guide" kind="ghost" />
          </div>
        </div>

        <div className="approval__stage" data-reveal="">
          <figure className="approval__sheet">
            <Image
              src="/media/test-page.svg"
              alt="A classical print test page with colour ramps, halftones and star targets"
              width={1000}
              height={1400}
              unoptimized
            />
            <span className="approval__scan" aria-hidden="true" />
          </figure>
          <div className="approval__report">
            <p className="eyebrow">Printing requirements</p>
            <ul>
              {requirements.map(([term, value], i) => (
                <li key={term} style={{ "--i": i } as CSSProperties}>
                  <span>{term}</span>
                  <b>{value}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
