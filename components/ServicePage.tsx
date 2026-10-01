"use client";

import { useState } from "react";
import type { Service } from "@/lib/services";
import { projects, site } from "@/lib/content";
import { SplitReveal, Reveal, Magnetic, Arrow } from "./effects";
import { Cover } from "./Brand";
import ServiceArt from "./ServiceArt";
import Object3D from "./Object3D";
import TransitionLink from "./TransitionLink";
import { solutionsFor } from "@/lib/solutions";

export default function ServicePage({ service: s, next }: { service: Service; next: Service }) {
  const [open, setOpen] = useState(0);
  const related = s.related.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean) as typeof projects;
  const subs = solutionsFor(s.slug);
  const wa = `${site.whatsapp}?text=${encodeURIComponent(`Hi FlyHi, I'd like to talk about ${s.practice}.`)}`;

  return (
    <article>
      {/* Hero */}
      <header className="wrap relative grid grid-cols-1 items-center gap-6 pb-16 pt-32 md:pt-40 lg:min-h-[92svh] lg:grid-cols-12">
        <div className="relative z-10 flex flex-col gap-7 lg:col-span-7">
          <Reveal delay={0.5}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] font-semibold text-mute">
              <TransitionLink href="/" className="hover:text-white">Home</TransitionLink><span>/</span>
              <TransitionLink href="/#services" className="hover:text-white">Services</TransitionLink><span>/</span>
              <span className="text-white" aria-current="page">{s.practice}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.55} className="eyebrow text-mute">{s.num} / 05 · {s.practice}</Reveal>
          <SplitReveal as="h1" onLoad delay={0.65} className="display text-[clamp(46px,7vw,112px)]"
            lines={[s.headline[0], <span key="h" className="text-red">{s.headline[1]}</span>]} />
          <Reveal delay={0.9} as="p" className="max-w-[620px] text-[18px] leading-relaxed text-[#b5b5b5] md:text-[21px]">{s.intro[0]}</Reveal>
          <Reveal delay={1} className="flex flex-col gap-3 sm:flex-row">
            <Magnetic><a href={wa} className="btn btn-red w-full">Talk to us on WhatsApp <Arrow /></a></Magnetic>
            <Magnetic><TransitionLink href="/#contact" className="btn btn-ghost w-full">Send an enquiry</TransitionLink></Magnetic>
          </Reveal>
        </div>
        <Object3D kind={s.kind} className="h-[340px] lg:col-span-5 lg:h-[620px]" />
      </header>

      {/* Overview */}
      <section className="wrap grid grid-cols-1 items-center gap-12 bg-white py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <Reveal className="eyebrow text-mute-dark">Overview</Reveal>
          <h2 className="sr-only">About our {s.practice} service</h2>
          {s.intro.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.08} className={i === 0 ? "text-[24px] font-semibold leading-snug tracking-[-0.015em] md:text-[30px]" : "text-[17px] leading-relaxed text-[#3d3d3d] md:text-[19px]"}>{p}</Reveal>
          ))}
        </div>
        <Reveal className="rounded-[28px] bg-black p-6 md:p-10 lg:col-span-5 lg:col-start-8">
          <ServiceArt kind={s.kind} />
        </Reveal>
      </section>

      {/* Deliverables */}
      <section className="wrap py-20 md:py-32">
        <div className="mb-12 flex flex-col gap-6 md:mb-16">
          <Reveal className="eyebrow text-mute">What you get</Reveal>
          <SplitReveal className="h2" lines={[`${s.practice} services`]} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.deliverables.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 0.07}>
              <div className="flex h-full flex-col gap-3 rounded-[22px] border border-line bg-[#0b0b0b] p-7 transition-colors duration-300 hover:border-red">
                <span className="text-[14px] font-semibold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[23px] font-extrabold tracking-[-0.02em]">{d.name}</h3>
                <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Specialist solution pages under this practice */}
      {subs.length > 0 && (
        <section className="wrap pb-20 md:pb-32">
          <div className="mb-8 flex flex-col gap-5">
            <Reveal className="eyebrow text-mute">Specialist solutions</Reveal>
            <SplitReveal className="text-[clamp(34px,4vw,60px)] font-extrabold leading-none tracking-[-0.035em]" lines={["Go deeper."]} />
          </div>
          <ul className="border-t border-[#1e1e1e]">
            {subs.map((o) => (
              <li key={o.slug}>
                <TransitionLink href={`/services/${o.slug}`} data-cursor="Open"
                  className="sweep group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-[#1e1e1e] py-7 md:grid-cols-[1.1fr_1fr_auto] md:py-9">
                  <span className="text-[clamp(28px,4vw,60px)] font-extrabold leading-none tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">{o.name}</span>
                  <span className="hidden max-w-[460px] text-[16px] leading-relaxed text-[#b5b5b5] transition-colors group-hover:text-black md:block">{o.lede}</span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-black group-hover:bg-black md:h-16 md:w-16">
                    <Arrow className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How it works + who it's for */}
      <section className="wrap grid grid-cols-1 gap-16 bg-bone py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal className="eyebrow text-mute-dark">How it works</Reveal>
          <ol className="border-t-2 border-black">
            {s.steps.map((st, i) => (
              <Reveal as="li" key={st.name} delay={i * 0.06} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#cfcfca] py-6 md:grid-cols-[64px_1fr]">
                <span className="text-[16px] font-bold text-red-deep">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[22px] font-extrabold tracking-[-0.015em] md:text-[26px]">{st.name}</span>
                  <span className="text-[16px] leading-relaxed text-[#3d3d3d] md:text-[17px]">{st.body}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <div className="flex flex-col gap-5">
            <Reveal className="eyebrow text-mute-dark">Who it&apos;s for</Reveal>
            <ul className="flex flex-wrap gap-2">
              {s.industries.map((it) => <li key={it} className="rounded-full border border-black/70 px-4 py-2 text-[15px] font-semibold">{it}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <Reveal className="eyebrow text-mute-dark">Tools we use</Reveal>
            <ul className="flex flex-wrap gap-2">
              {s.tools.map((it) => <li key={it} className="rounded-full bg-black px-4 py-2 text-[14px] font-semibold text-white">{it}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="wrap py-20 md:py-32">
          <div className="mb-12 flex flex-col gap-6">
            <Reveal className="eyebrow text-mute">Related work</Reveal>
            <SplitReveal className="h2" lines={["Proof, not promises."]} />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <TransitionLink href={`/work/${p.slug}`} data-cursor="View" className="group flex flex-col gap-5">
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-[22px]">
                    <span className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105">
                      <Cover cover={p.cover} sub={p.coverSub} bg={p.bg} accent={p.accent} image={p.image} alt={p.alt} />
                    </span>
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">{p.kicker}</span>
                    <span className="text-[30px] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-red">{p.name}</span>
                  </span>
                </TransitionLink>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="wrap grid grid-cols-1 gap-12 bg-white py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Reveal className="eyebrow text-mute-dark">FAQs</Reveal>
          <SplitReveal className="text-[clamp(38px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.035em]" lines={["Questions,", "answered."]} />
        </div>
        <div className="border-t-2 border-black lg:col-span-7 lg:col-start-6">
          {s.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[#d6d6d6]">
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-bold leading-snug md:text-[22px]">
                    {f.q}
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-colors ${isOpen ? "bg-black text-white" : ""}`} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">{isOpen ? <path d="M2 7h10" /> : <path d="M2 7h10M7 2v10" />}</svg>
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={!isOpen} className="pb-7 pr-12 text-[17px] leading-relaxed text-[#3d3d3d]">{f.a}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA + next service */}
      <section className="wrap flex flex-col items-start gap-8 bg-red py-20 text-black md:py-28">
        <Reveal className="eyebrow on-red font-bold">Let&apos;s talk</Reveal>
        <SplitReveal className="display text-[clamp(48px,7vw,112px)]" lines={[s.ctaLine]} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic><a href={wa} className="btn btn-ink w-full">Chat on WhatsApp <Arrow /></a></Magnetic>
          <Magnetic><TransitionLink href="/#contact" className="btn btn-line w-full">Send an enquiry</TransitionLink></Magnetic>
        </div>
      </section>
      <TransitionLink href={`/services/${next.slug}`} data-cursor="Next" className="wrap group flex flex-col gap-4 border-b border-[#1e1e1e] py-20 md:py-28">
        <span className="eyebrow text-mute">Next service</span>
        <span className="flex items-center justify-between gap-6">
          <span className="display text-[clamp(44px,8vw,130px)] transition-colors duration-500 group-hover:text-red">{next.practice}</span>
          <span className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-white group-hover:text-black md:flex"><Arrow className="h-6 w-6" /></span>
        </span>
      </TransitionLink>
    </article>
  );
}
