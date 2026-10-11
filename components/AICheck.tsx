"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/content";
import { getLenis } from "@/lib/motion";
import { Arrow, Magnetic } from "./effects";

type Finding = { id: string; label: string; points: number; detail: string; why: string; evidence: string[] };
type QuickWin = { id: string; label: string; detail: string };
type Result = { ok: true; url: string; words: number; score: number; verdict: string; findings: Finding[]; quickWins: QuickWin[] };
type Failure = { ok: false; error: string; message: string; url?: string };

const PRICE = "₹4,999";

export default function AICheck() {
  const [state, setState] = useState<"idle" | "checking" | "done" | "failed">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [failure, setFailure] = useState<Failure | null>(null);
  const out = useRef<HTMLDivElement>(null);

  const run = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = String(new FormData(e.currentTarget).get("url") ?? "").trim();
    if (!url) return;
    setState("checking"); setResult(null); setFailure(null);
    try {
      const r = await fetch("/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) });
      const data = (await r.json()) as Result | Failure;
      if (data.ok) { setResult(data); setState("done"); }
      else { setFailure({ ...data, url: data.url ?? url }); setState("failed"); }
    } catch {
      setFailure({ ok: false, error: "network", message: "Something went wrong on our side. Try again, or WhatsApp us the address.", url });
      setState("failed");
    }
  };

  useEffect(() => {
    if ((state === "done" || state === "failed") && out.current) {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(out.current, { offset: -100 });
      else out.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-16">
      <form onSubmit={run} className="flex max-w-[860px] flex-col gap-4">
        <label htmlFor="check-url" className="text-[14px] font-bold uppercase tracking-[0.16em] text-mute">Website address</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="check-url" name="url" type="text" inputMode="url" autoComplete="url" required spellCheck={false}
            placeholder="yourbusiness.com"
            className="min-w-0 flex-1 rounded-full border border-[#3a3a3a] bg-[#0b0b0b] px-6 py-4 text-[18px] text-white placeholder:text-[#7a7a7a] focus:border-white focus:outline-none" />
          <button type="submit" disabled={state === "checking"} className="btn btn-red justify-center disabled:opacity-60">
            {state === "checking" ? "Reading your site…" : <>Check my website <Arrow /></>}
          </button>
        </div>
        <p className="text-[14px] text-mute">Free. Takes about ten seconds. We don&apos;t save the websites you check.</p>
      </form>

      <div ref={out} aria-live="polite">
        {state === "failed" && failure && <Failed f={failure} />}
        {state === "done" && result && <Report r={result} />}
      </div>
    </div>
  );
}

function waLink(text: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

function Failed({ f }: { f: Failure }) {
  return (
    <div className="flex max-w-[860px] flex-col items-start gap-5 rounded-[22px] border border-line bg-[#0b0b0b] p-7 md:p-9">
      <p className="text-[19px] leading-relaxed">{f.message}</p>
      {f.url && (
        <a href={waLink(`Hi FlyHi, your AI copy checker couldn't read ${f.url}. Can you check it for me?`)} className="btn btn-ghost">Ask us on WhatsApp <Arrow /></a>
      )}
    </div>
  );
}

function Report({ r }: { r: Result }) {
  const host = r.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const clean = r.findings.length === 0;
  const tone = r.score <= 15 ? "#7dd3a0" : r.score <= 35 ? "#f5c451" : "var(--color-red)";
  const wa = waLink(`Hi FlyHi, I checked ${host} on your AI copy checker. It scored ${r.score}/100 (${r.verdict}). I'd like the AI Copy Clean-up.`);

  return (
    <div className="flex flex-col gap-12">
      <section aria-label="Score" className="grid grid-cols-1 gap-8 border-y border-line py-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="text-[14px] font-bold uppercase tracking-[0.16em] text-mute">AI score for {host}</div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-[clamp(96px,16vw,180px)] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums" style={{ color: tone }}>{r.score}</span>
            <span className="text-[28px] font-bold text-mute">/100</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:col-span-7">
          <div className="text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{r.verdict}</div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#1c1c1c]" role="img" aria-label={`${r.score} out of 100`}>
            <div className="h-full rounded-full" style={{ width: `${Math.max(2, r.score)}%`, background: tone }} />
          </div>
          <p className="text-[15px] text-mute">We read {r.words.toLocaleString("en-IN")} words on this page. Higher means it sounds more like an AI tool wrote it.</p>
        </div>
      </section>

      {clean ? (
        <p className="max-w-[760px] text-[20px] leading-relaxed text-[#d6d6d6]">
          We didn&apos;t find the usual AI habits on this page. The copy reads like a person wrote it.
        </p>
      ) : (
        <section aria-labelledby="found" className="flex flex-col">
          <h2 id="found" className="mb-6 text-[28px] font-extrabold tracking-[-0.02em]">What gave it away</h2>
          {r.findings.map((f) => (
            <div key={f.id} className="grid grid-cols-1 gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-6">
              <div className="flex items-baseline justify-between gap-4 md:col-span-4 md:flex-col md:justify-start md:gap-2">
                <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{f.label}</h3>
                <span className="text-[15px] font-bold text-red tabular-nums">+{f.points}</span>
              </div>
              <div className="flex min-w-0 flex-col gap-3 md:col-span-8">
                <p className="text-[17px] leading-relaxed">{f.detail}</p>
                {f.evidence.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {f.evidence.map((q) => (
                      <li key={q} className="break-words rounded-[12px] bg-[#111] px-4 py-3 text-[15px] leading-relaxed text-[#cfcfcf]">&ldquo;{q}&rdquo;</li>
                    ))}
                  </ul>
                )}
                <p className="text-[15px] leading-relaxed text-mute">{f.why}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {r.quickWins.length > 0 && (
        <section aria-labelledby="also" className="flex flex-col gap-4">
          <h2 id="also" className="text-[22px] font-extrabold tracking-[-0.02em]">We also noticed</h2>
          <ul className="flex flex-col gap-3">
            {r.quickWins.map((q) => (
              <li key={q.id} className="text-[16px] leading-relaxed text-[#cfcfcf]"><span className="font-bold text-white">{q.label}.</span> {q.detail}</li>
            ))}
          </ul>
        </section>
      )}

      <Offer clean={clean} wa={wa} host={host} score={r.score} verdict={r.verdict} />
    </div>
  );
}

function Offer({ clean, wa, host, score, verdict }: { clean: boolean; wa: string; host: string; score: number; verdict: string }) {
  const [sent, setSent] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const started = useRef(0);
  useEffect(() => { started.current = Date.now(); }, []);

  const callback = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setSent("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(f.get("name") ?? ""), contact: String(f.get("contact") ?? ""), interest: "Website / App",
          message: `AI copy check: ${host} scored ${score}/100 (${verdict}). Wants a call about the AI Copy Clean-up.`,
          website: String(f.get("website") ?? ""), startedAt: started.current,
        }),
      });
      setSent(r.ok ? "sent" : "error");
    } catch { setSent("error"); }
  };

  const field = "w-full border-b border-black/40 bg-transparent py-3 text-[17px] text-black placeholder:text-black/60 focus:border-black focus:outline-none";

  return (
    <section aria-labelledby="fix" className="grid grid-cols-1 gap-10 rounded-[22px] bg-white p-8 text-black md:p-12 lg:grid-cols-12">
      <div className="flex flex-col gap-5 lg:col-span-7">
        <h2 id="fix" className="text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
          {clean ? "Want a second pair of eyes?" : <>We&apos;ll fix it for <span className="text-red-deep">{PRICE}</span></>}
        </h2>
        <p className="max-w-[560px] text-[17px] leading-relaxed text-[#3d3d3d]">
          {clean
            ? "Your copy is in good shape. If you'd like us to look at speed, Google visibility and enquiries next, send us a message."
            : `AI Copy Clean-up: we rewrite up to five pages so they sound like your business wrote them, in about three working days. You approve every change before it goes live.`}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic><a href={wa} className="btn btn-ink w-full justify-center">Fix it on WhatsApp <Arrow /></a></Magnetic>
        </div>
        <p className="text-[14px] text-[#595959]">50% to start, 50% when you&apos;re happy. We used this on our own site first.</p>
      </div>
      <div className="lg:col-span-5">
        {sent === "sent" ? (
          <p className="text-[18px] font-semibold leading-relaxed">Thanks. We&apos;ll call you within one working day.</p>
        ) : (
          <form onSubmit={callback} className="flex flex-col gap-4">
            <div className="text-[14px] font-bold uppercase tracking-[0.16em]">Or we call you</div>
            <label className="sr-only" htmlFor="cb-name">Your name</label>
            <input id="cb-name" name="name" required minLength={2} placeholder="Your name" className={field} />
            <label className="sr-only" htmlFor="cb-contact">Phone or WhatsApp number</label>
            <input id="cb-contact" name="contact" required inputMode="tel" placeholder="Phone or WhatsApp number" className={field} />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <button type="submit" disabled={sent === "sending"} className="btn btn-line mt-2 w-fit disabled:opacity-60">
              {sent === "sending" ? "Sending…" : "Request a call"}
            </button>
            {sent === "error" && <p role="alert" className="text-[15px] font-semibold">That didn&apos;t send. Please use WhatsApp instead.</p>}
          </form>
        )}
      </div>
    </section>
  );
}
