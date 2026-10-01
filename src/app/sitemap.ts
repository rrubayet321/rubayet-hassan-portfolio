import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/profile";
import { analyses } from "@/lib/analysis";
import { projects } from "@/lib/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...["/projects", "/analysis", "/photos"].map((path) => ({
      url: siteUrl + path,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: siteUrl + "/projects/" + project.id,
      priority: 0.7,
    })),
    ...analyses.map((item) => ({
      url: siteUrl + "/analysis/" + item.id,
      priority: 0.6,
    })),
  ];
}
