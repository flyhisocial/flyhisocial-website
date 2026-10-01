"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SceneKind } from "./three/Scenes";
import { StairMark } from "./Brand";
import { prefersReducedMotion } from "@/lib/motion";

// three.js loads only in the browser, only once the object is near the screen.
const Scene = dynamic(() => import("./three/Scenes"), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

export default function Object3D({ kind, className = "" }: { kind: SceneKind; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);     // mount once close to the viewport
  const [visible, setVisible] = useState(false); // animate only while on screen
  const [ok, setOk] = useState(true);
  const [ready, setReady] = useState(false);  // wait for the loading screen to finish

  useEffect(() => {
    if ((window as unknown as { __fhReady?: boolean }).__fhReady) { setReady(true); return; }
    const go = () => setReady(true);
    window.addEventListener("fh-ready", go);
    const t = window.setTimeout(go, 3500); // never wait forever
    return () => { window.removeEventListener("fh-ready", go); window.clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (!webglOK()) { setOk(false); return; }
    const el = box.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setNear(true);
      setVisible(e.isIntersecting && !prefersReducedMotion());
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`relative ${className}`} aria-hidden="true">
      {!ok ? (
        <div className="flex h-full w-full items-center justify-center"><StairMark size={160} /></div>
      ) : near && ready ? (
        <div className="obj-in h-full w-full"><Scene kind={kind} active={visible} /></div>
      ) : null}
    </div>
  );
}
