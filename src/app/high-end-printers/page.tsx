import type { Metadata } from "next";
import { Bleed } from "@/components/blocks/Bleed";
import { Hero } from "@/components/blocks/Hero";
import { epsonInks, InkSet, zInks } from "@/components/blocks/InkSet";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { FitHeading, Sheet, Specs } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "High-End Printers",
  description:
    "We print with the HP DesignJet Z9+ with V-Trimmer and the Epson SureColor P700: smooth colour transitions, stunning sharpness and the widest colour range possible.",
};

export default function PrintersPage() {
  return (
    <Sheet ink="printers">
      <Hero
        name="printers"
        alt="The HP DesignJet Z9+ V-Trimmer in soft blue light"
        eyebrow="Our top-of-the-line"
        title={["Professional", "Printers"]}
        action={{ href: "/contact-us", label: "Contact us" }}
      >
        <p>
          Giclée printing is made possible by the newest generation of professional inkjet printers
          that produce incredibly high printing resolutions and use pigment archival inks lasting
          over 100 years.
        </p>
        <p>
          Our printers use the most advanced technologies that assure smooth colour transitions,
          stunning sharpness and the widest colour range possible.
        </p>
      </Hero>

      <FitHeading span={78}>Large format|printing</FitHeading>

      <Bleed
        image="hp"
        alt="A colourful print feeding out of the HP DesignJet Z9+"
        credit="Art by Posteress"
        right
      >
        <h3 className="h-md">HP DesignJet Z9+</h3>
        <Specs
          rows={[
            ["Maximum print size", "44″ × 470″"],
            ["Print resolution", "2400 × 1200 DPI"],
            ["Technology", "HP Thermal Inkjet"],
            ["Ink technology", "HP Pixel Control"],
            ["Ink archival life", "250 years"],
          ]}
        />
      </Bleed>

      <Split
        image="print-tech"
        alt="Diagram of the HP HDNA printhead with dual drop weight"
        eyebrow="Latest"
        title="Print technology"
        credit="Image by HP Company"
      >
        <p>
          The HP DesignJet Z9+ has a HP Thermal Inkjet HD printhead with dual drop technology down
          to 3 picoliters and 2112 printhead nozzles per colour making for a staggering total of
          21,120.
        </p>
      </Split>

      <Split
        image="colours"
        alt="A row of HP Vivid Photo ink cartridges"
        eyebrow="Advanced"
        title="Colour representation"
        credit="Image by HP Company"
        flip
      >
        <p>
          It uses 9 pigment based inks, namely: Cyan, Magenta, Yellow, Matte Black, Photo Black,
          Chromatic Red, Chromatic Green, Chromatic Blue and Grey. This means it can reproduce
          colour schemes to extremely high fidelities as it disposes of both RGB and CMYK colour
          models.
        </p>
      </Split>

      <InkSet inks={zInks} />

      <Split
        image="gradients"
        alt="A smooth violet and cyan gradient artwork"
        eyebrow="Smooth fluid"
        title="Transitions and gradients"
        credit="Art by Gradienta"
      >
        <p>
          The blacks are of incredible depth and crispness as the HP DesignJet Z9+ has a Matte and
          Photo Black cartridges as well as a designated Grey cartridge to further perfect gradients
          and colour transitions.
        </p>
      </Split>

      <Split
        image="v-trimmer"
        alt="Close-up of the V-Trimmer lettering on the printer"
        eyebrow="Automated cutting"
        title="V-Trimmer technology"
        flip
      >
        <p>
          Our HP DesignJet Z9+ has an integrated Vertical Trimmer in addition to the standard
          horizontal trimmer.
        </p>
        <p>
          This means that it cuts your print on all sides, eliminating any human error and
          delivering a perfect cut result.
        </p>
      </Split>

      <FitHeading span={78}>Standard format|printing</FitHeading>

      <Bleed image="epson" alt="The Epson SureColor P700 with a sheet in its paper path" right>
        <h3 className="h-md">Epson SureColor P700</h3>
        <Specs
          rows={[
            ["Maximum print size", "A3"],
            ["Print resolution", "5760 × 1440 DPI"],
            ["Technology", "Epson MicroPiezo AMC"],
            ["Ink technology", "UltraChrome PRO10"],
            ["Ink archival life", "up to 400 years"],
          ]}
        />
      </Bleed>

      <Split
        image="surecolor"
        alt="Illustration of ink drops falling from Epson printheads"
        eyebrow="Advanced"
        title="SureColor technology"
        credit="Image by Epson Corporation"
      >
        <p>
          The Epson SureColor P700 uses the same technology as its large-format bigger siblings. Its
          state-of-the-art MicroPiezo AMC 10-channel drop-on-demand printhead with ink-repelling
          coating technology is created to produce stunning results.
        </p>
      </Split>

      <Split
        image="printheads"
        alt="Diagram of ink drops of different sizes on a printhead"
        eyebrow="Hi-Tech"
        title="Printheads"
        credit="Image by Epson Corporation"
        flip
      >
        <p>
          The P700 advanced printheads produce drops of 1.5 picoliters with Variable Droplet
          Technology that are able to spray up to three different dot sizes per line. It has 180
          printhead nozzles per colour at its disposal, making for a total of 1,800 and using
          pigment based inks.
        </p>
      </Split>

      <Split
        image="epson-color"
        alt="A row of Epson UltraChrome ink cartridges"
        eyebrow="Vivid vibrant"
        title="Colours and blacks"
      >
        <p>
          The Epson SureColor P700 operates with 10 colour cartridges: Cyan, Light Cyan, Vivid
          Magenta, Vivid Light Magenta, Yellow, Grey, Light Grey, Violet, Photo Black and Matte
          Black. They make incredible high definition prints that last for up to 200 years for
          colour and up to 400 years for black and white.
        </p>
      </Split>

      <InkSet inks={epsonInks} />

      <ContactCta />
      <Promos />
    </Sheet>
  );
}
