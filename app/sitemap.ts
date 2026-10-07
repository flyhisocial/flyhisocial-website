import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

export const dynamic = "force-static";

// Statically generated, so this is the deploy time: tells crawlers the pages changed with each release.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...solutions.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
