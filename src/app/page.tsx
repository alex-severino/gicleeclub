import { Approval } from "@/components/home/Approval";
import { PrintHero } from "@/components/home/PrintHero";
import { PrintClosing } from "@/components/home/PrintClosing";
import { PrintPrecision } from "@/components/home/PrintPrecision";
import { ResolutionAssurance } from "@/components/home/ResolutionAssurance";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PrintTechnology } from "@/components/home/PrintTechnology";
import { Sheet } from "@/components/blocks/Text";

export default function HomePage() {
  return (
    <Sheet ink="home">
      <PrintHero />
      <Approval />
      <ResolutionAssurance />
      <HowItWorks />
      <PrintTechnology />
      <PrintPrecision />
      <PrintClosing />
    </Sheet>
  );
}
