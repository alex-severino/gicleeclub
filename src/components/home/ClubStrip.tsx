import Image from "next/image";

const perks = [
  { icon: "24h", title: "24h Dispatch", text: "We ship within one working day" },
  { icon: "shipping", title: "Free shipping for European orders", text: "And we also ship worldwide of course" },
  { icon: "quality", title: "Outstanding print quality", text: "Latest printing and paper tech at your service" },
  { icon: "eu", title: "EU customs-free", text: "And no VAT for all other countries" },
  { icon: "support", title: "Support chat", text: "Ask us anything" },
  { icon: "eco", title: "Eco aware", text: "We are eco aware" },
];

function Perks({ hidden }: { hidden?: boolean }) {
  return (
    <>
      {perks.map((perk) => (
        <div className="strip__item" key={perk.icon} aria-hidden={hidden || undefined}>
          <Image src={`/media/icons/${perk.icon}.png`} alt="" width={120} height={120} />
          <div>
            <strong>{perk.title}</strong>
            <span>{perk.text}</span>
          </div>
        </div>
      ))}
    </>
  );
}

/** Join the Club, feeding through the page like a proof strip. */
export function ClubStrip() {
  return (
    <section className="club" data-ink="home">
      <h2 className="h-lg" data-reveal="rise">
        Join the Club
      </h2>
      <div className="strip">
        <div className="strip__track">
          <Perks />
          <Perks hidden />
        </div>
      </div>
    </section>
  );
}
