import type { Metadata } from "next";
import { Bleed } from "@/components/blocks/Bleed";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { Action } from "@/components/blocks/Action";
import { Hero } from "@/components/blocks/Hero";
import { Print } from "@/components/blocks/Print";
import { Sheet, Statement } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Our Print Studio",
  description:
    "Inside our London print studio: AI file approval, colour-managed Giclée printing and careful finishing, all under one roof.",
};

const photos = [
  ["studio-1", "Stacks of Hahnemühle paper boxes"],
  ["studio-2", "The studio desk under pendant lights, with framed prints on the wall"],
  ["studio-3", "The large format printer in the bright studio"],
  ["studio-4", "A close-up of the Epson printer screen"],
  ["studio-5", "The yellow lounge wall with framed prints"],
  ["studio-6", "A gloved hand holding up the Sunrises print"],
];

export default function PrintStudioPage() {
  return (
    <Sheet ink="studio">
      <Hero
        name="london-skyline"
        alt="An illustrated London skyline at sunset: Tower Bridge, the London Eye and Big Ben above the River Thames, beside a coral field"
        title={["Print", "Studio"]}
      >
        <p>Giclée Club is located in London.</p>
        <p>
          We hold business meetings in the city centre, so if you’d like to meet for coffee just let
          us know!
        </p>
      </Hero>

      <Statement title="Our space and equipment">
        AI file approval and colour-managed printing sit alongside careful handling and finishing.
        Our studio brings together powerful computers, professional printers and cutters, with
        safe, dry storage for our papers and packaging.
      </Statement>

      <section className="mosaic">
        {photos.map(([name, alt]) => (
          <Print
            key={name}
            src={`/media/section/${name}.png`}
            alt={alt}
            sizes="(max-width: 760px) 46vw, 31vw"
          />
        ))}
      </section>

      <Bleed
        image="wind-turbines"
        alt="Three wind turbines over open fields, with pink sunbursts"
        credit="Photo by Mon Jester"
      >
        <p className="eyebrow">Contributing to</p>
        <h2 className="h-md">The well-being of our planet</h2>
        <div className="prose-sheet" style={{ marginTop: "0.9rem" }}>
          <p>
            We have equipped our studio with sun panels relying completely on solar energy for our
            printing production.
          </p>
          <p>
            All our papers and packaging are 100% recyclable. Our car is fully electric, and the
            shortest trips run on nothing but good coffee and comfortable shoes.
          </p>
        </div>
        <Action href="/sustainability" label="Learn more" />
      </Bleed>

      <ContactBlock />
    </Sheet>
  );
}
