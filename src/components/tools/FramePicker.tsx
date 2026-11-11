"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { PaintedFrame } from "@/components/blocks/PaintedFrame";
import { Money, RateNote } from "@/components/shell/Money";
import {
  artworks,
  families,
  familyOf,
  isDark,
  outsideCm,
  paintNamed,
  paints,
  type Artwork,
  type Paint,
} from "@/lib/frames";
import { pricing, sizeFor, type SizeId } from "@/lib/pricing";
import { contactHref } from "@/lib/site";

const columns = families[0].paints.length;

/** The Farrow & Ball chart: one radio group, arrow keys move through it like a grid. */
function Chart({
  value,
  onPick,
  onPreview,
}: {
  value: Paint;
  onPick: (paint: Paint) => void;
  onPreview: (paint: Paint | null) => void;
}) {
  const chart = useRef<HTMLDivElement>(null);

  const onKey = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: columns, ArrowUp: -columns }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = paints[(paints.indexOf(value) + step + paints.length) % paints.length];
    onPick(next);
    chart.current?.querySelector<HTMLElement>(`[data-no="${next.no}"]`)?.focus();
  };

  return (
    <div
      ref={chart}
      className="fp__chart"
      role="radiogroup"
      aria-label="Farrow & Ball colour"
      onKeyDown={onKey}
      onPointerLeave={() => onPreview(null)}
    >
      {paints.map((paint) => (
        <button
          key={paint.no}
          type="button"
          role="radio"
          aria-checked={paint === value}
          aria-label={`${paint.name} No. ${paint.no}`}
          title={`${paint.name} No. ${paint.no}`}
          tabIndex={paint === value ? 0 : -1}
          data-no={paint.no}
          data-dark={isDark(paint.hex) ? "" : undefined}
          className="fp__swatch"
          style={{ "--c": paint.hex } as CSSProperties}
          onClick={() => onPick(paint)}
          onPointerEnter={(event) => event.pointerType === "mouse" && onPreview(paint)}
        />
      ))}
    </div>
  );
}

export function FramePicker() {
  const [paint, setPaint] = useState<Paint>(() => paintNamed("Hague Blue"));
  const [preview, setPreview] = useState<Paint | null>(null);
  const [size, setSize] = useState<SizeId>("A3");
  const [mount, setMount] = useState(true);
  const [artId, setArtId] = useState(artworks[0].id);
  const [own, setOwn] = useState<Artwork | null>(null);

  useEffect(() => () => {
    if (own) URL.revokeObjectURL(own.src);
  }, [own]);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const src = URL.createObjectURL(file);
    const probe = new window.Image();
    probe.onload = () => {
      setOwn({ id: "own", src, w: probe.naturalWidth, h: probe.naturalHeight, credit: "Your picture", title: "Yours" });
      setArtId("own");
    };
    probe.onerror = () => URL.revokeObjectURL(src);
    probe.src = src;
  };

  const shown = preview ?? paint;
  const art = (artId === "own" && own) || artworks.find((a) => a.id === artId) || artworks[0];
  const chosen = sizeFor(size);
  const framed = chosen.frame !== null && chosen.mount !== null;
  const total = framed ? chosen.price + chosen.frame + (mount ? chosen.mount : 0) : null;
  const [ow, oh] = outsideCm(chosen.mm, size, mount);
  const outside = art.w > art.h ? `${oh} × ${ow} cm` : `${ow} × ${oh} cm`;
  const about = `${size} Giclée print in a hand-painted ${paint.name} No. ${paint.no} frame${mount ? " with a window mount" : ""}`;

  return (
    <section className="tool" id="frame" aria-labelledby="frame-title">
      <div className="fp">
        <div className="fp__stage">
          <div className="fp__wall">
            <PaintedFrame
              paint={shown.hex}
              art={{ src: art.src, w: art.w, h: art.h }}
              size={size}
              mount={mount}
              label={`A ${size} print in a ${shown.name} frame${mount ? " with a white mount" : ""}`}
            />
          </div>
          <p className="fp__caption label">
            <span>{art.credit}</span>
            <span>Frame about {outside}</span>
          </p>
        </div>

        <div>
          <p className="eyebrow">Design your frame</p>
          <h2 className="h-md" id="frame-title" style={{ marginTop: "0.7rem" }}>
            Pick a colour
          </h2>

          <div className="calc__group" style={{ marginTop: "1.6rem" }}>
            <p className="fp__paint" aria-live="polite">
              <span className="fp__name">{shown.name}</span>
              <span className="label">
                No. {shown.no} · {familyOf(shown)}
              </span>
            </p>
            <Chart
              value={paint}
              onPick={(next) => {
                setPaint(next);
                setPreview(null);
              }}
              onPreview={setPreview}
            />
            <p className="label" style={{ marginTop: "0.7rem" }}>
              Any other Farrow &amp; Ball colour is yours for the asking. Colours on screen are a guide
              to the real paint.
            </p>
          </div>

          <div className="calc__group">
            <span>Size</span>
            <div className="calc__chips" role="group" aria-label="Print size">
              {pricing.sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="chip"
                  aria-pressed={s.id === size}
                  onClick={() => setSize(s.id)}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          <div className="calc__group">
            <span>Mount</span>
            <label className="check">
              <input type="checkbox" checked={mount} onChange={(e) => setMount(e.target.checked)} />
              <span>
                White window mount
                {chosen.mount !== null && (
                  <>
                    {" "}
                    (+<Money gbp={chosen.mount} />)
                  </>
                )}
              </span>
            </label>
          </div>

          <div className="calc__group">
            <span>Try it with</span>
            <div className="fp__arts" role="group" aria-label="Picture">
              {artworks.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="fp__art"
                  aria-pressed={a.id === artId}
                  aria-label={a.title}
                  onClick={() => setArtId(a.id)}
                >
                  <Image src={a.src} alt="" width={a.w} height={a.h} sizes="4.5rem" />
                </button>
              ))}
              {own && (
                <button
                  type="button"
                  className="fp__art"
                  aria-pressed={artId === "own"}
                  aria-label="Your picture"
                  onClick={() => setArtId("own")}
                >
                  {/* A local file the visitor chose: nothing for the image optimiser to fetch. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={own.src} alt="" />
                </button>
              )}
              <label className="fp__art fp__upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    onFile(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
                <span>Your picture</span>
              </label>
            </div>
            <p className="label" style={{ marginTop: "0.6rem" }}>
              Your picture stays on your device. Nothing is uploaded.
            </p>
          </div>

          <div className="calc__total">
            <output className="calc__price" aria-live="polite">
              {total === null ? "On request" : <Money gbp={total} />}
            </output>
            <span>
              {size} print, painted frame{mount ? " and mount" : ""}
            </span>
          </div>
          {framed ? (
            <p className="label" style={{ marginTop: "0.6rem" }}>
              Print <Money gbp={chosen.price} /> · Frame <Money gbp={chosen.frame} />
              {mount && (
                <>
                  {" "}
                  · Mount <Money gbp={chosen.mount} />
                </>
              )}{" "}
              · UK delivery included
            </p>
          ) : (
            <p className="label" style={{ marginTop: "0.6rem" }}>
              We make {size} frames to order and price them by quote.
            </p>
          )}
          <RateNote />
          {!pricing.confirmed && (
            <p className="label" style={{ marginTop: "0.4rem" }}>
              Indicative prices. We confirm the final price when we have approved your file.
            </p>
          )}
          <Link className="btn" href={contactHref(about)} style={{ marginTop: "1.5rem" }}>
            Contact us about this frame
          </Link>
        </div>
      </div>
    </section>
  );
}
