"use client";

import { useEffect } from "react";

type Engine = { scan: () => void };

let engine: Engine | null = null;

/**
 * One set of observers for the whole site.
 * [data-reveal] gets .is-in when it enters the sheet; a print waits for its
 * image, so the head never passes over nothing.
 * [data-scroll] gets --p, its 0 to 1 progress through the viewport.
 */
function start(): Engine {
  const show = (el: Element) => {
    const image = el.classList.contains("print") ? el.querySelector("img") : null;
    const go = () => el.classList.add("is-in");
    if (!image || image.complete) {
      go();
      return;
    }
    image.addEventListener("load", go, { once: true });
    image.addEventListener("error", go, { once: true });
    window.setTimeout(go, 2000);
  };

  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        reveal.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.03 },
  );

  const active = new Set<HTMLElement>();
  let frame = 0;
  const update = () => {
    frame = 0;
    const height = window.innerHeight;
    active.forEach((el) => {
      const box = el.getBoundingClientRect();
      const p = (height - box.top) / (height + box.height);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    });
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const near = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) active.add(el);
        else active.delete(el);
      }
      schedule();
    },
    { rootMargin: "25% 0px" },
  );

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  const seen = new WeakSet<Element>();
  return {
    scan() {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        reveal.observe(el);
      });
      document.querySelectorAll("[data-scroll]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        near.observe(el);
      });
    },
  };
}

/** Rendered last inside each page, so it only runs once that page has hydrated. */
export function Motion() {
  useEffect(() => {
    engine ??= start();
    engine.scan();
  }, []);

  return null;
}
