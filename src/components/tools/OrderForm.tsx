"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { sendMail } from "@/lib/mail";
import { euro, pricing, type SizeId } from "@/lib/pricing";
import { stocks, studio, type StockId } from "@/lib/site";

export type Product = "art-print" | "sample-pack" | "proof-strip" | "portfolio-set";

const tabs: { id: Product; label: string }[] = [
  { id: "art-print", label: "Art print" },
  { id: "sample-pack", label: "Sample pack" },
  { id: "proof-strip", label: "Proof strip" },
  { id: "portfolio-set", label: "Portfolio set" },
];

const packs = [
  { id: "illustration", name: "Illustration" },
  { id: "digital-art", name: "Digital Art" },
  { id: "photography", name: "Photography" },
  { id: "painting", name: "Painting" },
  { id: "mixed-arts", name: "Mixed Arts" },
];

const portfolioExtras = ["A4 cover letter", "A4 CV", "A5 note"];

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="calc__group">
      <span>{label}</span>
      {children}
    </div>
  );
}

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; name: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <Group label={label}>
      <div className="calc__chips" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="chip"
            aria-pressed={option.id === value}
            onClick={() => onChange(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </Group>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="stepper">
      <button type="button" aria-label="One fewer" onClick={() => onChange(Math.max(1, value - 1))}>
        −
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="One more" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}

const sizeOptions = pricing.sizes.map((s) => ({ id: s.id, name: s.id }));
const portfolioSizes = sizeOptions.filter((s) => ["A5", "A4", "A3"].includes(s.id));
const paperOptions = stocks.map((s) => ({ id: s.id, name: s.name }));

const FilesNote = () => (
  <p className="note" style={{ marginTop: "1.6rem" }}>
    <span>
      Please make sure that your print file is prepared according to Giclée printing standards. You
      can check the requirements in our{" "}
      <Link className="inline" href="/preparing-your-files">
        Preparing Your Files
      </Link>{" "}
      section.
    </span>
  </p>
);

export function OrderForm({ product }: { product: Product }) {
  const [size, setSize] = useState<SizeId>(product === "portfolio-set" ? "A4" : "A3");
  const [paper, setPaper] = useState<StockId>("photo-rag");
  const [pack, setPack] = useState(packs[0].id);
  const [quantity, setQuantity] = useState(1);
  const [sticker, setSticker] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [extras, setExtras] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  // Links from the calculator and Sample Packs page arrive with a choice made.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.size) return;
    const frame = requestAnimationFrame(() => {
      const nextPack = params.get("pack");
      const nextSize = params.get("size");
      const nextPaper = params.get("paper");
      if (packs.some((p) => p.id === nextPack)) setPack(nextPack as string);
      if (pricing.sizes.some((s) => s.id === nextSize)) setSize(nextSize as SizeId);
      if (stocks.some((s) => s.id === nextPaper)) setPaper(nextPaper as StockId);
      setQuantity(Math.max(1, Number(params.get("quantity")) || 1));
      setSticker(params.get("sticker") === "1");
      setCertificate(params.get("certificate") === "1");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const paperName = stocks.find((s) => s.id === paper)?.name ?? "";
  const unit = pricing.sizes.find((s) => s.id === size)?.price ?? 0;

  const lines: [string, string][] = [];
  let price: number | null = null;
  let subject = "";

  if (product === "art-print") {
    lines.push(["Size", size], ["Paper", paperName], ["Quantity", String(quantity)]);
    if (sticker) lines.push(["Extra", "Branded package sticker"]);
    if (certificate) lines.push(["Extra", "Certificate of Authenticity"]);
    price = unit * quantity;
    subject = `Order: ${quantity} × ${size} art print on ${paperName}`;
  } else if (product === "sample-pack") {
    const name = packs.find((p) => p.id === pack)?.name;
    lines.push(["Pack", `${name}`], ["Quantity", String(quantity)]);
    price = pricing.samplePack * quantity;
    subject = `Order: Sample Pack ${name}`;
  } else if (product === "proof-strip") {
    lines.push(["Strip", "1100 × 100 mm"], ["Paper", paperName], ["Quantity", String(quantity)]);
    price = pricing.proofStrip * quantity;
    subject = `Order: Proof Printing Strip on ${paperName}`;
  } else {
    lines.push(["Size", size], ["Paper", paperName], ["Prints", String(quantity)]);
    extras.forEach((extra) => lines.push(["Add", extra]));
    subject = `Order: Premium Portfolio Set, ${size} on ${paperName}`;
  }

  const needsFiles = product !== "sample-pack";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      ...lines.map(([term, value]) => `${term}: ${value}`),
      price !== null ? `Estimated total: ${euro(price)}` : "",
      "",
      needsFiles ? `Files: ${form.get("transfer") || "to follow"}` : "",
      `Name: ${form.get("name")}`,
      `Email: ${form.get("email")}`,
      `Ship to: ${form.get("address")}`,
      form.get("message") ? `\nNote: ${form.get("message")}` : "",
    ]
      .filter((line) => line !== "")
      .join("\n");
    sendMail(subject, body);
    setSent(true);
  };

  return (
    <div className="tool">
      <nav className="order__tabs" aria-label="Products">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            className="order__tab"
            href={`/order/${tab.id}`}
            aria-current={tab.id === product ? "page" : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <form className="order" onSubmit={submit}>
        <div>
          {product === "art-print" && (
            <>
              <Choice label="Size" options={sizeOptions} value={size} onChange={setSize} />
              <Choice label="Hahnemühle paper" options={paperOptions} value={paper} onChange={setPaper} />
              <Group label="Quantity">
                <Stepper value={quantity} onChange={setQuantity} />
              </Group>
              <Group label="Extras">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={sticker}
                    onChange={(e) => setSticker(e.target.checked)}
                  />
                  <span>
                    Branded package sticker with your name, logo, pattern or signature (
                    <Link className="inline" href="/branded-packaging">
                      see how
                    </Link>
                    )
                  </span>
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={certificate}
                    onChange={(e) => setCertificate(e.target.checked)}
                  />
                  <span>
                    Hahnemühle Certificate of Authenticity (
                    <Link className="inline" href="/certificate-of-authenticity">
                      see how
                    </Link>
                    )
                  </span>
                </label>
              </Group>
              <FilesNote />
              <p className="label" style={{ marginTop: "1rem" }}>
                If you wish to order custom sizes, please{" "}
                <Link className="inline" href="/contact-us">
                  email us
                </Link>
                .
              </p>
            </>
          )}

          {product === "sample-pack" && (
            <>
              <div className="prose-sheet" style={{ marginBottom: "1.8rem" }}>
                <p>
                  This is where you can order your sample pack. Take your pick from one of our 5
                  packs.
                </p>
                <p>
                  Each pack contains 4 artworks on 4 different Hahnemühle papers so that you can see
                  and better imagine what your art will look like printed out in Giclée.
                </p>
                <p>You can choose from our Illustration, Digital Art, Photography, Painting or Mixed Arts.</p>
              </div>
              <Choice label="Pack" options={packs} value={pack} onChange={setPack} />
              <Group label="Quantity">
                <Stepper value={quantity} onChange={setQuantity} />
              </Group>
            </>
          )}

          {product === "proof-strip" && (
            <>
              <div className="prose-sheet" style={{ marginBottom: "1.8rem" }}>
                <p>Our standard strip size is 1100 × 100 mm or 44″ × 4″.</p>
                <p>
                  Please choose the most important area of your artwork to get the most out of your
                  proof print. For example, the most colourful and complex area or an area with
                  highlights, shadows and mid tones so that you can best check the tonal range of
                  your print.
                </p>
              </div>
              <Choice label="Hahnemühle paper" options={paperOptions} value={paper} onChange={setPaper} />
              <Group label="Quantity">
                <Stepper value={quantity} onChange={setQuantity} />
              </Group>
              <FilesNote />
            </>
          )}

          {product === "portfolio-set" && (
            <>
              <div className="prose-sheet" style={{ marginBottom: "1.8rem" }}>
                <p>
                  Here you can order your Premium Portfolio Set. Below please choose your desired
                  size A5 | A4 | A3, the paper of your choice and upload your files as well as a file
                  with your name or logo.
                </p>
                <p>
                  You can optionally choose to include a A4 cover letter, A4 CV or an A5 note. If you
                  do so, please include the file in the WeTransfer upload.
                </p>
                <p>
                  If you need more information on preparing your files please check our{" "}
                  <Link href="/preparing-your-files">Preparing Your Files</Link> section.
                </p>
              </div>
              <Choice label="Size" options={portfolioSizes} value={size} onChange={setSize} />
              <Choice label="Hahnemühle paper" options={paperOptions} value={paper} onChange={setPaper} />
              <Group label="Number of prints">
                <Stepper value={quantity} onChange={setQuantity} />
              </Group>
              <Group label="Add to your set">
                {portfolioExtras.map((extra) => (
                  <label className="check" key={extra}>
                    <input
                      type="checkbox"
                      checked={extras.includes(extra)}
                      onChange={(e) =>
                        setExtras((all) =>
                          e.target.checked ? [...all, extra] : all.filter((x) => x !== extra),
                        )
                      }
                    />
                    {extra}
                  </label>
                ))}
              </Group>
            </>
          )}

          <div className="contact__form">
            {needsFiles && (
              <div className="full">
                <a
                  className="btn btn--ghost"
                  href="https://wetransfer.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Upload your files
                </a>
                <label className="field" style={{ marginTop: "1rem" }}>
                  <span>Your WeTransfer link</span>
                  <input name="transfer" type="url" placeholder="https://we.tl/…" />
                </label>
              </div>
            )}
            <label className="field">
              <span>Name</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label className="field full">
              <span>Ship to</span>
              <textarea
                name="address"
                required
                rows={3}
                style={{ minHeight: "6rem" }}
                autoComplete="street-address"
              />
            </label>
            <label className="field full">
              <span>Note (optional)</span>
              <textarea name="message" rows={3} style={{ minHeight: "6rem" }} />
            </label>
          </div>
        </div>

        <aside className="order__summary" aria-label="Your order">
          <p className="eyebrow">Your order</p>
          <dl>
            {lines.map(([term, value], index) => (
              <div key={`${term}-${index}`}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="calc__price" style={{ marginTop: "1.4rem", fontSize: "clamp(2.6rem, 5vw, 4.4rem)" }}>
            {price !== null ? euro(price) : "On request"}
          </p>
          {price === null && (
            <p className="label" style={{ marginTop: "0.5rem" }}>
              We will send you the price for your set.
            </p>
          )}
          {price !== null && product === "art-print" && !pricing.confirmed && (
            <p className="label" style={{ marginTop: "0.5rem" }}>
              Indicative prices, final price confirmed with your order.
            </p>
          )}
          <button type="submit" className="btn btn--pink" style={{ marginTop: "1.5rem", width: "100%" }}>
            Send order
          </button>
          <p className="label" style={{ marginTop: "0.9rem" }} aria-live="polite">
            {sent
              ? `Your mail app should now be open with your order, ready to send. If not, write to ${studio.email}.`
              : "This opens your mail app with your order filled in. We reply with payment details."}
          </p>
        </aside>
      </form>
    </div>
  );
}
