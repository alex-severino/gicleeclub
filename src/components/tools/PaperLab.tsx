"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { stocks, type StockId } from "@/lib/site";
import { setStock, useStock } from "@/lib/stock";

/** The art the site has always shown on each paper. */
const art: Record<StockId, { src: string; credit: string }> = {
  "photo-rag": { src: "/art/david-becker.jpg", credit: "Art by David Becker" },
  "german-etching": { src: "/art/vojtech-bruzek.jpg", credit: "Art by Vojtech Bruzek" },
  pearl: { src: "/art/milad-fakurian.jpg", credit: "Art by Milad Fakurian" },
  bamboo: { src: "/art/and-machines.jpg", credit: "Art by And Machines" },
};

/** How each surface answers the light: relief, sheen, gloss, grain scale, paper white. */
const surface: Record<StockId, { m: [number, number, number, number]; tint: [number, number, number] }> = {
  "photo-rag": { m: [0.95, 0.03, 18, 1.5], tint: [0.985, 0.98, 0.965] },
  "german-etching": { m: [1.9, 0.03, 14, 1.05], tint: [0.982, 0.975, 0.955] },
  pearl: { m: [0.5, 0.34, 40, 1.9], tint: [1, 1, 0.995] },
  bamboo: { m: [0.95, 0.02, 14, 1.3], tint: [0.968, 0.942, 0.888] },
};

const vertex = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }`;

const fragment = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uArtA, uArtB, uHeightA, uHeightB;
uniform vec2 uRes, uLight, uCoverA, uCoverB;
uniform vec4 uMatA, uMatB;
uniform vec3 uTintA, uTintB;
uniform float uPass;

vec3 sheet(sampler2D art, sampler2D height, vec2 cover, vec4 mat, vec3 tint) {
  float aspect = uRes.x / uRes.y;
  vec2 margin = vec2(.062, .062 * aspect);
  vec2 q = (vUv - margin) / (1. - 2. * margin);
  bool printed = q.x > 0. && q.x < 1. && q.y > 0. && q.y < 1.;
  vec3 albedo = tint;
  if (printed) albedo = texture2D(art, (q - .5) * cover + .5).rgb * tint;

  vec2 t = vec2(vUv.x * aspect, vUv.y) * mat.w;
  float e = 1.6 / 1024.;
  float h = texture2D(height, t).r;
  float hx = texture2D(height, t + vec2(e, 0.)).r;
  float hy = texture2D(height, t + vec2(0., e)).r;
  vec3 n = normalize(vec3((h - hx) * mat.x, (h - hy) * mat.x, 1.));

  vec2 d = (uLight - vUv) * vec2(aspect, 1.);
  float dist = length(d);
  vec3 l = normalize(vec3(d, .36));
  float rake = max(dot(n, l), 0.) / max(l.z, .2);
  float pool = 1. / (1. + dist * dist * 2.2);
  float light = .66 + .42 * pool;
  vec3 col = albedo * light * mix(1., clamp(rake, .5, 1.6), .78);
  vec3 half_ = normalize(l + vec3(0., 0., 1.));
  col += pow(max(dot(n, half_), 0.), mat.z) * mat.y * pool;
  return col;
}

void main() {
  vec3 a = sheet(uArtA, uHeightA, uCoverA, uMatA, uTintA);
  vec3 b = sheet(uArtB, uHeightB, uCoverB, uMatB, uTintB);
  // The new paper comes through in stepped passes, top to bottom.
  float line = 1. - floor(uPass * 18.) / 18.;
  gl_FragColor = vec4(vUv.y > line ? b : a, 1.);
}`;

