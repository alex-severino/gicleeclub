import Link from "next/link";
import { contactHref } from "@/lib/site";

const standards: { label: string; href: string; scrollTarget?: string }[] = [
  { label: "AI file approval", href: "/", scrollTarget: "ai-approval" },
  { label: "Museum quality printing", href: "/giclee-printing" },
  { label: "Personal studio care", href: contactHref() },
];

export function StudioStandards() {
  return (
    <nav className="standards" aria-label="Our printing standard">
      <ul role="list">
        {standards.map(({ label, href, scrollTarget }) => (
          <li key={label}>
            <Link href={href} data-scroll-target={scrollTarget}>
              <span className="brand-accent" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
