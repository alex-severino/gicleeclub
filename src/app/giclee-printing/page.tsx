import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Why Choose Giclée Printing",
  description:
    "Giclée is the name for the highest museum quality Fine Art printing: high-end printing technology applied on Fine Art inkjet papers.",
};

export default function GicleePrintingPage() {
  return (
    <Sheet ink="giclee">
      <Hero
        name="giclee-printing"
        alt="A colourful chevron print feeding out of a large format printer"
        eyebrow="Why choose"
        title={["Giclée", "Printing"]}
        credit="Art by Posteress"
        action={{ href: "/contact-us", label: "Contact us" }}
      >
        <p>
          Giclée is the name for the highest museum quality Fine Art printing. A professional
          Giclée print is the result of high-end printing technology applied on Fine Art inkjet
          papers.
        </p>
        <p>
          Giclée printing creates the most colourful and long-lasting art prints – be it digital
          illustration, graphic design, professional photographs or reproductions of paintings.
        </p>
      </Hero>

      <Split
        image="printers"
        alt="Close-up of the HP DesignJet Z9+ large format printer"
        eyebrow="Latest best-in-class"
        title="Professional high-end printers"
        credit="Art by Josh Pisya"
        action={{ href: "/high-end-printers", label: "Our printers" }}
        flip
      >
        <p>
          Giclée printing is made possible by the newest generation of professional inkjet printers
          that produce incredibly high printing resolutions and use pigment archival inks lasting
          over 100 years.
        </p>
        <p>
          These printers use the latest technologies that allow for smooth colour transitions and
          provide with incredible sharpness and the widest colour range possible.
        </p>
      </Split>

      <Split
        image="papers"
        alt="Overlapping sheets of textured Hahnemühle paper on a dark table"
        eyebrow="Archival acid-free"
        title="Fine Art papers"
        action={{ href: "/fine-art-papers", label: "Our papers" }}
      >
        <p>
          Another essential component of true Giclée printing are unique high-quality papers created
          specifically for high-end printing. They are characterised by artisanal surface textures
          and special inkjet coatings that bring out an incredible amount of detail, contrast,
          brightness of colours and amazing depths of blacks.
        </p>
        <p>
          A key factor of these papers is their longevity of more than 100 years, which makes them
          ideal for Fine Art printing, art collections, limited editions, museum and gallery
          exhibitions.
        </p>
      </Split>

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
