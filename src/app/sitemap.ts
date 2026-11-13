import type { MetadataRoute } from "next";
import { isPageVisible, routes, studio } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(routes).filter(isPageVisible).map((path) => ({
    url: `${studio.url}${path === "/" ? "" : path}`,
  }));
}
