import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Sheet } from "@/components/blocks/Text";
import { siteVisibility } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Contact the Giclée Club studio to discuss delivery for your print.",
  robots: siteVisibility.shipping ? undefined : { index: false, follow: false },
};

const countries =
  "Albania, Andorra, Austria, Belarus, Belgium, Bosnia & Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Faroe Islands, Finland, France, Germany, Greece, Greenland, Hungary, Iceland, Ireland, Italy, Kosovo, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Montenegro, North Macedonia, Norway, Poland, Portugal, Romania, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, Ukraine, United Kingdom, Vatican City".split(
    ", ",
  );

export default function ShippingPage() {
  if (!siteVisibility.shipping) notFound();

  return (
    <Sheet ink="shipping">
      <Hero
        name="shipping"
        alt="A dark map of Europe with red delivery points, beside a blue to coral field"
        eyebrow="Free shipping"
        title={["All of", "Europe"]}
        credit="Image by KOBU Agency"
        action={{ href: "/contact-us", label: "Contact us" }}
      >
        <p>We ship to all of Europe for free and for money to the rest of the world.</p>
      </Hero>

      <section className="statement" data-reveal="rise">
        <h2 className="h-lg">Countries with free shipping</h2>
        <p className="countries">
          {countries.map((country, i) => (
            <span key={country}>
              {country}
              {i < countries.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
