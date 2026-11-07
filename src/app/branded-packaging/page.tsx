import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";
import { StickerDemo } from "@/components/tools/StickerDemo";

export const metadata: Metadata = {
  title: "Branded Packaging",
  description:
    "Your prints sent with your name, logo, pattern or signature, in a sturdy sustainable package that will keep them safe.",
};

export default function BrandedPackagingPage() {
  return (
    <Sheet ink="packaging">
      <Hero
        name="branded-packaging"
        alt="Cardboard tubes and boxes, each with a different branded sticker"
        eyebrow="Safe sturdy"
        title={["Branded", "Packaging"]}
        credit="Art by Pawel Czerwinski, Dan Christian Padure, Jessica Dismorr, Jene Stephaniuk"
      >
        <p>
          Your prints can be sent with your name | logo | pattern | signature | you name it, in a
          sturdy sustainable package that will keep them safe.
        </p>
      </Hero>

      <StickerDemo />

      <Split
        image="silk-paper"
        alt="A gloved hand laying silk tissue paper over a print"
        eyebrow="Your print protected"
        title="Silk tissue paper"
        credit="Art by Posteress"
      >
        <p>
          The first step to ensure your print’s protection is to carefully apply silk tissue paper
          before rolling it.
        </p>
        <p>
          We handle your prints using protective cotton gloves to ensure there are no scratches or
          folds on your print while the packaging process takes place.
        </p>
      </Split>

      <Split
        image="triangular"
        alt="Gloved hands sliding a rolled print out of a triangular cardboard tube"
        eyebrow="Sturdy robust sustainable"
        title="Triangular packaging"
        flip
      >
        <p>
          Your print is then placed into one of our strong triangular tubes that keep it protected.
          Once delivered, the triangular shape helps with grabbing hold of and taking out the print
          without damaging it. This guarantees a safe, risk-free delivery and unpacking.
        </p>
      </Split>

      <Split
        image="gloves"
        alt="White cotton handling gloves resting on a cardboard tube"
        eyebrow="Cotton recyclable"
        title="Handling gloves"
      >
        <p>
          We include cotton handling gloves in the packaging so that your print can be unpacked and
          handled in the safest way possible.
        </p>
      </Split>

      <Split
        image="materials"
        alt="Paper tape, jute string, tissue paper and cotton gloves beside a tube"
        eyebrow="Eco friendly packaging"
        title="Sustainable materials"
        flip
      >
        <p>
          All the materials used for packaging are fully recyclable: from the cardboard packaging
          itself to the paper tape, jute string, wrapping silk paper, cotton gloves and paper
          stickers.
        </p>
      </Split>

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
