"use client";

import { useEffect, useRef } from "react";

/** Small seeded generator, so a repaint on resize lands the same droplets. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const parse = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function ramp(stops: number[][], t: number) {
  const scaled = Math.min(0.999, Math.max(0, t)) * (stops.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  return stops[i].map((c, k) => c + (stops[i + 1][k] - c) * f);
}

/**
 * Gicler, to spray. The words are sprayed through a stencil: droplets of pigment
 * build up behind the letterforms, the nozzle sweeping left to right and
 * running out of ink as it goes, with overspray settling around the edges.
 */
export function SprayType({
  text,
  colors,
  className,
}: {
  text: string | string[];
  colors: string[];
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const out = canvas.getContext("2d");
    if (!out) return;
    const lines = (Array.isArray(text) ? text : [text]).map((line) => line.toUpperCase());
    const stops = colors.map(parse);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let played = false;

    const paint = async (animate: boolean) => {
      cancelAnimationFrame(frame);
      const family = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-krona")
        .trim();
      await document.fonts.load(`100px ${family}`);
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.round(canvas.clientWidth * scale);
      const H = Math.round(canvas.clientHeight * scale);
      if (!W || !H) return;
      canvas.width = W;
      canvas.height = H;

      const layer = () => {
        const c = document.createElement("canvas");
        c.width = W;
        c.height = H;
        return c;
      };

      // The stencil.
      const stencil = layer();
      const s = stencil.getContext("2d")!;
      s.font = `100px ${family}`;
      const widest = Math.max(...lines.map((line) => s.measureText(line).width));
      const size = Math.min((W * 0.965 * 100) / widest, (H * 0.9) / (lines.length * 1.08));
      s.font = `${size}px ${family}`;
      s.textAlign = "center";
      s.textBaseline = "middle";
      s.fillStyle = "#000";
      const leading = size * 1.08;
      const top = H / 2 - ((lines.length - 1) * leading) / 2;
      lines.forEach((line, i) => s.fillText(line, W / 2, top + i * leading));

      // A coarse copy tells us how close a droplet landed to the letterforms.
      const step = 8;
      const halo = document.createElement("canvas");
      halo.width = Math.ceil(W / step);
      halo.height = Math.ceil(H / step);
      const hc = halo.getContext("2d", { willReadFrequently: true })!;
      hc.imageSmoothingQuality = "high";
      hc.drawImage(stencil, 0, 0, halo.width, halo.height);
      const glow = hc.getImageData(0, 0, halo.width, halo.height).data;
      const near = (x: number, y: number) => {
        let sum = 0;
        const hx = Math.floor(x / step);
        const hy = Math.floor(y / step);
        for (let oy = -3; oy <= 3; oy += 3) {
          for (let ox = -3; ox <= 3; ox += 3) {
            const px = Math.min(halo.width - 1, Math.max(0, hx + ox));
            const py = Math.min(halo.height - 1, Math.max(0, hy + oy));
            sum += glow[(py * halo.width + px) * 4 + 3];
          }
        }
        return sum / (9 * 255);
      };

      const pigment = layer();
      const p = pigment.getContext("2d")!;
      const mist = layer();
      const m = mist.getContext("2d")!;
      const masked = layer();
      const k = masked.getContext("2d")!;
      const random = seeded(1584);

      const colourAt = (x: number) => {
        const [r, g, b] = ramp(stops, x / W + (random() - 0.5) * 0.08);
        return `rgb(${r | 0} ${g | 0} ${b | 0})`;
      };

      const spray = (nozzle: number, count: number) => {
        const spread = W * 0.1;
        for (let i = 0; i < count; i++) {
          const x = nozzle + (random() + random() + random() - 1.5) * spread;
          const y = random() * H;
          const remaining = x / W;
          // The can runs out towards the end of the word.
          const flow = remaining < 0.58 ? 1 : 1 - (remaining - 0.58) * 1.55;
          if (random() > flow) continue;
          const r = (1.5 + random() * random() * 9.5) * scale;
          p.fillStyle = colourAt(x);
          p.beginPath();
          p.arc(x, y, r, 0, 6.2832);
          p.fill();
        }
        for (let i = 0; i < count * 0.5; i++) {
          const x = nozzle + (random() + random() - 1) * spread * 1.5;
          const y = random() * H;
          const chance = near(x, y);
          if (random() > chance * 0.62 + 0.012) continue;
          const big = random() > 0.985;
          m.globalAlpha = 0.55 + random() * 0.4;
          m.fillStyle = colourAt(x);
          m.beginPath();
          m.arc(x, y, (big ? 1.5 + random() * 2.6 : 0.4 + random() * 1.1) * scale, 0, 6.2832);
          m.fill();
        }
      };

      const compose = () => {
        k.globalCompositeOperation = "source-over";
        k.clearRect(0, 0, W, H);
        k.drawImage(pigment, 0, 0);
        k.globalCompositeOperation = "destination-in";
        k.drawImage(stencil, 0, 0);
        out.clearRect(0, 0, W, H);
        out.drawImage(mist, 0, 0);
        out.drawImage(masked, 0, 0);
      };

      const total = 112;
      // Enough droplets to lay about three coats over the whole word.
      const perFrame = Math.round((W * H) / (scale * scale) / 16 / total);
      const nozzleAt = (i: number) => -W * 0.06 + (i / total) * W * 1.14;

      if (!animate) {
        for (let i = 0; i < total; i++) spray(nozzleAt(i), perFrame);
        compose();
        return;
      }
      let i = 0;
      const tick = () => {
        spray(nozzleAt(i), perFrame);
        compose();
        i += 1;
        if (i < total) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        watcher.disconnect();
        void paint(!still);
      },
      { threshold: 0.25 },
    );
    watcher.observe(canvas);

    let settled = 0;
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      window.clearTimeout(settled);
      settled = window.setTimeout(() => played && void paint(false), 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settled);
      watcher.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [text, colors]);

  const label = (Array.isArray(text) ? text : [text]).join(" ");
  return <canvas ref={ref} className={className} role="img" aria-label={label} />;
}
