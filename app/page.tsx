import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import AIAutomation from "@/components/sections/AIAutomation";
import Process from "@/components/sections/Process";
import Packages from "@/components/sections/Packages";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Faqs from "@/components/Faqs";
import { homeFaqs, site } from "@/lib/content";
import { jsonLd as toJsonLd } from "@/lib/jsonld";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <AIAutomation />
      <Process />
      <Packages />
      <Faqs faqs={homeFaqs} id="faq-home" />
      <Contact />
      <Footer />
    </>
  );
}
