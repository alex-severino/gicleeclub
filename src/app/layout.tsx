import type { Metadata } from "next";
import { Krona_One, Montserrat } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { PageTransition } from "@/components/shell/PageTransition";
import { StockPicker } from "@/components/shell/StockPicker";
import { studio } from "@/lib/site";
import "./globals.css";

const krona = Krona_One({
  variable: "--font-krona",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(studio.url),
  title: {
    default: "Giclée Club — We print for artists",
    template: "%s — Giclée Club",
  },
  description:
    "Museum quality Giclée printing on Hahnemühle FineArt papers. Hand-printed in Amsterdam, delivered worldwide.",
  openGraph: {
    siteName: studio.name,
    type: "website",
  },
};

/** Runs before first paint so motion and the chosen paper never flash. */
const prepaint = `(function(){var d=document.documentElement;d.classList.add('js');try{var s=localStorage.getItem('gc-stock');if(s)d.dataset.stock=s}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${krona.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prepaint }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StockPicker />
        <Link className="ask" href="/contact-us" aria-label="Ask us anything">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 4h18v13H8l-5 4z" />
          </svg>
        </Link>
        <PageTransition />
        <div className="paper" aria-hidden="true" />
      </body>
    </html>
  );
}
