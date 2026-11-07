"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Logo } from "@/components/Logo";
import { CurrencySelect } from "@/components/shell/CurrencySelect";
import { nav, routeFor, type NavLink } from "@/lib/site";

const groups = nav.filter((item) => "items" in item);

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
  const [preview, setPreview] = useState(0);
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
    if (label !== shown) setPreview(0);
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
  const links: NavLink[] = group && "items" in group ? group.items : [];

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
          <Link href="/" aria-label="Giclée Club, home">
            <Logo />
          </Link>

          <nav className="primary" aria-label="Main">
            {nav.map((item) =>
              "items" in item ? (
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
            <CurrencySelect />
            <Link className="contact-btn" href="/contact-us" onPointerEnter={() => setOpen(null)}>
              Contact us
            </Link>
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
          <div className="mega__grid">
            <div className="mega__links">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  className="mega__link"
                  href={link.href}
                  data-active={preview === index ? "" : undefined}
                  onPointerEnter={() => setPreview(index)}
                  onFocus={() => setPreview(index)}
                >
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mega__preview" aria-hidden="true">
              {open &&
                links.map((link, index) => (
                  <Image
                    key={link.href}
                    src={link.image}
                    alt=""
                    fill
                    sizes="28rem"
                    loading="eager"
                    data-active={preview === index ? "" : undefined}
                  />
                ))}
            </div>
          </div>
        </div>
      </header>

      <div className="drawer" data-ink={ink} data-open={drawer ? "" : undefined}>
        {nav.map((item) =>
          "items" in item ? (
            <details key={item.label}>
              <summary className="drawer__item">{item.label}</summary>
              <div className="drawer__sub">
                {item.items.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <Link key={item.label} className="drawer__item" href={item.href}>
              {item.label}
            </Link>
          ),
        )}
        <Link className="btn btn--pink" href="/contact-us" style={{ marginTop: "1.6rem" }}>
          Contact us
        </Link>
        <div style={{ marginTop: "1rem" }}>
          <CurrencySelect />
        </div>
      </div>
    </>
  );
}
