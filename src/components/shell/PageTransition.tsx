"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routeFor } from "@/lib/site";

const COVER_MS = 640;
const REVEAL_MS = 860;
const GIVE_UP_MS = 8000;
const BARS = Array.from({ length: 9 }, (_, i) => i);

type Phase = "idle" | "cover" | "reveal";

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  section.scrollIntoView({ block: "start" });
  if (!section.hasAttribute("tabindex")) section.tabIndex = -1;
  section.focus({ preventScroll: true });
}

/** Internal links sweep the sheet with ribbons of the destination's ink. */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [destination, setDestination] = useState(() => routeFor(pathname));
  const target = useRef<string | null>(null);
  const scrollTarget = useRef<string | null>(null);

  useEffect(() => {
    const clearHash = () => {
      if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    };
    clearHash();
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element).closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin) return;
      const section = anchor.dataset.scrollTarget;
      if (url.pathname === location.pathname) {
        if (section) {
          event.preventDefault();
          event.stopPropagation();
          scrollToSection(section);
        }
        return;
      }
      const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion && !section) return;
      if (target.current) return;

      // Hold the navigation until the sheet is covered.
      event.preventDefault();
      event.stopPropagation();
      const href = url.pathname + url.search;
      target.current = url.pathname;
      scrollTarget.current = section ?? null;
      router.prefetch(href);
      if (reducedMotion) {
        router.push(href, { scroll: !section });
        return;
      }
      setDestination(routeFor(url.pathname));
      setPhase("cover");
      window.setTimeout(() => router.push(href, { scroll: !section }), COVER_MS);
      // If the page never arrives, uncover the one we are on.
      window.setTimeout(() => {
        if (target.current !== url.pathname) return;
        target.current = null;
        scrollTarget.current = null;
        setPhase("reveal");
        window.setTimeout(() => setPhase("idle"), REVEAL_MS);
      }, GIVE_UP_MS);
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", clearHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", clearHash);
    };
  }, [router]);

  useEffect(() => {
    if (target.current !== pathname) return;
    target.current = null;
    const reveal = window.setTimeout(() => {
      if (scrollTarget.current) {
        scrollToSection(scrollTarget.current);
        scrollTarget.current = null;
      }
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setPhase("reveal");
    }, 90);
    const rest = window.setTimeout(() => setPhase("idle"), 90 + REVEAL_MS);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(rest);
    };
  }, [pathname]);

  return (
    <div className="wipe" data-phase={phase} data-ink={destination.ink} aria-hidden="true">
      <div className="wipe__rig">
        {BARS.map((i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="wipe__title">{destination.title}</div>
    </div>
  );
}
