/** Studio facts and the site map. Everything navigational reads from here. */

export const studio = {
  name: "Giclée Club",
  email: "hello@gicleeclub.com",
  instagram: "https://www.instagram.com/gicleeclub/",
  url: "https://www.gicleeclub.com",
};

/** Retained studio records; these are not part of the public-facing copy. */
export const studioDetails = {
  legalName: "Art Britannia Ltd trading as Giclée Club",
  companyNumber: "16631916",
  street: "12 Mulberry Place, Pinnell Road",
  city: "London SE9 6AR",
};

/** Keep paused content in the code so it can be restored when needed. */
export const siteVisibility = {
  prices: false,
  shipping: false,
  contactOrderIntro: false,
  portfolioTemplates: false,
};

export function isPageVisible(pathname: string) {
  if (pathname === "/prices") return siteVisibility.prices;
  if (pathname === "/shipping") return siteVisibility.shipping;
  return true;
}

/** Nothing is ordered on the site: every order starts as a message to the studio. */
export function contactHref(about?: string) {
  return about ? `/contact-us?about=${encodeURIComponent(about)}` : "/contact-us";
}

/** Each page has its own colour story, taken from Angelina's gradient pairs. */
export type InkName = keyof typeof inks;

export const inks = {
  home: ["#fe5581", "#ffa602"],
  giclee: ["#fe5581", "#ffb1e0"],
  packaging: ["#ffb1e0", "#ca89ea"],
  certificate: ["#ffa602", "#a0ba3d"],
  proof: ["#05b470", "#2466fd"],
  portfolio: ["#9ba8ae", "#424749"],
  samples: ["#6f3fff", "#ffb1e0"],
  prices: ["#2466fd", "#ffb1e0"],
  printers: ["#2466fd", "#9ba8ae"],
  papers: ["#ffa602", "#ffb1e0"],
  preparing: ["#2466fd", "#ffa602"],
  proofing: ["#05b470", "#ffb1e0"],
  icc: ["#5000b4", "#6f3fff"],
  people: ["#6f3fff", "#ffb1e0"],
  studio: ["#fe5581", "#ffb1e0"],
  planet: ["#ff7e3f", "#ffb1e0"],
  shipping: ["#2466fd", "#fe5581"],
  contact: ["#5000b4", "#ff7e3f"],
  legal: ["#9ba8ae", "#424749"],
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** Preview shown in the menu panel. */
  image: string;
};

export type NavItem =
  | { label: string; href: string }
  | { label: string; sections: NavSection[] };

export type NavSection = {
  label?: string;
  items: NavLink[];
};

const gicleePrinting: NavLink = {
  label: "Giclée Printing",
  href: "/giclee-printing",
  image: "/media/section/giclee-printing.png",
};
const brandedPackaging: NavLink = {
  label: "Branded Packaging",
  href: "/branded-packaging",
  image: "/media/section/packaging.png",
};

