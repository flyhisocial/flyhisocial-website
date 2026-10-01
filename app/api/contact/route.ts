import { NextResponse, type NextRequest } from "next/server";

// Server-side contact endpoint. The n8n webhook URL and secret never reach the browser.
//   CONTACT_WEBHOOK_URL     – n8n webhook that emails / WhatsApps you and saves the lead
//   CONTACT_WEBHOOK_SECRET  – optional; sent as X-FlyHi-Secret so n8n can reject anything else

const INTERESTS = new Set(["AI & Automation", "Website / App", "Brand & Content", "Live / Event", "Enterprise", "Something else"]);
const MAX_BODY = 8_000; // bytes
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort per-instance rate limit. For multi-instance hosting, back this with Redis/Upstash.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}

// Strip control characters and trim; React already escapes on render, n8n gets clean text.
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s-]{8,16}$/;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  // Same-origin only: browsers always send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "forbidden");
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return fail(415, "unsupported");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return fail(429, "too_many_requests");

  const raw = await req.text();
  if (raw.length > MAX_BODY) return fail(413, "too_large");
  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); } catch { return fail(400, "invalid"); }

  // Bots fill the hidden field and submit instantly; pretend success so they move on.
  const elapsed = Date.now() - Number(body.startedAt ?? 0);
  if (clean(body.website, 200) || !Number.isFinite(elapsed) || elapsed < 2500) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const contact = clean(body.contact, 120);
  const message = clean(body.message, 2000);
  const interest = clean(body.interest, 40);
  if (name.length < 2 || !(EMAIL.test(contact) || PHONE.test(contact)) || !INTERESTS.has(interest)) return fail(422, "invalid");

  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) return fail(503, "not_configured");

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET ? { "X-FlyHi-Secret": process.env.CONTACT_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ name, contact, message, interest, source: "flyhisocial.com", receivedAt: new Date().toISOString() }),
      signal: ctrl.signal,
    });
    if (!r.ok) return fail(502, "upstream");
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return fail(502, "upstream");
  } finally {
    clearTimeout(timer);
  }
}
