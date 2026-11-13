import Link from "next/link";
import { contactHref } from "@/lib/site";

const standards = [
  { label: "AI file approval", href: "#ai-approval" },
  { label: "Museum quality printing", href: "/giclee-printing" },
  { label: "Personal studio care", href: contactHref() },
];

export function StudioStandards() {
  return (
    <nav className="standards" aria-label="Our printing standard">
      <ul role="list">
        {standards.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>
              <span className="brand-accent" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
