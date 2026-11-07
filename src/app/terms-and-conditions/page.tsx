import type { Metadata } from "next";
import { Legal } from "@/components/blocks/Legal";
import { terms, termsIntro } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms and conditions of Art Britannia Ltd trading as Giclée Club.",
};

export default function TermsPage() {
  return <Legal title="Terms and Conditions" intro={termsIntro} sections={terms} />;
}
