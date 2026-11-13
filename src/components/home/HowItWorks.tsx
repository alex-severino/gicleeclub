const steps = [
  { icon: "file", title: "Send your file", text: "Tell our studio what you want to print and the size you have in mind." },
  { icon: "check", title: "We check it", text: "Our AI approval checks technical quality, including resolution." },
  { icon: "approve", title: "We agree the details", text: "We confirm the file, paper, size and order with you before printing." },
  { icon: "print", title: "We make your print", text: "Precision printing. Careful finishing. Work you can proudly put your name to." },
] as const;

function ProcessIcon({ kind }: { kind: (typeof steps)[number]["icon"] }) {
  return (
    <svg viewBox="0 0 160 140" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {kind === "file" && <>
          <path d="M46 20h46l22 22v78H46zM92 20v24h22" />
          <path d="M59 96 73 78l12 12 13-20M59 106h40" />
          <circle cx="67" cy="61" r="4" />
        </>}
        {kind === "check" && <>
          <path d="M33 31h66v82H33zM44 90V53m8 37V53m8 37V53m8 37V53m8 37V53" opacity="0.45" />
          <circle cx="94" cy="65" r="29" />
          <path d="m115 87 21 23M82 55v20m8-20v20m8-20v20m8-20v20" />
        </>}
        {kind === "approve" && <>
          <path d="M41 28h78v86H41zM55 95h30" opacity="0.45" />
          <path d="m60 65 14 14 29-32" strokeWidth="2.5" />
          <path d="m91 110 8 5 16-12" />
        </>}
        {kind === "print" && <>
          <path d="M32 20h96v102H32zM42 30h76v82H42z" />
          <path d="m54 90 18-30 15 20 11-14 9 24" />
          <circle cx="94" cy="48" r="5" />
          <path d="M22 27V10h17m82 0h17v17M22 115v17h17m82 0h17v-17" opacity="0.4" />
        </>}
      </g>
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section className="print-process" aria-labelledby="print-process-title">
      <div className="print-process__inner">
      <div className="print-process__heading">
        <p className="eyebrow">From file to finished print</p>
        <h3 id="print-process-title">Good work.<br />In good hands.</h3>
        <p>A few clear steps. Care at every one.</p>
      </div>
      <ol className="print-process__steps" role="list">
        {steps.map((step, index) => (
          <li className="print-process__step" key={step.icon}>
            <div className="print-process__drawing"><ProcessIcon kind={step.icon} /></div>
            <span className="print-process__number" aria-hidden="true">0{index + 1}</span>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="print-process__reassurance">
        <span className="brand-accent" aria-hidden="true" />
        <span>File needs attention? We pause and talk it through with you. Then we move forward together.</span>
      </p>
      </div>
    </section>
  );
}
