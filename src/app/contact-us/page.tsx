import type { Metadata } from "next";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Split } from "@/components/blocks/Split";
import { Sheet, Ticks } from "@/components/blocks/Text";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "To order your print, contact us. Every order passes through our AI approval system, which checks your file’s quality.",
};

export default function ContactPage() {
  return (
    <Sheet ink="contact">
      <PageTitle eyebrow="Ask us anything" title={["Feel free to", "contact us"]} />

      <Split
        image="your-art-print"
        alt="A poster reading Your Art Print on a dark table"
        eyebrow="Whenever you are ready"
        title="How to order"
      >
        <p>We take orders directly, not on the website.</p>
        <Ticks
          items={[
            "Tell us what you would like to print.",
            "Your file passes through our AI approval system, which checks its quality.",
            "We confirm your order and the final price with you.",
          ]}
        />
        <p>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          <br />
          {studio.street}
          <br />
          {studio.city}
        </p>
      </Split>

      <ContactBlock title="Send us a message" />
    </Sheet>
  );
}
