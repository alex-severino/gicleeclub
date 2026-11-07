import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "ICC Print Profiles",
  description:
    "ICC profiles help you preview your image before printing. Download ours to simulate the colours of your future print on your monitor.",
};

export default function IccProfilesPage() {
  return (
    <Sheet ink="icc">
      <Hero
        name="icc"
        alt="White caustic light patterns on black with stacked violet rings"
        eyebrow="Soft proofing"
        title={["ICC", "Profiles"]}
        action={{
          href: "/downloads/Giclee-Club_ICC-Profiles.zip",
          label: "Download ICC profiles",
          download: true,
        }}
      >
        <p>
          ICC profiles help you with previewing your image before printing. It is the best way to
          simulate the colours of your future print on your monitor.
        </p>
      </Hero>

      <Split
        image="icc-chart"
        alt="A CIE chromaticity chart comparing human vision, Wide Gamut RGB, Adobe RGB, sRGB and CMYK"
        eyebrow="What are"
        title="ICC print profiles"
      >
        <p>
          ICC (International Colour Consortium) profiles are files with the extension .icc that
          contain data of a colour space or of the input/output of a device – for example, a
          printer, a scanner or a monitor.
        </p>
        <p>
          In Giclée printing, an ICC profile contains information about how the colours of a certain
          printer will turn out on a certain paper.
        </p>
      </Split>

      <Split
        image="previewing-icc"
        alt="The Photoshop Customize Proof Condition window over a colourful artwork"
        eyebrow="Preview your print"
        title="Soft proofing"
        flip
      >
        <p>
          In order to preview your future print on your monitor you need to have our ICC profiles
          installed on your computer. This way you can access them in Photoshop and see as accurately
          as possible how your image’s colours will turn out printed with a specific printer on the
          paper of your choice.
        </p>
        <p>
          You can read more about how to install ICC profiles and soft proof your files in our{" "}
          <Link href="/soft-proofing">Soft Proofing</Link> section.
        </p>
      </Split>

      <section className="statement" data-reveal="rise">
        <h2 className="h-lg">What are ICC profiles</h2>
        <p>
          ICC (International Colour Consortium) profiles are files with the extension .icc that
          contain data on a colour space or input/output of a device. When changing colour spaces,
          ICC profiles are translated into a common space: the Profile Connected Space (PCS).
        </p>
        <p>
          The PCS uses either the CIELAB (L*a*b*) or the CIEXYZ colorimetric spaces. These were
          created by Commission Internationale de l’Éclairage, the scientific world authority on
          light that dates from 1913. Their research connected wavelengths in the electromagnetic
          visible spectrum to perceived colours in human vision.
        </p>
        <p>
          When using our ICC profiles, your monitor’s ICC profile will be mapped to PCS and then
          mapped back to the ICC profiles that we provide. This way you will be able to see on your
          monitor an approximation of what the printed colours will look like on paper.
        </p>
      </section>

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
