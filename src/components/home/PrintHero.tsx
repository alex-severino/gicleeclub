import { Action } from "@/components/blocks/Action";
import { contactHref } from "@/lib/site";

/** The original brand artwork stays in proportion at every viewport width. */
export function PrintHero() {
  return (
    <section className="ph" id="opening" data-ink="home" aria-labelledby="opening-title">
      <div className="ph__art" aria-hidden="true" />
      <div className="ph__type">
        <p className="eyebrow ph__eyebrow">Hi-Tech museum quality printing</p>
        <h1 className="ph__title" id="opening-title">
          <span>We print</span>
          <span>for artists</span>
        </h1>
        <p className="ph__sub">AI file approval. Hand-printed in London.</p>
        <div className="ph__action">
          <Action href={contactHref()} label="Contact us" />
        </div>
      </div>
    </section>
  );
}
