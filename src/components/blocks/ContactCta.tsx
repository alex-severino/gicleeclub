import Image from "next/image";
import { contactHref } from "@/lib/site";
import { Action } from "./Action";

type ContactCtaProps = {
  title?: string;
  /** What the visitor is asking about, passed on to the contact form. */
  about?: string;
  image?: string;
  credit?: string;
  right?: boolean;
};

const flatLayCredit =
  "Art by Ryan Stone, MagicPattern, Steve Johnson, Sharon McCutcheon, Posteress, John James Audubon, Zak, Photo Boards, Prince Akachi, Akira Hojo";

/** The closing call on every page. */
export function ContactCta({
  title = "Send us your file",
  about,
  image = "order",
  credit = flatLayCredit,
  right,
}: ContactCtaProps) {
  return (
    <>
      <section className={right ? "closing closing--right" : "closing"} data-scroll="">
        <div className="closing__image">
          <Image
            src={`/media/wide/${image}.png`}
            alt="Giclée prints laid out on a dark wooden table"
            fill
            sizes="100vw"
            quality={88}
          />
        </div>
        <div className="closing__card" data-reveal="rise">
          <p className="eyebrow">Whenever you are ready</p>
          <h2 className="h-md">{title}</h2>
          <Action href={contactHref(about)} label="Contact us" />
        </div>
      </section>
      <p className="closing__credit label">{credit}</p>
    </>
  );
}
