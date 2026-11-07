import type { MetadataRoute } from "next";
import { routes, studio } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(routes).map((path) => ({
    url: `${studio.url}${path === "/" ? "" : path}`,
  }));
}
