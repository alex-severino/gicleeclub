import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";
import { StickerDemo } from "@/components/tools/StickerDemo";

export const metadata: Metadata = {
  title: "Branded Packaging",
  description:
    "Your prints sent with your name, logo, pattern or signature, in a sturdy sustainable package that will keep your art safe.",
};

export default function BrandedPackagingPage() {
  return (
    <Sheet ink="packaging">
      <Hero
        name="branded-packaging"
        alt="Cardboard tubes and boxes, each with a different artist's sticker"
        eyebrow="Safe sturdy"
        title={["Branded", "Packaging"]}
        credit="Art by Pawel Czerwinski, Dan Christian Padure, Jessica Dismorr, Jene Stephaniuk"
      >
        <p>
          Your prints can be sent with your name | logo | pattern | signature | you name it, in a
          sturdy sustainable package that will keep your art safe.
        </p>
      </Hero>

      <StickerDemo />

      <Split
        image="silk-paper"
        alt="A gloved hand laying silk tissue paper over a print"
        eyebrow="Your art protected"
        title="Silk tissue paper"
        credit="Art by Posteress"
      >
        <p>
          The first step to ensure your art print’s protection is to carefully apply silk tissue
          paper before rolling it.
        </p>
        <p>
          We handle your art using protective cotton gloves to ensure there are no scratches or
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
          Your art print is then placed into our strong triangular tubes that ensure the protection
          of your art. Once delivered, the triangular shape helps with grabbing hold of and taking
          out the print without damaging it. This guarantees a safe, risk-free delivery and
          unpacking of your art.
        </p>
      </Split>

      <Split
        image="gloves"
        alt="White cotton handling gloves resting on a cardboard tube"
        eyebrow="Cotton recyclable"
        title="Handling gloves"
      >
        <p>
          We include cotton handling gloves in the packaging so that your art can be unpacked and
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

      <OrderCta />
      <Promos />
    </Sheet>
  );
}
