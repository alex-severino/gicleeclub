import type { Metadata } from "next";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { Hero } from "@/components/blocks/Hero";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "We do our part to make sure our production is carbon-neutral: solar energy, electric transport and fully recyclable packaging.",
};

export default function SustainabilityPage() {
  return (
    <Sheet ink="planet">
      <Hero
        name="wind-turbines"
        alt="Three wind turbines over open fields, beside an orange field with pink sunbursts"
        eyebrow="Sustainability"
        title={["Environmental", "Awareness"]}
        credit="Photo by Mon Jester"
      >
        <p>
          We do our part to make sure our production is carbon-neutral. This means that all our
          production emissions are offset.
        </p>
      </Hero>

      <Split
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
