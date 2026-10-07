import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export const dynamic = "force-static";

// Search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot…) are all welcome:
// being crawlable is how FlyHi Social gets found and cited. Only the API is kept out.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
