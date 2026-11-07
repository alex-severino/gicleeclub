import { useId, type CSSProperties } from "react";
import { frame } from "@/lib/frames";
import { sizeFor, type SizeId } from "@/lib/pricing";

type PaintedFrameProps = {
  paint: string;
  /** Picture source and its pixel size, which decides the orientation. */
  art: { src: string; w: number; h: number };
  size: SizeId;
  mount: boolean;
  label: string;
  className?: string;
};

/** A print in a painted frame, drawn to scale in millimetres, lit from the top left. */
export function PaintedFrame({ paint, art, size, mount, label, className = "" }: PaintedFrameProps) {
  const id = useId();
  const [short, long] = sizeFor(size).mm;
  const [w, h] = art.w > art.h ? [long, short] : [short, long];
  const f = frame.moulding;
  const m = mount ? frame.mount[size] : 0;
  const W = w + 2 * (f + m);
  const H = h + 2 * (f + m);
  const x = f + m;
  const y = f + m;
  const b = mount ? Math.max(1.6, w * 0.0055) : 0;
  const shade = f * 0.42;

  const sides = {
    top: `0,0 ${W},0 ${W - f},${f} ${f},${f}`,
    right: `${W},0 ${W},${H} ${W - f},${H - f} ${W - f},${f}`,
    bottom: `0,${H} ${W},${H} ${W - f},${H - f} ${f},${H - f}`,
    left: `0,0 ${f},${f} ${f},${H - f} 0,${H}`,
  };
  const bevel = {
    top: `${x - b},${y - b} ${x + w + b},${y - b} ${x + w},${y} ${x},${y}`,
    right: `${x + w + b},${y - b} ${x + w + b},${y + h + b} ${x + w},${y + h} ${x + w},${y}`,
    bottom: `${x - b},${y + h + b} ${x + w + b},${y + h + b} ${x + w},${y + h} ${x},${y + h}`,
    left: `${x - b},${y - b} ${x},${y} ${x},${y + h} ${x - b},${y + h + b}`,
  };

  return (
    <svg
      className={`pf ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      style={{ "--paint": paint, "--ar": W / H } as CSSProperties}
    >
      <defs>
        <linearGradient id={`${id}d`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.24" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}g`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0.36" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="0.64" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x={f} y={f} width={W - 2 * f} height={H - 2 * f} fill="#f8f7f3" />
      <image href={art.src} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
      {mount && (
        <g>
          <polygon points={bevel.top} fill="#e3e0d8" />
          <polygon points={bevel.left} fill="#eae7e0" />
          <polygon points={bevel.right} fill="#fbfaf7" />
          <polygon points={bevel.bottom} fill="#fff" />
        </g>
      )}
      <rect x={f} y={f} width={W - 2 * f} height={shade} fill={`url(#${id}d)`} />
      <rect x={f} y={f} width={shade * 0.8} height={H - 2 * f} fill={`url(#${id}r)`} />
      <rect x={f} y={f} width={W - 2 * f} height={H - 2 * f} fill={`url(#${id}g)`} />

      <g className="pf__paint">
        <polygon points={sides.top} />
        <polygon points={sides.right} />
        <polygon points={sides.bottom} />
        <polygon points={sides.left} />
      </g>
      <polygon points={sides.top} fill="#fff" fillOpacity="0.07" />
      <polygon points={sides.left} fill="#fff" fillOpacity="0.03" />
      <polygon points={sides.right} fill="#000" fillOpacity="0.07" />
      <polygon points={sides.bottom} fill="#000" fillOpacity="0.13" />
      <rect
        x={f}
        y={f}
        width={W - 2 * f}
        height={H - 2 * f}
        fill="none"
        stroke="#000"
        strokeOpacity="0.28"
        strokeWidth="0.6"
      />
      <rect x={0.3} y={0.3} width={W - 0.6} height={H - 0.6} fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="0.6" />
    </svg>
  );
}
