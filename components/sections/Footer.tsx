"use client";

import { useEffect, useRef } from "react";
import { site, practices } from "@/lib/content";
import { solutions } from "@/lib/solutions";
import { Wordmark } from "../Brand";
import TransitionLink from "../TransitionLink";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export default function Footer() {
  const big = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!big.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(big.current!.querySelectorAll(".ch"), { yPercent: 100 }, {
        yPercent: 0, ease: "expo.out", duration: 1.4, stagger: 0.06,
        scrollTrigger: { trigger: big.current, start: "top 95%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="wrap flex flex-col gap-16 pb-10 pt-20 md:pt-28">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-12 lg:gap-6">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-4">
          <Wordmark size={26} />
          <p className="max-w-[380px] text-[16px] leading-relaxed text-mute">A creative technology studio building brands, AI tools, products and broadcasts from Bhubaneswar.</p>
        </div>
        <nav aria-label="Services" className="flex flex-col gap-3.5 text-[15px] text-[#b5b5b5] lg:col-span-2">
          <div className="text-[12px] font-bold tracking-[0.16em] text-white">SERVICES</div>
          {practices.map((p) => <TransitionLink key={p.num} href={p.href} className="hover:text-red">{p.name}</TransitionLink>)}
        </nav>
        <nav aria-label="Solutions" className="flex flex-col gap-3.5 text-[15px] text-[#b5b5b5] lg:col-span-2">
          <div className="text-[12px] font-bold tracking-[0.16em] text-white">SOLUTIONS</div>
          {solutions.map((x) => <TransitionLink key={x.slug} href={`/services/${x.slug}`} className="hover:text-red">{x.name}</TransitionLink>)}
        </nav>
        <nav aria-label="Studio" className="flex flex-col gap-3.5 text-[15px] text-[#b5b5b5] lg:col-span-2">
          <div className="text-[12px] font-bold tracking-[0.16em] text-white">STUDIO</div>
          <TransitionLink href="/#work" className="hover:text-red">Work</TransitionLink>
          <TransitionLink href="/#ai" className="hover:text-red">AI solutions</TransitionLink>
          <TransitionLink href="/#packages" className="hover:text-red">Packages</TransitionLink>
          <TransitionLink href="/#contact" className="hover:text-red">Contact</TransitionLink>
        </nav>
        <div className="col-span-2 flex flex-col gap-3.5 text-[15px] leading-relaxed text-[#b5b5b5] lg:col-span-2">
          <div className="text-[12px] font-bold tracking-[0.16em] text-white">VISIT</div>
          <address className="not-italic">{site.address[0]}<br />{site.address[1]}</address>
          <a href={`mailto:${site.email}`} className="hover:text-red">{site.email}</a>
          <a href={`tel:${site.phoneE164}`} className="hover:text-red">Call {site.phoneDisplay}</a>
          <a href={site.whatsapp} className="hover:text-red">WhatsApp {site.whatsappDisplay}</a>
          <a href={site.maps} target="_blank" rel="noopener" className="hover:text-red">Find us on Google Maps</a>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            {site.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="me noopener" className="text-white hover:text-red">{s.name}</a>
            ))}
          </div>
        </div>
      </div>
      <div ref={big} className="flex overflow-hidden leading-[0.8]" aria-hidden="true"
        style={{ fontWeight: 900, fontStretch: "125%", fontSize: "clamp(80px, 23vw, 380px)", letterSpacing: "-0.02em" }}>
        {"FLYHI".split("").map((c, i) => <span key={i} className={`ch inline-block ${i === 4 ? "text-red" : ""}`}>{c}</span>)}
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-[#1e1e1e] pt-7 text-[14px] text-[#8a8a8a] sm:flex-row">
        <span>© 2026 FlyHi Social. All rights reserved.</span><span>Made in Bhubaneswar</span>
      </div>
    </footer>
  );
}
