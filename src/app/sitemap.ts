import type { MetadataRoute } from "next";
import { analyses } from "@/lib/analysis";
import { projects } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubayethassan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/analysis`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/uses`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/photos`, lastModified: new Date(), priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/resume`, lastModified: new Date(), priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${siteUrl}/projects/${p.id}`,
      lastModified: new Date(),
      priority: 0.8,
    }));

  const analysisRoutes: MetadataRoute.Sitemap = analyses.map((a) => ({
    url: `${siteUrl}/analysis/${a.id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...analysisRoutes];
}
