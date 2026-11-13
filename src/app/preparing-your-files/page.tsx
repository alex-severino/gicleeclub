import type { Metadata } from "next";
import { Guide } from "@/components/blocks/Guide";
import { Hero } from "@/components/blocks/Hero";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { ContactCta } from "@/components/blocks/ContactCta";
import { Promos } from "@/components/blocks/Promos";
import { Split } from "@/components/blocks/Split";
import { Note, Sheet } from "@/components/blocks/Text";
import { Preflight } from "@/components/tools/Preflight";

export const metadata: Metadata = {
  title: "Preparing Your Files",
  description:
    "Prepare your artwork for AI file approval and precision Giclée printing: resolution, safe areas, borders, flattening and exporting your file.",
};

const steps = [
  { id: "ai-approval", label: "AI approval" },
  { id: "requirements", label: "Printing requirements" },
  { id: "maximum-size", label: "Maximum print size" },
  { id: "preflight", label: "Check your file" },
  { id: "resolution", label: "Don’t upscale" },
  { id: "vector", label: "Vector art" },
  { id: "safe-area", label: "10mm safe area" },
  { id: "borders", label: "Optional borders" },
  { id: "flatten", label: "Flatten your image" },
  { id: "raster-export", label: "Raster file export" },
  { id: "vector-export", label: "Vector file export" },
];

