// All site copy lives here so it can later move to a CMS without touching components.

export const site = {
  name: "FlyHi Social",
  url: "https://flyhisocial.com",
  tagline: "We build brands, products & broadcasts.",
  description:
    "FlyHi Social is a creative technology studio in Bhubaneswar, Odisha — AI automation, SaaS tools, websites, brand identity, live streaming and event technology from one team.",
  email: "flyhisocials@gmail.com",
  // Calls go to one number, WhatsApp to another.
  phoneDisplay: "+91 9090031316",
  phoneE164: "+919090031316",
  whatsappDisplay: "+91 7978559950",
  whatsapp: "https://wa.me/917978559950",
  address: ["Plot No. 4775/2, B.J.B. Nagar", "Bhubaneswar, Odisha 751014"],
};

export type Practice = { num: string; name: string; items: string[]; blurb: string; cta: string; href: string };

export const practices: Practice[] = [
  {
    num: "01",
    name: "Build",
    cta: "Explore web & app development",
    href: "/services/web-app-development",
    blurb: "Fast, reliable software for the phones your audience actually uses.",
    items: ["Websites & web apps", "Mobile apps", "SaaS products", "Dashboards & portals"],
  },
  {
    num: "02",
    name: "AI & Automation",
    cta: "Explore AI automation",
    href: "/services/ai-automation",
    blurb: "AI that answers, books, follows up and reports — so your team doesn't have to.",
    items: ["WhatsApp & web AI assistants", "Workflow automation", "AI content engines", "Custom AI tools"],
  },
  {
    num: "03",
    name: "Brand",
    cta: "Explore branding & marketing",
    href: "/services/branding-digital-marketing",
    blurb: "Identities and stories that make people stop scrolling.",
    items: ["Brand identity", "Digital marketing", "Social media", "Content, film & photography"],
  },
  {
    num: "04",
    name: "Broadcast & Events",
    cta: "Explore live & event tech",
    href: "/services/live-streaming-event-technology",
    blurb: "The live moment, run end to end — on stage and on screen.",
    items: ["Live streaming", "Hybrid & virtual sessions", "LED wall & event tech", "Event management"],
  },
  {
    num: "05",
    name: "Enterprise",
    cta: "Explore enterprise solutions",
    href: "/services/cloud-erp-enterprise",
    blurb: "Infrastructure and systems for organisations that can't afford downtime.",
    items: ["Cloud & AI infrastructure", "ERP solutions", "Healthcare technology", "Marine consultancy"],
  },
];

export type Stat = { value: string; label: string };
export type Project = {
  slug: string;
  name: string;
  year: string;
  kicker: string;
  summary: string;
  tags: string;
  practices: string[];
  stats: Stat[];
  bg: string;
  accent: string;
  cover: string;
  coverSub: string;
  image?: string;
  alt?: string;
  challenge: string;
  work: string[];
};

export const projects: Project[] = [
  {
    slug: "nature-cm-2026",
    name: "NATURE-CM 2026",
    year: "2026",
    kicker: "National seminar · CSIR-IMMT, Bhubaneswar",
    summary:
      "Conference website, registration, social media and the invitation film for a three-day national seminar on critical minerals.",
    tags: "Build · Brand · Events",
    practices: ["Build", "Brand", "Broadcast & Events"],
    stats: [
      { value: "3", label: "day national seminar" },
      { value: "4", label: "workstreams: web, registration, social, film" },
      { value: "Nov", label: "2026 at CSIR-IMMT" },
    ],
    bg: "#0F1A14",
    accent: "#EC3013",
    cover: "NATURE‑CM",
    coverSub: "14–16 NOV 2026 · BHUBANESWAR",
    challenge:
      "A national seminar needed one partner to carry it from announcement to the event itself — online presence, registrations and the story told on social.",
    work: [
      "Designed and built naturecm.org",
      "Set up registration for delegates",
      "Ran Instagram, Facebook and LinkedIn",
      "Produced the invitation film and conference banners",
    ],
  },
  {
    slug: "isacon-odisha-2026",
    name: "ISACON Odisha 2026",
    year: "2026",
    kicker: "53rd annual conference · ISA Kataka City Branch",
    summary:
      "Seventeen hybrid sessions run end to end — speaker checks, live session timers and Zoom operations — plus LED-wall output at the venue.",
    tags: "Broadcast · Events",
    practices: ["Broadcast & Events"],
    stats: [
      { value: "17", label: "hybrid sessions operated" },
      { value: "53rd", label: "annual conference of ISA Kataka" },
      { value: "LED", label: "wall output at the venue" },
    ],
    bg: "#111114",
    accent: "#EC3013",
    cover: "ISACON",
    coverSub: "17 HYBRID SESSIONS · SEPT 2026",
    challenge:
      "Paper and e-poster sessions ran daily across two weeks, with presenters joining remotely and strict timing rules for every slot.",
    work: [
      "Operated every Zoom session and tested each presenter's slides",
      "Built a session timer visible to presenters inside the Zoom feed",
      "Ran LED-wall output at the venue",
    ],
  },
  {
    slug: "sanhem-health",
    name: "SANHEM Health",
    year: "2026",
    kicker: "In-house product · AI-guided doctor booking",
    summary:
      "Patients describe symptoms to an AI health guide, find verified doctors in their city and book with WhatsApp confirmations.",
    tags: "AI · Healthcare tech",
    practices: ["Build", "AI & Automation", "Enterprise"],
    stats: [
      { value: "AI", label: "health guide from symptoms to doctor" },
      { value: "WhatsApp", label: "booking confirmations" },
      { value: "Live", label: "at sanhemhealth.com" },
    ],
    bg: "#07261C",
    accent: "#0E9D6A",
    cover: "SANHEM",
    coverSub: "SANHEMHEALTH.COM",
    challenge:
      "Patients in Tier 2 and 3 cities struggle to find the right doctor and clinics lose bookings to phone tag.",
    work: [
      "AI health guide that turns symptoms into the right specialty",
      "Doctor discovery by city with clinic and video consultations",
      "WhatsApp confirmations and reminders",
    ],
  },
  {
    slug: "openex",
    name: "OpenEX",
    year: "2026",
    kicker: "Launch film · Local marketplace app",
    summary: "A 35-second product film in two formats — narration, original score and a vector rebuild of the app UI.",
    tags: "Brand · Film",
    practices: ["Brand"],
    stats: [
      { value: "35s", label: "launch film" },
      { value: "2", label: "formats: 9:16 and 16:9" },
      { value: "7", label: "scenes rebuilt from the app UI" },
    ],
    bg: "#EDF2FB",
    accent: "#EC3013",
    cover: "OpenEX",
    coverSub: "BUY · SELL · RENT",
    image: "/media/work-openex.jpg",
    alt: "OpenEX app shown on a phone surrounded by 3D category icons",
    challenge: "A new local marketplace app needed a launch film that explains buying, selling and renting in half a minute.",
    work: [
      "Storyboard built from the real app screens",
      "Every screen rebuilt as clean vector UI",
      "Narration, original score and sound design",
      "Vertical cut for Reels and widescreen cut for YouTube",
    ],
  },
];

