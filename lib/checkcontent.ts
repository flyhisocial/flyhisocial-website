/* Copy for /check that search engines and AI assistants can read and quote.
   Plain, specific, and written without the habits the checker flags. */

export const checkIntro =
  "The FlyHi AI Copy Checker is a free tool that reads any public web page and scores how AI-written it looks and sounds, from 0 to 100. It quotes the exact lines that give it away, such as em dashes, three-word slogans and buzzwords, and flags design patterns common to AI website builders. It takes about ten seconds and nothing is stored.";

export const checkSignals: { name: string; kind: "Words" | "Design"; body: string; fix: string }[] = [
  {
    name: "Em dashes",
    kind: "Words",
    body: "ChatGPT and similar tools use the long dash far more than most people do. Three or more in a short page of marketing copy is the strongest single sign readers notice.",
    fix: "Replace each one with a comma, a colon or a full stop. Read the sentence aloud and use whatever you'd naturally pause with.",
  },
  {
    name: "Three-word slogans",
    kind: "Words",
    body: "Taglines like “Dream. Build. Grow.” are what AI tools produce when asked for something punchy, so thousands of sites now share the same rhythm.",
    fix: "Say what you do and for whom in one plain sentence, like “Websites and WhatsApp booking for clinics in Odisha.”",
  },
  {
    name: "AI buzzwords",
    kind: "Words",
    body: "Words like seamless, unlock, elevate, leverage and cutting-edge sound impressive but say nothing about your business. Repeated, they make a page read like a template.",
    fix: "Swap each one for a fact: a number, a place, a client, a time frame or a price.",
  },
  {
    name: "“Not just X” phrasing",
    kind: "Words",
    body: "Sentences such as “We're not just an agency, we're your partner” are a favourite AI construction for sounding important.",
    fix: "State the point directly. “We answer within an hour on WhatsApp” says more than any contrast.",
  },
  {
    name: "Stock headlines",
    kind: "Words",
    body: "Main headings that open with Transform, Elevate, Unlock or “AI-powered” are the default output of most AI writing tools.",
    fix: "Lead with the customer's problem or the result you deliver, in their words.",
  },
  {
    name: "Round-number brag rows and five-star cards",
    kind: "Words",
    body: "A row of “10,000+ / 99.9% / 24/7” with no source, and testimonials that are all five stars, are fixtures of generated landing pages. Visitors have learned not to trust them.",
    fix: "Show real numbers with context, and link reviews to your Google Business Profile.",
  },
  {
    name: "Gradient text, glowing blobs and icon card grids",
    kind: "Design",
    body: "Colour-gradient headings, soft blurred orbs behind the content and features shown as icon, title and one line are the default look of AI website builders.",
    fix: "Use your own brand colours, real photos of your work, and specific proof in place of generic feature cards.",
  },
];

export const checkFaqs: { q: string; a: string }[] = [
  {
    q: "Is the AI copy checker free?",
    a: "Yes. You can check as many public websites as you like, up to eight checks every ten minutes. There is no sign-up and we don't store the websites you check.",
  },
  {
    q: "How does it decide if a website sounds AI-written?",
    a: "It reads the page's text and code and looks for patterns that AI writing tools and site builders produce far more often than people do: em dashes, three-word slogans, buzzwords, “not just X” sentences, stock headlines, emoji bullets, unsourced number rows, gradient text, glowing backgrounds and icon card grids. Each pattern adds points, up to 100.",
  },
  {
    q: "Does a high score mean AI wrote my website?",
    a: "Not always. It means the page uses the same habits AI tools use, so readers are likely to assume it was. A human writer can score high too. What matters is that customers trust the page less either way.",
  },
  {
    q: "Is this the same as an AI detector for essays?",
    a: "No. Essay detectors try to guess who wrote a long text. This checker is built for business websites. It points to specific lines and design choices you can change, so you know exactly what to fix.",
  },
  {
    q: "Why can't it read my website?",
    a: "Some sites block automated visitors, and some build their text with JavaScript. We try a second time through a real-browser reader. If that also fails, message us on WhatsApp and we'll check it by hand for free.",
  },
  {
    q: "Can you fix my website copy for me?",
    a: "Yes. FlyHi Social's AI Copy Clean-up rewrites up to five pages in your own voice for ₹4,999, in about three working days. You approve every change before it goes live.",
  },
];
