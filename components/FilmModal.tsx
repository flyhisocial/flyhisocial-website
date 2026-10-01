"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, getLenis, prefersReducedMotion } from "@/lib/motion";

export default function FilmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  // Phones held upright get the 9:16 cut of the showreel; everything else gets 16:9.
  const [portrait] = useState(() => typeof window !== "undefined" && window.matchMedia("(orientation: portrait) and (max-width: 767px)").matches);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    closeBtn.current?.focus();
    if (!prefersReducedMotion()) gsap.fromTo(box.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.7, ease: "expo.out" });
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); getLenis()?.start(); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="FlyHi Social showreel"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 p-4" onClick={onClose}>
      <div ref={box} onClick={(e) => e.stopPropagation()}
        className={`relative overflow-hidden rounded-2xl bg-black ${portrait ? "aspect-[9/16] h-[82svh] max-w-full" : "aspect-video w-full max-w-[1200px]"}`}>
        <video key={portrait ? "v" : "h"} className="h-full w-full"
          src={portrait ? "/media/showreel-9x16.mp4" : "/media/showreel-16x9.mp4"}
          poster={portrait ? "/media/showreel-poster-9x16.jpg" : "/media/showreel-poster.jpg"}
          controls autoPlay playsInline aria-label="FlyHi Social motion reel 2026 — our five practices and twenty services" />
      </div>
      <button ref={closeBtn} type="button" aria-label="Close showreel" onClick={onClose}
        className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black md:right-12 md:top-10">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" /></svg>
      </button>
    </div>
  );
}
