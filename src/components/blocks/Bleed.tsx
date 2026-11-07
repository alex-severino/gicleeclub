import Image from "next/image";
import type { ReactNode } from "react";

type BleedProps = {
  /** File name in /media/wide. */
  image: string;
  alt: string;
  right?: boolean;
  credit?: string;
  children: ReactNode;
};

/** A full-width image with a sheet of text laid on top. */
export function Bleed({ image, alt, right, credit, children }: BleedProps) {
  return (
    <section className={right ? "bleed bleed--right" : "bleed"} data-scroll="">
      <div className="bleed__image">
        <Image src={`/media/wide/${image}.png`} alt={alt} fill sizes="100vw" quality={88} />
      </div>
      <div className="bleed__card" data-reveal="rise">
        {children}
      </div>
      {credit && <p className="bleed__credit label">{credit}</p>}
    </section>
  );
}
