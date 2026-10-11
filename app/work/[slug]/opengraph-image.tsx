import { ogCard, ogSize } from "@/lib/ogcard";
import { projects } from "@/lib/content";

export const alt = "FlyHi Social case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return ogCard({
    eyebrow: "Case study",
    title: p?.name ?? "FlyHi Social",
    footer: p?.kicker ?? "Creative technology studio, Bhubaneswar",
  });
}
