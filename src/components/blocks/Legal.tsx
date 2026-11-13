import Link from "next/link";
import { lastUpdated, type LegalItem, type LegalSection } from "@/content/legal";
import { studio } from "@/lib/site";
import { Sheet } from "./Text";

/** Renders [Label](href) links inside legal text. */
function Inline({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!link) return part;
    const [, label, href] = link;
    if (href.startsWith("/")) {
      return (
        <Link className="inline" key={i} href={href}>
          {label}
        </Link>
      );
    }
    return (
      <a
        className="inline"
        key={i}
        href={href}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {label}
      </a>
    );
  });
}

function Items({ section, number }: { section: LegalSection; number: number }) {
  let clause = 0;
  return section.items.map((item: LegalItem, i) => {
    if (Array.isArray(item)) {
      return (
        <ul className="legal__list" key={i}>
          {item.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      );
    }
    if (typeof item !== "string") {
      return (
        <blockquote className="legal__quote" key={i}>
          {item.quote.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>
      );
    }
    clause += 1;
    return (
      <p className="legal__clause" key={i}>
        <span>
          {number}.{clause}
        </span>
        <span>
          <Inline text={item} />
        </span>
      </p>
    );
  });
}

export function Legal({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <Sheet ink="legal">
      <div className="legal">
        <h1 className="h-lg">{title}</h1>
        <p className="label">{studio.name}. Last updated {lastUpdated}.</p>
        <p className="legal__intro">{intro}</p>
        {sections.map((section, i) => (
          <section key={section.heading}>
            <h2>
              {i + 1}. {section.heading}
            </h2>
            <Items section={section} number={i + 1} />
          </section>
        ))}
      </div>
    </Sheet>
  );
}
