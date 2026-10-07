import { homeFaqs, projects, site } from "@/lib/content";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

export const dynamic = "force-static";

// /llms.txt — a plain-text map of the site for AI assistants (llmstxt.org format).
// Generated from the same content as the pages, so it never goes out of date.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Founded by ${site.founder.name}. ${site.credentials}. Address: ${site.address.join(", ")}. Phone: ${site.phoneDisplay}. WhatsApp: ${site.whatsappDisplay}. Email: ${site.email}.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.seoTitle}](${site.url}/services/${s.slug}): ${s.metaDescription}`),
    "",
    "## Solutions",
    ...solutions.map((s) => `- [${s.seoTitle}](${site.url}/services/${s.slug}): ${s.metaDescription}`),
    "",
    "## Work",
    ...projects.map((p) => `- [${p.name}](${site.url}/work/${p.slug}): ${p.summary}`),
    "",
    "## FAQs",
    ...homeFaqs.map((f) => `- ${f.q} ${f.a}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
