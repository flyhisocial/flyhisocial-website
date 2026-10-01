import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/lib/services";
import { site } from "@/lib/content";
import { jsonLd as toJsonLd } from "@/lib/jsonld";
import ServicePage from "@/components/ServicePage";
import SolutionPage from "@/components/SolutionPage";
import { solutions, type Solution } from "@/lib/solutions";
import Footer from "@/components/sections/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...services, ...solutions].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug) ?? solutions.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.seoTitle} · FlyHi Social`, description: s.metaDescription, url: `/services/${s.slug}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sol = solutions.find((x) => x.slug === slug);
  if (sol) return <SolutionRoute s={sol} />;
  const i = services.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = services[i];
  const url = `${site.url}/services/${s.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Service", name: s.seoTitle, serviceType: s.practice, url,
      description: s.metaDescription,
      provider: { "@type": "ProfessionalService", name: site.name, url: site.url, telephone: site.phoneE164 },
      areaServed: [{ "@type": "City", name: "Bhubaneswar" }, { "@type": "State", name: "Odisha" }, { "@type": "Country", name: "India" }],
      hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.practice} services`,
        itemListElement: s.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.name, description: d.body } })) },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
        { "@type": "ListItem", position: 3, name: s.practice, item: url },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <ServicePage service={s} next={services[(i + 1) % services.length]} />
      <Footer />
    </>
  );
}

function SolutionRoute({ s }: { s: Solution }) {
  const parent = services.find((p) => p.slug === s.parent)!;
  const url = `${site.url}/services/${s.slug}`;
  const items = s.groups.flatMap((g) => g.items);
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Service", name: s.seoTitle, serviceType: s.name, url,
      description: s.metaDescription,
      provider: { "@type": "ProfessionalService", name: site.name, url: site.url, telephone: site.phoneE164 },
      areaServed: [{ "@type": "City", name: "Bhubaneswar" }, { "@type": "State", name: "Odisha" }, { "@type": "Country", name: "India" }],
      isRelatedTo: { "@type": "Service", name: parent.seoTitle, url: `${site.url}/services/${parent.slug}` },
      hasOfferCatalog: { "@type": "OfferCatalog", name: s.name,
        itemListElement: items.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.name, description: d.body } })) },
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: s.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
        { "@type": "ListItem", position: 3, name: parent.practice, item: `${site.url}/services/${parent.slug}` },
        { "@type": "ListItem", position: 4, name: s.name, item: url },
      ],
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      <SolutionPage solution={s} parent={parent} />
      <Footer />
    </>
  );
}
