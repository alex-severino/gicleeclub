import Image from "next/image";

type PrintProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  credit?: string;
  className?: string;
};

/** An image that arrives pass by pass under the print head. */
export function Print({
  src,
  alt,
  width = 1000,
  height = 1120,
  sizes = "(max-width: 860px) 92vw, 46vw",
  credit,
  className = "",
}: PrintProps) {
  return (
    <figure className={`print ${className}`} data-reveal="">
      <span className="print__frame">
        <span className="print__sheet">
          <Image src={src} alt={alt} width={width} height={height} sizes={sizes} quality={88} />
        </span>
        <span className="print__head" aria-hidden="true" />
      </span>
      {credit && <figcaption className="label">{credit}</figcaption>}
    </figure>
  );
}
