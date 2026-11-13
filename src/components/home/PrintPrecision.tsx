import Image from "next/image";
import Link from "next/link";

export function PrintPrecision() {
  return (
    <section className="precision" id="print-precision" aria-labelledby="precision-title">
      <div className="precision__heading">
        <div data-reveal="rise">
          <p className="eyebrow">High-end printers</p>
          <h2 className="h-lg" id="precision-title">Precision.<br />In every pass.</h2>
        </div>
        <div className="precision__copy" data-reveal="rise">
          <p>
            Once your file is approved, precision inkjet technology and a carefully managed colour
            workflow bring it to paper. Deep blacks. Nuanced colour. Detail worth looking closer at.
          </p>
          <p>
            Our HP DesignJet Z9+ with V-Trimmer and Epson SureColor SC-P700 are the instruments.
            An exacting studio process brings everything together.
          </p>
          <Link className="text-link" href="/high-end-printers">
            Inside our printing technology<span aria-hidden="true">{"\u00a0\u00a0"}→</span>
          </Link>
        </div>
      </div>
      <figure className="precision__figure">
        <div className="precision__image">
          <Image src="/media/wide/printers.png" alt="A close study of the HP DesignJet Z9+ V-Trimmer and its precision print technology" fill sizes="100vw" quality={88} />
        </div>
        <figcaption className="label">HP DesignJet Z9+ with V-Trimmer · In our London studio</figcaption>
      </figure>
    </section>
  );
}
