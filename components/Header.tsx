"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import { Wordmark } from "./Brand";
import { Arrow, Magnetic } from "./effects";
import { gsap, getLenis, prefersReducedMotion } from "@/lib/motion";
import { practices } from "@/lib/content";
import { solutions } from "@/lib/solutions";
import { services } from "@/lib/services";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#ai", label: "AI" },
  { href: "/#packages", label: "Packages" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  const bar = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [mega, setMega] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeT = useRef<number | undefined>(undefined);
  const openMega = () => { window.clearTimeout(closeT.current); setMega(true); };
  const closeMega = () => { window.clearTimeout(closeT.current); closeT.current = window.setTimeout(() => setMega(false), 180); };

  useEffect(() => { setMega(false); }, [pathname]);
  useEffect(() => {
    if (!mega) return;
    const el = megaRef.current;
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.out" });
      gsap.fromTo(el.querySelectorAll(".mega-col"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.05, delay: 0.1 });
    }
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMega(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [mega]);

  // Hide on scroll down, show on scroll up, go solid once past the top.
  useEffect(() => {
    let last = 0, hidden = false, raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 40);
      if (!bar.current || open) { last = y; return; }
      if (Math.abs(y - last) < 6) return; // ignore tiny jitters
      const hide = y > 400 && y > last;
      last = y;
      if (hide === hidden) return; // only animate when it actually changes
      hidden = hide;
      gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: 0.45, ease: "power3.out", overwrite: true });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      if (!prefersReducedMotion() && menuRef.current) {
        gsap.fromTo(menuRef.current.querySelectorAll(".m-link"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 });
      }
    } else lenis?.start();
  }, [open]);

  return (
    <>
      <header
        ref={bar}
        className="wrap fixed inset-x-0 top-0 z-50 flex items-center justify-between py-5 transition-[background-color,border-color] duration-500 md:py-7"
        style={{ background: solid || open ? "#080808" : "transparent", borderBottom: `1px solid ${solid && !open ? "#1e1e1e" : "transparent"}` }}
      >
        <TransitionLink href="/" aria-label="FlyHi Social home"><Wordmark size={20} /></TransitionLink>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] font-medium lg:flex">
          {NAV.map((n) => n.label === "Services" ? (
            <span key={n.href} className="flex items-center" onPointerEnter={openMega} onPointerLeave={closeMega}
              onFocus={openMega} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) closeMega(); }}>
              <TransitionLink href={n.href} aria-expanded={mega} aria-controls="mega-menu" className={`flex items-center gap-1.5 py-2 transition-colors hover:text-red ${mega ? "text-red" : ""}`}>
                {n.label}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"
                  className={`transition-transform duration-300 ${mega ? "rotate-180" : ""}`}><path d="M2 3.5l3 3 3-3" /></svg>
              </TransitionLink>
              {mega && (
                <div id="mega-menu" ref={megaRef} className="mega wrap absolute inset-x-0 top-0 -z-10 pb-10">
                  <div className="grid grid-cols-5 gap-6 border-t border-[#1e1e1e] pt-8">
                    {practices.map((p) => {
                      const svc = services.find((x) => x.practice === p.name)!;
                      const subs = solutions.filter((x) => x.parent === svc.slug);
                      return (
                        <div key={p.num} className="mega-col flex flex-col gap-4">
                          <span className="text-[13px] font-semibold text-red">{p.num}</span>
                          <TransitionLink href={p.href} className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] hover:text-red">{p.name}</TransitionLink>
                          <p className="text-[14px] leading-relaxed text-mute">{p.blurb}</p>
                          {subs.length > 0 && (
                            <ul className="mt-1 flex flex-col gap-2.5 border-t border-[#1e1e1e] pt-4">
                              {subs.map((x) => (
                                <li key={x.slug}>
                                  <TransitionLink href={`/services/${x.slug}`} className="group flex items-center gap-2 text-[15px] font-semibold text-[#d0d0d0] hover:text-white">
                                    <span className="h-1.5 w-1.5 bg-red transition-transform duration-300 group-hover:scale-150" />{x.name}
                                  </TransitionLink>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </span>
          ) : (
            <TransitionLink key={n.href} href={n.href} className="transition-colors hover:text-red">{n.label}</TransitionLink>
          ))}
          <Magnetic><TransitionLink href="/#contact" className="btn btn-red !min-h-12 !px-6 text-[15px]">Talk to an expert <Arrow /></TransitionLink></Magnetic>
        </nav>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#3a3a3a] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 7h14M3 13h14" />}
          </svg>
        </button>
      </header>
      {open && (
        <div ref={menuRef} className="wrap fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black pb-8 pt-28 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col text-[46px] font-extrabold leading-[1.2] tracking-[-0.03em]">
            {NAV.map((n) => (
              <span key={n.href} className="overflow-hidden">
                <TransitionLink href={n.href} onClick={() => setOpen(false)} className="m-link inline-block">{n.label}</TransitionLink>
              </span>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3 border-t border-[#1e1e1e] pt-6">
            <span className="text-[12px] font-bold tracking-[0.16em] text-mute">SOLUTIONS</span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] font-semibold text-[#d0d0d0]">
              {solutions.map((x) => (
                <li key={x.slug}><TransitionLink href={`/services/${x.slug}`} onClick={() => setOpen(false)} className="hover:text-red">{x.name}</TransitionLink></li>
              ))}
            </ul>
          </div>
          <TransitionLink href="/#contact" onClick={() => setOpen(false)} className="btn btn-red mt-auto w-full">Talk to an expert <Arrow /></TransitionLink>
        </div>
      )}
    </>
  );
}
