import Image from "next/image";
import Link from "next/link";

/** An illustrative detail study, not a claim that upsampling can restore an original. */
export function ResolutionAssurance() {
  return (
    <section className="resolution" id="resolution-assurance" aria-labelledby="resolution-title">
      <div className="resolution__heading" data-reveal="rise">
        <p className="eyebrow">The detail behind your reputation</p>
        <h2 className="resolution__title" id="resolution-title">
          <span className="resolution__number">300 PPI.</span>
          <span className="resolution__question">Or just a number?</span>
        </h2>
      </div>

      <div className="resolution__grid">
        <div className="resolution__copy" data-reveal="rise">
          <p className="resolution__lead">The file says it is ready.<br />Your client will see the detail.</p>
          <p>
            A file can be labelled 300 PPI and still lack the detail a fine art print demands.
            Changing that setting does not improve the image. Enlarging a small file adds pixels;
            it does not recover the original detail that was missing.
          </p>
          <p>
            This is where approval matters. Our AI file check helps identify technical concerns
            before printing. If your file needs work, we tell you and agree the next step with you.
          </p>
          <p>
            A problem caught here saves a wasted print, a missed deadline and a disappointing
            conversation with your client.
          </p>
          <Link className="text-link" href="/preparing-your-files#resolution">
            Understand what makes a file ready
            <span aria-hidden="true">{"\u00a0\u00a0"}→</span>
          </Link>
        </div>

        <figure className="resolution__study" aria-labelledby="resolution-study-caption">
          <div className="resolution__samples">
            <div className="resolution__sample">
              <div className="resolution__image resolution__image--soft">
                <Image src="/art/audubon.jpg" alt="A softened illustrative crop of the bird artwork, with fine feather detail lost" fill sizes="(max-width: 860px) 44vw, 23vw" quality={88} />
              </div>
              <p className="resolution__label">300 PPI</p>
              <p className="resolution__description">Enlarged. Detail lost.</p>
            </div>
            <div className="resolution__sample">
              <div className="resolution__image">
                <Image src="/art/audubon.jpg" alt="A clear illustrative crop of the same artwork, retaining fine feather detail" fill sizes="(max-width: 860px) 44vw, 23vw" quality={88} />
              </div>
              <p className="resolution__label">300 PPI</p>
              <p className="resolution__description">Original detail present.</p>
            </div>
          </div>
          <figcaption className="label" id="resolution-study-caption">
            The same label can tell two different stories. Illustrative detail comparison;
            artwork by John James Audubon.
          </figcaption>
        </figure>
      </div>

      <div className="resolution__promise" data-reveal="rise">
        <span className="brand-accent" aria-hidden="true" />
        <p>Your work. Your client.<br /><strong>Your reputation.</strong></p>
        <p className="resolution__promise-copy">
          When a collector, gallery or client expects exceptional, your name carries the promise.
          We treat it with the same care you do.
        </p>
      </div>
    </section>
  );
}
