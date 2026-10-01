"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/content";
import { SplitReveal, Reveal, Magnetic, Arrow } from "../effects";

// Enquiries go to our own /api/contact route, which validates, rate-limits and forwards
// to n8n server-side. If the webhook isn't configured yet, we fall back to the mail app.
const INTERESTS = ["AI & Automation", "Website / App", "Brand & Content", "Live / Event", "Enterprise", "Something else"];

export default function Contact() {
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "busy">("idle");
  const started = useRef(0);
  useEffect(() => { started.current = Date.now(); }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = {
      name: String(f.get("name") ?? ""), contact: String(f.get("contact") ?? ""), message: String(f.get("message") ?? ""),
      interest, website: String(f.get("website") ?? ""), startedAt: started.current,
    };
    const mailto = () => {
      const body = `Name: ${data.name}\nContact: ${data.contact}\nInterested in: ${interest}\n\n${data.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("New project enquiry")}&body=${encodeURIComponent(body)}`;
    };
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (r.ok) setState("sent");
      else if (r.status === 503 || r.status === 404 || r.status === 405) { setState("idle"); mailto(); }
      else setState(r.status === 429 ? "busy" : "error");
    } catch { setState("idle"); mailto(); }
  };

  const field = "w-full border-b border-black/60 bg-transparent py-4 text-[18px] text-black placeholder:text-black/75 focus:border-black focus:outline-none";

  return (
    <section id="contact" className="wrap grid grid-cols-1 gap-14 bg-red py-24 text-black md:py-32 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-8 lg:col-span-6">
        <Reveal className="eyebrow on-red font-bold">Let&apos;s talk</Reveal>
        <SplitReveal className="display text-[clamp(56px,8.5vw,136px)]" lines={["Have", "something", "to build?"]} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic><a href={site.whatsapp} className="btn btn-ink w-full">Chat on WhatsApp <Arrow /></a></Magnetic>
          <Magnetic><a href={`mailto:${site.email}`} className="btn btn-line w-full">Email us</a></Magnetic>
        </div>
        <div className="text-[17px] font-semibold leading-relaxed">
          <a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a><br />
          Call <a href={`tel:${site.phoneE164}`} className="hover:underline">{site.phoneDisplay}</a><br />
          WhatsApp <a href={site.whatsapp} className="hover:underline">{site.whatsappDisplay}</a>
        </div>
      </div>

      <Reveal className="lg:col-span-5 lg:col-start-8">
        {state === "sent" ? (
          <div className="flex h-full flex-col justify-center gap-4 rounded-[22px] bg-black p-10 text-white" role="status">
            <div className="text-[34px] font-extrabold tracking-[-0.02em]">Thank you.</div>
            <p className="text-[17px] leading-relaxed text-[#b5b5b5]">We&apos;ll get back to you within one working day — usually much sooner.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="relative flex flex-col gap-6" aria-label="Project enquiry">
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-[14px] font-bold uppercase tracking-[0.16em]">I&apos;m interested in</legend>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((it) => (
                  <button key={it} type="button" aria-pressed={interest === it} onClick={() => setInterest(it)}
                    className={`h-11 rounded-full border px-4 text-[14px] font-semibold transition-colors ${
                      interest === it ? "border-black bg-black text-white" : "border-black/60 hover:border-black"}`}>{it}</button>
                ))}
              </div>
            </fieldset>
            <label className="sr-only" htmlFor="c-name">Your name</label>
            <input id="c-name" name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
            <label className="sr-only" htmlFor="c-contact">Email or phone</label>
            <input id="c-contact" name="contact" required maxLength={120} autoComplete="email" placeholder="Email or WhatsApp number" className={field} />
            <label className="sr-only" htmlFor="c-msg">Tell us about the project</label>
            <textarea id="c-msg" name="message" rows={3} maxLength={2000} placeholder="Tell us about the project" className={`${field} resize-none`} />
            {/* Honeypot: invisible to people, irresistible to bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="c-website">Website</label>
              <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={state === "sending"} className="btn btn-ink">
                {state === "sending" ? "Sending…" : "Send enquiry"} <Arrow />
              </button>
              {state === "error" && <span role="alert" className="text-[15px] font-semibold">Couldn&apos;t send — check your email or number, or WhatsApp us instead.</span>}
              {state === "busy" && <span role="alert" className="text-[15px] font-semibold">Too many tries — please WhatsApp us instead.</span>}
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
