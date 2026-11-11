import Link from "next/link";
import { ApprovalArtwork } from "@/components/home/ApprovalArtwork";

/** File approval paired with a print-test illustration in the brand's visual language. */
export function Approval() {
  return (
    <section className="approval" data-ink="icc">
      <div className="approval__grid">
        <div className="approval__text" data-reveal="rise">
          <p className="eyebrow">Unique</p>
          <h2 className="h-lg">AI technology</h2>
          <div className="split__body prose-sheet">
            <p>
              We have developed a special technology to immediately recognise whether the digital
              file is ready for print – amongst other things, it checks your file’s PPI.
            </p>
            <p>
              It will enable us to inform you in case your file still needs work or if it was sent to
              us with insufficient resolution. This way nothing leaves our printers unless it can
              meet museum quality.
            </p>
            <p>Every order passes through this approval before it is printed.</p>
          </div>
          <div className="approval__actions">
            <Link className="text-link" href="/preparing-your-files">
              See our guide on how to prepare your files for print
              <span aria-hidden="true">{"\u00a0\u00a0"}→</span>
            </Link>
          </div>
        </div>

        <figure className="approval__art">
          <ApprovalArtwork />
        </figure>
      </div>
    </section>
  );
}
