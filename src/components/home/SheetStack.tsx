import type { CSSProperties } from "react";
import { Action } from "@/components/blocks/Action";
import { Print } from "@/components/blocks/Print";
import type { InkName } from "@/lib/site";

const sheets: {
  ink: InkName;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string[];
  href: string;
  credit?: string;
}[] = [
  {
    ink: "packaging",
    image: "packaging",
    alt: "A cardboard tube with a Your Logo Here sticker and white cotton gloves on silk tissue paper",
    eyebrow: "Sustainable sturdy",
    title: "Branded packaging",
    text: [
      "You can choose to brand the package sticker with your name, logo, signature or pattern – you name it!",
      "Your print will be protected with silk tissue paper, packed in 100% recyclable robust cardboard tube and will include cotton handling gloves.",
    ],
    href: "/branded-packaging",
    credit: "Art by Posteress",
  },
  {
    ink: "certificate",
    image: "certificate",
    alt: "A Hahnemühle Certificate of Authenticity with its numbered holograms",
    eyebrow: "Hahnemühle FineArt",
    title: "Certificate of authenticity",
    text: [
      "This deckle edged mould made paper certificate contains a Hahnemühle watermark, fluorescent security fibres and a set of serialised numbered holograms.",
      "With the Certificate of Authenticity your Limited Edition artwork is protected and assured of its legitimateness.",
    ],
    href: "/certificate-of-authenticity",
  },
  {
    ink: "samples",
    image: "sp-mixed-arts",
    alt: "A fan of four sample prints on a dark table",
    eyebrow: "A5 prints",
    title: "Sample packs",
    text: [
      "We offer five sample packs with different types of images printed on our Hahnemühle papers: Illustration, Graphic Design, Photography, Painting and Mixed Arts.",
    ],
    href: "/sample-packs",
    credit: "Art by John James Audubon, Ahmed Syed, MagicPattern, Jene Stephaniuk",
  },
  {
    ink: "proof",
    image: "proof-strip",
    alt: "A proof strip cut from a portrait of a woman with flowers in her hair",
    eyebrow: "Test strip",
    title: "Proof printing",
    text: [
      "Ensure that your large format print meets your expectations regarding colour representation, sharpness and quality. On our test strip you will be able to see a part of your image on the Hahnemühle paper of your choice.",
    ],
    href: "/proof-printing-strip",
    credit: "Art by Calvin Lupiya",
  },
  {
    ink: "portfolio",
    image: "portfolio",
    alt: "A black envelope with a Your Logo Here label, prints and a golden wax seal",
    eyebrow: "A5 | A4 | A3 prints",
    title: "Premium Portfolio Set",
    text: [
      "Give your work the presentation it deserves. Your prints on the paper of your choice, in a stylish black envelope branded with your logo for maximum effect.",
    ],
    href: "/premium-portfolio-set",
    credit: "Art by Tim Stief, Augustine Wong, Sappho Bakker",
  },
];

/** What we do, as a stack: each sheet lands on top of the last. */
export function SheetStack() {
  return (
    <div className="stack">
      {sheets.map((sheet, i) => (
        <section
          key={sheet.image}
          className={i % 2 ? "sheet sheet--flip" : "sheet"}
          data-ink={sheet.ink}
          style={{ zIndex: i + 1 } as CSSProperties}
        >
          <div className="sheet__art">
            <Print
              src={`/media/section/${sheet.image}.png`}
              alt={sheet.alt}
              credit={sheet.credit}
              sizes="(max-width: 860px) 92vw, 42vw"
            />
          </div>
          <div className="sheet__text" data-reveal="rise">
            <p className="eyebrow">{sheet.eyebrow}</p>
            <h2 className="h-lg">{sheet.title}</h2>
            {sheet.text.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <Action href={sheet.href} label="Learn more" />
          </div>
        </section>
      ))}
    </div>
  );
}
