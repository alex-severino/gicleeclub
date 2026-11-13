import type { NextConfig } from "next";
import { siteVisibility } from "./src/lib/site";

/** Old Shopify paths, so existing links and search results keep working. */
const legacyPaths: Record<string, string> = {
  "/pages/printers": "/high-end-printers",
  "/pages/high-end-printers": "/high-end-printers",
  "/pages/papers": "/fine-art-papers",
  "/pages/fine-art-papers": "/fine-art-papers",
  "/pages/giclee-printing": "/giclee-printing",
  "/pages/branded-packaging": "/branded-packaging",
  "/pages/certificate-of-authenticity": "/certificate-of-authenticity",
  "/pages/proof-printing-strip": "/proof-printing-strip",
  "/pages/premium-portfolio-set": "/premium-portfolio-set",
  "/pages/sample-packs": "/sample-packs",
  "/pages/prices": "/prices",
  "/pages/preparing-your-files": "/preparing-your-files",
  "/pages/soft-proofing": "/soft-proofing",
  "/pages/icc-profiles": "/icc-profiles",
  "/pages/who-we-are": "/who-we-are",
  "/pages/our-print-studio": "/our-print-studio",
  "/pages/sustainability-statement": "/sustainability",
  "/pages/contact-us": "/contact-us",
  "/pages/shipping": "/shipping",
  "/pages/terms-and-conditions": "/terms-and-conditions",
  "/pages/privacy-policy": "/privacy-policy",
};

/** No orders on the site for now: every route to ordering leads to a conversation. */
const orderPaths = ["/order", "/order/:path*", "/pages/order", "/products/:path*"];

/** Retain the original example templates, which contain a sample postal address. */
const portfolioTemplatePaths = [
  "/downloads/Giclee-Club_Templates_CV_CL_Note.zip",
  "/media/section/cv-cl-note.png",
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 88],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    return [
      ...(!siteVisibility.portfolioTemplates
        ? portfolioTemplatePaths.map((source) => ({
            source,
            destination: "/contact-us",
            permanent: false,
          }))
        : []),
      ...Object.entries(legacyPaths).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...orderPaths.map((source) => ({
        source,
        destination: "/contact-us",
        permanent: false,
      })),
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
