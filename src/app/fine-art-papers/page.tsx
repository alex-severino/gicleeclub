import type { Metadata } from "next";
import { Bleed } from "@/components/blocks/Bleed";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet, Statement, Ticks } from "@/components/blocks/Text";
import { PaperLab } from "@/components/tools/PaperLab";

export const metadata: Metadata = {
  title: "Fine Art Papers",
  description:
    "Hahnemühle Photo Rag, German Etching, FineArt Pearl and Bamboo: four hand-picked papers with an age resistance of more than 100 years.",
};

const papers = [
  {
    id: "photo-rag",
    eyebrow: "Matt FineArt smooth",
    title: "Photo Rag",
    alt: "Macro photograph of the felt surface of Photo Rag",
    specs: ["308 gsm", "100% cotton", "White", "Matt premium inkjet coating", "Characteristic felt structure"],
    art: "Art by David Becker",
    artAlt: "A violet architectural print on Photo Rag, showing the sheet edge",
    body: [
      "The Hahnemühle Photo Rag paper has a delicately textured matt surface. It is one of the most used papers in the world known for its versatility.",
      "This felt structured paper with matt premium inkjet coating produces incredible prints with very bright colours, deep blacks, solid contrasts all in great detail.",
    ],
  },
  {
    id: "german-etching",
    eyebrow: "Matt FineArt textured",
    title: "German Etching",
    alt: "Macro photograph of the deep texture of German Etching",
    specs: ["310 gsm", "100% α-cellulose", "White", "Genuine mould-made paper", "Matt premium inkjet coating", "Clearly defined felt structure"],
    art: "Art by Vojtech Bruzek",
    artAlt: "An abstract painting printed on German Etching, showing the sheet edge",
    body: [
      "German Etching is a matt mould-made copperplate printing paper with a distinctly textured surface. It is made from 100% alpha cellulose and feels very velvety to the touch which together with its matt inkjet coating makes for prints that amazingly reproduce colours, blacks and contrasts.",
      "This extremely popular Hahnemühle paper is one of the best papers for Fine Art prints and art reproductions, a reputation that came to be thanks to its distinct feel and special surface texture.",
    ],
  },
  {
    id: "pearl",
    eyebrow: "Glossy",
    title: "FineArt Pearl",
    alt: "Macro photograph of the lustrous surface of FineArt Pearl",
    specs: ["285 gsm", "100% α-Cellulose", "Bright white", "Pearl-finish", "Pearl-gloss premium inkjet coating", "Delicately textured surface"],
    art: "Art by Milad Fakurian",
    artAlt: "A smooth violet digital artwork printed on FineArt Pearl",
    body: [
      "The FineArt Pearl is a pure alpha cellulose paper that is provided with a premium inkjet coating which has a mid lustre pearly gloss. This bright white paper has a delicate surface with soft texture that makes for a smooth and silky feel.",
      "Printing on this Hahnemühle paper produces impressive results that make the reproduction of colour, details, contrast and deep blacks stand out.",
    ],
  },
  {
    id: "bamboo",
    eyebrow: "Natural Line",
    title: "Bamboo",
    alt: "Macro photograph of the soft surface of Bamboo paper",
    specs: ["290 gsm", "90% bamboo fibres, 10% cotton", "Natural white", "Matt premium inkjet coating", "Soft, lightly textured felt structure"],
    art: "Art by And Machines",
    artAlt: "A soft pastel digital artwork printed on Bamboo",
    body: [
      "This paper is made from 90% bamboo fibres making it an environmental friendly paper. Its natural white is achieved without any optical brighteners and looks very natural to the eye and its texture feels soft to the touch.",
      "Hahnemühle’s Natural Line uses unique raw materials. The plants provide the cellulose and require low maintenance as they grow fast without the need of any chemicals. This means that more cellulose can be produced on the same land with much less water.",
    ],
  },
];

export default function PapersPage() {
  return (
    <Sheet ink="papers">
      <Hero
        name="papers"
        alt="Fanned sheets of Hahnemühle paper beside an amber to pink field"
        eyebrow="FineArt media"
        title={["Hahnemühle", "Papers"]}
        action={{ href: "/order/art-print", label: "Order your art print" }}
      >
        <p>
          Hahnemühle’s Digital FineArt Collection has a wide range of unique artisan papers with a
          high age resistance of more than 100 years. This makes them perfect for long-term
          exhibitions, art collections and special editions.
        </p>
      </Hero>

      <Split
        image="paper-tech"
        alt="A black and white photograph of paper being made, with the Hahnemühle 1584 rooster"
        eyebrow="Made in Germany"
        title="Innovative paper technology"
        credit="Image by Hahnemühle FineArt GmbH"
      >
        <p>
          Founded in 1584, Hahnemühle are the inventors and world market leaders on Digital FineArt
          papers for inkjet printing and art reproduction.
        </p>
        <p>
          All paper grades are manufactured according to old recipes from high-quality cotton
          fibres, cellulose or fast-growing plant fibres and pure spring water.
        </p>
      </Split>

      <Statement title="Our FineArt papers">
        We have carefully hand-picked four papers with different characteristics to best suit your
        preference in terms of texture, colour, coating and composition. All our papers are acid-
        and lignin-free which prevents them from breaking down or yellowing over time.
      </Statement>

      <PaperLab />

      {papers.map((paper, index) => (
        <div key={paper.id} id={paper.id}>
          <Bleed image={paper.id} alt={paper.alt} right>
            <p className="eyebrow">{paper.eyebrow}</p>
            <h3 className="h-md">{paper.title}</h3>
            <Ticks items={paper.specs} />
          </Bleed>
          <Split
            image={paper.id}
            alt={paper.artAlt}
            credit={paper.art}
            flip={index % 2 === 1}
          >
            {paper.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Split>
        </div>
      ))}

      <OrderCta />
      <Promos />
    </Sheet>
  );
}
