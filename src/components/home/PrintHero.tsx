import { Action } from "@/components/blocks/Action";

/** The original artwork stays in proportion at every viewport width. */
export function PrintHero() {
  return (
    <section className="ph" id="opening" data-ink="home" aria-labelledby="opening-title">
      <div className="ph__art" aria-hidden="true" />
      <div className="ph__type">
        <p className="eyebrow ph__eyebrow">Museum quality Giclée printing</p>
        <h1 className="ph__title" id="opening-title">
          <span>We print</span>
          <span>for artists</span>
        </h1>
        <p className="ph__sub">Hand-printed in London – Delivered worldwide</p>
        <div className="ph__action">
          <Action href="/contact-us" label="Contact us" />
        </div>
      </div>
    </section>
  );
}
