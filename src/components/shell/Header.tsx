"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Logo } from "@/components/Logo";
import { nav, routeFor, type NavSection } from "@/lib/site";
import { HomeLink } from "./HomeLink";

const groups = nav.filter((item) => "sections" in item);

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const ink = routeFor(pathname).ink;

  const [open, setOpen] = useState<string | null>(null);
  const [shown, setShown] = useState<string>(groups[0].label);
  const [preview, setPreview] = useState(groups[0].sections[0].items[0].href);
  const [drawer, setDrawer] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const closing = useRef<number | undefined>(undefined);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  // A new page closes whatever menu led there.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setDrawer(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 420);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        setDrawer(false);
        trigger.current?.focus();
        trigger.current = null;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const show = (label: string) => {
    window.clearTimeout(closing.current);
    if (label !== shown) {
      const group = groups.find((item) => item.label === label);
      if (group) setPreview(group.sections[0].items[0].href);
    }
    setShown(label);
    setOpen(label);
  };
  const scheduleClose = () => {
    closing.current = window.setTimeout(() => setOpen(null), 170);
  };
  const onTrigger = (event: MouseEvent<HTMLButtonElement>, label: string) => {
    // A mouse already opened it on hover; keyboards and touch toggle.
    const { pointerType } = event.nativeEvent as PointerEvent;
    if (pointerType === "mouse") return;
    if (open === label) {
      setOpen(null);
      return;
    }
    show(label);
    if (!pointerType) {
      trigger.current = event.currentTarget;
      requestAnimationFrame(() => panel.current?.querySelector("a")?.focus());
    }
  };

  const group = nav.find((item) => item.label === shown);
  const sections: NavSection[] = group && "sections" in group ? group.sections : [];
  const links = sections.flatMap((section) => section.items);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="scrim" data-open={open ? "" : undefined} aria-hidden="true" />
      <header
        className="site-header"
        data-ink={ink}
        data-solid={solid ? "" : undefined}
        data-hidden={hidden && !open && !drawer ? "" : undefined}
        data-open={open ? "" : undefined}
        data-drawer={drawer ? "" : undefined}
        onMouseLeave={scheduleClose}
        onMouseEnter={() => window.clearTimeout(closing.current)}
      >
        <div className="bar">
          <HomeLink>
            <Logo />
          </HomeLink>

          <nav className="primary" aria-label="Main">
            {nav.map((item) =>
              "sections" in item ? (
                <button
                  key={item.label}
                  type="button"
                  className="primary__item"
                  aria-expanded={open === item.label}
                  aria-controls="menu-panel"
                  onPointerEnter={(e) => e.pointerType === "mouse" && show(item.label)}
                  onClick={(e) => onTrigger(e, item.label)}
                >
                  {item.label}
                  <Chevron />
                </button>
              ) : (
                <Link
                  key={item.label}
                  className="primary__item"
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onPointerEnter={() => setOpen(null)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <button
            type="button"
            className="burger"
            aria-label={drawer ? "Close menu" : "Open menu"}
            aria-expanded={drawer}
            onClick={() => setDrawer((value) => !value)}
          >
            <i />
            <i />
          </button>
        </div>

        <div className="mega" id="menu-panel" ref={panel} data-open={open ? "" : undefined}>
          <div className="mega__grid" data-grouped={sections.length > 1 ? "" : undefined}>
            <div className="mega__links">
              {sections.map((section, index) => (
                <div
                  key={section.label ?? index}
                  className="mega__section"
                  role={section.label ? "group" : undefined}
                  aria-label={section.label}
                >
                  {section.label && <p className="menu-section-title">{section.label}</p>}
                  {section.items.map((link) => (
                    <Link
                      key={link.href}
                      className="mega__link"
                      href={link.href}
                      data-active={preview === link.href ? "" : undefined}
                      onPointerEnter={() => setPreview(link.href)}
                      onFocus={() => setPreview(link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="mega__preview" aria-hidden="true">
              {open &&
                links.map((link) => (
                  <Image
                    key={link.href}
                    src={link.image}
                    alt=""
                    fill
                    sizes="28rem"
                    loading="eager"
                    data-active={preview === link.href ? "" : undefined}
                  />
                ))}
            </div>
          </div>
        </div>
      </header>

      <div className="drawer" data-ink={ink} data-open={drawer ? "" : undefined}>
        {nav.map((item) =>
          "sections" in item ? (
            <details key={item.label}>
              <summary className="drawer__item">{item.label}</summary>
              <div className="drawer__sub">
                {item.sections.map((section, index) => (
                  <div
                    key={section.label ?? index}
                    className="drawer__section"
                    role={section.label ? "group" : undefined}
                    aria-label={section.label}
                  >
                    {section.label && <p className="menu-section-title">{section.label}</p>}
                    {section.items.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          ) : (
            <Link key={item.label} className="drawer__item" href={item.href}>
              {item.label}
            </Link>
          ),
        )}
      </div>
    </>
  );
}
