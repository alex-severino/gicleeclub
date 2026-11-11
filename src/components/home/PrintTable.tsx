"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** x, y and width are percentages of the table. */
const prints = [
  { src: "magicpattern", w: 825, h: 1100, name: "MagicPattern", x: 3, y: 5, width: 13.5, r: 7 },
  { src: "posteress", w: 770, h: 1100, name: "Posteress", x: 19, y: 3, width: 13, r: -7 },
  { src: "ryan-stone", w: 1100, h: 716, name: "Ryan Stone", x: 34, y: 7, width: 21, r: -12 },
  { src: "prince-akachi", w: 733, h: 1100, name: "Prince Akachi", x: 56, y: 12, width: 15, r: 8 },
  { src: "akira-hojo", w: 732, h: 1100, name: "Akira Hojo", x: 75, y: 2, width: 14, r: 12 },
  { src: "zak", w: 733, h: 1100, name: "Zak", x: 88, y: 34, width: 11.5, r: -9 },
  { src: "audubon", w: 727, h: 1100, name: "John James Audubon", x: 40, y: 41, width: 13.5, r: -13 },
  { src: "photo-boards", w: 1100, h: 732, name: "Photo Boards", x: 66, y: 58, width: 21, r: -6 },
  { src: "sharon-mccutcheon", w: 1100, h: 733, name: "Sharon McCutcheon", x: 51, y: 71, width: 16, r: 9 },
  { src: "steve-johnson", w: 869, h: 1100, name: "Steve Johnson", x: 37, y: 69, width: 12, r: 11 },
];

