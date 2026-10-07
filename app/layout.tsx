import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import { site } from "@/lib/content";
import { jsonLd as toJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "FlyHi Social — Creative technology studio, Bhubaneswar", template: "%s · FlyHi Social" },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, images: ["/media/hero-poster.jpg"], locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#000000" };

// One connected graph: the business, its founder and the website. Stable @ids let every page refer back to the same entity,
// which is how Google's Knowledge Graph and AI assistants recognise "FlyHi Social" as one business.
const ORG_ID = `${site.url}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` },
      image: `${site.url}/media/hero-poster.jpg`,
      email: site.email,
      telephone: site.phoneE164,
      description: site.description,
      slogan: site.tagline,
      address: { "@type": "PostalAddress", streetAddress: site.address[0], addressLocality: "Bhubaneswar", addressRegion: "Odisha", postalCode: "751014", addressCountry: "IN" },
      areaServed: [{ "@type": "City", name: "Bhubaneswar" }, { "@type": "State", name: "Odisha" }, { "@type": "Country", name: "India" }],
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", telephone: site.phoneE164, email: site.email, areaServed: "IN" },
        { "@type": "ContactPoint", contactType: "customer support", url: site.whatsapp, areaServed: "IN" },
      ],
      founder: { "@type": "Person", "@id": `${site.url}/#founder`, name: site.founder.name, jobTitle: site.founder.jobTitle, sameAs: site.founder.sameAs, worksFor: { "@id": ORG_ID } },
      hasCredential: { "@type": "EducationalOccupationalCredential", name: site.credentials },
      knowsAbout: ["AI automation", "WhatsApp AI assistants", "SaaS development", "Web development", "Brand identity", "Live streaming", "Event technology"],
      sameAs: [...site.sameAs, site.maps],
      hasMap: site.maps,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Marks JS as running so hidden-until-animated styles only apply when animation will happen */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript><style>{".intro-cover,.pixels{display:none}"}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-black">Skip to content</a>
        <SmoothScroll />
        <PageTransition>
          <Header />
          <main id="main">{children}</main>
        </PageTransition>
        <Cursor />
      </body>
    </html>
  );
}
