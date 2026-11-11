import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Sheet } from "@/components/blocks/Text";
import { PriceCalculator } from "@/components/tools/PriceCalculator";

export const metadata: Metadata = {
  title: "Prices",
  description:
    "Our prices are transparent. Use our calculator to see exactly what your Giclée print will cost.",
};

export default function PricesPage() {
  return (
    <Sheet ink="prices">
      <Hero
        name="prices"
        alt="A pink plaster wall between blue striped fields and a violet gradient"
        eyebrow="Our"
        title={["Prices"]}
        action={{ href: "/contact-us", label: "Contact us" }}
      >
        <p>
          We are proud to provide you with our high-quality Giclée printing service and we are
          always here for you if you have any questions.
        </p>
        <p>
          Our prices are transparent. Use the calculator to see what your print will cost.
        </p>
      </Hero>

      <PriceCalculator />

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
