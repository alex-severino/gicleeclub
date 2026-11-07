import type { Metadata } from "next";
import { PageTitle } from "@/components/blocks/PageTitle";
import { Sheet } from "@/components/blocks/Text";
import { OrderForm } from "@/components/tools/OrderForm";

export const metadata: Metadata = {
  title: "Order: Sample Pack",
  description: "Take your pick from one of our 5 sample packs, each with 4 artworks on 4 Hahnemühle papers.",
};

export default function Page() {
  return (
    <Sheet ink="order">
      <PageTitle eyebrow="A5 prints" title={["Sample pack"]} />
      <OrderForm product="sample-pack" />
    </Sheet>
  );
}
