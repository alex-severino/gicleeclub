import type { Metadata } from "next";
import { Bleed } from "@/components/blocks/Bleed";
import { Action } from "@/components/blocks/Action";
import { ContactBlock } from "@/components/blocks/ContactBlock";
import { Hero } from "@/components/blocks/Hero";
import { Print } from "@/components/blocks/Print";
import { Sheet, Statement } from "@/components/blocks/Text";

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Giclée Club is a London-based family business run by visual artist and graphic designer Angelina Severino and music artist Alex Severino.",
};

export default function WhoWeArePage() {
  return (
    <Sheet ink="people">
      <Hero
        name="who-we-are"
        alt="Angelina and Alex Severino, the founders of Giclée Club"
        eyebrow="We are"
        title={["Artists who print", "for artists"]}
        credit="Photo by Daniel Anohin"
      >
        <p>
          Giclée Club is a London-based family business run by visual artist and graphic designer
          Angelina Severino and music artist Alex Severino.
        </p>
      </Hero>

      <Statement title="Our vision">
        Giclée Club was born from the will to provide visual artists with a global, affordable and
        easy-to-use Giclée printing service that meets the highest world standards of museum quality
        printing.
      </Statement>

      <section className="bio">
        <div className="bio__art">
          <Print
            src="/media/section/angelina.png"
            alt="Portrait of Angelina Severino"
            credit="Photo by Daniel Anohin"
          />
        </div>
        <div className="bio__text" data-reveal="rise">
          <h2 className="h-lg">Angelina</h2>
          <p>
            When I began my artistic career I used to have my art printed in different places but I
            was never totally satisfied with the results. Either the quality of the prints were not
            great or they were not packed carefully enough. Also I could never add a personal touch
            like a note or a letter to my client. It made me think that probably many other artists
            have the same problem and that is how the idea of a Giclée printing studio came to life.
          </p>
          <p>
            After more than 15 years of industry experience as a professional graphic and product
            designer, I have a strong wish to provide artists with an easy, hassle-free process of
            ordering their top-of-the-world quality prints and sending them to the destination of
            their choice with an added personal touch.
          </p>
          <p>
            I enjoy the magic of a digital art piece materialising through a special machine on
            amazing, top-of-the-world quality paper.
          </p>
          <p>
            To see digital art take physical shape is something I truly take pleasure from – it is
            when art becomes part of your house, your everyday life and starts to exist both in the
            digital and physical worlds.
          </p>
          <p>
            <a className="inline" href="https://www.posteress.com" target="_blank" rel="noreferrer">
              www.posteress.com
            </a>
            <br />
            <a
              className="inline"
              href="https://www.instagram.com/theposteress/"
              target="_blank"
              rel="noreferrer"
            >
              @theposteress
            </a>
          </p>
        </div>
      </section>

      <section className="bio bio--flip">
        <div className="bio__art">
          <Print
            src="/media/section/alex.png"
            alt="Portrait of Alex Severino"
            credit="Photo by Daniel Anohin"
          />
        </div>
        <div className="bio__text" data-reveal="rise">
          <h2 className="h-lg">Alex</h2>
          <p>
            For me, Giclée Club started with a conversation at a café in the centre of Vilnius in
            Lithuania. Angelina was telling me about the difficulties of printing, exposing art and
            of her wish to help other artists with these obstacles.
          </p>
          <p>
            She told me many of her ideas for the future, like for example turning Giclée Club into a
            physical space, where artists can exhibit and sell their art, and also have a cup of good
            coffee.
          </p>
          <p>
            I have always had a love for the visual arts. One way or another they keep finding their
            way into my life. And now, I find myself contributing to this world by providing
            technical and customer support to our print house. My wish is to help artists all around
            the world to bridge any difficulties they may encounter with printing their art.
          </p>
        </div>
      </section>

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
