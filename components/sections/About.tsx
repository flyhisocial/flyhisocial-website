"use client";

import { useEffect, useRef } from "react";
import { ScrubWords, Reveal } from "../effects";
import { STAIR } from "../Brand";
import { gsap, prefersReducedMotion } from "@/lib/motion";

export default function About() {
  const mark = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mark.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(mark.current!.children, { scale: 0 }, {
        scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12,
        scrollTrigger: { trigger: mark.current, start: "top 85%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="about" className="wrap grid grid-cols-1 gap-10 bg-white py-24 text-black md:grid-cols-12 md:gap-6 md:py-40">
      <div className="flex flex-col gap-7 md:col-span-3">
        <Reveal className="eyebrow text-mute-dark">The studio</Reveal>
        <div ref={mark} className="relative h-[96px] w-[96px]" aria-hidden="true">
          {STAIR.map(([c, r], i) => (
            <div key={i} className="absolute h-[30px] w-[30px]"
              style={{ left: c * 33, top: r * 33, background: i === 4 ? "#EC3013" : "#000" }} />
          ))}
        </div>
      </div>
      <ScrubWords
        className="text-[30px] font-semibold leading-[1.14] tracking-[-0.025em] md:col-span-9 md:text-[clamp(36px,3.8vw,56px)]"
        text="FlyHi Social is a creative technology studio in Bhubaneswar."
        muted="We design, engineer, automate and broadcast — so the website, the AI, the brand and the live moment all come from one team."
      />
    </section>
  );
}
