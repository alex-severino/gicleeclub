"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isPageVisible } from "@/lib/site";

const perks = [
  { icon: "24h", title: "24h dispatch", text: "From our studio to you. Dispatched within one working day.", href: "/shipping" },
  { icon: "shipping", title: "A world of possibilities", text: "Free shipping on European orders. Worldwide delivery, too.", href: "/shipping" },
  { icon: "quality", title: "Made to do your art justice", text: "Exceptional colour, archival inks and Hahnemühle FineArt papers.", href: "/fine-art-papers" },
  { icon: "ai", title: "AI, with an eye for detail", text: "AI file approval checks the technical details before your artwork reaches a printer.", href: "/preparing-your-files" },
  { icon: "support", title: "A real conversation", text: "Paper, colour, your next exhibition. Ask us anything.", href: "/contact-us" },
  { icon: "eco", title: "Thoughtfully made", text: "Solar-powered printing and recyclable papers and packaging.", href: "/sustainability" },
].filter((perk) => isPageVisible(perk.href));

function Benefits({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="club__benefits" aria-hidden={duplicate || undefined}>
      {perks.map((perk) => (
        <li key={perk.icon}>
          <Link className="club__benefit" href={perk.href} tabIndex={duplicate ? -1 : undefined}>
            <Image
              className="club__icon"
              src={`/media/icons/${perk.icon}.png`}
              alt=""
              width={160}
              height={160}
              sizes="(max-width: 600px) 88px, 112px"
            />
            <div>
              <h3>{perk.title}</h3>
              <p>{perk.text}</p>
            </div>
            <span className="club__arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** A continuous runner of large brand icons and useful links. */
export function ClubStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="club" data-ink="home" aria-labelledby="club-title">
      <div className="club__heading">
        <div>
          <p className="eyebrow">Good company. Great prints.</p>
          <h2 id="club-title">Join the Club</h2>
        </div>
        <div className="club__aside">
          <p className="club__intro">You make the art.<br />We take care of the print.</p>
          <button
            type="button"
            className="club__motion"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              {paused ? <path d="M4 2.5 13 8l-9 5.5z" /> : <path d="M3 2h3v12H3zm7 0h3v12h-3z" />}
            </svg>
            {paused ? "Play runner" : "Pause runner"}
          </button>
        </div>
      </div>
      <div
        className="club__runner"
        data-paused={paused ? "" : undefined}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.scrollLeft = 0;
        }}
      >
        <div className="club__track">
          <Benefits />
          <Benefits duplicate />
        </div>
      </div>
    </section>
  );
}
