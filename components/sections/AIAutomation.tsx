"use client";

import { useEffect, useRef } from "react";
import { aiSolutions, saasProducts } from "@/lib/content";
import { SplitReveal, Reveal, Arrow, Magnetic } from "../effects";
import TransitionLink from "../TransitionLink";
import { gsap, prefersReducedMotion, scrubAmt } from "@/lib/motion";

type Msg = { from: "user" | "ai" | "sys"; text: string };
const CHAT: Msg[] = [
  { from: "user", text: "Hi, is Dr. Mishra available tomorrow?" },
  { from: "ai", text: "Yes — Dr. Mishra has 10:30 am and 4:00 pm free tomorrow. Which suits you?" },
  { from: "user", text: "4 pm please" },
  { from: "ai", text: "Booked for 4:00 pm. I'll remind you at 3 pm. Reply 1 to reschedule." },
  { from: "sys", text: "Lead saved to CRM · Reminder scheduled · Clinic notified" },
];

// Spotlight follows the cursor across each card.
function spot(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function AIAutomation() {
  const section = useRef<HTMLElement>(null);
  const chat = useRef<HTMLDivElement>(null);

  // The demo chat plays out as you scroll past the solutions.
  useEffect(() => {
    if (!section.current || !chat.current) return;
    const bubbles = chat.current.querySelectorAll<HTMLElement>(".bubble");
    const typing = chat.current.querySelector<HTMLElement>(".typing");
    if (prefersReducedMotion()) { gsap.set(bubbles, { opacity: 1, y: 0 }); return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current!.querySelector(".ai-grid"), start: "top 60%", end: "bottom 70%", scrub: scrubAmt(0.6) },
      });
      bubbles.forEach((b, i) => {
        if (CHAT[i].from === "ai") tl.fromTo(typing, { opacity: 0 }, { opacity: 1, duration: 0.4 }).to(typing, { opacity: 0, duration: 0.2 }, "+=0.3");
        tl.fromTo(b, { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ai" ref={section} className="relative overflow-hidden py-24 md:py-40">
      <div className="pointer-events-none absolute -right-[20vw] -top-[20vw] h-[60vw] w-[60vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(236,48,19,.22), rgba(236,48,19,0) 65%)" }} aria-hidden="true" />
      <div className="wrap relative">
        <div className="mb-14 flex flex-col gap-6 md:mb-20">
          <Reveal className="eyebrow text-mute">AI &amp; Automation</Reveal>
          <SplitReveal className="h2 max-w-[1100px]" lines={["AI that works", <>while you <span className="text-red">sleep.</span></>]} />
          <Reveal as="p" className="max-w-[640px] text-[17px] leading-relaxed text-[#b5b5b5] md:text-[20px]">
            Automation solutions for your brand — assistants that answer and book, workflows that follow up, and custom SaaS tools built around how you work.
          </Reveal>
        </div>

        <div className="ai-grid grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {aiSolutions.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 0.08}>
                <article onPointerMove={spot}
                  className="group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-[22px] border border-line bg-[#0b0b0b] p-7 transition-colors duration-300 hover:border-[#444]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(360px circle at var(--mx) var(--my), rgba(236,48,19,.16), transparent 60%)" }} />
                  <div className="text-[14px] font-semibold text-red">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] md:text-[26px]">{s.name}</h3>
                  <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{s.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-[#333] px-3 py-1 text-[12px] font-semibold text-[#c8c8c8]">{t}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div ref={chat} className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[32px] border border-[#2a2a2a] bg-[#0e1210]"
                aria-label="Example conversation with a WhatsApp AI booking assistant" role="img">
                <div className="flex items-center gap-3 border-b border-[#1f2622] bg-[#121814] px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f7a4d] text-[14px] font-bold">AI</div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold">City Clinic Assistant</span>
                    <span className="text-[12px] text-[#8fb8a0]">online · replies instantly</span>
                  </div>
                  <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#c8c8c8]">Demo</span>
                </div>
                <div className="relative flex min-h-[440px] flex-col gap-3 p-5">
                  {CHAT.map((m, i) => (
                    <div key={i} className={`bubble max-w-[82%] rounded-[18px] px-4 py-3 text-[15px] leading-snug ${
                      m.from === "user" ? "self-end rounded-br-md bg-[#1f7a4d]"
                        : m.from === "ai" ? "self-start rounded-bl-md bg-[#1d2420]"
                        : "self-center max-w-full rounded-full border border-red/60 bg-red/10 px-4 py-2 text-center text-[12px] font-semibold text-[#ffb3a3]"}`}>
                      {m.text}
                    </div>
                  ))}
                  <div className="typing absolute bottom-5 left-5 flex gap-1.5 rounded-[18px] bg-[#1d2420] px-4 py-3.5 opacity-0" aria-hidden="true">
                    {[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-pulse rounded-full bg-[#8fb8a0]" style={{ animationDelay: `${d * 0.15}s` }} />)}
                  </div>
                </div>
              </div>
              <p className="mx-auto mt-4 max-w-[420px] text-center text-[13px] text-[#8a8a8a]">An example of the booking assistant we build for clinics and service businesses.</p>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-8 md:mt-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-5">
              <Reveal className="eyebrow text-mute">Our own SaaS</Reveal>
              <SplitReveal className="text-[clamp(34px,4vw,60px)] font-extrabold leading-none tracking-[-0.035em]" lines={["Products we build and run."]} />
            </div>
            <Magnetic><TransitionLink href="/#contact" className="btn btn-ghost">Build a SaaS with us <Arrow /></TransitionLink></Magnetic>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {saasProducts.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article onPointerMove={spot}
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[22px] border border-line bg-[#0b0b0b] p-7">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(300px circle at var(--mx) var(--my), rgba(255,255,255,.08), transparent 60%)" }} />
                  <span className={`w-fit rounded-full px-3 py-1 text-[12px] font-bold ${p.status === "Live" ? "bg-[#0E9D6A] text-black" : "bg-white/10 text-[#d0d0d0]"}`}>{p.status}</span>
                  <h3 className="text-[26px] font-extrabold tracking-[-0.02em]">{p.name}</h3>
                  <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{p.body}</p>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-2 text-[15px] font-semibold hover:text-red">
                      Visit {p.url.replace("https://", "")} <Arrow />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
