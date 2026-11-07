import type { Metadata } from "next";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ask us anything. Write to hello@gicleeclub.com or send us a message.",
};

export default function ContactPage() {
  return (
    <Sheet ink="contact">
      <PageTitle eyebrow="Ask us anything" title={["Feel free to", "contact us"]}>
        <p>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
          <br />
          {studio.street}, {studio.city}
        </p>
      </PageTitle>
      <ContactBlock title="Send us a message" />
    </Sheet>
  );
}
