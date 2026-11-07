import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { Guide } from "@/components/blocks/Guide";
import { Hero } from "@/components/blocks/Hero";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Note, Sheet, Ticks } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Soft Proofing",
  description:
    "Get the best impression possible of how your colours will turn out on paper: calibrate your monitor, install ICC profiles and preview your art in Photoshop.",
};

const steps = [
  { id: "calibrate", label: "Calibrate your monitor" },
  { id: "install", label: "Install ICC profiles" },
  { id: "previewing", label: "Previewing your art" },
  { id: "intents", label: "Rendering intents" },
  { id: "save", label: "Save to print" },
];

export default function SoftProofingPage() {
  return (
    <Sheet ink="proofing">
      <Hero
        name="soft-proofing"
        alt="Oil and water bubbles over pink, yellow and blue, with stacked green rings"
        eyebrow="Colour accuracy"
        title={["Soft", "Proofing"]}
      >
        <p>Get the best impression possible of how your colours will turn out on paper.</p>
        <Note>
          Keep in mind that monitors can reproduce billions of colours and even the most advanced
          printers have a narrower colour gamut.
        </Note>
      </Hero>

      <Guide steps={steps}>
        <Split
          id="calibrate"
          image="monitor"
          alt="A desktop monitor glowing yellow on a desk"
          eyebrow="Highly recommended"
          title="Calibrate your monitor"
          flip
        >
          <p>
            It is ideal to have a professional IPS monitor to be able to achieve colour accuracy and
            consistency when working on your digital art and preparing your files for printing. To
            calibrate your monitor, you can choose to invite a professional, or to invest in a
            monitor calibrator (e.g. X-Rite i1Studio).
          </p>
          <p>
            A calibrated IPS monitor will show the colours as close as possible to how they will be
            printed out.
          </p>
        </Split>

        <Split
          id="install"
          image="icc-install"
          alt="The macOS Finder Go menu leading to the ColorSync Profiles folder"
          eyebrow="Install"
          title="ICC print profiles"
          action={{
            href: "/downloads/Giclee-Club_ICC-Profiles.zip",
            label: "Download ICC profiles",
            download: true,
          }}
        >
          <p>
            ICC profiles contain information about how the colours of a specific printer will look
            like on a specific paper. This way you can see how your artwork will turn out on a
            certain printer-paper combination. <Link href="/icc-profiles">Read more</Link>
          </p>
          <p>To install the ICC profiles, please copy the .icc files to the following directories:</p>
          <p>
            <strong>macOS</strong>
            <br />
            Finder ➔ Go ➔ Computer
            <br />
            Macintosh HD/Library/ColorSync/Profiles
          </p>
          <p>
            <strong>Windows 10</strong>
            <br />
            C:/Windows/system32/spool/drivers/color
          </p>
        </Split>

        <Split
          id="previewing"
          image="previewing"
          alt="The Photoshop Customize Proof Condition window"
          eyebrow="Soft proofing in Photoshop"
          title="Previewing your art"
          flip
        >
          <p>
            In order to use the ICC profile of your choice in Photoshop, click View ➔ Proof Setup ➔
            Custom. This opens the Customize Proof Condition window where you can choose the desired
            ICC profile to simulate the colours of your future print.
          </p>
          <p>
            In this window, please <strong>untick Preserve RGB Numbers</strong>,{" "}
            <strong>tick Black Point Compensation</strong> and choose the Rendering Intent. You can
            read about Rendering Intents in the next section.
          </p>
        </Split>

        <Split
          id="intents"
          image="rendering-intents"
          alt="The rendering intent menu in the Customize Proof Condition window"
          eyebrow="Choosing"
          title="Rendering intents"
        >
          <p>There are only two rendering intents that are useful for Fine Art proof printing:</p>
          <div>
            <strong>Perceptual</strong>
            <Ticks
              items={[
                "will benefit transitions and gradients",
                "can cause the image to lighten or de-saturate",
              ]}
            />
          </div>
          <div>
            <strong>Relative Colorimetric</strong>
            <Ticks
              items={[
                "will provide with more exact tones",
                "can cause banding of your transitions and gradients",
              ]}
            />
          </div>
        </Split>

        <Split
          id="save"
          image="save"
          alt="The Photoshop Convert to Profile window"
          eyebrow="The last step"
          title="Save your changes to print"
          flip
        >
          <p>
            When you are happy with the result of your soft proofing, please convert the file to the
            ICC profile of your choice. In Photoshop, click Edit ➔ Convert to Profile. Finally, save
            your file.
          </p>
          <p>
            When we receive this file we will be able to see which printer and paper combination you
            chose as we can read this information on the converted file.
          </p>
        </Split>
      </Guide>

      <ContactBlock />
      <ContactCta />
      <Promos />
    </Sheet>
  );
}
