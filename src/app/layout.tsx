import type { Metadata } from "next";
import { Krona_One, Montserrat } from "next/font/google";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";
import { PageTransition } from "@/components/shell/PageTransition";
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
    default: "Hi-Tech Museum Quality Printing for Visual Artists — Giclée Club",
    template: "%s — Giclée Club",
  },
  description:
    "Hi-Tech museum quality printing for visual artists. AI file approval and meticulous London studio care, for work your reputation rests on.",
  openGraph: {
    siteName: studio.name,
    type: "website",
  },
};

/** Runs before first paint so content that animates in never flashes. */
const prepaint = `document.documentElement.classList.add('js')`;

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
        <PageTransition />
      </body>
    </html>
  );
}
