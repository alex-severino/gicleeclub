import Image from "next/image";
import { PlanetWheels } from "@/components/home/PlanetWheels";
import { Action } from "./Action";

/** The former homepage sustainability feature now opens its own page. */
export function PlanetHero() {
  return (
    <section className="planet planet--hero" data-scroll="" data-ink="planet" aria-labelledby="sustainability-title">
      <div className="planet__image">
        <Image src="/art/planet.jpg" alt="Wind turbines on green rolling hills" fill sizes="100vw" quality={88} preload />
      </div>
      <PlanetWheels />
      <div className="planet__card">
        <p className="eyebrow">Sustainability</p>
        <h1 className="h-md" id="sustainability-title">The well-being of our planet</h1>
        <p>
          We have equipped our studio with solar panels, relying completely on solar energy for
          our printing production.
        </p>
        <p>
          All our papers and packaging are 100% recyclable. Our car is fully electric, and the
          shortest trips run on nothing but good coffee and comfortable shoes.
        </p>
        <Action href="/sustainability" scrollTarget="clean-energy" label="Explore our approach" />
      </div>
      <p className="planet__credit label">Photo by Appolinary Kalashnikova</p>
    </section>
  );
}
