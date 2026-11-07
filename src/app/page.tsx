import Image from "next/image";
import type { CSSProperties } from "react";
import { Action } from "@/components/blocks/Action";
import { Bleed } from "@/components/blocks/Bleed";
import { Approval } from "@/components/home/Approval";
import { Print } from "@/components/blocks/Print";
import { Sunburst } from "@/components/blocks/Shapes";
import { ClubStrip } from "@/components/home/ClubStrip";
import { FrameShowcase } from "@/components/home/FrameShowcase";
import { PrintHero } from "@/components/home/PrintHero";
import { PrintTable } from "@/components/home/PrintTable";
import { SheetStack } from "@/components/home/SheetStack";
import { SprayType } from "@/components/home/SprayType";
import { Sheet } from "@/components/blocks/Text";
import { PaperLab } from "@/components/tools/PaperLab";

const sprayInk = ["#5000b4", "#6f3fff", "#fe5581", "#ffa602"];
const sprayWords = ["GICLÉE MEANS", "TO SPRAY"];

export default function HomePage() {
  return (
    <Sheet ink="home">
      <PrintHero />
      <ClubStrip />

      <section className="gicler">
        <SprayType className="gicler__spray" text={sprayWords} colors={sprayInk} />
        <div className="gicler__grid">
          <div className="gicler__text" data-reveal="rise">
            <p className="eyebrow">Why choose</p>
            <h2 className="h-lg">Giclée printing</h2>
            <div className="split__body prose-sheet">
              <p>
                Giclée (from French <span className="gicler__word">gicler</span>, meaning{" "}
                <span className="gicler__word">to spray</span>) is the name for latest technology
                inkjet printing using pigment-based archival inks. This method produces prints with a
                longevity that matches the strictest museum requirements.
              </p>
              <p>
                Our high-end printers and acid-free Fine Art papers create Giclée prints of
                incredible quality and exceptional colour range.
              </p>
            </div>
            <div style={{ marginTop: "1.7rem" }}>
              <Action href="/giclee-printing" label="Learn more" />
            </div>
          </div>
          <div className="gicler__art">
            <Print
              src="/media/section/giclee-printing.png"
              alt="A colourful chevron print feeding out of the printer"
              credit="Art by Posteress"
            />
          </div>
        </div>
      </section>

      <Approval />

      <Bleed image="printers" alt="The HP DesignJet Z9+ V-Trimmer">
        <p className="eyebrow">Best-in-class</p>
        <h2 className="h-md">High-end printers</h2>
        <p style={{ marginTop: "0.9rem" }}>
          Every order is printed on the latest top-of-the-line printers HP DesignJet Z9+ with
          V-Trimmer and Epson SureColor SC-P700. These printers use the most advanced technologies that assure
          smooth colour transitions, stunning sharpness and the widest colour range possible.
        </p>
        <Action href="/high-end-printers" label="Learn more" />
      </Bleed>

      <PaperLab>
        <p className="eyebrow">Museum archival quality</p>
        <h2 className="lab__title">
          Hahnemühle FineArt papers
        </h2>
        <div className="prose-sheet" style={{ marginTop: "1.1rem" }}>
          <p>
            Founded in 1584, Hahnemühle are the inventors and world market leaders on Digital FineArt
            papers for inkjet printing and art reproduction.
          </p>
          <p>
            You can choose from our hand-picked selection of their unique FineArt papers: Photo Rag,
            FineArt Pearl, German Etching and Bamboo.
          </p>
        </div>
      </PaperLab>

      <FrameShowcase />

      <SheetStack />

      <section className="planet" data-scroll="" data-ink="planet">
        <div className="planet__image">
          <Image
            src="/art/planet.jpg"
            alt="Wind turbines on green rolling hills"
            fill
            sizes="100vw"
            quality={88}
          />
        </div>
        <Sunburst
          className="planet__sun"
          style={{ left: "6%", top: "9%" } as CSSProperties}
        />
        <Sunburst
          className="planet__sun"
          style={{ left: "17%", top: "46%", color: "#ff7e3f", opacity: 0.92 } as CSSProperties}
        />
        <div className="planet__card" data-reveal="rise">
          <p className="eyebrow">Contributing to</p>
          <h2 className="h-md">The well-being of our planet</h2>
          <p>
            We have equipped our studio with sun panels relying completely on solar energy for our
            printing production.
          </p>
          <p>
            All our papers and packaging are 100% recyclable. Our car is fully electric, and the
            shortest trips run on nothing but good coffee and comfortable shoes.
          </p>
          <Action href="/sustainability" label="Learn more" />
        </div>
        <p className="planet__credit label">Photo by Appolinary Kalashnikova</p>
      </section>

      <PrintTable>
        <div className="board__call" data-reveal="rise">
          <p className="eyebrow">Whenever you are ready</p>
          <h2 className="h-md">Send us your file</h2>
          <Action href="/contact-us" label="Contact us" />
          <p className="board__hint label">Or pick up a print and move it around the table.</p>
        </div>
      </PrintTable>
    </Sheet>
  );
}
