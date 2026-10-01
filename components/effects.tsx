"use client";

import { useEffect, useRef, type ComponentType, type ElementType, type ReactNode, type Ref } from "react";

// Polymorphic tag (h1, h2, p, div…) with a ref and the few props these helpers pass.
type TagProps = { ref?: Ref<HTMLElement>; className?: string; children?: ReactNode; "data-reveal"?: string };
const asTag = (t: ElementType) => t as unknown as ComponentType<TagProps>;
import { gsap, ScrollTrigger, prefersReducedMotion, isFinePointer, scrubAmt } from "@/lib/motion";

/* Headline that rises line by line. `lines` keeps line breaks deliberate on every screen. */
export function SplitReveal({
  lines, as: Tag = "h2", className = "", delay = 0, onLoad = false, stagger = 0.1,
}: { lines: ReactNode[]; as?: ElementType; className?: string; delay?: number; onLoad?: boolean; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const inner = el.querySelectorAll(".split-inner");
    if (prefersReducedMotion()) { gsap.set(inner, { yPercent: 0, y: 0 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(inner, { y: 0, yPercent: 115 }, {
        yPercent: 0, duration: 1.2, ease: "expo.out", stagger, delay,
        scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay, onLoad, stagger]);
  const El = asTag(Tag);
  return (
    <El ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="split-line"><span className="split-inner">{l}</span></span>
      ))}
    </El>
  );
}

/* Fade-and-rise for any block. */
export function Reveal({ children, className = "", delay = 0, y = 40, as: Tag = "div" }:
  { children: ReactNode; className?: string; delay?: number; y?: number; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReducedMotion()) { gsap.set(el, { opacity: 1, y: 0 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y }, {
        opacity: 1, y: 0, duration: 1.1, ease: "expo.out", delay,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    return () => ctx.revert();
  }, [delay, y]);
  const El = asTag(Tag);
  return <El ref={ref} className={className} data-reveal="">{children}</El>;
}

/* Words light up as you scroll through the paragraph. */
export function ScrubWords({ text, muted, className = "" }: { text: string; muted?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.14 }, {
        opacity: 1, ease: "none", stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: scrubAmt() },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  const words = (s: string, cls: string) => s.split(" ").map((w, i) => (
    <span key={cls + i} className={`w ${cls}`}>{w} </span>
  ));
  return (
    <p ref={ref} className={className}>
      {words(text, "")}
      {muted && words(muted, "text-[#7a7a7a]")}
    </p>
  );
}

/* Buttons that lean toward the cursor. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" }); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`inline-flex ${className}`}>{children}</span>;
}

/* Counts up the numeric part of a value ("17", "53rd", "35s"); leaves words alone. */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const m = value.match(/^(\d+)(.*)$/);
  useEffect(() => {
    const el = ref.current; if (!el || !m || prefersReducedMotion()) return;
    const target = parseInt(m[1], 10), suffix = m[2];
    const obj = { v: 0 };
    el.textContent = "0" + suffix;
    const st = ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => gsap.to(obj, {
        v: target, duration: 1.6, ease: "expo.out",
        onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
      }),
    });
    return () => st.kill();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref} className={className}>{value}</span>;
}

export function Arrow({ className = "arrow" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
