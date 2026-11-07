import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Action } from "@/components/blocks/Action";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Order",
  description: "Order your art print, sample pack, proof printing strip or premium portfolio set.",
};

const products = [
  {
    title: "Art print",
    href: "/order/art-print",
    image: "/media/section/your-art-print.png",
    alt: "A poster reading Your Art Print on a dark table",
    text: "Your art, hand-printed in Amsterdam on the Hahnemühle paper of your choice.",
  },
  {
    title: "Sample pack",
    href: "/order/sample-pack",
    image: "/media/promo/sample-packs.png",
    alt: "A fan of sample prints",
    text: "We offer five sample packs with different types of artworks printed on our Hahnemühle papers.",
  },
  {
    title: "Proof strip",
    href: "/order/proof-strip",
    image: "/media/promo/proof-strip.png",
    alt: "A proof strip cut from a portrait",
    text: "Ensure that your large format art print meets your expectations regarding colour representation, sharpness and quality.",
  },
  {
    title: "Portfolio set",
    href: "/order/portfolio-set",
    image: "/media/promo/portfolio.png",
    alt: "A black envelope with prints and a golden wax seal",
    text: "Give your art the presentation it deserves. In a stylish black envelope branded with your logo for maximum effect.",
  },
];

export default function OrderPage() {
  return (
    <Sheet ink="order">
      <PageTitle eyebrow="Whenever you are ready" title={["Order"]} />
      <section className="promos" style={{ "--cols": 2 } as CSSProperties}>
        {products.map((product, i) => (
          <article
            className="promo"
            key={product.href}
            data-reveal="rise"
            style={{ "--d": (i % 2) * 90 } as CSSProperties}
          >
            <Link className="promo__image" href={product.href} aria-label={product.title}>
              <Image
                src={product.image}
                alt={product.alt}
                width={1000}
                height={1120}
                sizes="(max-width: 860px) 92vw, 46vw"
                quality={88}
              />
            </Link>
            <h2 className="h-sm">{product.title}</h2>
            <p>{product.text}</p>
            <Action href={product.href} label="Order" />
          </article>
        ))}
      </section>
    </Sheet>
  );
}
