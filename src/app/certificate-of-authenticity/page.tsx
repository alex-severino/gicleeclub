import type { Metadata } from "next";
import { Hero } from "@/components/blocks/Hero";
import { OrderCta } from "@/components/blocks/OrderCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Sheet } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Certificate of Authenticity",
  description:
    "Assure the safety of your unique or limited edition art piece with Hahnemühle’s Certificate of Authenticity.",
};

export default function CertificatePage() {
  return (
    <Sheet ink="certificate">
      <Hero
        name="certificate"
        alt="A Hahnemühle Certificate of Authenticity with its sheet of holograms"
        eyebrow="Hahnemühle FineArt"
        title={["Certificate of", "Authenticity"]}
      >
        <p>
          Assure the safety of your unique or limited edition art piece by including Hahnemühle’s
          Certificate of Authenticity in your order.
        </p>
      </Hero>

      <Split
        image="hologram"
        alt="A strip of numbered holograms lying on deckle edged certificate paper"
        eyebrow="Hologram system"
        title="Security protection"
      >
        <p>
          With its Hahnemühle watermark, fluorescent security fibres and safety holograms with
          unique serial numbers, this deckle edged mould made paper certificate provides your
          artwork with full security of authenticity.
        </p>
        <p>
          You can also register your limited edition or unique art piece on{" "}
          <a
            href="https://www.hahnemuehle.com/en/digital-fineart/my-art-registry/artist-login/artist-login-form.html"
            target="_blank"
            rel="noreferrer"
          >
            Hahnemühle’s Art Registry
          </a>
          .
        </p>
      </Split>

      <Split
        image="details"
        alt="A completed certificate showing the artwork, its details and a signature"
        eyebrow="How it works"
        title="Upload your details"
        action={{
          href: "/downloads/Giclee-Club_Template_Certificate-of-Authenticity.pdf",
          label: "Download template",
          download: true,
        }}
        flip
      >
        <p>
          All you need to do is add the certificate option when ordering your art print, upload your
          digital signature and fill in the details of your artwork.
        </p>
      </Split>

      <OrderCta />
      <Promos />
    </Sheet>
  );
}
