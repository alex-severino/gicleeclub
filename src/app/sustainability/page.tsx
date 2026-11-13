import type { Metadata } from "next";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { PlanetHero } from "@/components/blocks/PlanetHero";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Solar-powered printing, electric transport and fully recyclable papers and packaging. A considered approach at our London print studio.",
};

export default function SustainabilityPage() {
  return (
    <Sheet ink="planet">
      <PlanetHero />

      <Split
        id="clean-energy"
        image="solar-panels"
        alt="Solar panels on the roof of the print house"
        eyebrow="We use"
        title="Clean energy"
      >
        <p>
          Our solar panels provide all the necessary energy for our business to run fully on solar
          energy. Also our car is fully electric, and it stays parked whenever our legs can do the
          job.
        </p>
      </Split>

      <Split
        image="transport"
        alt="An electric car and a bicycle against a brick wall"
        eyebrow="CO2 and NOx free"
        title="Transportation"
        flip
      >
        <p>
          The car that we use for work travels is fully electric. For everything closer to home, our
          favourite zero-emission engine is a good cup of coffee and a comfortable pair of shoes.
        </p>
      </Split>

      <Split
        image="materials-alt"
        alt="Paper tape, jute string and a cardboard tube"
        eyebrow="Eco friendly packaging"
        title="Sustainable materials"
      >
        <p>
          All the materials used for packaging are fully recyclable: from the cardboard packaging
          itself to the paper tape, jute string, wrapping silk paper, cotton gloves and paper
          stickers.
        </p>
      </Split>

      <ContactBlock />
    </Sheet>
  );
}