export const nav: NavItem[] = [
  {
    label: "Printing",
    sections: [
      {
        label: "Services & extras",
        items: [
          gicleePrinting,
          brandedPackaging,
          {
            label: "Certificate of Authenticity",
            href: "/certificate-of-authenticity",
            image: "/media/section/certificate.png",
          },
          {
            label: "Proof Printing Strip",
            href: "/proof-printing-strip",
            image: "/media/section/proof-strip.png",
          },
          {
            label: "Premium Portfolio Set",
            href: "/premium-portfolio-set",
            image: "/media/section/portfolio.png",
          },
          {
            label: "Sample Packs",
            href: "/sample-packs",
            image: "/media/section/sp-mixed-arts.png",
          },
        ],
      },
      {
        label: "Papers & equipment",
        items: [
          {
            label: "Fine Art Papers",
            href: "/fine-art-papers",
            image: "/media/section/papers.png",
          },
          {
            label: "Our Printers",
            href: "/high-end-printers",
            image: "/media/section/printers.png",
          },
        ],
      },
    ],
  },
  ...(siteVisibility.prices ? [{ label: "Prices", href: "/prices" }] : []),
  {
    label: "Help",
    sections: [
      {
        items: [
          {
            label: "Preparing Your Files",
            href: "/preparing-your-files",
            image: "/media/section/requirements.png",
          },
          {
            label: "Soft Proofing",
            href: "/soft-proofing",
            image: "/media/section/monitor.png",
          },
          {
            label: "ICC Print Profiles",
            href: "/icc-profiles",
            image: "/media/section/icc-chart.png",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    sections: [
      {
        items: [
          {
            label: "Who We Are",
            href: "/who-we-are",
            image: "/media/section/studio-6.png",
          },
          {
            label: "Our Print Studio",
            href: "/our-print-studio",
            image: "/media/section/studio-2.png",
          },
          {
            label: "Sustainability",
            href: "/sustainability",
            image: "/media/section/solar-panels.png",
          },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

/** Route → ink and the title flashed on the page transition. */
export const routes: Record<string, { ink: InkName; title: string }> = {
  "/": { ink: "home", title: "We print for artists" },
  "/giclee-printing": { ink: "giclee", title: "Giclée Printing" },
  "/branded-packaging": { ink: "packaging", title: "Branded Packaging" },
  "/certificate-of-authenticity": { ink: "certificate", title: "Certificate" },
  "/proof-printing-strip": { ink: "proof", title: "Proof Strip" },
  "/premium-portfolio-set": { ink: "portfolio", title: "Portfolio Set" },
  "/sample-packs": { ink: "samples", title: "Sample Packs" },
  "/prices": { ink: "prices", title: "Prices" },
  "/high-end-printers": { ink: "printers", title: "Printers" },
  "/fine-art-papers": { ink: "papers", title: "Fine Art Papers" },
  "/preparing-your-files": { ink: "preparing", title: "Your Files" },
  "/soft-proofing": { ink: "proofing", title: "Soft Proofing" },
  "/icc-profiles": { ink: "icc", title: "ICC Profiles" },
  "/who-we-are": { ink: "people", title: "Who We Are" },
  "/our-print-studio": { ink: "studio", title: "Print Studio" },
  "/sustainability": { ink: "planet", title: "Sustainability" },
  "/contact-us": { ink: "contact", title: "Contact" },
  "/shipping": { ink: "shipping", title: "Shipping" },
  "/terms-and-conditions": { ink: "legal", title: "Terms" },
  "/privacy-policy": { ink: "legal", title: "Privacy" },
};

export function routeFor(pathname: string) {
  return routes[pathname] ?? routes["/"];
}

/** The four Hahnemühle papers. */
export const papers = [
  {
    id: "photo-rag",
    name: "Photo Rag",
    line: "Matt FineArt Smooth",
    gsm: 308,
    fibre: "100% cotton",
    white: "White",
    finish: "Matt premium inkjet coating",
    surface: "Characteristic felt structure",
  },
  {
    id: "german-etching",
    name: "German Etching",
    line: "Matt FineArt Textured",
    gsm: 310,
    fibre: "100% α-cellulose",
    white: "White",
    finish: "Genuine mould-made paper",
    surface: "Clearly defined felt structure",
  },
  {
    id: "pearl",
    name: "FineArt Pearl",
    line: "Glossy",
    gsm: 285,
    fibre: "100% α-cellulose",
    white: "Bright white",
    finish: "Pearl-gloss premium inkjet coating",
    surface: "Delicately textured surface",
  },
  {
    id: "bamboo",
    name: "Bamboo",
    line: "Natural Line",
    gsm: 290,
    fibre: "90% bamboo fibres, 10% cotton",
    white: "Natural white",
    finish: "Matt premium inkjet coating",
    surface: "Soft, lightly textured felt structure",
  },
] as const;

export type PaperId = (typeof papers)[number]["id"];
