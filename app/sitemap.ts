import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.9 })),
    ...solutions.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.7 })),
  ];
}
