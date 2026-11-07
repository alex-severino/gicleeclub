import type { LegalSection } from "@/content/legal";
import { Sheet } from "./Text";

export function Legal({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <Sheet ink="legal">
      <div className="legal">
        <h1 className="h-lg">{title}</h1>
        {sections.map((section, i) => (
          <section key={`${section.heading}-${i}`}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>
        ))}
      </div>
    </Sheet>
  );
}
