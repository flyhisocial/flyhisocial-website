import { ogCard, ogSize } from "@/lib/ogcard";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";

export const alt = "FlyHi Social service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return [...services, ...solutions].map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug) ?? solutions.find((x) => x.slug === slug);
  return ogCard({
    eyebrow: s ? ("practice" in s ? String(s.practice) : "Services") : "Services",
    title: s?.seoTitle ?? "FlyHi Social",
    footer: "Creative technology studio, Bhubaneswar",
  });
}
