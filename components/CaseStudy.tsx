"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/content";
import { SplitReveal, Reveal, Counter, Arrow } from "./effects";
import { Cover } from "./Brand";
import TransitionLink from "./TransitionLink";
import { gsap, prefersReducedMotion, scrubAmt } from "@/lib/motion";

export default function CaseStudy({ project: p, next }: { project: Project; next: Project }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frame.current || !inner.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(frame.current, { clipPath: "inset(12% 8% 12% 8% round 28px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
        scrollTrigger: { trigger: frame.current, start: "top 90%", end: "top 20%", scrub: scrubAmt() },
      });
      gsap.fromTo(inner.current, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1, ease: "none",
        scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: scrubAmt() } });
    });
    return () => ctx.revert();
  }, [p.slug]);

  return (
    <article>
      <header className="wrap flex flex-col gap-8 pb-14 pt-36 md:pt-48">
        <Reveal delay={0.5}><TransitionLink href="/#work" className="inline-flex items-center gap-2 text-[15px] font-semibold text-mute hover:text-white">
          <Arrow className="rotate-180" /> All work</TransitionLink></Reveal>
        <Reveal delay={0.55} className="eyebrow text-mute">{p.kicker}</Reveal>
        <SplitReveal as="h1" onLoad delay={0.65} className="display text-[clamp(52px,9vw,150px)]" lines={[p.name]} />
        <Reveal delay={0.9} as="p" className="max-w-[760px] text-[19px] leading-relaxed text-[#b5b5b5] md:text-[23px]">{p.summary}</Reveal>
      </header>

      <div className="wrap">
        <div ref={frame} className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/9]">
          <div ref={inner} className="absolute inset-0">
            <Cover big cover={p.cover} sub={p.coverSub} bg={p.bg} accent={p.accent} image={p.image} alt={p.alt} />
          </div>
        </div>
      </div>

      <section className="wrap grid grid-cols-1 gap-10 py-20 md:grid-cols-3 md:gap-6 md:py-28" aria-label="Key facts">
        {p.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col gap-3 border-t border-[#2a2a2a] pt-6">
            <Counter value={s.value} className="text-[clamp(56px,7vw,110px)] font-extrabold leading-none tracking-[-0.04em]" />
            <span className="text-[16px] text-mute md:text-[17px]">{s.label}</span>
          </Reveal>
        ))}
      </section>

      <section className="wrap grid grid-cols-1 gap-12 bg-white py-20 text-black md:grid-cols-12 md:gap-6 md:py-32">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Reveal className="eyebrow text-mute-dark">The challenge</Reveal>
          <Reveal as="p" className="text-[24px] font-semibold leading-snug tracking-[-0.015em] md:text-[30px]">{p.challenge}</Reveal>
        </div>
        <div className="flex flex-col gap-5 md:col-span-6 md:col-start-7">
          <Reveal className="eyebrow text-mute-dark">What we did</Reveal>
          <ul className="border-t-2 border-black">
            {p.work.map((w, i) => (
              <Reveal as="li" key={w} delay={i * 0.06} className="flex gap-5 border-b border-[#d6d6d6] py-5 text-[18px] md:text-[20px]">
                <span className="w-8 shrink-0 font-bold text-red-deep">{String(i + 1).padStart(2, "0")}</span>{w}
              </Reveal>
            ))}
          </ul>
          <div className="text-[15px] font-semibold text-mute-dark">{p.tags} · {p.year}</div>
        </div>
      </section>

      <TransitionLink href={`/work/${next.slug}`} data-cursor="Next" className="wrap group flex flex-col gap-4 border-b border-[#1e1e1e] py-24 md:py-36">
        <span className="eyebrow text-mute">Next project</span>
        <span className="flex items-center justify-between gap-6">
          <span className="display text-[clamp(48px,9vw,150px)] transition-colors duration-500 group-hover:text-red">{next.name}</span>
          <span className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:bg-white group-hover:text-black md:flex">
            <Arrow className="h-6 w-6" />
          </span>
        </span>
      </TransitionLink>
    </article>
  );
}
