"use client";

import { sportGames, sportPlans, site } from "@/lib/content";
import { SplitReveal, Reveal, Magnetic, Arrow } from "../effects";

export default function SportsLive() {
  const wa = `${site.whatsapp}?text=${encodeURIComponent("Hi FlyHi, I'd like live score graphics for our tournament. Game, dates and stream setup:")}`;

  return (
    <section id="sports" className="wrap py-24 md:py-40">
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-6">
          <Reveal className="eyebrow text-mute">FlyHi Sports Live</Reveal>
          <SplitReveal className="h2" lines={["Score any game", <span key="b" className="text-red">from a phone.</span>]} />
        </div>
        <Reveal as="p" className="max-w-[420px] shrink-0 text-[17px] leading-relaxed text-[#b5b5b5] md:text-[19px]">
          One scorer, one link, and the score bug, banners and result screens appear in OBS or vMix. Teams and players load from an Excel or CSV file and can be edited any time.
        </Reveal>
      </div>

      <Reveal>
        <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {sportGames.map((g) => (
            <li key={g.name} className="flex flex-col gap-1 border-b border-line py-5 pr-6">
              <span className="text-[20px] font-extrabold tracking-[-0.01em]">{g.name}</span>
              <span className="text-[15px] leading-snug text-[#b5b5b5]">{g.detail}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 lg:grid-cols-3">
        {sportPlans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07} className="h-full">
            <article className={`flex h-full flex-col gap-6 rounded-[22px] border p-7 ${p.hot ? "border-red bg-[#140806]" : "border-line bg-[#0b0b0b]"}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.02em]">{p.name}</h3>
                {p.hot && <span className="rounded-full bg-red-deep px-3 py-1 text-[12px] font-bold text-white">Most picked</span>}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[38px] font-extrabold leading-none tracking-[-0.02em] tabular-nums">{p.price}</div>
                <div className="text-[14px] font-semibold text-mute">{p.unit}</div>
              </div>
              <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{p.body}</p>
              <ul className="mt-auto flex flex-col border-t border-line">
                {p.includes.map((it) => (
                  <li key={it} className="flex gap-3 border-b border-line py-3 text-[15px] leading-snug text-[#d6d6d6]">
                    <svg className="mt-0.5 shrink-0 text-red" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-line bg-white p-8 text-black md:flex-row md:items-center md:p-10">
          <p className="max-w-[480px] text-[16px] leading-relaxed text-[#3d3d3d] md:text-[18px]">
            Prices are in rupees and GST is extra. Sign in with Google, set up your teams and pick a pass, or tell us the dates and we will run it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic><a href="https://sports.flyhisocial.com" target="_blank" rel="noopener noreferrer" className="btn btn-ink">Open FlyHi Sports Live <Arrow /></a></Magnetic>
            <Magnetic><a href={wa} className="btn btn-ghost !border-black !text-black hover:!bg-black hover:!text-white">Ask us to run it <Arrow /></a></Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
