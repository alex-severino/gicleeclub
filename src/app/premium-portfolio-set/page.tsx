import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Premium Portfolio Set",
  description:
    "Showcase your work in style: your prints in a black envelope with your logo, sealed with golden wax.",
};

export default function PortfolioPage() {
  return (
    <Sheet ink="portfolio">
      <Hero
        name="portfolio"
        alt="A black envelope, prints and a wax sealed letter on a dark table"
        eyebrow="High-class presentation"
        title={["Premium", "Portfolio Set"]}
        credit="Art by Ave Calvar, Tim Stief, Augustine Wong, Sappho Bakker"
        action={{ href: "/order/portfolio-set", label: "Order" }}
      >
        <p>Showcase your work in style and create the impression your art deserves.</p>
      </Hero>

      <Split
        image="paper-size"
        alt="Three prints of a gold triangle artwork in different sizes"
        eyebrow="Choose your"
        title="Artisan paper and its size"
        credit="Art by Akira Hojo"
      >
        <p>
          You can choose from our selection of Hahnemühle papers and pick your desired size: A5, A4
          or A3.
        </p>
        <p>
          Your portfolio will have the highest printing quality there is on the best paper on the
          market.
        </p>
      </Split>

      <Split
        image="cv-cl-note"
        alt="A CV, cover letter and handwritten note template on a dark table"
        eyebrow="Add to your set"
        title="Cover letter | CV | Note"
        action={{
          href: "/downloads/Giclee-Club_Templates_CV_CL_Note.zip",
          label: "Download templates",
          download: true,
        }}
        flip
      >
        <p>
          Include an A4 cover letter, A4 CV or an A5 note in the set to complete your presentation.
          Any combination of these items is possible. They will be printed on 160 grams white paper
          in b/w or colour depending on your uploaded file.
        </p>
        <p>You can choose to use the templates that we created for the cover letter, CV and note.</p>
      </Split>

      <Split
        image="envelopes"
        alt="Three black envelopes in A3, A4 and A5, one with a Your Logo Here label"
        eyebrow="Black premium"
        title="Envelope with your logo"
      >
        <p>
          Your portfolio prints will be sent in a high quality black envelope with your name or logo
          on it.
        </p>
        <p>
          Our A5 and A4 envelopes have a Japanese closure. The A3 envelope comes with a classical
          closure.
        </p>
      </Split>

      <Split
        image="golden-seal"
        alt="A black envelope sealed with golden wax beside a wax stamp"
        eyebrow="Seal stamp"
        title="Golden wax"
        flip
      >
        <p>
          The envelope will be sealed with golden wax for maximum effect. We stamp the wax with a
          blank round seal stamp.
        </p>
        <p>
          We will send this envelope to anywhere in the world packed in biodegradable bubble wrap
          and wrapped in recycled paper for extra protection.
        </p>
      </Split>

      <OrderCta
        title="Order your Premium Portfolio Set"
        href="/order/portfolio-set"
        image="order-portfolio"
        credit="Art by Tim Stief, Augustine Wong, Sappho Bakker"
        right
      />
      <Promos without="portfolio" />
    </Sheet>
  );
}
