"use client";

import { useEffect, useRef, useState } from "react";
import { practices } from "@/lib/content";
import { SplitReveal, Reveal, Arrow } from "../effects";
import ServiceArt from "../ServiceArt";
import { serviceByPractice } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import TransitionLink from "../TransitionLink";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

// Desktop: the five practices scroll past on the left while one illustration panel stays
// in view on the right and changes to match. Phones: simple cards that rise into place.
export default function Services() {
  const sec = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sec.current; if (!el) return;
    const blocks = gsap.utils.toArray<HTMLElement>(".svc-block", el);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        blocks.forEach((b, i) => ScrollTrigger.create({
          trigger: b, start: "top 55%", end: "bottom 55%",
          onToggle: (st) => { if (st.isActive) setActive(i); },
        }));
        ScrollTrigger.create({
          trigger: el.querySelector(".svc-list"), start: "top 55%", end: "bottom 55%",
          onUpdate: (st) => { if (bar.current) bar.current.style.transform = `scaleY(${st.progress})`; },
        });
      });
      if (!prefersReducedMotion()) {
        mm.add("(max-width: 1023px)", () => {
          blocks.forEach((b) => gsap.fromTo(b, { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: b, start: "top 88%", once: true },
          }));
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sec} className="wrap py-24 md:py-40">
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
        <div className="flex flex-col gap-6">
          <Reveal className="eyebrow text-mute">What we do</Reveal>
          <SplitReveal className="h2" lines={["Five practices.", "One team."]} />
        </div>
        <Reveal as="p" className="max-w-[440px] text-[17px] leading-relaxed text-[#b5b5b5] md:text-[19px]">
          Most projects need more than one of these. That&apos;s the point — strategy, design, AI, engineering and production sit at the same table.
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="svc-list relative flex flex-col gap-5 lg:col-span-7 lg:gap-0 lg:pl-10">
          {/* progress rail (desktop) */}
          <span className="absolute bottom-0 left-0 top-0 hidden w-[2px] bg-[#1e1e1e] lg:block" aria-hidden="true">
            <span ref={bar} className="absolute inset-0 origin-top bg-red" style={{ transform: "scaleY(0)" }} />
          </span>
          {practices.map((p, i) => {
            const svc = serviceByPractice(p.name)!;
            const subs = solutions.filter((x) => x.parent === svc.slug);
            const on = active === i;
            return (
              <article key={p.num}
                className={`svc-block flex flex-col gap-5 rounded-[24px] border border-line bg-[#0b0b0b] p-7 transition-opacity duration-500 md:p-10 lg:min-h-[64vh] lg:justify-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:py-16 ${on ? "lg:opacity-100" : "lg:opacity-30"}`}>
                <div className="flex items-center gap-3 text-[15px] font-semibold text-red">
                  {p.num} <span className="text-mute">/ 05</span>
                </div>
                <h3 className="text-[clamp(40px,5.6vw,92px)] font-extrabold leading-[0.95] tracking-[-0.04em]">{p.name}</h3>
                <p className="max-w-[520px] text-[17px] leading-relaxed text-[#b5b5b5] md:text-[20px]">{p.blurb}</p>
                <div className="mx-auto my-2 w-full max-w-[380px] lg:hidden"><ServiceArt kind={svc.kind} /></div>
                <ul className="flex flex-wrap gap-2">
                  {p.items.map((it) => (
                    <li key={it} className="rounded-full border border-[#2e2e2e] px-4 py-2 text-[14px] font-semibold text-[#d0d0d0]">{it}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                  <TransitionLink href={p.href} className="inline-flex items-center gap-2 text-[16px] font-semibold hover:text-red">
                    {p.cta} <Arrow />
                  </TransitionLink>
                  {subs.map((x) => (
                    <TransitionLink key={x.slug} href={`/services/${x.slug}`} className="text-[15px] font-semibold text-mute underline-offset-4 hover:text-white hover:underline">
                      {x.name}
                    </TransitionLink>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Illustration panel that stays in view and follows the active practice (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[18vh] flex h-[64vh] flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-[#0b0b0b] p-10">
            <div className="flex items-center justify-between text-[14px] font-semibold">
              <span className="text-red">{practices[active].num} / 05</span>
              <span className="flex gap-1.5" aria-hidden="true">
                {practices.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-red" : "w-1.5 bg-[#3a3a3a]"}`} />
                ))}
              </span>
            </div>
            <div className="relative flex-1">
              {practices.map((p, i) => (
                <div key={p.num} aria-hidden={i !== active}
                  className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                    i === active ? "scale-100 opacity-100 blur-0" : i < active ? "-translate-y-8 scale-95 opacity-0 blur-sm" : "translate-y-8 scale-95 opacity-0 blur-sm"}`}>
                  <div className="w-full max-w-[420px]"><ServiceArt kind={serviceByPractice(p.name)!.kind} /></div>
                </div>
              ))}
            </div>
            <div className="text-[22px] font-extrabold tracking-[-0.02em]">{practices[active].name}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
