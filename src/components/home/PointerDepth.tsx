"use client";

import { useEffect } from "react";

/** Feeds the pointer into --mx/--my so the layers of the print sit at different depths. */
export function PointerDepth({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target);
    if (
      !el ||
      !matchMedia("(hover: hover)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let x = 0;
    let y = 0;
    let goalX = 0;
    let goalY = 0;
    let frame = 0;
    const tick = () => {
      x += (goalX - x) * 0.07;
      y += (goalY - y) * 0.07;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      frame =
        Math.abs(goalX - x) + Math.abs(goalY - y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      goalX = (event.clientX / window.innerWidth) * 2 - 1;
      goalY = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [target]);

  return null;
}
