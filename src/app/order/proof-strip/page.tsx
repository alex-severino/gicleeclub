import type { Metadata } from "next";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";
import { OrderForm } from "@/components/tools/OrderForm";

export const metadata: Metadata = {
  title: "Order: Proof Printing Strip",
  description: "Order a 1100 x 100 mm proof printing strip of your artwork on the paper of your choice.",
};

export default function Page() {
  return (
    <Sheet ink="order">
      <PageTitle eyebrow="Test strip" title={["Proof strip"]} />
      <OrderForm product="proof-strip" />
    </Sheet>
  );
}
