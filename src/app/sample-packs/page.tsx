import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";
import { Money } from "@/components/shell/Money";
import { pricing } from "@/lib/pricing";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sample Packs",
  description:
    "Get your hands on what our Giclée printing service can deliver. See how our artisan papers perform with different types of art. For only £5!",
};

const packs = [
  {
    id: "illustration",
    image: "sp-illustration",
    title: "Sample pack Illustration",
    alt: "A fan of four illustrations printed on different papers",
    credit: "Art by John James Audubon, Tim Mossholder, Mo, Aldi Sigun",
    text: "In this pack you will find four illustrations in different styles printed on our four Hahnemühle papers so that you can see and better imagine what your art will look like printed out in Giclée.",
  },
  {
    id: "digital-art",
    image: "sp-digital-art",
    title: "Sample pack Digital Art",
    alt: "A fan of four digital artworks printed on different papers",
    credit: "Art by Dim Gunger, Joel Filipe, And Machines, Yash Bindra",
    text: "This pack includes four different types of digital art printed on our four Hahnemühle papers. With this pack you will be able to have a good impression of how your digital art will turn out as a Giclée print.",
  },
  {
    id: "photography",
    image: "sp-photography",
    title: "Sample pack Photography",
    alt: "A fan of four photographs printed on different papers",
    credit: "Art by Sappho Bakker, Ahmed Syed, Monika Grabkowska, Efe Kurnaz",
    text: "This sample pack comes with four different styles of photographs on our four Hahnemühle papers, so that you can check the look and feel of our Giclée printing and papers.",
  },
  {
    id: "painting",
    image: "sp-painting",
    title: "Sample pack Painting",
    alt: "A fan of four paintings printed on different papers",
    credit: "Art by Maria Orlova, Raghav Modi, Jene Stephaniuk, Édouard Benedictus",
    text: "In this pack you will find four paintings in different styles printed on our four Hahnemühle papers. This way you will be able to check how the high definition scan or photograph of your art will look and feel like as a Giclée print.",
  },
  {
    id: "mixed-arts",
    image: "sp-mixed-arts",
    title: "Sample pack Mixed Arts",
    alt: "A fan of an illustration, a design, a photograph and a painting",
    credit: "Art by John James Audubon, Ahmed Syed, MagicPattern, Jene Stephaniuk",
    text: "Here you will find four different artworks – an illustration, a design, a photograph and a painting – each one on a different Hahnemühle paper. This will give you an idea of what Giclée printing feels and looks like.",
  },
];

export default function SamplePacksPage() {
  return (
    <Sheet ink="samples">
      <Hero
        name="sample-packs"
        alt="A fan of sample prints on a dark table beside a violet and pink field"
        eyebrow="Giclée printing in action"
        title={["Sample", "Packs"]}
        credit="Art by John James Audubon, Ahmed Syed, MagicPattern, Jene Stephaniuk"
        action={{ href: contactHref("Sample Pack"), label: "Contact us" }}
      >
        <p>
          Get your hands on what our Giclée printing service can deliver. See how our artisan papers
          perform with different types of art. For only <Money gbp={pricing.samplePack} />!
        </p>
      </Hero>

      {packs.map((pack, index) => (
        <Split
          key={pack.id}
          id={pack.id}
          image={pack.image}
          alt={pack.alt}
          eyebrow="4 artworks on 4 papers"
          title={pack.title}
          credit={pack.credit}
          flip={index % 2 === 0}
          action={{ href: contactHref(pack.title), label: "Contact us" }}
        >
          <p>{pack.text}</p>
        </Split>
      ))}

      <ContactCta />
      <Promos without="sample-packs" />
    </Sheet>
  );
}
