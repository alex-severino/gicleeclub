import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactCta } from "@/components/blocks/ContactCta";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Promos } from "@/components/blocks/Promos";
import { Sheet } from "@/components/blocks/Text";
import { Money } from "@/components/shell/Money";
import { FramePicker } from "@/components/tools/FramePicker";
import { pricing } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Hand-Painted Frames",
  description:
    "Your Giclée print delivered ready to hang, in a solid wood frame painted by hand in the Farrow & Ball colour of your choice.",
};

const making = [
  ["Solid wood, made to measure", "We cut and join each frame to fit your print exactly."],
  [
    "Painted by hand",
    "Every frame is primed, then finished with two coats of genuine Farrow & Ball paint in a soft eggshell.",
  ],
  [
    "Safe to send",
    "Glazed with clear acrylic, which won’t shatter on its way to you. Anti-reflective museum glass on request.",
  ],
  [
    "Room to breathe",
    "An acid-free white window mount keeps your print off the glazing and gives it space on the wall.",
  ],
  ["Ready to hang", "Backed, sealed and fitted with hanging fixings, so it can go straight up."],
  [
    "Made in London",
    "We print, paint and assemble your frame in our studio within 10 working days, then send it by courier.",
  ],
] as const;

export default function PaintedFramesPage() {
  return (
    <Sheet ink="frames">
      <PageTitle eyebrow="Farrow & Ball colours" title={["Hand-painted", "frames"]}>
        <p>
          Your print can arrive ready to hang, in a solid wood frame we paint by hand in the Farrow
          &amp; Ball colour of your choice. Pick a colour below and see it around your picture.
        </p>
      </PageTitle>

      <FramePicker />

      <section className="tool" aria-labelledby="making-title">
        <h2 className="h-lg" id="making-title" data-reveal="rise">
          How we make your frame
        </h2>
        <ul className="facts">
          {making.map(([title, text], i) => (
            <li key={title} data-reveal="rise" style={{ "--d": (i % 3) * 90 } as CSSProperties}>
              <h3 className="h-sm">{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>

        <table className="price-list price-list--frames">
          <caption className="eyebrow">Framed print prices</caption>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Framed print</th>
              <th scope="col">With mount</th>
            </tr>
          </thead>
          <tbody>
            {pricing.sizes.map(({ id, price, frame, mount }) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{frame === null ? "On request" : <Money gbp={price + frame} />}</td>
                <td>{frame === null || mount === null ? "On request" : <Money gbp={price + frame + mount} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="label fine">
          Prices include the Giclée print on the Hahnemühle paper of your choice, the painted frame and
          courier delivery within the UK. For anywhere else, we quote delivery with your order.
        </p>
        <p className="label fine">
          Farrow &amp; Ball is a registered trade mark of Farrow &amp; Ball Ltd. We paint our frames
          with their paint. We are not affiliated with or endorsed by them.
        </p>
      </section>

      <ContactCta title="Send us your file" about="A print in a hand-painted frame" />
      <Promos />
    </Sheet>
  );
}
