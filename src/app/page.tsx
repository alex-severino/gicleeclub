import Image from "next/image";
import { Action } from "@/components/blocks/Action";
import { Bleed } from "@/components/blocks/Bleed";
import { Approval } from "@/components/home/Approval";
import { PlanetWheels } from "@/components/home/PlanetWheels";
import { ClubStrip } from "@/components/home/ClubStrip";
import { PrintHero } from "@/components/home/PrintHero";
import { PrintClosing } from "@/components/home/PrintClosing";
import { SheetStack } from "@/components/home/SheetStack";
import { Sheet } from "@/components/blocks/Text";
import { PaperLab } from "@/components/tools/PaperLab";

export default function HomePage() {
  return (
    <Sheet ink="home">
      <PrintHero />
      <ClubStrip />

      <Approval />

      <div className="visual-frame">
        <Bleed image="printers" alt="The HP DesignJet Z9+ V-Trimmer">
          <p className="eyebrow">Best-in-class</p>
          <h2 className="h-md">High-end printers</h2>
          <p className="bleed__body">
            Every order is printed on the latest top-of-the-line printers HP DesignJet Z9+ with
            V-Trimmer and Epson SureColor SC-P700. These printers use the most advanced technologies that assure
            smooth colour transitions, stunning sharpness and the widest colour range possible.
          </p>
          <Action href="/high-end-printers" label="Learn more" />
        </Bleed>
      </div>

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
        <PlanetWheels />
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

      <PrintClosing />
    </Sheet>
  );
}
