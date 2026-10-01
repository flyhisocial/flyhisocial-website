"use client";

import { useEffect, useRef, useState } from "react";
import { SplitReveal, Reveal, Magnetic, Arrow } from "../effects";
import TransitionLink from "../TransitionLink";
import FilmModal from "../FilmModal";
import Object3D from "../Object3D";
import { gsap, prefersReducedMotion, scrubAmt } from "@/lib/motion";

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (v) {
      // Phones held upright get the 9:16 film, so nothing is cropped off the sides.
      const tall = window.matchMedia("(max-width: 767px) and (orientation: portrait)").matches;
      const src = tall ? "/media/hero-loop-9x16.mp4" : "/media/hero-loop.mp4";
      if (!v.currentSrc.endsWith(src)) { v.poster = tall ? "/media/hero-poster-9x16.jpg" : "/media/hero-poster.jpg"; v.src = src; }
      v.muted = true; v.play().catch(() => {});
    }
    if (!wrap.current || !film.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Laptops & tablets: the film starts as an inset rounded panel and grows to full-bleed as you scroll.
      mm.add("(min-width: 768px)", () => {
        const side = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 72;
        gsap.fromTo(film.current,
          { clipPath: `inset(110px ${side}px 110px ${side}px round 28px)` },
          { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "none",
            scrollTrigger: { trigger: wrap.current, start: "top top", end: "+=90%", scrub: scrubAmt(), pin: true, anticipatePin: 1 } });
        gsap.fromTo(video.current, { scale: 1.18 }, { scale: 1, ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "+=190%", scrub: scrubAmt() } });
        gsap.fromTo(caption.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top top", end: "+=60%", scrub: scrubAmt() } });
      });
      // Phones: a 9:16 reel card that grows into place as it scrolls into view — no pinning, no cropping.
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(film.current, { scale: 0.86, y: 40 }, { scale: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top 20%", scrub: true } });
        gsap.fromTo(caption.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top 75%", end: "top 25%", scrub: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative">
      <div className="wrap relative flex flex-col gap-8 pb-10 pt-32 md:gap-11 md:pt-44">
        <Object3D kind="hero" className="pointer-events-none order-last -mx-[var(--gutter)] h-[320px] lg:absolute lg:right-0 lg:top-[90px] lg:order-none lg:mx-0 lg:h-[640px] lg:w-[42vw]" />
        <Reveal className="eyebrow relative z-10 text-mute" delay={0.6}>Creative technology studio · Bhubaneswar, India</Reveal>
        <SplitReveal
          as="h1"
          onLoad
          delay={0.75}
          className="display relative z-10 text-[clamp(50px,7.4vw,112px)]"
          lines={["We build brands,", "products &", <span key="b" className="text-red">broadcasts.</span>]}
        />
        <Reveal delay={1.05} className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:max-w-[56%] lg:flex-col lg:items-start">
          <p className="max-w-[580px] text-[17px] leading-relaxed text-[#b5b5b5] md:text-[21px]">
            AI automation, SaaS tools, websites, live production and brand systems — designed, engineered and delivered by one studio.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic><TransitionLink href="/#contact" className="btn btn-red w-full">Start a project <Arrow /></TransitionLink></Magnetic>
            <Magnetic>
              <button type="button" className="btn btn-ghost w-full" onClick={() => setFilmOpen(true)}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" /></svg>
                Watch the showreel
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <div ref={wrap} className="wrap relative pb-10 md:h-[100svh] md:px-0 md:pb-0">
        <div ref={film} className="hero-film relative mx-auto aspect-[9/16] max-h-[86svh] w-full max-w-[480px] overflow-hidden rounded-[26px] border border-line bg-[#0a0a0a] md:border-0 md:absolute md:inset-0 md:aspect-auto md:max-h-none md:max-w-none md:rounded-none">
          <video
            ref={video}
            className="absolute inset-0 h-full w-full object-cover"
            poster="/media/hero-poster.jpg"
            muted loop playsInline autoPlay preload="none"
            aria-label="FlyHi Social brand film, playing silently"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          <div ref={caption} className="absolute inset-x-0 bottom-6 flex flex-col items-start justify-between gap-5 px-6 md:bottom-10 md:flex-row md:items-end md:px-[var(--gutter)]">
            <p className="display max-w-[900px] text-[clamp(34px,6vw,96px)]">Ideas. Engineered. <span className="text-red">Launched.</span></p>
            <button type="button" data-cursor="Play" onClick={() => setFilmOpen(true)}
              className="btn border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-black">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11l9-5.5z" /></svg>
              Play showreel
            </button>
          </div>
        </div>
      </div>
      <FilmModal open={filmOpen} onClose={() => setFilmOpen(false)} />
    </section>
  );
}
