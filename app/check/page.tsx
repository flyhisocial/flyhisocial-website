import type { Metadata } from "next";
import AICheck from "@/components/AICheck";
import Faqs from "@/components/Faqs";
import Footer from "@/components/sections/Footer";
import TransitionLink from "@/components/TransitionLink";
import { Reveal, SplitReveal } from "@/components/effects";
import { site } from "@/lib/content";
import { checkFaqs, checkIntro, checkSignals } from "@/lib/checkcontent";
import { jsonLd as toJsonLd } from "@/lib/jsonld";

const TITLE = "Free AI Copy Checker for Websites | FlyHi Social";
const DESCRIPTION =
  "Free AI copy checker for websites. See the exact lines that sound AI-written, from em dashes to buzzwords and template design, with a score out of 100.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/check" },
  openGraph: { title: "Does your website sound like ChatGPT? Check it free", description: DESCRIPTION, url: `${site.url}/check`, type: "website" },
  twitter: { card: "summary_large_image", title: "Does your website sound like ChatGPT? Check it free", description: DESCRIPTION },
};

const PAGE = `${site.url}/check`;
const structured = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${PAGE}#tool`,
    name: "FlyHi AI Copy Checker",
    url: PAGE,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@id": `${site.url}/#organization` },
    description: checkIntro,
    featureList: checkSignals.map((s) => s.name),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Free AI copy checker", item: PAGE },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PAGE}#faq`,
    mainEntity: checkFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(structured) }} />
      <section className="wrap flex flex-col gap-12 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="flex max-w-[1000px] flex-col gap-7">
          <Reveal delay={0.25}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] font-semibold text-mute">
              <TransitionLink href="/" className="hover:text-white">Home</TransitionLink><span>/</span>
              <span className="text-white" aria-current="page">Free AI copy checker</span>
            </nav>
          </Reveal>
          <SplitReveal as="h1" onLoad delay={0.35} className="display text-[clamp(48px,7.5vw,112px)]"
            lines={["Does your website", <>sound like <span className="text-red">ChatGPT?</span></>]} />
          <Reveal delay={0.6} as="p" className="max-w-[680px] text-[18px] leading-relaxed text-[#b5b5b5] md:text-[20px]">
            A free AI copy checker for business websites. Customers now spot AI-written copy in seconds, and it makes a business look
            generic. Enter your website and we&apos;ll show you the exact lines that give it away.
          </Reveal>
        </div>
        <AICheck />
      </section>

      <section aria-labelledby="what" className="wrap grid grid-cols-1 gap-10 border-t border-line py-20 md:py-28 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal className="eyebrow text-mute">How it works</Reveal>
          <h2 id="what" className="text-[clamp(34px,4vw,56px)] font-extrabold leading-[1.02] tracking-[-0.035em]">What the checker looks for</h2>
          <p className="max-w-[420px] text-[17px] leading-relaxed text-[#b5b5b5]">{checkIntro}</p>
        </div>
        <div className="flex flex-col lg:col-span-7 lg:col-start-6">
          {checkSignals.map((s) => (
            <article key={s.name} className="flex flex-col gap-3 border-t border-line py-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[23px] font-extrabold tracking-[-0.02em]">{s.name}</h3>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-mute">{s.kind}</span>
              </div>
              <p className="text-[17px] leading-relaxed text-[#d6d6d6]">{s.body}</p>
              <p className="text-[16px] leading-relaxed text-[#b5b5b5]"><span className="font-bold text-white">How to fix it: </span>{s.fix}</p>
            </article>
          ))}
          <p className="border-t border-line pt-8 text-[16px] leading-relaxed text-[#b5b5b5]">
            We built this after running our own site through an AI checker and finding eleven em dashes and a three-word slogan.
            Fixing them took a day. See our <TransitionLink href="/services/web-app-development" className="font-semibold text-white underline underline-offset-4 hover:text-red">website services</TransitionLink> or
            the <TransitionLink href="/#packages" className="font-semibold text-white underline underline-offset-4 hover:text-red">packages and prices</TransitionLink>.
          </p>
        </div>
      </section>

      <Faqs faqs={checkFaqs} id="faq-check" />
      <Footer />
    </>
  );
}
