"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routeFor } from "@/lib/site";

const COVER_MS = 640;
const REVEAL_MS = 860;
const GIVE_UP_MS = 8000;
const BARS = Array.from({ length: 9 }, (_, i) => i);

type Phase = "idle" | "cover" | "reveal";

/** Internal links sweep the sheet with ribbons of the destination's ink. */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [destination, setDestination] = useState(() => routeFor(pathname));
  const target = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const anchor = (event.target as Element).closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (target.current) return;

      // Hold the navigation until the sheet is covered.
      event.preventDefault();
      event.stopPropagation();
      const href = url.pathname + url.search + url.hash;
      target.current = url.pathname;
      router.prefetch(href);
      setDestination(routeFor(url.pathname));
      setPhase("cover");
      window.setTimeout(() => router.push(href), COVER_MS);
      // If the page never arrives, uncover the one we are on.
      window.setTimeout(() => {
        if (target.current !== url.pathname) return;
        target.current = null;
        setPhase("reveal");
        window.setTimeout(() => setPhase("idle"), REVEAL_MS);
      }, GIVE_UP_MS);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    if (target.current !== pathname) return;
    target.current = null;
    const reveal = window.setTimeout(() => setPhase("reveal"), 90);
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
