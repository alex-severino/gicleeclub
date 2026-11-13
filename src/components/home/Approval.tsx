import Link from "next/link";
import { ApprovalArtwork } from "@/components/home/ApprovalArtwork";

/** File approval paired with a print-test illustration in the brand's visual language. */
export function Approval() {
  return (
    <section className="approval" id="ai-approval" data-ink="icc" aria-labelledby="approval-title">
      <div className="approval__grid">
        <div className="approval__text" data-reveal="rise">
          <p className="eyebrow">The assurance behind your print</p>
          <h2 className="h-lg" id="approval-title">AI file approval</h2>
          <div className="split__body prose-sheet">
            <p>
              Your artwork meets an exacting standard before it reaches a printer. Our AI approval
              system checks technical quality, including resolution, at the beginning of every order.
            </p>
            <p>
              If a file needs attention, we pause and speak to you. The file, paper and print size
              are considered together, with personal guidance from our studio.
            </p>
            <p className="approval__commitment">Your name is on the work. Our care is behind it.</p>
          </div>
          <div className="approval__actions">
            <Link className="text-link" href="/preparing-your-files">
              Discover our file preparation guide
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
