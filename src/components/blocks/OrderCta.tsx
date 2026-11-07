import Image from "next/image";
import { Action } from "./Action";

type OrderCtaProps = {
  title?: string;
  href?: string;
  image?: string;
  credit?: string;
  right?: boolean;
};

const flatLayCredit =
  "Art by Ryan Stone, MagicPattern, Steve Johnson, Sharon McCutcheon, Posteress, John James Audubon, Zak, Photo Boards, Prince Akachi, Akira Hojo";

/** The closing call on every page. */
export function OrderCta({
  title = "Order your art print",
  href = "/order/art-print",
  image = "order",
  credit = flatLayCredit,
  right,
}: OrderCtaProps) {
  return (
    <>
      <section className={right ? "order-cta order-cta--right" : "order-cta"} data-scroll="">
        <div className="order-cta__image">
          <Image
            src={`/media/wide/${image}.png`}
            alt="Giclée prints laid out on a dark wooden table"
            fill
            sizes="100vw"
            quality={88}
          />
        </div>
        <div className="order-cta__card" data-reveal="rise">
          <p className="eyebrow">Whenever you are ready</p>
          <h2 className="h-md">{title}</h2>
          <Action href={href} label="Order" />
        </div>
      </section>
      <p className="order-cta__credit label">{credit}</p>
    </>
  );
}
