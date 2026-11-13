import Link from "next/link";
import { contactHref } from "@/lib/site";

const layers = [
  {
    id: "preflight",
    kind: "rules",
    label: "Non-AI · File data",
    title: "Rule-based file checks",
    summary: "Pixel counts, file settings and print-size calculations. A precise starting point.",
    detail: "Our browser-based preparation tool reads supported file data. For TIFFs, this includes colour mode, bit depth and embedded ICC profiles. It calculates print sizes from pixel dimensions, so you can prepare your file before studio approval.",
    terms: ["Pixel dimensions", "RGB / 8 bit", "TIFF metadata"],
    href: "/preparing-your-files#preflight",
    link: "Explore the file check",
  },
  {
    id: "ai-review",
    kind: "ai",
    label: "AI · Assisted review",
    title: "AI-assisted file approval",
    summary: "AI helps flag technical concerns before your artwork reaches a printer.",
    detail: "Resolution is considered as part of your file’s technical quality. A 300 PPI label alone is not the whole picture. When a concern is raised, we discuss the file and your intended print with you before proceeding.",
    terms: ["File quality", "Resolution", "Issues flagged for review"],
    href: "/preparing-your-files#ai-approval",
    link: "About file approval",
  },
  {
    id: "human-review",
    kind: "human",
    label: "Human · Studio judgement",
    title: "Human-in-the-loop",
    summary: "People put the findings in context. Your work, your paper and your expectations.",
    detail: "Our studio talks through the options with you, from a more suitable print size to a different paper or a revised file. We confirm the agreed file, paper, size and order with you before printing. You can ask us to look at a result with you.",
    terms: ["Personal guidance", "Review together", "Agreed before print"],
    href: contactHref(),
    link: "Speak with the studio",
  },
  {
    id: "colour-workflow",
    kind: "rules",
    label: "Non-AI · Colour & production",
    title: "Colour-managed printing",
    summary: "ICC profiles, pigment inks and precision inkjet technology take the approved file to paper.",
    detail: "ICC profiles describe how a particular printer and paper reproduce colour, and support soft proofing before print. Our HP DesignJet Z9+ with V-Trimmer and Epson SureColor SC-P700 bring together precision printing and careful finishing.",
    terms: ["ICC profiles", "Soft proofing", "Pigment inkjet"],
    href: "/icc-profiles",
    link: "Explore colour management",
  },
] as const;

/** A deeper explanation of the process, with native disclosures and direct human contact. */
export function PrintTechnology() {
  return (
    <section className="print-tech" id="technology-and-care" aria-labelledby="print-tech-title">
      <div className="print-tech__content">
      <div className="print-tech__layout">
        <div className="print-tech__intro">
          <p className="eyebrow">A closer look</p>
          <h3 id="print-tech-title">Technology.<br />Human judgement.</h3>
          <p>
            Calculations check the numbers. AI supports the review. Our studio discusses the
            choices with you. Each has a part to play in the finished print.
          </p>
          <div className="print-tech__principle">
            <span className="brand-accent" aria-hidden="true" />
            <p>Intelligence in the process.<br /><strong>People in the conversation.</strong></p>
          </div>
        </div>

        <div className="print-tech__layers">
          {layers.map((layer) => (
            <details className="print-tech__layer" key={layer.id} data-kind={layer.kind}>
              <summary>
                <span className="print-tech__kind">{layer.label}</span>
                <span className="print-tech__name">{layer.title}</span>
                <span className="print-tech__summary">{layer.summary}</span>
                <span className="print-tech__toggle" aria-hidden="true" />
              </summary>
              <div className="print-tech__detail">
                <p>{layer.detail}</p>
                <ul className="print-tech__terms" role="list">
                  {layer.terms.map((term) => <li key={term}>{term}</li>)}
                </ul>
                <Link className="text-link" href={layer.href}>
                  {layer.link}<span aria-hidden="true">{"\u00a0\u00a0"}→</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
      </div>

      <div className="print-tech__conversation">
        <div className="print-tech__conversation-inner">
        <svg viewBox="0 0 64 56" fill="none" aria-hidden="true">
          <path d="M8 8h48v32H29L15 50V40H8zM19 20h26M19 28h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="print-tech__kind">Human conversation · No AI</p>
          <h4>For everything else, talk to us.</h4>
          <p>Paper, colour, editions, deadlines. Talk it through with our team, person to person.</p>
        </div>
        <Link className="text-link" href={contactHref()}>
          Talk to our studio<span aria-hidden="true">{"\u00a0\u00a0"}→</span>
        </Link>
        </div>
      </div>
    </section>
  );
}
