import type { CSSProperties, ReactNode } from "react";
import { Action, type ActionProps } from "./Action";
import { Print } from "./Print";

type SplitProps = {
  /** File name in /media/section. */
  image: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  credit?: string;
  flip?: boolean;
  action?: ActionProps;
  id?: string;
  children: ReactNode;
};

/** Print on one side, words on the other. The print drifts a little as you scroll. */
export function Split({ image, alt, eyebrow, title, credit, flip, action, id, children }: SplitProps) {
  return (
    <section id={id} className={flip ? "split split--flip guide__step" : "split guide__step"} data-scroll="">
      <div className="split__art" data-drift="" style={{ "--drift": -44 } as CSSProperties}>
        <Print src={`/media/section/${image}.png`} alt={alt} credit={credit} />
      </div>
      <div className="split__text" data-reveal="rise">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="h-md">{title}</h2>}
        <div className="split__body prose-sheet">{children}</div>
        {action && <Action {...action} />}
      </div>
    </section>
  );
}
