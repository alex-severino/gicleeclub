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
    "Giclée Club is located in the Amsterdam Metropolitan Area, with the latest gear including powerful computers, printers and cutters.",
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
        name="studio"
        alt="Amsterdam canal houses with bicycles on a bridge, beside a coral field"
        title={["Print", "Studio"]}
        credit="Photo by Gaurav Jain"
      >
        <p>Giclée Club is located in the Amsterdam Metropolitan Area (Greater Amsterdam).</p>
        <p>
          We hold business meetings in the city centre or in the trending Amsterdam Noord, so if
          you’d like to meet for coffee just let us know!
        </p>
      </Hero>

      <Statement title="Our space and equipment">
        Our studio has the latest gear including powerful computers, printers, cutters as well as
        safe and dry paper and packaging storage space.
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
        image="sustainability"
        alt="Wind turbines above a field of red tulips, with pink sunbursts"
        credit="Photo by Appolinary Kalashnikova"
      >
        <p className="eyebrow">Contributing to</p>
        <h2 className="h-md">The well-being of our planet</h2>
        <div className="prose-sheet" style={{ marginTop: "0.9rem" }}>
          <p>
            We have equipped our studio with sun panels relying completely on solar energy for our
            printing production.
          </p>
          <p>
            All our papers and packaging are 100% recyclable. Also we drive a fully electric car and
            we do short trips the typical Dutch way – by bike!
          </p>
        </div>
        <Action href="/sustainability" label="Learn more" />
      </Bleed>

      <ContactBlock />
    </Sheet>
  );
}
