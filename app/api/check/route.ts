import { NextResponse, type NextRequest } from "next/server";
import { analyse } from "@/lib/aicheck";
import { fetchPage, FetchError } from "@/lib/safefetch";

// AI copy check: fetches a public page server-side and scores how AI-written its copy sounds.
// Nothing is stored; the per-IP counters below live in memory for ten minutes.

export const runtime = "nodejs";
export const maxDuration = 20;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}

const MESSAGES: Record<string, string> = {
  bad_url: "That doesn't look like a website address. Try something like yourbusiness.com.",
  blocked: "We can only check public websites.",
  unreachable: "We couldn't reach that website. Check the address and try again.",
  not_html: "That address isn't a web page.",
  timeout: "That website took too long to respond. Try again in a minute.",
  http_error: "That website returned an error when we tried to open it.",
  too_many_requests: "You've run a lot of checks. Please wait ten minutes, or WhatsApp us and we'll check it for you.",
  forbidden: "Please use the form on flyhisocial.com/check.",
  invalid: "Please enter a website address.",
};

const fail = (status: number, code: string) =>
  NextResponse.json({ ok: false, error: code, message: MESSAGES[code] ?? MESSAGES.unreachable }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "forbidden");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return fail(429, "too_many_requests");

  let url = "";
  try {
    const raw = await req.text();
    if (raw.length > 2000) return fail(413, "invalid");
    const body = JSON.parse(raw) as { url?: unknown };
    url = typeof body.url === "string" ? body.url.trim().slice(0, 500) : "";
  } catch { return fail(400, "invalid"); }
  if (!url) return fail(422, "invalid");

  try {
    const { html, finalUrl } = await fetchPage(url);
    const result = analyse(html);
    if (result.words < 60) {
      return NextResponse.json(
        { ok: false, error: "too_little_text", url: finalUrl, message: "We could only read a few words on that page. It may load its text with JavaScript, which our quick check can't read. WhatsApp us and we'll check it by hand for free." },
        { status: 200, headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json({ ok: true, url: finalUrl, ...result }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    const code = e instanceof FetchError ? e.code : "unreachable";
    return fail(code === "bad_url" ? 422 : 200, code);
  }
}
