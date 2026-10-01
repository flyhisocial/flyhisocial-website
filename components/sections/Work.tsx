"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/content";
import { SplitReveal, Reveal, Arrow } from "../effects";
import { Cover } from "../Brand";
import TransitionLink from "../TransitionLink";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

const FILTERS = ["All", "AI & Automation", "Build", "Brand", "Broadcast & Events"];

// Editorial index. On desktop a preview follows the cursor, rippling through a
// displacement filter each time you move onto a new project.
export default function Work() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const fine = useRef(false);
  const listRef = useRef<HTMLUListElement>(null);

  const list = useMemo(() => projects.filter((p) => filter === "All" || p.practices.includes(filter)), [filter]);

  useEffect(() => {
    fine.current = isFinePointer() && !prefersReducedMotion();
    if (!fine.current || !preview.current) return;
    const xTo = gsap.quickTo(preview.current, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview.current, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(preview.current, "rotation", { duration: 0.8, ease: "power3" });
    let lastX = 0, px = -1, py = -1;
    const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; xTo(px); yTo(py); rTo(gsap.utils.clamp(-8, 8, (px - lastX) * 0.4)); lastX = px; };
    // Scrolling moves the list away from a still cursor without any pointer event — check what's under it.
    const onScroll = () => {
      if (px < 0 || !listRef.current) return;
      const el = document.elementFromPoint(px, py);
      if (!el || !listRef.current.contains(el)) hide();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("scroll", onScroll); };
  }, []);

  const hide = () => {
    gsap.to(preview.current, { opacity: 0, scale: 0.6, duration: 0.45, ease: "power3.out", overwrite: "auto" });
  };

  const enter = (i: number) => {
    if (!fine.current) return;
    setActive(i);
    gsap.to(preview.current, { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out", overwrite: "auto" });
    const d = { s: 90 };
    gsap.to(d, { s: 0, duration: 1.1, ease: "expo.out", onUpdate: () => disp.current?.setAttribute("scale", String(d.s)) });
  };
  const leave = () => { if (fine.current) hide(); };

  // Changing the filter re-deals the list so it's obvious something happened.
  const firstFilter = useRef(true);
  useEffect(() => {
    if (firstFilter.current) { firstFilter.current = false; return; }
    const items = listRef.current?.querySelectorAll("li");
    if (!items?.length || prefersReducedMotion()) return;
    gsap.fromTo(items, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.07, overwrite: true });
  }, [filter]);

  const current = active !== null ? list[active] : null;

  return (
    <section id="work" className="wrap bg-white py-24 text-black md:py-40">
      <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 lg:flex-row lg:items-end">
        <div className="flex flex-col gap-6">
          <Reveal className="eyebrow text-mute-dark">Selected work</Reveal>
          <SplitReveal className="h2" lines={["Work that ships."]} />
        </div>
        <div role="group" aria-label="Filter work" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const n = f === "All" ? projects.length : projects.filter((p) => p.practices.includes(f)).length;
            return (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => { setFilter(f); setActive(null); }}
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors md:h-11 md:px-5 md:text-[15px] ${
                  filter === f ? "border-black bg-black text-white" : "border-[#cfcfcf] bg-white text-black hover:border-black"}`}>
                {f}<span className={`text-[12px] tabular-nums ${filter === f ? "text-white/60" : "text-mute-dark"}`}>{n}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul ref={listRef} className="border-t-2 border-black" onPointerLeave={leave}>
        {list.map((p, i) => (
          <li key={p.slug} className="border-b border-[#d6d6d6]">
            <TransitionLink href={`/work/${p.slug}`} data-cursor="View" onPointerEnter={() => enter(i)} onClick={leave}
              className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 md:items-center md:gap-x-6 md:py-10">
              <span className="col-span-2 text-[14px] font-bold text-red-deep md:col-span-1 md:text-[15px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-10 text-[clamp(32px,5vw,78px)] font-extrabold leading-none tracking-[-0.035em] transition-[color,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:text-red-deep md:col-span-6">
                {p.name}
              </span>
              <span className="col-span-10 col-start-3 text-[14px] leading-snug text-mute-dark md:col-span-3 md:col-start-auto md:text-[15px]">{p.kicker}</span>
              <span className="hidden text-[15px] font-semibold md:col-span-1 md:block">{p.year}</span>
              <span className="hidden justify-self-end md:col-span-1 md:flex">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-black transition-colors duration-300 group-hover:bg-black group-hover:text-white"><Arrow className="" /></span>
              </span>
              {/* Touch screens get the cover inline instead of the floating preview */}
              <span className="relative col-span-12 mt-2 block aspect-[16/10] overflow-hidden rounded-2xl [@media(hover:hover)_and_(pointer:fine)]:hidden">
                <Cover cover={p.cover} sub={p.coverSub} bg={p.bg} accent={p.accent} image={p.image} alt={p.alt} />
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>

      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="fx-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4" />
          <feDisplacementMap ref={disp} in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div ref={preview} className="work-preview" style={{ filter: "url(#fx-distort)" }} aria-hidden="true">
        {current && <Cover cover={current.cover} sub={current.coverSub} bg={current.bg} accent={current.accent} image={current.image} alt="" />}
      </div>
    </section>
  );
}
