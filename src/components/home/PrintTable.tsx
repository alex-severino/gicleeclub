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

/** A table of real prints you can pick up and move around. */
export function PrintTable({ children }: { children: ReactNode }) {
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = board.current;
    if (!root) return;
    type Sheet = { x: number; y: number; r: number; vx: number; vy: number };
    const sheets = new Map<HTMLElement, Sheet>();
    root.querySelectorAll<HTMLElement>(".lay-print").forEach((el) => {
      sheets.set(el, { x: 0, y: 0, r: Number(el.dataset.r), vx: 0, vy: 0 });
    });
    const place = (el: HTMLElement, s: Sheet) => {
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
    };
    sheets.forEach((sheet, el) => place(el, sheet));

    let top = 10;
    let held: HTMLElement | null = null;
    let frame = 0;

    const glide = () => {
      let moving = false;
      sheets.forEach((s, el) => {
        if (el === held || (Math.abs(s.vx) < 0.1 && Math.abs(s.vy) < 0.1)) return;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.9;
        s.vy *= 0.9;
        place(el, s);
        moving = true;
      });
      frame = moving ? requestAnimationFrame(glide) : 0;
    };

    const down = (event: PointerEvent) => {
      const el = (event.target as Element).closest<HTMLElement>(".lay-print");
      if (!el) return;
      event.preventDefault();
      held = el;
      el.setPointerCapture(event.pointerId);
      el.dataset.held = "";
      el.style.zIndex = String((top += 1));
      const s = sheets.get(el);
      if (s) {
        s.vx = 0;
        s.vy = 0;
      }
    };
    const move = (event: PointerEvent) => {
      if (!held) return;
      const s = sheets.get(held);
      if (!s) return;
      s.x += event.movementX;
      s.y += event.movementY;
      s.vx = event.movementX * 0.8;
      s.vy = event.movementY * 0.8;
      // Dragging by a corner swings the sheet a little.
      s.r += event.movementX * 0.035;
      place(held, s);
    };
    const up = () => {
      if (!held) return;
      delete held.dataset.held;
      const released = held;
      held = null;
      const box = root.getBoundingClientRect();
      const s = sheets.get(released);
      const area = released.getBoundingClientRect();
      if (s) {
        // Nothing gets lost off the edge of the table.
        if (area.right < box.left + 60) s.vx = 12;
        if (area.left > box.right - 60) s.vx = -12;
        if (area.bottom < box.top + 60) s.vy = 12;
        if (area.top > box.bottom - 60) s.vy = -12;
      }
      if (!frame) frame = requestAnimationFrame(glide);
    };

    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section className="board" ref={board} data-ink="order">
      <div className="board__prints">
        {prints.map((print) => (
          <figure
            key={print.src}
            className="lay-print"
            data-r={print.r}
            style={
              {
                left: `${print.x}%`,
                top: `${print.y}%`,
                "--w": print.width,
                transform: `rotate(${print.r}deg)`,
              } as CSSProperties
            }
          >
            <Image
              src={`/art/${print.src}.jpg`}
              alt={`Artwork by ${print.name}`}
              width={print.w}
              height={print.h}
              sizes="(max-width: 760px) 36vw, 22vw"
              draggable={false}
            />
            <figcaption>Art by {print.name}</figcaption>
          </figure>
        ))}
      </div>
      {children}
    </section>
  );
}
