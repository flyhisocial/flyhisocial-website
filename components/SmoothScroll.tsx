"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setLenis, prefersReducedMotion } from "@/lib/motion";

// Buttery scroll (Lenis) kept in lock-step with GSAP ScrollTrigger.
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Smooth, gliding scroll for mouse wheels and touch screens alike.
    const lenis = new Lenis({
      lerp: 0.1, smoothWheel: true, wheelMultiplier: 1,
      syncTouch: true, syncTouchLerp: 0.085, touchInertiaExponent: 1.6, touchMultiplier: 1,
      anchors: { offset: -20 },
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
