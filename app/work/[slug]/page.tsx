import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import { jsonLd as toJsonLd } from "@/lib/jsonld";
import CaseStudy from "@/components/CaseStudy";
import Footer from "@/components/sections/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.name} case study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { type: "article", title: `${title} · FlyHi Social`, description: p.summary, url: `/work/${p.slug}`, ...(p.image ? { images: [p.image] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const url = `${site.url}/work/${p.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "CreativeWork", "@id": `${url}#work`, name: p.name, url,
      headline: `${p.name} — ${p.kicker}`, description: p.summary, abstract: p.challenge,
      dateCreated: p.year, keywords: p.practices.join(", "),
      creator: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` },
      ...(p.image ? { image: `${site.url}${p.image}` } : {}),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <CaseStudy project={p} next={next} />
      <Footer />
    </>
  );
}
