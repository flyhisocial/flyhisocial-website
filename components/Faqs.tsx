"use client";

import { useState } from "react";
import { SplitReveal, Reveal } from "./effects";

export default function Faqs({ faqs, id = "faq" }: { faqs: { q: string; a: string }[]; id?: string }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="wrap grid grid-cols-1 gap-12 bg-white py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-6 lg:col-span-4">
        <Reveal className="eyebrow text-mute-dark">FAQs</Reveal>
        <SplitReveal className="text-[clamp(38px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.035em]" lines={["Questions,", "answered."]} />
      </div>
      <div className="border-t-2 border-black lg:col-span-7 lg:col-start-6">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-[#d6d6d6]">
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`${id}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-bold leading-snug md:text-[22px]">
                  {f.q}
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black transition-[background-color,color,transform] duration-500 ${isOpen ? "rotate-180 bg-black text-white" : ""}`} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">{isOpen ? <path d="M2 7h10" /> : <path d="M2 7h10M7 2v10" />}</svg>
                  </span>
                </button>
              </h3>
              <div id={`${id}-${i}`} className={`faq-body ${isOpen ? "is-open" : ""}`}>
                <div className="overflow-hidden">
                  <p className="pb-7 pr-12 text-[17px] leading-relaxed text-[#3d3d3d]">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
