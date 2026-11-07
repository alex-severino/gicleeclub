import type { Metadata } from "next";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";
import { OrderForm } from "@/components/tools/OrderForm";

export const metadata: Metadata = {
  title: "Order: Premium Portfolio Set",
  description: "Your prints in a black envelope with your logo, sealed with golden wax.",
};

export default function Page() {
  return (
    <Sheet ink="order">
      <PageTitle eyebrow="A5 | A4 | A3 prints" title={["Portfolio set"]} />
      <OrderForm product="portfolio-set" />
    </Sheet>
  );
}
