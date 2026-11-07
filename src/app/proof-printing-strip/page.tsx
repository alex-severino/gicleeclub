import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";
import { ProofStripTool } from "@/components/tools/ProofStripTool";

export const metadata: Metadata = {
  title: "Proof Printing Strip",
  description:
    "Preview your art piece. It is great to feel safe when ordering a big art print, and proof printing is here to help. For only €5!",
};

export default function ProofStripPage() {
  return (
    <Sheet ink="proof">
      <Hero
        name="proof-strip"
        alt="A diagonal proof strip of a portrait on a dark table beside a green and blue field"
        eyebrow="Preview your art piece"
        title={["Proof Printing", "Strip"]}
        credit="Art by Calvin Lupiya"
        action={{ href: "/order/proof-strip", label: "Order" }}
      >
        <p>
          It is great to feel safe when ordering a big art print. Proof printing is here to help you
          with it. For only €5!
        </p>
      </Hero>

      <Split
        image="proof-strip-1"
        alt="A portrait with the strip areas marked in dashed lines"
        eyebrow="When printing large format"
        title="Proof print your art"
        credit="Art by Calvin Lupiya"
      >
        <p>
          If you are printing an art piece bigger than A3 it is a good idea to order a proof
          printing strip. This way you will really know what your large format print will look and
          feel like.
        </p>
      </Split>

      <Split
        image="proof-strip-2"
        alt="A side profile portrait with three strip areas marked in dashed lines"
        eyebrow="Preparing"
        title="Your strip"
        credit="Art by Ahmed Syed"
        flip
      >
        <p>
          The strip size is 1100 × 100 mm or 44″ × 4″. If your artwork’s width is smaller than
          1100 mm you can place different parts of your image on the strip.
        </p>
        <p>
          It’s a good idea to choose the most important part of your image to be proof printed. For
          design, illustration and painting reproduction choose the most colourful or complex area.
          For photography choose an area with highlights, shadows and mid tones to check the tonal
          range of your print.
        </p>
        <p>
          To find more information on preparing your files for print, please visit our{" "}
          <Link href="/preparing-your-files">help page</Link>.
        </p>
      </Split>

      <ProofStripTool />

      <OrderCta href="/order/proof-strip" />
      <Promos without="proof-strip" />
    </Sheet>
  );
}
