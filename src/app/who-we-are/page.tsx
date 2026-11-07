import type { Metadata } from "next";
import { Bleed } from "@/components/blocks/Bleed";
import { Action } from "@/components/blocks/Action";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { Hero } from "@/components/blocks/Hero";
import { Split } from "@/components/blocks/Split";
import { Sheet, Statement } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Giclée Club is a London print house making museum quality Giclée prints for anyone — family photographs, posters, paintings, illustration and graphic design — and sending them worldwide.",
};

export default function WhoWeArePage() {
  return (
    <Sheet ink="people">
      <Hero
        name="who-we-are"
        alt="A colour field of violet stripes and tilted bars from the Giclée Club brand"
        eyebrow="Who we are"
        title={["A print house", "for anyone"]}
      >
        <p>
          Giclée Club is a family print studio in London. We make museum quality Giclée prints for
          anyone who wants something worth keeping — a family photograph, a favourite poster, a
          painting, a piece of illustration or graphic design.
        </p>
      </Hero>

      <Statement title="Our vision" align="start">
        <p>
          Museum quality printing has spent too long behind gallery doors. We started Giclée Club so
          that the same standard a museum would ask for is open to anyone: a family printing a
          photograph, someone who found a poster they love, a designer sending work to a client, a
          painter who wants a faithful sheet of their original.
        </p>
        <p>
          A Giclée print is not a disposable copy. Pigment inks on acid-free Hahnemühle paper are
          made to last more than a hundred years. The thing on your wall should still look like
          itself when the file on your computer is long forgotten. That is the whole point of the
          papers, the printers and the slow, checked process.
        </p>
        <p>
          We want the jump from screen to paper to feel like a gain, not a compromise. Colour that
          holds. Blacks that sit in the sheet. A surface with a grain you can see when the light
          moves. Digital work becoming an object in a room — part of a house, a gift, a collection —
          instead of something that only lives on a phone.
        </p>
        <p>
          Nothing is sold through a basket on this site. You write to us. Your file is read by our
          approval system before it ever reaches a printer. If it is not ready, we tell you. If it
          is, we print it in London, pack it as if it were our own, and send it wherever you are. A
          small order is treated with the same care as a large one.
        </p>
        <p>
          The long view is a print house that treats a family photograph with the same seriousness as
          a limited edition. A studio you can visit. Frames painted by hand, so a print can arrive
          ready to hang. Packaging you can put your name on. And, in time, a place where people can
          see work on the wall, talk about paper, and leave with something they will keep.
        </p>
      </Statement>

      <Split
        image="photo-rag"
        alt="A sheet of Hahnemühle Photo Rag with a visible paper grain"
        eyebrow="The same standard"
        title="Whoever you are printing for"
      >
        <p>
          Illustration, graphic design, photography, painting and mixed work all go through the same
          printers, the same archival papers and the same file check. We do not keep a lesser
          process for “everyday” prints.
        </p>
        <p>
          If you want a photograph of your family to last, it deserves the paper a gallery would use.
          If you want a poster on the wall, it deserves pigment that will not fade in the first
          decade of sunlight.
        </p>
      </Split>

      <Split
        image="studio-6"
        alt="Gloved hands lifting a Giclée print of Sunrises off the cutting table"
        eyebrow="From a file to a thing"
        title="Made to be held"
        credit="Art by Posteress"
        flip
      >
        <p>
          We are here for the moment a digital image becomes physical: trimmed, sleeved, sometimes
          framed in a Farrow &amp; Ball colour, packed with gloves and tissue, and sent out as an
          object rather than a download.
        </p>
        <p>
          That object should be able to hang for a lifetime. Certificates, holograms and careful
          packing exist so the print is still itself when it arrives, and still itself years later.
        </p>
      </Split>

      <Split
        image="gloves"
        alt="White cotton handling gloves beside a cardboard print tube"
        eyebrow="London, then anywhere"
        title="A conversation, then a print"
      >
        <p>
          Orders start as a message, not a checkout. We confirm the file, the paper, the size and
          the price with you. Then we print under one roof in London and deliver worldwide.
        </p>
        <p>
          The studio is small on purpose. You can write, you can visit, and you can ask for a
          personal note, a branded sticker or a painted frame. The aim is a print house you can
          actually reach — and a standard that does not drop when the order is one sheet.
        </p>
      </Split>

      <Bleed image="studio" alt="The studio, with prints on the wall and copper pendant lights">
        <p className="eyebrow">London</p>
        <h2 className="h-md">Our studio</h2>
        <p style={{ marginTop: "0.8rem" }}>Everything under one roof</p>
        <Action href="/our-print-studio" label="Learn more" />
      </Bleed>

      <ContactBlock />
    </Sheet>
  );
}
