import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
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
        action={{ href: "/order/art-print", label: "Order your art print" }}
      >
        <p>
          We are proud to provide you with our high-quality Giclée printing service and we are
          always here for you if you have any questions.
        </p>
        <p>
          Our prices are transparent and you can use our calculator to see exactly what your print
          will cost.
        </p>
      </Hero>

      <PriceCalculator />

      <OrderCta />
      <Promos />
    </Sheet>
  );
}
