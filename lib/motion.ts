"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Phones show/hide the address bar while scrolling; don't recalculate every animation when that happens.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const EASE = "expo.out";

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/* Scroll-linked animations follow a finger 1:1 on touch screens (a trailing catch-up feels laggy there)
   and get a short, gentle catch-up with a mouse wheel. */
export const scrubAmt = (desktop = 0.5) => (isTouch() ? true : desktop);
