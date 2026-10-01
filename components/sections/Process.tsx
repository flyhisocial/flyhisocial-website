"use client";

import { useEffect, useRef } from "react";
import { process } from "@/lib/content";
import { SplitReveal, Reveal } from "../effects";
import { gsap, prefersReducedMotion } from "@/lib/motion";

// Four steps that climb like the stair mark as they scroll into view.
export default function Process() {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!row.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(row.current!.children, { y: 160, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.14,
        scrollTrigger: { trigger: row.current, start: "top 80%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="wrap bg-white py-24 text-black md:py-40">
      <div className="mb-14 flex flex-col gap-6 md:mb-20">
        <Reveal className="eyebrow text-mute-dark">How we work</Reveal>
        <SplitReveal className="h2" lines={["Step by step, upward."]} />
      </div>
      <div ref={row} className="grid grid-cols-1 items-end gap-4 md:grid-cols-4 md:gap-5">
        {process.map((s, i) => {
          const last = i === process.length - 1;
          return (
            <div key={s.num}
              className={`flex flex-col gap-3 rounded-[22px] p-7 md:gap-4 md:p-8 ${last ? "bg-red-deep text-white" : "bg-black text-white"}`}
              style={{ minHeight: `calc(220px + ${i} * var(--step, 0px))` }}>
              <div className={`text-[15px] font-semibold ${last ? "text-white" : "text-mute"}`}>{s.num}</div>
              <h3 className="text-[28px] font-extrabold tracking-[-0.02em] md:text-[30px]">{s.name}</h3>
              <p className={`mt-auto text-[16px] leading-relaxed md:text-[17px] ${last ? "text-white" : "text-[#b5b5b5]"}`}>{s.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
