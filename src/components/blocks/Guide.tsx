"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Long how-to pages keep their contents in view and mark where you are. */
export function Guide({
  steps,
  children,
}: {
  steps: { id: string; label: string }[];
  children: ReactNode;
}) {
  const [current, setCurrent] = useState(steps[0].id);

  useEffect(() => {
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    steps.forEach((step) => {
      const el = document.getElementById(step.id);
      if (el) watcher.observe(el);
    });
    return () => watcher.disconnect();
  }, [steps]);

  return (
    <div className="guide">
      <nav className="guide__nav" aria-label="On this page">
        <ul role="list">
          {steps.map((step) => (
            <li key={step.id}>
              <a
                href={`#${step.id}`}
                data-on={current === step.id ? "" : undefined}
                aria-current={current === step.id ? "location" : undefined}
              >
                {step.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="guide__body">{children}</div>
    </div>
  );
}