/** Real prints to move, with a short demonstration when the table first appears. */
export function PrintTable({ children }: { children: ReactNode }) {
  const board = useRef<HTMLElement>(null);
  const reset = useRef<(() => void) | null>(null);

  useEffect(() => {
    const root = board.current;
    if (!root) return;
    type Sheet = { x: number; y: number; r: number; vx: number; vy: number; originalR: number };
    const sheets = new Map<HTMLElement, Sheet>();
    root.querySelectorAll<HTMLElement>(".lay-print").forEach((el) => {
      const r = Number(el.dataset.r);
      sheets.set(el, { x: 0, y: 0, r, vx: 0, vy: 0, originalR: r });
    });
    const place = (el: HTMLElement, s: Sheet) => {
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
    };
    sheets.forEach((sheet, el) => place(el, sheet));

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let top = 10;
    let held: HTMLElement | null = null;
    let pointer: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let frame = 0;
    let demoFrame = 0;
    let demoPlayed = false;
    let disposed = false;
    const first = [...sheets.keys()][0];

    const stopDemo = () => {
      cancelAnimationFrame(demoFrame);
      demoFrame = 0;
      first?.removeAttribute("data-demo");
      delete root.dataset.demoActive;
    };
    const interact = () => {
      stopDemo();
      root.dataset.interacted = "";
    };
    const contain = (el: HTMLElement, s: Sheet) => {
      const box = root.getBoundingClientRect();
      const area = el.getBoundingClientRect();
      const reach = 48;
      const dx = Math.max(0, box.left + reach - area.right) - Math.max(0, area.left - box.right + reach);
      const dy = Math.max(0, box.top + reach - area.bottom) - Math.max(0, area.top - box.bottom + reach);
      if (dx) { s.x += dx; s.vx = 0; }
      if (dy) { s.y += dy; s.vy = 0; }
      if (dx || dy) place(el, s);
    };
    const glide = () => {
      let moving = false;
      sheets.forEach((s, el) => {
        if (el === held || (Math.abs(s.vx) < 0.1 && Math.abs(s.vy) < 0.1)) return;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.9;
        s.vy *= 0.9;
        place(el, s);
        contain(el, s);
        moving = true;
      });
      frame = moving ? requestAnimationFrame(glide) : 0;
    };

    const down = (event: PointerEvent) => {
      const el = (event.target as Element).closest<HTMLElement>(".lay-print");
      if (!el || held || event.button !== 0) return;
      event.preventDefault();
      interact();
      held = el;
      pointer = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
      el.setPointerCapture(event.pointerId);
      el.dataset.held = "";
      el.style.zIndex = String(++top);
      const s = sheets.get(el)!;
      s.vx = s.vy = 0;
    };
    const move = (event: PointerEvent) => {
      if (!held || event.pointerId !== pointer) return;
      const s = sheets.get(held)!;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      s.x += dx;
      s.y += dy;
      s.vx = reduced.matches ? 0 : dx * 0.5;
      s.vy = reduced.matches ? 0 : dy * 0.5;
      s.r = Math.max(s.originalR - 15, Math.min(s.originalR + 15, s.r + dx * 0.025));
      place(held, s);
      contain(held, s);
    };
    const up = (event: PointerEvent) => {
      if (!held || event.pointerId !== pointer) return;
      const el = held;
      held = null;
      pointer = null;
      delete el.dataset.held;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      if (!frame) frame = requestAnimationFrame(glide);
    };
    const keydown = (event: KeyboardEvent) => {
      const el = (event.target as Element).closest<HTMLElement>(".lay-print");
      if (!el || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      interact();
      const s = sheets.get(el)!;
      const step = event.shiftKey ? 30 : 10;
      s.x += event.key === "ArrowLeft" ? -step : event.key === "ArrowRight" ? step : 0;
      s.y += event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0;
      s.vx = s.vy = 0;
      el.style.zIndex = String(++top);
      place(el, s);
      contain(el, s);
    };

    const demonstrate = () => {
      if (disposed || demoPlayed || reduced.matches || root.hasAttribute("data-interacted") || !first) return;
      demoPlayed = true;
      const s = sheets.get(first)!;
      first.dataset.demo = "";
      root.dataset.demoActive = "";
      let start = 0;
      const show = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / 2400);
        const lift = Math.sin(progress * Math.PI) ** 2;
        s.x = 42 * lift;
        s.y = -18 * lift;
        s.r = s.originalR - 4 * lift;
        place(first, s);
        if (progress < 1) demoFrame = requestAnimationFrame(show);
        else stopDemo();
      };
      demoFrame = requestAnimationFrame(show);
    };
    const firstImage = first?.querySelector("img");
    const watcher = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!firstImage || firstImage.complete) demonstrate();
      else firstImage.addEventListener("load", demonstrate, { once: true });
    }, { threshold: 0.25 });
    watcher.observe(root);
    reduced.addEventListener("change", stopDemo);

    reset.current = () => {
      interact();
      cancelAnimationFrame(frame);
      frame = 0;
      sheets.forEach((s, el) => {
        s.x = s.y = s.vx = s.vy = 0;
        s.r = s.originalR;
        el.style.zIndex = "";
        place(el, s);
      });
    };
    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("lostpointercapture", up);
    root.addEventListener("keydown", keydown);
    root.addEventListener("focusin", stopDemo);
    return () => {
      disposed = true;
      stopDemo();
      cancelAnimationFrame(frame);
      watcher.disconnect();
      firstImage?.removeEventListener("load", demonstrate);
      reduced.removeEventListener("change", stopDemo);
      reset.current = null;
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      root.removeEventListener("lostpointercapture", up);
      root.removeEventListener("keydown", keydown);
      root.removeEventListener("focusin", stopDemo);
    };
  }, []);

  return (
    <section className="board" ref={board} data-ink="contact" aria-label="Explore the artwork on our print table">
      <p className="board__hint" aria-hidden="true">
        <svg viewBox="0 0 32 24" fill="none">
          <path d="M4 12h24M9 7l-5 5 5 5M23 7l5 5-5 5" stroke="currentColor" strokeWidth="2" />
        </svg>
        Drag a print. Make yourself at home.
      </p>
      <p className="sr-only" id="print-table-instructions">
        Drag the artworks to rearrange them. You can also focus a print and use the arrow keys to move it.
      </p>
      <div className="board__prints">
        {prints.map((print) => (
          <figure
            key={print.src}
            className="lay-print"
            data-r={print.r}
            tabIndex={0}
            aria-label={`Print by ${print.name}`}
            aria-describedby="print-table-instructions"
            style={{
              left: `${print.x}%`,
              top: `${print.y}%`,
              "--w": print.width,
              transform: `rotate(${print.r}deg)`,
            } as CSSProperties}
          >
            <Image
              src={`/art/${print.src}.jpg`}
              alt={`Artwork by ${print.name}`}
              width={print.w}
              height={print.h}
              sizes="(max-width: 760px) 32vw, 22vw"
              draggable={false}
            />
            <figcaption>Art by {print.name}</figcaption>
          </figure>
        ))}
      </div>
      {children}
      <button type="button" className="board__reset" onClick={() => reset.current?.()}>
        Reset prints <span aria-hidden="true">↺</span>
      </button>
    </section>
  );
}
