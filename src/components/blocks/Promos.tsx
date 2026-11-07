import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Action } from "./Action";

const products = [
  {
    id: "sample-packs",
    title: "Sample Packs",
    href: "/order/sample-pack",
    page: "/sample-packs",
    alt: "A fan of sample prints above five art discipline icons",
    text: "We offer five sample packs with different types of artworks printed on our Hahnemühle papers.",
  },
  {
    id: "proof-strip",
    title: "Proof Printing Strip",
    href: "/order/proof-strip",
    page: "/proof-printing-strip",
    alt: "A proof strip cut from a portrait of a woman with flowers in her hair",
    text: "Ensure that your large format art print meets your expectations regarding colour representation, sharpness and quality.",
  },
  {
    id: "portfolio",
    title: "Premium Portfolio Set",
    href: "/order/portfolio-set",
    page: "/premium-portfolio-set",
    alt: "A black envelope with prints and a golden wax seal",
    text: "Give your art the presentation it deserves. In a stylish black envelope branded with your logo for maximum effect.",
  },
] as const;

/** The three smaller products, minus the one you are already looking at. */
export function Promos({ without }: { without?: (typeof products)[number]["id"] }) {
  const shown = products.filter((product) => product.id !== without);
  return (
    <section className="promos" style={{ "--cols": shown.length } as CSSProperties}>
      {shown.map((product, i) => (
        <article
          className="promo"
          key={product.id}
          data-reveal="rise"
          style={{ "--d": i * 90 } as CSSProperties}
        >
          <Link className="promo__image" href={product.page} aria-label={product.title}>
            <Image
              src={`/media/promo/${product.id}.png`}
              alt={product.alt}
              width={1000}
              height={1120}
              sizes="(max-width: 860px) 92vw, 32vw"
              quality={88}
            />
          </Link>
          <h3 className="h-sm">{product.title}</h3>
          <p>{product.text}</p>
          <Action href={product.href} label="Order" />
        </article>
      ))}
    </section>
  );
}