/* Packages — fixed scope. Add a price per package
   (e.g. price: "From ₹25,000") when you're ready to show one. */
export type Package = { name: string; bestFor: string; body: string; includes: string[]; price?: string; hot?: boolean };
export const packages: Package[] = [
  {
    name: "WhatsApp AI Assistant",
    bestFor: "Clinics, salons, coaching centres, service businesses", hot: true,
    body: "An assistant on your WhatsApp number that answers questions, takes bookings and follows up — 24/7.",
    includes: ["Trained on your services, prices & FAQs", "Bookings with reminders", "Hands over to a human when needed", "Weekly conversation report"],
  },
  {
    name: "Launch Website",
    bestFor: "New businesses, rebrands, anyone without a site that sells",
    body: "A fast, premium website that looks great on every phone and turns visitors into enquiries.",
    includes: ["Up to 5 pages, designed for your brand", "WhatsApp chat & enquiry form", "Google-ready SEO basics", "Hosting set up & handed over"],
  },
  {
    name: "Lead Autopilot",
    bestFor: "Businesses running ads or getting enquiries from many places",
    body: "Every enquiry from your website, ads and Instagram in one place — replied to in minutes, not days.",
    includes: ["All lead sources into one sheet or CRM", "Instant WhatsApp & email replies", "Follow-up reminders for your team", "Monthly lead report"],
  },
  {
    name: "Content Engine",
    bestFor: "Brands that want to show up on Instagram every week",
    body: "A month of reels and posts, planned and produced with AI-assisted scripting in your brand voice.",
    includes: ["12 reels or posts a month", "Scripts, captions & hashtags", "Posting calendar & scheduling", "Monthly performance recap"],
  },
];

export const process = [
  { num: "01", name: "Discover", body: "We learn the business, the audience and what success looks like." },
  { num: "02", name: "Design", body: "Brand, interface and story, shaped and tested before a line of code." },
  { num: "03", name: "Build", body: "Engineered for speed, scale and the phones your audience actually uses." },
  { num: "04", name: "Launch & grow", body: "We go live, broadcast, measure and keep improving." },
];

/* AI & Automation — what a brand can switch on. */
export type Solution = { name: string; body: string; tags: string[] };
export const aiSolutions: Solution[] = [
  { name: "WhatsApp AI assistant", body: "Answers customers, takes bookings and sends reminders on WhatsApp — day and night, in English, Hindi or Odia.", tags: ["Bookings", "Support", "Reminders"] },
  { name: "Website AI chat", body: "A chat assistant trained on your services, prices and FAQs that turns visitors into enquiries.", tags: ["Lead capture", "FAQs"] },
  { name: "Lead follow-up autopilot", body: "Every enquiry from your site, ads or Instagram lands in one place and gets a reply in minutes, not days.", tags: ["CRM", "n8n", "Email"] },
  { name: "AI content engine", body: "Turns one video or blog into a week of posts, captions and reels ideas in your brand voice.", tags: ["Social", "Repurposing"] },
  { name: "Documents on autopilot", body: "Invoices, quotes, certificates and reports generated and sent without copy-paste.", tags: ["Invoices", "Reports"] },
  { name: "Custom AI tools & SaaS", body: "Dashboards, portals and AI tools built around how your business actually works.", tags: ["Dashboards", "Portals", "SaaS"] },
];

export type Product = { name: string; status: string; body: string; url?: string };
export const saasProducts: Product[] = [
  { name: "SANHEM Health", status: "Live", body: "AI-guided doctor discovery and booking with WhatsApp confirmations.", url: "https://sanhemhealth.com" },
  { name: "NexusFlow Marketing OS", status: "Built", body: "Plan, publish and track social media across Instagram, Facebook, X and YouTube from one screen." },
  { name: "Delegate Desk", status: "In development", body: "Event registration, QR passes, venue check-in, badge printing and meal claims." },
];

export const marquee = [
  "Web & Apps",
  "AI Automation",
  "WhatsApp AI",
  "SaaS Tools",
  "Brand Identity",
  "Live Streaming",
  "Event Technology",
  "Content & Film",
  "Cloud & ERP",
  "Healthcare Tech",
];
