import type { Metadata } from "next";
import AICheck from "@/components/AICheck";
import Footer from "@/components/sections/Footer";
import { Reveal, SplitReveal } from "@/components/effects";
import { site } from "@/lib/content";
import { jsonLd as toJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Free AI Copy Checker: does your website sound like ChatGPT?",
  description:
    "Free tool from FlyHi Social. Enter your website and see the exact lines that sound AI-written, such as em dashes, formula slogans and buzzwords, with a score out of 100.",
  alternates: { canonical: "/check" },
};

const toolJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${site.url}/check#tool`,
  name: "FlyHi AI Copy Checker",
  url: `${site.url}/check`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  publisher: { "@id": `${site.url}/#organization` },
  description: "Scores how AI-written a web page sounds and quotes the lines that give it away.",
};

export default function CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(toolJsonLd) }} />
      <section className="wrap flex flex-col gap-12 pb-24 pt-36 md:pb-36 md:pt-44">
        <div className="flex max-w-[1000px] flex-col gap-7">
          <Reveal className="eyebrow text-mute" delay={0.3}>Free tool</Reveal>
          <SplitReveal as="h1" onLoad delay={0.35} className="display text-[clamp(48px,7.5vw,112px)]"
            lines={["Does your website", <>sound like <span className="text-red">ChatGPT?</span></>]} />
          <Reveal delay={0.6} as="p" className="max-w-[640px] text-[18px] leading-relaxed text-[#b5b5b5] md:text-[20px]">
            Customers now spot AI-written copy in seconds, and it makes a business look generic. Enter your website and we&apos;ll
            show you the exact lines that give it away.
          </Reveal>
        </div>
        <AICheck />
      </section>
      <Footer />
    </>
  );
}
