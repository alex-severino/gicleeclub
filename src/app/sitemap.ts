import type { MetadataRoute } from "next";
import { routes, studio } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const orders = ["art-print", "sample-pack", "proof-strip", "portfolio-set"];
  return [...Object.keys(routes), ...orders.map((id) => `/order/${id}`)].map((path) => ({
    url: `${studio.url}${path === "/" ? "" : path}`,
  }));
}
