import { NextResponse, type NextRequest } from "next/server";

// Counts clicks on /links (Instagram bio, QR codes on cards and invoices).
// Rows go to the flyhi_link_clicks table in Supabase. The publishable key below is public by
// design; row level security only lets it insert known link/source names, never read.
const SUPABASE_URL = "https://ctocstcndzasusicazzy.supabase.co";
const SUPABASE_KEY = "sb_publishable_4DwFotfLWPPD7B38iOE91w_1FvH9K8t";

const LINKS = new Set(["whatsapp", "call", "website", "email", "instagram", "linkedin", "facebook", "youtube", "directions", "review", "save_contact", "event_desk", "facefind", "cricket_live", "sports_live", "page_view"]);
const SOURCES = new Set(["qr", "instagram", "card", "invoice", "direct", "other", "stream"]);

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return new NextResponse(null, { status: 403 });

  let body: { link?: unknown; source?: unknown } = {};
  try { body = JSON.parse((await req.text()).slice(0, 500)); } catch { return new NextResponse(null, { status: 400 }); }
  const link = typeof body.link === "string" && LINKS.has(body.link) ? body.link : null;
  const source = typeof body.source === "string" && SOURCES.has(body.source) ? body.source : "other";
  if (!link) return new NextResponse(null, { status: 422 });

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/flyhi_link_clicks`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ link, source }),
      signal: AbortSignal.timeout(4000),
    });
  } catch { /* counting must never break the page */ }
  return new NextResponse(null, { status: 204 });
}
