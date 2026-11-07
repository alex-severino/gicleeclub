"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { pricing } from "@/lib/pricing";

const PPI = 300;
const MM_PER_INCH = 25.4;

type State = "ok" | "warn" | "bad";
type Check = { label: string; value: string; state: State };
type Report = { name: string; width: number; height: number; checks: Check[] };

function iccName(view: DataView) {
  // ICC tag table: find 'desc', then read its v2 or v4 text.
  const count = view.getUint32(128);
  for (let i = 0; i < count && 132 + i * 12 + 12 <= view.byteLength; i++) {
    const entry = 132 + i * 12;
    if (view.getUint32(entry) !== 0x64657363) continue;
    const offset = view.getUint32(entry + 4);
    const type = view.getUint32(offset);
    if (type === 0x64657363) {
      const length = view.getUint32(offset + 8);
      let text = "";
      for (let c = 0; c < length - 1 && c < 80; c++) {
        text += String.fromCharCode(view.getUint8(offset + 12 + c));
      }
      return text;
    }
    if (type === 0x6d6c7563) {
      // mluc: first record's length at +20, its offset at +24, in UTF-16.
      const length = view.getUint32(offset + 20);
      const start = offset + view.getUint32(offset + 24);
      let text = "";
      for (let c = 0; c < Math.min(length, 160); c += 2) {
        text += String.fromCharCode(view.getUint16(start + c));
      }
      return text;
    }
  }
  return "";
}

function profileCheck(name: string): Check {
  if (!name) return { label: "Colour profile", value: "None embedded", state: "warn" };
  const good = /srgb|adobe rgb/i.test(name);
  return { label: "Colour profile", value: name, state: good ? "ok" : "warn" };
}

async function readTiff(file: File): Promise<Report> {
  const head = new DataView(await file.slice(0, 8).arrayBuffer());
  const little = head.getUint16(0) === 0x4949;
  const ifd = head.getUint32(4, little);
  const countView = new DataView(await file.slice(ifd, ifd + 2).arrayBuffer());
  const count = countView.getUint16(0, little);
  const table = new DataView(await file.slice(ifd + 2, ifd + 2 + count * 12).arrayBuffer());

  const tags = new Map<number, { type: number; n: number; at: number }>();
  for (let i = 0; i < count; i++) {
    const at = i * 12;
    tags.set(table.getUint16(at, little), {
      type: table.getUint16(at + 2, little),
      n: table.getUint32(at + 4, little),
      at: at + 8,
    });
  }
  const short = (id: number, fallback = 0) => {
    const tag = tags.get(id);
    if (!tag) return fallback;
    if (tag.type === 3) return table.getUint16(tag.at, little);
    return table.getUint32(tag.at, little);
  };

  const width = short(256);
  const height = short(257);
  const samples = short(277, 1);
  const photometric = short(262, -1);
  const compression = short(259, 1);

  let bits = short(258, 1);
  const bitsTag = tags.get(258);
  if (bitsTag && bitsTag.n > 2) {
    const offset = table.getUint32(bitsTag.at, little);
    bits = new DataView(await file.slice(offset, offset + 2).arrayBuffer()).getUint16(0, little);
  }

  let ppi = 0;
  const xres = tags.get(282);
  if (xres) {
    const offset = table.getUint32(xres.at, little);
    const v = new DataView(await file.slice(offset, offset + 8).arrayBuffer());
    const raw = v.getUint32(0, little) / (v.getUint32(4, little) || 1);
    ppi = short(296, 2) === 3 ? raw * 2.54 : raw;
  }

  let profile = "";
  const icc = tags.get(34675);
  if (icc) {
    const offset = table.getUint32(icc.at, little);
    const bytes = await file.slice(offset, offset + Math.min(icc.n, 8192)).arrayBuffer();
    try {
      profile = iccName(new DataView(bytes)).replace(/\0/g, "").trim();
    } catch {
      profile = "Embedded";
    }
  }

  const colour = photometric === 2 ? "RGB" : photometric === 5 ? "CMYK" : photometric === 1 ? "Greyscale" : "Other";
  const extra = samples - (photometric === 2 ? 3 : photometric === 5 ? 4 : 1);

  return {
    name: file.name,
    width,
    height,
    checks: [
      { label: "File format", value: "TIFF", state: "ok" },
      { label: "Colour mode", value: colour, state: colour === "RGB" ? "ok" : "bad" },
      { label: "Bit depth", value: `${bits} bit`, state: bits === 8 ? "ok" : "warn" },
      {
        label: "Resolution",
        value: ppi ? `${Math.round(ppi)} PPI` : "Not set",
        state: Math.round(ppi) === PPI ? "ok" : "warn",
      },
      profileCheck(profile),
      {
        label: "Layers",
        value: tags.has(37724) ? "Not flattened" : "Flattened",
        state: tags.has(37724) ? "bad" : "ok",
      },
      {
        label: "Alpha channels",
        value: extra > 0 ? `${extra} found` : "None",
        state: extra > 0 ? "bad" : "ok",
      },
      {
        label: "Compression",
        value: compression === 1 ? "None" : "Compressed",
        state: compression === 1 ? "ok" : "warn",
      },
    ],
  };
}

