/* AI copy check: reads a page's HTML and finds the writing habits that make copy sound machine-written.
   Pure functions only (no network), so the same code runs in the API route and in tests. */

export type Finding = {
  id: string;
  kind: "copy" | "design";
  label: string;
  points: number; // added to the AI score
  detail: string; // what we found, in plain words
  why: string; // why readers notice it
  evidence: string[]; // short quotes from the page
};

export type QuickWin = { id: string; label: string; detail: string };

export type CheckResult = {
  words: number;
  score: number; // 0 to 100, higher sounds more AI-written
  verdict: string;
  findings: Finding[];
  quickWins: QuickWin[];
  title: string;
};

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—", ndash: "–",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", middot: "·", copy: "©",
};

function decode(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function attr(html: string, re: RegExp) {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : "";
}

/** Visible text as lines, roughly one per block element. */
export function extractText(html: string) {
  const body = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|template|iframe|canvas)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<head\b[\s\S]*?<\/head>/i, " ");
  const withBreaks = body.replace(/<\/?(p|h[1-6]|li|div|section|article|header|footer|nav|br|tr|td|th|blockquote|figcaption|button|label|dt|dd|summary)\b[^>]*>/gi, "\n");
  const text = decode(withBreaks.replace(/<[^>]+>/g, " "));
  return text
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 1);
}

const clip = (s: string, around = -1, max = 140) => {
  if (s.length <= max) return s;
  if (around < 0) return s.slice(0, max - 1).trimEnd() + "…";
  const start = Math.max(0, around - Math.floor(max / 2));
  const piece = s.slice(start, start + max).trim();
  return (start > 0 ? "…" : "") + piece + (start + max < s.length ? "…" : "");
};

const uniq = (xs: string[]) => [...new Set(xs)];

const BUZZWORDS = [
  "seamless", "seamlessly", "unlock", "unlocks", "elevate", "elevates", "empower", "empowers", "empowering", "leverage", "leveraging",
  "cutting-edge", "state-of-the-art", "game-changer", "game-changing", "revolutionize", "revolutionise", "revolutionizing", "revolutionising",
  "delve", "tapestry", "synergy", "streamline", "streamlined", "next-level", "world-class", "best-in-class", "transformative",
  "unleash", "supercharge", "effortless", "effortlessly", "harness the power", "look no further", "in today's fast-paced",
  "in today’s fast-paced", "ever-evolving", "embark on", "tailored solutions", "innovative solutions", "one-stop solution",
];

function countMatches(text: string, re: RegExp) {
  return (text.match(re) ?? []).length;
}

