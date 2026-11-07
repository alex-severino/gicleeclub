import type { Metadata } from "next";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";
import { OrderForm } from "@/components/tools/OrderForm";

export const metadata: Metadata = {
  title: "Order: Art Print",
  description: "Choose your size, Hahnemühle paper and extras, and send us your art.",
};

export default function Page() {
  return (
    <Sheet ink="order">
      <PageTitle eyebrow="Hand-printed in Amsterdam" title={["Your art print"]} />
      <OrderForm product="art-print" />
    </Sheet>
  );
}