type Layer = { art: WebGLTexture; height: WebGLTexture; cover: [number, number]; id: StockId };

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function PaperLab({ children }: { children?: ReactNode }) {
  const stock = useStock();
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const select = useRef<((id: StockId) => void) | null>(null);
  const [supported, setSupported] = useState(true);
  const current = stocks.find((s) => s.id === stock) ?? stocks[0];

  useEffect(() => {
    const el = canvas.current;
    const host = stage.current;
    if (!el || !host) return;
    const gl = el.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) {
      const frame = requestAnimationFrame(() => setSupported(false));
      return () => cancelAnimationFrame(frame);
    }

    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment));
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const u = (name: string) => gl.getUniformLocation(program, name);

    const texture = (image: HTMLImageElement, tile: boolean) => {
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      if (tile) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      }
      return t;
    };

    let disposed = false;
    let raf = 0;
    let visible = false;
    let started = false;
    const layers = new Map<StockId, Layer>();
    let shown: Layer | null = null;
    let incoming: Layer | null = null;
    let pass = 1;

    const light = { x: 0.34, y: 0.66, tx: 0.34, ty: 0.66 };
    let touched = 0;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(el.clientWidth * scale);
      el.height = Math.round(el.clientHeight * scale);
      gl.viewport(0, 0, el.width, el.height);
    };

    const coverFor = (image: HTMLImageElement): [number, number] => {
      const box = (el.clientWidth || 5) / (el.clientHeight || 4);
      const ratio = image.width / image.height;
      return ratio > box ? [box / ratio, 1] : [1, ratio / box];
    };

    const bind = (unit: number, name: string, t: WebGLTexture) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.uniform1i(u(name), unit);
    };

    const draw = () => {
      if (!shown) return;
      const next = incoming ?? shown;
      bind(0, "uArtA", shown.art);
      bind(1, "uHeightA", shown.height);
      bind(2, "uArtB", next.art);
      bind(3, "uHeightB", next.height);
      gl.uniform2f(u("uRes"), el.width, el.height);
      gl.uniform2f(u("uLight"), light.x, light.y);
      gl.uniform2f(u("uCoverA"), ...shown.cover);
      gl.uniform2f(u("uCoverB"), ...next.cover);
      gl.uniform4f(u("uMatA"), ...surface[shown.id].m);
      gl.uniform4f(u("uMatB"), ...surface[next.id].m);
      gl.uniform3f(u("uTintA"), ...surface[shown.id].tint);
      gl.uniform3f(u("uTintB"), ...surface[next.id].tint);
      gl.uniform1f(u("uPass"), incoming ? pass : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const tick = (time: number) => {
      raf = 0;
      if (disposed || !visible) return;
      // When nobody is steering, the lamp drifts slowly across the sheet.
      if (!still && time - touched > 2600) {
        light.tx = 0.5 + Math.cos(time / 2600) * 0.42;
        light.ty = 0.5 + Math.sin(time / 1900) * 0.36;
      }
      light.x += (light.tx - light.x) * 0.09;
      light.y += (light.ty - light.y) * 0.09;
      if (incoming) {
        pass = Math.min(1, pass + 0.024);
        if (pass >= 1) {
          shown = incoming;
          incoming = null;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      if (!raf && visible && !disposed) raf = requestAnimationFrame(tick);
    };

    const load = async (id: StockId) => {
      const known = layers.get(id);
      if (known) return known;
      const [image, height] = await Promise.all([
        loadImage(art[id].src),
        loadImage(`/textures/paper/${id}-height.jpg`),
      ]);
      const layer: Layer = {
        id,
        art: texture(image, false),
        height: texture(height, true),
        cover: coverFor(image),
      };
      layers.set(id, layer);
      return layer;
    };

    const show = async (id: StockId) => {
      const layer = await load(id);
      if (disposed) return;
      if (!shown) {
        shown = layer;
      } else if (layer.id !== shown.id) {
        incoming = layer;
        pass = 0;
      }
      run();
    };
    select.current = (id) => void show(id);

    const start = () => {
      if (started) return;
      started = true;
      resize();
      void show((document.documentElement.dataset.stock as StockId) || "photo-rag");
    };

    const watcher = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start();
          run();
        }
      },
      { rootMargin: "20% 0px" },
    );
    watcher.observe(host);

    const steer = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      light.tx = (event.clientX - box.left) / box.width;
      light.ty = 1 - (event.clientY - box.top) / box.height;
      touched = performance.now();
    };
    host.addEventListener("pointermove", steer);
    host.addEventListener("pointerdown", steer);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      watcher.disconnect();
      host.removeEventListener("pointermove", steer);
      host.removeEventListener("pointerdown", steer);
      window.removeEventListener("resize", resize);
      select.current = null;
      layers.forEach((layer) => {
        gl.deleteTexture(layer.art);
        gl.deleteTexture(layer.height);
      });
      gl.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    select.current?.(stock);
  }, [stock]);

  return (
    <section className="lab" data-ink="papers" aria-label="Compare the papers">
      <div className="lab__grid">
        <div>
          <div className="lab__stage" ref={stage}>
            {supported ? (
              <canvas ref={canvas} aria-label={`A print on ${current.name} under a moving lamp`} role="img" />
            ) : (
              <Image src={`/media/wide/${stock}.png`} alt={`Macro photograph of ${current.name}`} fill sizes="55vw" />
            )}
          </div>
          <p className="label" style={{ marginTop: "0.8rem" }}>
            {art[stock].credit}. Move across the sheet to rake the light over the real paper surface.
          </p>
        </div>
        <div>
          {children}
          <div className="lab__list" role="radiogroup" aria-label="Paper">
            {stocks.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={s.id === stock}
                className="lab__option"
                onClick={() => setStock(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <dl className="lab__specs specs">
            <div>
              <dt>Weight</dt>
              <dd>{current.gsm} gsm</dd>
            </div>
            <div>
              <dt>Fibre</dt>
              <dd>{current.fibre}</dd>
            </div>
            <div>
              <dt>Colour</dt>
              <dd>{current.white}</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>{current.surface}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