export function analyse(html: string): CheckResult {
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDesc =
    attr(html, /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const lines = extractText(html);
  const all = [title, metaDesc, ...lines].filter(Boolean);
  const bodyText = lines.join("\n");
  const words = countMatches(bodyText, /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
  const findings: Finding[] = [];

  // 1. Em dashes: the single most-cited tell in short marketing copy.
  const dashLines = all.filter((l) => l.includes("—"));
  const dashes = all.reduce((n, l) => n + countMatches(l, /—/g), 0);
  if (dashes > 0) {
    findings.push({
      id: "em-dash", kind: "copy", label: "Em dashes", points: dashes >= 6 ? 30 : dashes >= 3 ? 20 : 10,
      detail: `${dashes} em dash${dashes === 1 ? "" : "es"} (—) in the page text${dashLines.some((l) => l === title || l === metaDesc) ? ", including your Google title or description" : ""}.`,
      why: "AI writing tools use the long dash constantly. Readers who use ChatGPT now spot it straight away.",
      evidence: uniq(dashLines).slice(0, 3).map((l) => clip(l, l.indexOf("—"))),
    });
  }

  // 2. Three one-word sentences in a row ("Ideas. Engineered. Launched.").
  const beat = /\b([A-Z][a-z]{2,})[.!]\s+([A-Z][a-z]{2,})[.!]\s+([A-Z][a-z]{2,})[.!]/;
  const beatLines = lines.filter((l) => beat.test(l));
  if (beatLines.length) {
    findings.push({
      id: "three-beat", kind: "copy", label: "Three-word slogan", points: 15,
      detail: "A slogan made of three one-word sentences.",
      why: "It's a formula AI tools reach for when asked for a tagline, so it reads as generic.",
      evidence: uniq(beatLines).slice(0, 2).map((l) => clip(l.match(beat)?.[0] ?? l)),
    });
  }

  // 3. Buzzwords AI tools overuse.
  const lower = all.join("\n").toLowerCase();
  const hits = BUZZWORDS.map((w) => {
    const re = new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`, "g");
    return { w, n: countMatches(lower, re) };
  }).filter((h) => h.n > 0);
  if (hits.length) {
    const total = hits.reduce((n, h) => n + h.n, 0);
    findings.push({
      id: "buzzwords", kind: "copy", label: "AI buzzwords", points: Math.min(25, 4 * hits.length + 2 * (total - hits.length)),
      detail: `${total} use${total === 1 ? "" : "s"} of words AI tools overuse: ${hits.slice(0, 6).map((h) => `“${h.w}”${h.n > 1 ? ` ×${h.n}` : ""}`).join(", ")}.`,
      why: "Words like these say nothing specific about your business, and readers skim past them.",
      evidence: [],
    });
  }

  // 4. "Not just X, it's Y" contrasts.
  const contrast = /\b(not just|isn['’]t just|more than just)\b|\bit['’]s not [^.!?]{1,40}, it['’]s\b/i;
  const contrastLines = lines.filter((l) => contrast.test(l));
  if (contrastLines.length) {
    findings.push({
      id: "contrast", kind: "copy", label: "“Not just X” phrasing", points: Math.min(15, 8 * contrastLines.length),
      detail: `${contrastLines.length} sentence${contrastLines.length === 1 ? "" : "s"} built as “not just this, but that”.`,
      why: "AI copy leans on this pattern to sound important. Saying the thing directly is stronger.",
      evidence: uniq(contrastLines).slice(0, 2).map((l) => clip(l, l.search(contrast))),
    });
  }

  // 5. Emoji used as bullet points.
  const emojiLines = lines.filter((l) => /^(\p{Extended_Pictographic}|✅|✔)/u.test(l));
  if (emojiLines.length >= 3) {
    findings.push({
      id: "emoji-bullets", kind: "copy", label: "Emoji bullet points", points: 10,
      detail: `${emojiLines.length} lines start with an emoji, like 🚀 or ✅.`,
      why: "Emoji bullets are a default of chatbot-written lists.",
      evidence: uniq(emojiLines).slice(0, 2).map((l) => clip(l)),
    });
  }

  // 6. Template section headings.
  const tmpl = /^(why choose us\??|unlock your potential|elevate your [a-z ]+|your journey starts here|ready to get started\??|ready to take [a-z ]+ to the next level\??)$/i;
  const tmplLines = lines.filter((l) => tmpl.test(l));
  if (tmplLines.length) {
    findings.push({
      id: "template-headings", kind: "copy", label: "Template headings", points: 10,
      detail: `Stock headings like ${uniq(tmplLines).slice(0, 2).map((l) => `“${l}”`).join(" and ")}.`,
      why: "These headings appear on thousands of sites and tell visitors nothing about you.",
      evidence: [],
    });
  }


  // 7. Stock hero headline (the first main heading).
  const h1 = decode((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  const stockHero = /^(transform|revolutioni[sz]e|elevate|unlock|empower|supercharge|reimagine|redefin(e|ing)|unleash|accelerate)\b|^(the future of|welcome to the future|next[- ]generation|your (one-stop|all-in-one|ultimate))\b|\b(ai[- ]powered|powered by ai)\b/i;
  if (h1 && stockHero.test(h1)) {
    findings.push({
      id: "stock-hero", kind: "copy", label: "Stock headline", points: 12,
      detail: "Your main heading opens with a phrase AI tools default to.",
      why: "Visitors read the headline first. A generic one makes the whole site feel template-made.",
      evidence: [clip(h1)],
    });
  }

  // 8. Row of round-number brags ("10,000+", "99%", "24/7").
  const statRe = /^(\d{1,3}(,\d{3})*(\.\d+)?|\d+(\.\d+)?)\s?(\+|%|k\+?|m\+?|x)$|^24\/7$/i;
  const stats = lines.filter((l) => statRe.test(l));
  if (stats.length >= 3) {
    findings.push({
      id: "stat-row", kind: "copy", label: "Round-number brag row", points: 8,
      detail: `${stats.length} big round numbers shown on their own, like ${uniq(stats).slice(0, 4).join(", ")}.`,
      why: "A row of numbers with no source is a fixture of AI-built landing pages, and visitors don't trust it.",
      evidence: [],
    });
  }

  // 9. Five-star testimonial blocks.
  // Star glyphs and star aria-labels often mark the same rating, so take the larger count, not the sum.
  const stars = Math.max(countMatches(html, /★{5}/g), countMatches(html, /aria-label=["'][^"']*(5 (out of 5 )?stars|rated 5)/gi));
  if (stars >= 2) {
    findings.push({
      id: "five-stars", kind: "copy", label: "Five-star testimonial cards", points: 6,
      detail: `${stars} perfect five-star ratings on the page.`,
      why: "Every review at five stars, with no link to Google or another source, reads as invented.",
      evidence: [],
    });
  }

  // Design patterns visible in the page code (common in AI website builders).
  const gradientText = countMatches(html, /bg-clip-text|background-clip:\s*text/gi);
  if (gradientText) {
    findings.push({
      id: "gradient-text", kind: "design", label: "Gradient text", points: 10,
      detail: `${gradientText} heading${gradientText === 1 ? "" : "s"} filled with a colour gradient.`,
      why: "Gradient headlines are one of the most recognisable looks of AI-generated sites.",
      evidence: [],
    });
  }
  const orbs = countMatches(html, /\bblur-(2xl|3xl)\b|blur\(\s*([4-9]\d|[1-9]\d{2})px\s*\)/gi);
  if (orbs) {
    findings.push({
      id: "glow-orbs", kind: "design", label: "Glowing background blobs", points: 8,
      detail: "Large blurred colour shapes behind the content.",
      why: "Soft glowing orbs are a default background of AI site builders.",
      evidence: [],
    });
  }
  const glass = countMatches(html, /backdrop-blur|backdrop-filter:\s*blur/gi);
  if (glass >= 3) {
    findings.push({
      id: "frosted-glass", kind: "design", label: "Frosted glass panels", points: 4,
      detail: `${glass} see-through blurred panels.`,
      why: "Used everywhere, frosted glass makes a site look like every other AI-built page.",
      evidence: [],
    });
  }
  const iconCards = countMatches(html, /<svg\b[\s\S]{0,1500}?<\/svg>\s*(?:<\/?[a-z][^>]*>\s*){0,4}<h3\b/gi);
  if (iconCards >= 3) {
    findings.push({
      id: "icon-cards", kind: "design", label: "Icon card grid", points: 10,
      detail: `${iconCards} cards built as icon, title and one line of text.`,
      why: "It's how AI tools fill a features section when there's nothing specific to show.",
      evidence: [],
    });
  }

  const raw = findings.reduce((n, f) => n + f.points, 0);
  const score = Math.min(100, raw);
  const verdict =
    score <= 15 ? "Sounds human" : score <= 35 ? "A few AI habits" : score <= 60 ? "Noticeably AI-written" : "Reads like a chatbot wrote it";

  // Quick wins that cost enquiries (not part of the AI score).
  const quickWins: QuickWin[] = [];
  if (!metaDesc) quickWins.push({ id: "meta", label: "No Google description", detail: "Google has no summary to show under your name, so it picks random text from the page." });
  if (!/href=["'](tel:|https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\/)/i.test(html))
    quickWins.push({ id: "contact", label: "No tap-to-call or WhatsApp link", detail: "Phone visitors can't reach you in one tap, which is where most enquiries are lost." });
  if (!title) quickWins.push({ id: "title", label: "No page title", detail: "Browser tabs and Google results show a blank or generic name for your page." });

  return { words, score, verdict, findings: findings.sort((a, b) => b.points - a.points), quickWins, title };
}