async function readPsd(file: File): Promise<Report> {
  const v = new DataView(await file.slice(0, 26).arrayBuffer());
  const mode = v.getUint16(24);
  const bits = v.getUint16(22);
  return {
    name: file.name,
    height: v.getUint32(14),
    width: v.getUint32(18),
    checks: [
      { label: "File format", value: "Photoshop, please export as TIFF", state: "bad" },
      { label: "Colour mode", value: mode === 3 ? "RGB" : mode === 4 ? "CMYK" : "Other", state: mode === 3 ? "ok" : "bad" },
      { label: "Bit depth", value: `${bits} bit`, state: bits === 8 ? "ok" : "warn" },
    ],
  };
}

async function readPicture(file: File): Promise<Report> {
  const bitmap = await createImageBitmap(file);
  const report: Report = {
    name: file.name,
    width: bitmap.width,
    height: bitmap.height,
    checks: [
      {
        label: "File format",
        value: `${file.type.replace("image/", "").toUpperCase()}, please export as TIFF`,
        state: "bad",
      },
    ],
  };
  bitmap.close();
  return report;
}

async function inspect(file: File) {
  const magic = new DataView(await file.slice(0, 4).arrayBuffer());
  const first = magic.getUint32(0);
  if (first === 0x49492a00 || first === 0x4d4d002a) return readTiff(file);
  if (first === 0x38425053) return readPsd(file);
  return readPicture(file);
}

/** Checks a file against the printing requirements. Nothing leaves the browser. */
export function Preflight() {
  const [width, setWidth] = useState(4961);
  const [height, setHeight] = useState(7016);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const mmWide = (width / PPI) * MM_PER_INCH;
  const mmHigh = (height / PPI) * MM_PER_INCH;
  const long = Math.max(mmWide, mmHigh) + 1;
  const short = Math.min(mmWide, mmHigh) + 1;

  const read = async (file?: File) => {
    if (!file) return;
    setError("");
    setReport(null);
    try {
      const result = await inspect(file);
      setReport(result);
      setWidth(result.width);
      setHeight(result.height);
    } catch {
      setError("We could not read that file. Please enter its pixel size instead.");
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setOver(false);
    void read(event.dataTransfer.files[0]);
  };
  const onPick = (event: ChangeEvent<HTMLInputElement>) => {
    void read(event.target.files?.[0]);
    event.target.value = "";
  };

  return (
    <section id="preflight" className="guide__step" style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)" }}>
      <div className="preflight">
        <div>
          <p className="eyebrow">Check your file</p>
          <h2 className="h-md" style={{ marginTop: "0.7rem" }}>
            What size can it print?
          </h2>
          <div className="contact__form" style={{ marginTop: "1.4rem", gap: "0.8rem" }}>
            <label className="field">
              <span>Width in pixels</span>
              <input
                type="number"
                min={1}
                value={width || ""}
                onChange={(e) => {
                  setWidth(Number(e.target.value));
                  setReport(null);
                }}
              />
            </label>
            <label className="field">
              <span>Height in pixels</span>
              <input
                type="number"
                min={1}
                value={height || ""}
                onChange={(e) => {
                  setHeight(Number(e.target.value));
                  setReport(null);
                }}
              />
            </label>
          </div>
          <p style={{ marginTop: "1.1rem", fontWeight: 600 }} aria-live="polite">
            At {PPI} PPI: {Math.round(mmWide)} × {Math.round(mmHigh)} mm (
            {(width / PPI).toFixed(1)}″ × {(height / PPI).toFixed(1)}″)
          </p>
          <div className="preflight__sizes">
            {pricing.sizes.map(({ id, mm: [a, b] }) => {
              const fits = short >= a && long >= b;
              return (
                <div
                  key={id}
                  className="preflight__size"
                  data-fits={fits ? "" : undefined}
                  title={`${a} × ${b} mm`}
                >
                  {id}
                  <span className="sr-only">{fits ? " fits" : " is too large"}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {report ? (
            <>
              <p className="eyebrow" style={{ wordBreak: "break-all" }}>
                {report.name}
              </p>
              <ul className="preflight__checks">
                {report.checks.map((check) => (
                  <li key={check.label}>
                    <span>{check.label}</span>
                    <b data-state={check.state}>{check.value}</b>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="btn btn--ghost"
                style={{ marginTop: "1.2rem" }}
                onClick={() => input.current?.click()}
              >
                Check another file
              </button>
            </>
          ) : (
            <button
              type="button"
              className="preflight__drop"
              style={{ width: "100%", background: "none", color: "inherit" }}
              data-over={over ? "" : undefined}
              onClick={() => input.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={onDrop}
            >
              <span>
                <strong style={{ display: "block", fontWeight: 650 }}>Drop your file here</strong>
                <span className="label" style={{ display: "block", marginTop: "0.4rem" }}>
                  We check it against our requirements right here in your browser. It is not
                  uploaded anywhere.
                </span>
                {error && (
                  <span role="alert" style={{ display: "block", marginTop: "0.8rem", color: "#ff8fa8" }}>
                    {error}
                  </span>
                )}
              </span>
            </button>
          )}
          <input
            ref={input}
            type="file"
            accept=".tif,.tiff,.psd,image/*"
            hidden
            onChange={onPick}
          />
        </div>
      </div>
    </section>
  );
}
