"use client";

import { packages, site } from "@/lib/content";
import { SplitReveal, Reveal, Magnetic, Arrow } from "../effects";
import TransitionLink from "../TransitionLink";

function spot(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Packages() {
  const audit = `${site.whatsapp}?text=${encodeURIComponent("Hi FlyHi, I'd like a free 20-minute AI audit for my business.")}`;

  return (
    <section id="packages" className="wrap py-24 md:py-40">
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-6">
          <Reveal className="eyebrow text-mute">Packages</Reveal>
          <SplitReveal className="h2" lines={["Pick a package.", <>We&apos;ll handle <span className="whitespace-nowrap text-red">the rest.</span></>]} />
        </div>
        <Reveal as="p" className="max-w-[400px] shrink-0 text-[17px] leading-relaxed text-[#b5b5b5] md:text-[19px]">
          Ready-made solutions with a fixed scope and one clear price. Start with what your business needs most — add more as you grow.
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((p, i) => (
          <Reveal key={p.name} delay={(i % 4) * 0.07} className="h-full">
            <article onPointerMove={spot}
              className={`group relative flex h-full flex-col gap-6 overflow-hidden rounded-[22px] border p-7 transition-[border-color,transform] duration-500 hover:-translate-y-2 ${
                p.hot ? "border-red bg-[#140806]" : "border-line bg-[#0b0b0b] hover:border-[#444]"}`}>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(340px circle at var(--mx) var(--my), rgba(236,48,19,.16), transparent 60%)" }} />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] font-semibold text-red">{String(i + 1).padStart(2, "0")}</span>
                {p.hot && <span className="rounded-full bg-red-deep px-3 py-1 text-[12px] font-bold text-white">Most asked for</span>}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[27px] font-extrabold leading-tight tracking-[-0.02em]">{p.name}</h3>
                <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{p.body}</p>
              </div>

              <div className="flex flex-col gap-1.5 rounded-[14px] border border-line bg-black/40 px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-mute">Best for</span>
                <span className="text-[15px] font-semibold leading-snug">{p.bestFor}</span>
              </div>

              <ul className="flex flex-col border-t border-line">
                {p.includes.map((it) => (
                  <li key={it} className="flex gap-3 border-b border-line py-3 text-[15px] leading-snug text-[#d6d6d6]">
                    <svg className="mt-0.5 shrink-0 text-red" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
                    {it}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                <span className="text-[15px] font-semibold text-mute">{p.price ?? "Fixed price"}</span>
                <TransitionLink href="/#contact" className="inline-flex items-center gap-2 text-[15px] font-bold hover:text-red">Get started <Arrow /></TransitionLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-line bg-white p-8 text-black md:flex-row md:items-center md:p-10">
          <div className="flex flex-col gap-2">
            <div className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] md:text-[32px]">Not sure where to start?</div>
            <p className="max-w-[640px] text-[16px] leading-relaxed text-[#3d3d3d] md:text-[18px]">
              Book a free 20-minute AI audit. We&apos;ll look at how you get and serve customers today, and show you the one thing worth automating first.
            </p>
          </div>
          <Magnetic><a href={audit} className="btn btn-ink">Book a free AI audit <Arrow /></a></Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
