"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

// Dot + ring cursor. Elements opt in with data-cursor="View" (shows a label)
// and every link/button gets a subtle ring grow.
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const el = root.current!;
      if (labelled) {
        setLabel(labelled.dataset.cursor || "");
        el.classList.add("is-label"); el.classList.remove("is-link");
      } else {
        el.classList.remove("is-label");
        el.classList.toggle("is-link", !!t.closest("a,button"));
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  useEffect(() => { root.current?.classList.remove("is-label", "is-link"); }, [pathname]);

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div ref={ring} className="cursor-ring"><span>{label}</span></div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
