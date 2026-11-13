import type { Metadata } from "next";
import { Legal } from "@/components/blocks/Legal";
import { privacy, privacyIntro } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Giclée Club handles your personal data.",
};

export default function PrivacyPage() {
  return <Legal title="Privacy Policy" intro={privacyIntro} sections={privacy} />;
}
