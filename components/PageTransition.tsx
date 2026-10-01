"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, getLenis, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { Wordmark } from "./Brand";

// Pixel wipe that sweeps from the top-left, like reading the page.
// Covers the screen, swaps the route underneath, then retreats.

type Ctx = { navigate: (href: string) => void };
const TransitionCtx = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionCtx);

const CELL = 110;

// Tells heavier parts of the page (3D) that the loading screen has gone, so they start
// afterwards and never make the intro stutter.
function markReady() {
  (window as unknown as { __fhReady?: boolean }).__fhReady = true;
  window.dispatchEvent(new Event("fh-ready"));
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const grid = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ cols: 0, rows: 0 });
  const [covered, setCovered] = useState(true); // solid cover until the grid takes over
  const busy = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const size = () => setDims({ cols: Math.ceil(window.innerWidth / CELL), rows: Math.ceil(window.innerHeight / CELL) });
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  const cells = () => Array.from(grid.current?.querySelectorAll<HTMLElement>(".px") ?? []);
  const stagger = useCallback(
    () => ({ grid: [dims.rows, dims.cols] as [number, number], from: 0, amount: 0.5 }), // sweeps from the top
    [dims],
  );

  const reveal = useCallback(() => {
    gsap.to(cells(), { scale: 0, duration: 0.45, ease: "power3.in", stagger: stagger() });
  }, [stagger]);

  useEffect(() => {
    if (!dims.cols) return;
    if (first.current) {
      first.current = false;
      gsap.set(cells(), { scale: 0 });
      const cover = document.querySelector<HTMLElement>(".intro-cover");
      if (prefersReducedMotion() || !cover) { setCovered(false); markReady(); return; }
      // Hold the logo long enough to be seen (a little shorter on later pages), then lift it away.
      let seen = false;
      try { seen = sessionStorage.getItem("fh-intro") === "1"; sessionStorage.setItem("fh-intro", "1"); } catch {}
      const wait = Math.max(0.15, (seen ? 0.55 : 1.25) - performance.now() / 1000);
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (!window.location.hash && (!nav || nav.type === "navigate")) window.scrollTo(0, 0);
      gsap.to(cover, {
        clipPath: "inset(100% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut", delay: wait,
        onStart: () => { ScrollTrigger.refresh(); },
        onComplete: () => { setCovered(false); markReady(); },
      });
      return;
    }
    const hash = window.location.hash;
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash && document.querySelector(hash)) {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(hash, { immediate: true, offset: -20 });
        else document.querySelector(hash)?.scrollIntoView();
      }
    });
    if (!prefersReducedMotion()) reveal();
    busy.current = false;
  }, [pathname, dims.cols]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useCallback((href: string) => {
    if (busy.current) return;
    const url = new URL(href, window.location.href);
    if (url.pathname === window.location.pathname) {
      if (url.hash) {
        const lenis = getLenis();
        if (lenis) { lenis.start(); lenis.scrollTo(url.hash, { offset: -20, force: true }); }
        else document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (prefersReducedMotion()) { router.push(href); return; }
    busy.current = true;
    router.prefetch(url.pathname);
    gsap.to(cells(), {
      scale: 1.02, duration: 0.45, ease: "power3.out", stagger: stagger(),
      onComplete: () => router.push(href),
    });
  }, [router, stagger]);

  const total = dims.cols * dims.rows;
  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {children}
      {covered && (
        <div className="intro-cover" aria-hidden="true">
          <div className="intro-logo"><Wordmark size={34} /></div>
          <span className="intro-bar" />
        </div>
      )}
      <div
        ref={grid}
        className="pixels"
        aria-hidden="true"
        style={{ gridTemplateColumns: `repeat(${dims.cols || 1}, 1fr)`, gridTemplateRows: `repeat(${dims.rows || 1}, 1fr)` }}
      >
        {Array.from({ length: total }, (_, i) => {
          const r = Math.floor(i / dims.cols), c = i % dims.cols;
          return <div key={i} className={`px${(c * 7 + r * 3) % 11 === 0 ? " w" : ""}`} style={{ transform: "scale(0)" }} />;
        })}
      </div>
    </TransitionCtx.Provider>
  );
}
