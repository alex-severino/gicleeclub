"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Repeated clicks on the homepage return to the top without changing its URL. */
export function HomeLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Link
      href="/"
      className={className}
      aria-label="Giclée Club, home"
      onNavigate={(event) => {
        if (window.location.pathname === "/") {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }}
    >
      {children}
    </Link>
  );
}
