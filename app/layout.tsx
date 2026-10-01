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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phoneE164,
  description: site.description,
  address: { "@type": "PostalAddress", streetAddress: site.address[0], addressLocality: "Bhubaneswar", addressRegion: "Odisha", postalCode: "751014", addressCountry: "IN" },
  areaServed: "IN",
  knowsAbout: ["AI automation", "WhatsApp AI assistants", "SaaS development", "Web development", "Brand identity", "Live streaming", "Event technology"],
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
