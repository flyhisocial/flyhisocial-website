import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/* Fetch a public web page on behalf of a visitor without letting them point us at private networks.
   Every hop (including redirects) must resolve only to public addresses, on the default ports. */

export class FetchError extends Error {
  constructor(public code: "bad_url" | "blocked" | "unreachable" | "not_html" | "too_large" | "timeout" | "http_error", public status?: number) {
    super(code);
  }
}

function v4Private(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
    (a === 192 && b === 0) || (a === 198 && (b === 18 || b === 19))
  );
}

export function isPrivateAddress(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return v4Private(ip);
  if (kind === 6) {
    const x = ip.toLowerCase();
    const mapped = x.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return v4Private(mapped[1]);
    return x === "::" || x === "::1" || /^f[cd]/.test(x) || /^fe[89ab]/.test(x) || x.startsWith("64:ff9b:") || x.startsWith("ff");
  }
  return true;
}

export function normaliseUrl(input: string): URL {
  let s = input.trim();
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = `https://${s}`;
  let u: URL;
  try { u = new URL(s); } catch { throw new FetchError("bad_url"); }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new FetchError("bad_url");
  if (u.username || u.password) throw new FetchError("bad_url");
  if (u.port && u.port !== "80" && u.port !== "443") throw new FetchError("blocked");
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (!host.includes(".") && !isIP(host)) throw new FetchError("bad_url");
  if (/(^|\.)(localhost|local|internal|lan|home|corp)$/i.test(host)) throw new FetchError("blocked");
  u.hash = "";
  return u;
}

async function assertPublic(u: URL) {
  const host = u.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) {
    if (isPrivateAddress(host)) throw new FetchError("blocked");
    return;
  }
  let addrs: { address: string }[];
  try { addrs = await lookup(host, { all: true, verbatim: true }); } catch { throw new FetchError("unreachable"); }
  if (!addrs.length || addrs.some((a) => isPrivateAddress(a.address))) throw new FetchError("blocked");
}

export async function fetchPage(input: string, { timeoutMs = 9000, maxBytes = 1_500_000, maxRedirects = 4 } = {}) {
  let url = normaliseUrl(input);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    for (let hop = 0; hop <= maxRedirects; hop++) {
      await assertPublic(url);
      let res: Response;
      try {
        res = await fetch(url, {
          redirect: "manual",
          signal: ctrl.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; FlyHiCopyCheck/1.0; +https://flyhisocial.com/check)",
            Accept: "text/html,application/xhtml+xml",
            "Accept-Language": "en-IN,en;q=0.9",
          },
        });
      } catch (e) {
        throw new FetchError(ctrl.signal.aborted ? "timeout" : "unreachable");
      }
      if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
        url = normaliseUrl(new URL(res.headers.get("location")!, url).toString());
        continue;
      }
      if (!res.ok) throw new FetchError("http_error", res.status);
      const type = res.headers.get("content-type") ?? "";
      if (!/text\/html|application\/xhtml/i.test(type)) throw new FetchError("not_html");
      const reader = res.body?.getReader();
      if (!reader) throw new FetchError("unreachable");
      const chunks: Uint8Array[] = [];
      let size = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBytes) { await reader.cancel(); break; } // read the first part; enough for the copy
        chunks.push(value);
      }
      const html = new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks));
      return { html, finalUrl: url.toString() };
    }
    throw new FetchError("unreachable");
  } catch (e) {
    if (e instanceof FetchError) throw e;
    throw new FetchError(ctrl.signal.aborted ? "timeout" : "unreachable");
  } finally {
    clearTimeout(timer);
  }
}
