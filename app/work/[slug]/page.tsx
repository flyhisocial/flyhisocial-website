import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
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
  return { title: p.name, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const next = projects[(i + 1) % projects.length];
  return (
    <>
      <CaseStudy project={projects[i]} next={next} />
      <Footer />
    </>
  );
}
