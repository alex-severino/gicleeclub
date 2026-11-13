import Link from "next/link";

export type ActionProps = {
  href: string;
  label: string;
  kind?: "ghost" | "pink";
  download?: boolean;
  scrollTarget?: string;
};

/** The one button on the site. Files and outside links stay plain anchors. */
export function Action({ href, label, kind, download, scrollTarget }: ActionProps) {
  const className = kind ? `btn btn--${kind}` : "btn";
  if (download) {
    return (
      <a className={className} href={href} download>
        {label}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link className={className} href={href} data-scroll-target={scrollTarget}>
      {label}
    </Link>
  );
}