export default function PreparingFilesPage() {
  return (
    <Sheet ink="preparing">
      <Hero
        name="preparing"
        alt="Crumpled holographic foil beside a blue field with amber rings"
        eyebrow="Before sending to print"
        title={["Prepare", "your files"]}
        action={{ href: "/contact-us", label: "Contact us" }}
      >
        <p>
          A carefully prepared file is the starting point for a detailed, faithful print. These
          guidelines help you prepare your artwork for AI approval and our colour-managed print workflow.
        </p>
        <p>
          It can be a little daunting at first, so please feel completely free to contact us. You can
          ask us any questions you might have about preparing your files for printing.
        </p>
      </Hero>

      <Guide steps={steps}>
        <Split
          id="ai-approval"
          image="ai-technology"
          alt="Large blue letters AI standing on a patterned surface"
          eyebrow="Before printing"
          title="AI file approval"
          credit="Art by Steve Johnson"
        >
          <p>
            Your artwork passes through our AI approval system before it reaches a printer. It
            checks technical details, including resolution, to help identify files that need attention.
          </p>
          <p>
            If your file needs work, we will let you know so you can adjust it or choose a more
            suitable print size. Technology supports the process; our studio team is here to help
            with your questions about paper, colour and preparation.
          </p>
          <p>Every order passes through this approval before it is printed.</p>
        </Split>

        <Split
          id="requirements"
          image="requirements"
          alt="A card listing: TIFF, size in mm or inches, 300 PPI, RGB colour 8 bit, sRGB or Adobe RGB (1998)"
          eyebrow="Standard Giclée"
          title="Printing requirements"
          flip
        >
          <p>
            To get the best printing results we need to receive a <strong>flattened TIFF</strong>{" "}
            file with <strong>300 PPI</strong> resolution, <strong>RGB Color</strong> at{" "}
            <strong>8 bit</strong> in your <strong>desired size</strong> in <strong>sRGB</strong> or{" "}
            <strong>Adobe RGB (1998)</strong> colour profile.
          </p>
          <Note>
            When you start creating a digital image in raster (e.g. in Photoshop) it is wise to
            think about the maximum size (inches or mm) that you would like to print in the future
            and set your document to 300 PPI.
          </Note>
        </Split>

        <Split
          id="maximum-size"
          image="print-size"
          alt="The Photoshop Image Size dialog with Resample unticked"
          eyebrow="Resolution under 300 PPI"
          title="Find out your maximum print size"
        >
          <p>
            Ideally your image was initially created at 300 PPI with your desired width
            and height in inches or millimetres.
          </p>
          <p>
            What if your file has a resolution lower than 300 PPI? For example you created your
            digital file at a lower resolution or you took a photograph at 72 PPI and you would like
            to still print it out.
          </p>
          <p>
            To find out the maximum print size, in Photoshop you can click Image ➔ Image Size,{" "}
            <strong>untick Resample</strong> and input 300 PPI in the Resolution box. Photoshop will
            then show you the maximum printable height and width in your desired unit (inches or mm)
            at 300 PPI.
          </p>
        </Split>

        <Preflight />

        <Split
          id="resolution"
          image="resample"
          alt="The Photoshop Image Size dialog with Resample ticked, crossed out"
          eyebrow="Warning"
          title="Do not artificially increase your file’s resolution"
          flip
        >
          <p>
            A file labelled 300 PPI is not automatically ready for print. Changing the resolution
            with <strong>Resample unticked</strong> changes the intended print size, while keeping
            the same pixels and image detail.
          </p>
          <p>
            Increasing the resolution <strong>with Resample ticked</strong> adds pixels by
            interpolation. It does not recover original detail that was missing. A small image
            enlarged this way can still look soft or pixelated in print.
          </p>
          <p>
            Send us your original file and tell us the size you have in mind. Our AI approval
            checks its technical quality before printing, and we will let you know if it needs attention.
          </p>
        </Split>

        <Split
          id="vector"
          image="vector-to-tiff"
          alt="The Illustrator TIFF Options dialog over a geometric artwork"
          eyebrow="Scalable"
          title="Vector art"
        >
          <p>
            A vector-based file (e.g. created in Adobe Illustrator) is scalable to any size without
            quality loss. To print it out, you will need to export your vector file as a
            raster TIFF file in your desired unit (inches or mm) at 300 PPI.
          </p>
          <p>
            In order to create a correct TIFF file for printing, please follow our export
            instructions in the <a href="/preparing-your-files" data-scroll-target="vector-export">Vector File Export</a> section below.
          </p>
        </Split>

        <Split
          id="safe-area"
          image="safe-area"
          alt="A diagram of the 10 mm safe area, trim and bleed area on an artwork"
          eyebrow="10mm"
          title="Safe area"
          flip
        >
          <p>
            Our professional printers produce borderless prints – this is why we need to receive
            your file in the <strong>exact size</strong> that you would like it to be printed in.
            This means that no added bleed area is required.
          </p>
          <p>
            It is important to keep all the essential elements of your image (e.g. logos or texts)
            inside your printed image without them being cut off in the printing process or
            overlapped with a frame.
          </p>
          <p>
            To do so, please place all the important elements of your image{" "}
            <strong>10mm</strong> away from the edges on all sides of your image.
          </p>
        </Split>

        <Split
          id="borders"
          image="borders"
          alt="A violet artwork with a white border inside a lilac frame"
          eyebrow="Optional"
          title="Borders"
        >
          <p>
            If you would like your image to be printed out with borders of your desired thickness,
            please include them in your file.
          </p>
          <Note>
            It is important to place the borders inside your chosen print area. If you were to add
            the borders on the outside of your image, it would change the height and width of your
            file.
          </Note>
        </Split>

        <Split
          id="flatten"
          image="flatten-image"
          alt="The Photoshop Layer menu with Flatten Image selected"
          eyebrow="Merge layers"
          title="Flatten your image"
          flip
        >
          <p>
            As you get closer to exporting your file it is important to remember to flatten your
            image by merging all the layers. To do so, in Photoshop click Layer ➔ Flatten your
            image.
          </p>
          <Note>Please make sure that you have deleted all paths, masks and alpha channels.</Note>
        </Split>

        <Split
          id="raster-export"
          image="raster-export"
          alt="The Photoshop TIFF Options dialog with no image compression selected"
          eyebrow="Photoshop"
          title="Raster file export"
        >
          <p>
            In Photoshop, please set your Color Mode to <strong>RGB Color</strong> at{" "}
            <strong>8 Bits/Channel</strong> (Image ➔ Mode) and set your Color Profile to{" "}
            <strong>sRGB</strong> or <strong>Adobe RGB (1998)</strong> (Edit ➔ Color Settings).
          </p>
          <p>
            Save your image as a <strong>TIFF</strong> file with <strong>no compression</strong>{" "}
            (File ➔ Save As).
          </p>
        </Split>

        <Split
          id="vector-export"
          image="vector-export"
          alt="The Illustrator TIFF Options dialog over a red and cream pattern"
          eyebrow="Illustrator"
          title="Vector file export"
          flip
        >
          <p>
            If your file is vector-based created in Illustrator, please make sure that your vector
            file is in the Color Mode <strong>RGB Color</strong> (File ➔ Document Color Mode) and
            your Color Profile is set to <strong>sRGB</strong> or <strong>Adobe RGB (1998)</strong>{" "}
            (Edit ➔ Color Settings).
          </p>
          <p>
            Then export it as a raster <strong>TIFF</strong> file in{" "}
            <strong>300 PPI</strong>. You can do this by clicking File ➔ Export ➔ Export As.
          </p>
        </Split>
      </Guide>

      <ContactBlock />
      <ContactCta />
      <Promos />
    </Sheet>
  );
}
