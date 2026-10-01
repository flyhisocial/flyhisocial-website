"use client";

import { useEffect, useRef } from "react";
import type { Solution, SolutionGroup } from "@/lib/solutions";
import { solutions } from "@/lib/solutions";
import type { Service } from "@/lib/services";
import { projects, site } from "@/lib/content";
import { SplitReveal, Reveal, ScrubWords, Magnetic, Arrow } from "./effects";
import { Cover } from "./Brand";
import { Icon } from "./Icons";
import ServiceArt from "./ServiceArt";
import Object3D from "./Object3D";
import Faqs from "./Faqs";
import TransitionLink from "./TransitionLink";
import { gsap, ScrollTrigger, prefersReducedMotion, scrubAmt } from "@/lib/motion";

/* Card tilts toward the cursor and a spotlight follows it (mouse only). */
function tilt(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget, r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
  el.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
}
function untilt(e: React.PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

/* The number rolls up character by character when it scrolls into view — always the real digits. */
function RollIn({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll(".ch"), { yPercent: 110 }, {
        yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [text]);
  return (
    <span ref={ref} className={`inline-flex overflow-hidden pb-[0.08em] ${className}`}>
      {text.split("").map((c, i) => <span key={i} className="ch inline-block whitespace-pre">{c}</span>)}
    </span>
  );
}

/* Platforms / practice areas: a pinned horizontal track on desktop, a stacked grid on phones. */
function Track({ g, gi }: { g: SolutionGroup; gi: number }) {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = sec.current, tr = track.current; if (!el || !tr) return;
    const cards = Array.from(tr.querySelectorAll<HTMLElement>(".sol-card"));
    if (prefersReducedMotion()) { cards.forEach((c) => c.classList.add("is-in")); return; }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const dist = () => Math.max(1, tr.scrollWidth - window.innerWidth);
        const tween = gsap.to(tr, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: el, start: "top top", end: () => `+=${dist()}`, scrub: scrubAmt(0.6), pin: true, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
              if (count.current) count.current.textContent = String(Math.min(cards.length, 1 + Math.floor(self.progress * cards.length))).padStart(2, "0");
            },
          },
        });
        gsap.fromTo(cards, { opacity: 0, y: 80, rotate: 2 }, {
          opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: "expo.out", stagger: 0.07,
          // cards already on screen draw their icons as they rise in
          onStart: () => cards.forEach((c) => { if (c.getBoundingClientRect().left < window.innerWidth * 0.92) c.classList.add("is-in"); }),
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        });
        cards.forEach((c) => ScrollTrigger.create({
          trigger: c, containerAnimation: tween, start: "left 92%", once: true, onEnter: () => c.classList.add("is-in"),
        }));
      });
      mm.add("(max-width: 1023px)", () => {
        cards.forEach((c) => gsap.fromTo(c, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: c, start: "top 88%", once: true, onEnter: () => c.classList.add("is-in") },
        }));
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="relative overflow-hidden py-20 md:py-28 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0"
      aria-labelledby={`group-${gi}`}>
      <div className="wrap mb-10 flex flex-col justify-between gap-6 md:mb-14 lg:mb-[4svh] lg:flex-row lg:items-end lg:gap-[2svh]">
        <div className="flex flex-col gap-5">
          <Reveal className="eyebrow text-mute">{g.intro}</Reveal>
          <SplitReveal as="h2" className="h2 lg:text-[clamp(40px,min(6.2vw,10svh),92px)]" lines={[<span key="t" id={`group-${gi}`}>{g.title}</span>]} />
        </div>
        <div className="hidden shrink-0 items-center gap-5 lg:flex" aria-hidden="true">
          <span className="whitespace-nowrap text-[15px] font-semibold tabular-nums"><span ref={count}>01</span><span className="text-mute"> / {String(g.items.length).padStart(2, "0")}</span></span>
          <span className="relative block h-[2px] w-40 overflow-hidden bg-[#2a2a2a]">
            <span ref={bar} className="absolute inset-0 origin-left bg-red" style={{ transform: "scaleX(0)" }} />
          </span>
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-mute">Scroll</span>
        </div>
      </div>
      <div ref={track} className="grid grid-cols-1 gap-4 px-[var(--gutter)] sm:grid-cols-2 lg:flex lg:w-max lg:gap-5">
        {g.items.map((it, i) => (
          <div key={it.name} className="sol-card lg:h-[clamp(290px,calc(100svh-290px),420px)] lg:w-[400px] lg:shrink-0">
            <article onPointerMove={tilt} onPointerLeave={untilt}
              className="tilt group relative flex h-full min-h-[300px] flex-col gap-5 overflow-hidden rounded-[24px] border border-line bg-[#0b0b0b] p-7 md:p-8 lg:min-h-0 lg:p-7">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "radial-gradient(380px circle at var(--mx) var(--my), rgba(236,48,19,.18), transparent 60%)" }} />
              <div className="flex items-start justify-between">
                <span className="mark-tile flex h-16 w-16 items-center justify-center rounded-[16px] border border-[#2a2a2a] bg-[#141414] text-[15px] font-extrabold tracking-[-0.01em] text-white transition-colors duration-500 group-hover:border-red group-hover:bg-red">
                  {it.icon ? <Icon name={it.icon} className="h-7 w-7" /> : it.mark}
                </span>
                <span className="text-[14px] font-semibold tabular-nums text-mute">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-auto text-[25px] font-extrabold leading-tight tracking-[-0.02em] md:text-[28px]">{it.name}</h3>
              <p className="text-[16px] leading-relaxed text-[#b5b5b5]">{it.body}</p>
              <span className="card-line absolute bottom-0 left-0 h-[3px] w-full origin-left bg-red" aria-hidden="true" />
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Steps light up one by one as a red line climbs through them. */
function Steps({ steps }: { steps: Solution["steps"] }) {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = list.current; if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".step");
    if (prefersReducedMotion()) { items.forEach((i) => i.classList.add("is-on")); gsap.set(line.current, { scaleY: 1 }); return; }
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: scrubAmt() } });
      items.forEach((it) => ScrollTrigger.create({ trigger: it, start: "top 68%", onEnter: () => it.classList.add("is-on"), onLeaveBack: () => it.classList.remove("is-on") }));
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <ol ref={list} className="relative flex flex-col gap-2">
      <span className="absolute bottom-6 left-[23px] top-6 w-[2px] bg-[#d6d6d0]" aria-hidden="true" />
      <span ref={line} className="absolute bottom-6 left-[23px] top-6 w-[2px] origin-top bg-red" aria-hidden="true" />
      {steps.map((st, i) => (
        <li key={st.name} className="step relative grid grid-cols-[48px_1fr] gap-5 py-5 md:gap-8">
          <span className="step-dot relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-bone text-[15px] font-bold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex flex-col gap-1.5 pt-1.5">
            <span className="text-[24px] font-extrabold tracking-[-0.015em] md:text-[30px]">{st.name}</span>
            <span className="max-w-[520px] text-[16px] leading-relaxed text-[#3d3d3d] md:text-[18px]">{st.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function SolutionPage({ solution: s, parent }: { solution: Solution; parent: Service }) {
  const hero = useRef<HTMLElement>(null);
  const feat = useRef<HTMLDivElement>(null);
  const desk = useRef<HTMLDivElement>(null);
  const project = s.featured ? projects.find((p) => p.slug === s.featured) : undefined;
  const others = solutions.filter((x) => x.slug !== s.slug);
  const names = s.groups.flatMap((g) => g.items.map((i) => i.name));
  const wa = `${site.whatsapp}?text=${encodeURIComponent(`Hi FlyHi, I'd like to talk about ${s.name}.`)}`;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Hero: the 3D object drifts up and the headline eases away as you scroll.
      if (hero.current) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: scrubAmt() } });
        tl.to(hero.current.querySelector(".hero-obj"), { yPercent: -18, opacity: 0.25, ease: "none" }, 0)
          .to(hero.current.querySelector(".hero-copy"), { y: -80, opacity: 0.2, ease: "none" }, 0);
      }
      // Featured project: the card opens from an inset frame and its cover drifts inside.
      if (feat.current) {
        gsap.fromTo(feat.current, { clipPath: "inset(10% 8% 10% 8% round 28px)" }, {
          clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none",
          scrollTrigger: { trigger: feat.current, start: "top 90%", end: "top 30%", scrub: scrubAmt() },
        });
        gsap.fromTo(feat.current.querySelector(".feat-img"), { yPercent: -8, scale: 1.15 }, {
          yPercent: 8, scale: 1.05, ease: "none",
          scrollTrigger: { trigger: feat.current, start: "top bottom", end: "bottom top", scrub: scrubAmt() },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // A soft red glow follows the pointer around the contact desk.
  const glow = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <article>
      {/* Hero */}
      <header ref={hero} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-[20vw] top-[10vh] h-[60vw] w-[60vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,48,19,.16), rgba(236,48,19,0) 65%)" }} aria-hidden="true" />
        <div className="wrap relative grid grid-cols-1 items-center gap-6 pb-14 pt-32 md:pt-40 lg:min-h-[92svh] lg:grid-cols-12">
          <div className="hero-copy relative z-10 flex flex-col gap-7 lg:col-span-7">
            <Reveal delay={0.5}>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[14px] font-semibold text-mute">
                <TransitionLink href="/" className="hover:text-white">Home</TransitionLink><span>/</span>
                <TransitionLink href="/#services" className="hover:text-white">Services</TransitionLink><span>/</span>
                <TransitionLink href={`/services/${parent.slug}`} className="hover:text-white">{parent.practice}</TransitionLink><span>/</span>
                <span className="text-white" aria-current="page">{s.name}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.55} className="eyebrow text-mute">{s.name}</Reveal>
            <SplitReveal as="h1" onLoad delay={0.65} className="display text-[clamp(46px,7vw,112px)]"
              lines={[s.headline[0], <span key="h" className="text-red">{s.headline[1]}</span>]} />
            <Reveal delay={0.9} as="p" className="max-w-[620px] text-[18px] leading-relaxed text-[#b5b5b5] md:text-[21px]">{s.lede}</Reveal>
            <Reveal delay={1} className="flex flex-col gap-3 sm:flex-row">
              <Magnetic><a href={wa} className="btn btn-red w-full">Talk to our {s.desk} <Arrow /></a></Magnetic>
              <Magnetic><TransitionLink href="/#contact" className="btn btn-ghost w-full">Send an enquiry</TransitionLink></Magnetic>
            </Reveal>
          </div>
          <Object3D kind={s.scene} className="hero-obj h-[340px] lg:col-span-5 lg:h-[620px]" />
        </div>
      </header>

      {/* What we cover, scrolling past */}
      <div className="overflow-hidden border-y border-[#1e1e1e] py-5 md:py-7" aria-label={`Covered in ${s.name}: ${names.join(", ")}`}>
        <div className="marquee-track items-center gap-8 whitespace-nowrap text-[18px] font-bold md:gap-11 md:text-[26px]" aria-hidden="true">
          {[...names, ...names].map((n, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-11">
              <span className={i % 2 ? "text-outline" : ""}>{n}</span><span className="h-2 w-2 bg-red md:h-2.5 md:w-2.5" />
            </span>
          ))}
        </div>
      </div>

      {/* Statement + overview */}
      <section className="wrap grid grid-cols-1 items-center gap-12 bg-white py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal className="eyebrow text-mute-dark">Overview</Reveal>
          <h2 className="sr-only">About our {s.name} service</h2>
          <ScrubWords text={s.statement[0]} muted={s.statement[1]}
            className="text-[clamp(28px,3.4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.03em]" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {s.overview.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className="text-[17px] leading-relaxed text-[#3d3d3d]">{p}</Reveal>
            ))}
          </div>
        </div>
        <Reveal className="rounded-[28px] bg-black p-6 md:p-10 lg:col-span-4 lg:col-start-9">
          <ServiceArt kind={parent.kind} />
        </Reveal>
      </section>

      {s.groups.map((g, gi) => <Track key={g.title} g={g} gi={gi} />)}

      {/* How we work */}
      <section className="wrap grid grid-cols-1 gap-12 bg-bone py-20 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="flex flex-col gap-6 lg:sticky lg:top-32">
            <Reveal className="eyebrow text-mute-dark">How we work</Reveal>
            <SplitReveal className="text-[clamp(40px,5vw,76px)] font-extrabold leading-[0.98] tracking-[-0.035em]" lines={["Four steps.", "No surprises."]} />
            <Reveal as="p" className="max-w-[420px] text-[17px] leading-relaxed text-[#3d3d3d]">
              You always know what&apos;s happening, what&apos;s next and what it costs — before any work begins.
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7"><Steps steps={s.steps} /></div>
      </section>

      {/* Featured insight */}
      {project && (
        <section className="wrap py-20 md:py-32">
          <div className="mb-10 flex flex-col gap-5 md:mb-14">
            <Reveal className="eyebrow text-mute">Featured insight</Reveal>
            <SplitReveal className="h2" lines={["Proof, not promises."]} />
          </div>
          <TransitionLink href={`/work/${project.slug}`} data-cursor="View" className="group block">
            <div ref={feat} className="grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-[#0b0b0b] md:grid-cols-2">
              <span className="relative block aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[480px]">
                <span className="feat-img absolute inset-0">
                  <Cover cover={project.cover} sub={project.coverSub} bg={project.bg} accent={project.accent} image={project.image} alt={project.alt} />
                </span>
              </span>
              <span className="flex flex-col justify-center gap-5 p-8 md:p-14">
                <span className="w-fit rounded-full border border-red/60 bg-red/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#ffb3a3]">{project.kicker}</span>
                <span className="text-[clamp(30px,3.4vw,50px)] font-extrabold leading-[1.02] tracking-[-0.03em] transition-colors duration-500 group-hover:text-red">{project.name}</span>
                <span className="text-[17px] leading-relaxed text-[#b5b5b5]">{project.summary}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.12em]">Read case study <Arrow /></span>
              </span>
            </div>
          </TransitionLink>
        </section>
      )}

      <Faqs faqs={s.faqs} id={`faq-${s.slug}`} />

      {/* Contact desk */}
      <section className="wrap py-20 md:py-28">
        <div ref={desk} onPointerMove={glow}
          className="desk relative flex flex-col gap-8 overflow-hidden rounded-[32px] border border-line bg-[#0b0b0b] p-8 md:p-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true"
            style={{ background: "radial-gradient(520px circle at var(--gx, 80%) var(--gy, 20%), rgba(236,48,19,.22), transparent 60%)" }} />
          <Reveal className="eyebrow relative text-mute">Contact desk</Reveal>
          <SplitReveal className="display relative text-[clamp(40px,6vw,96px)]" lines={[s.ctaLine, <span key="d" className="text-red">Talk to our {s.desk}.</span>]} />
          <Reveal className="relative flex flex-col gap-2">
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-mute">Call us</span>
            <a href={`tel:${site.phoneE164}`} aria-label={`Call ${site.phoneDisplay}`}
              className="w-fit text-[clamp(36px,6vw,88px)] font-extrabold tabular-nums leading-none tracking-[-0.03em] transition-colors hover:text-red">
              <RollIn text={site.phoneDisplay} />
            </a>
            <span className="text-[16px] font-semibold text-[#b5b5b5]">
              WhatsApp <a href={wa} className="text-white hover:text-red">{site.whatsappDisplay}</a>
            </span>
          </Reveal>
          <Reveal className="relative flex flex-col gap-3 sm:flex-row">
            <Magnetic><a href={wa} className="btn btn-red w-full">Chat on WhatsApp <Arrow /></a></Magnetic>
            <Magnetic><a href={`mailto:${site.email}?subject=${encodeURIComponent(s.name)}`} className="btn btn-ghost w-full">Email {site.email}</a></Magnetic>
          </Reveal>
        </div>
      </section>

      {/* More solutions */}
      <section className="wrap pb-10 pt-6 md:pb-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <Reveal className="eyebrow text-mute">More solutions</Reveal>
          <TransitionLink href={`/services/${parent.slug}`} className="inline-flex items-center gap-2 text-[15px] font-semibold hover:text-red">
            Part of our {parent.practice} practice <Arrow />
          </TransitionLink>
        </div>
        <ul className="border-t border-[#1e1e1e]">
          {others.map((o) => (
            <li key={o.slug}>
              <TransitionLink href={`/services/${o.slug}`} data-cursor="Open"
                className="sweep group flex items-center justify-between gap-6 border-b border-[#1e1e1e] py-6 md:py-8">
                <span className="text-[clamp(28px,4.6vw,72px)] font-extrabold leading-none tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4">{o.name}</span>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-black group-hover:bg-black md:h-20 md:w-20">
                  <Arrow className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
