// Long-form service pages. Written for people first, search engines second:
// each page answers what it is, who it's for, what you get, how it works, and common questions.

export type ServiceKind = "build" | "ai" | "brand" | "broadcast" | "enterprise";

export type Service = {
  slug: string;
  kind: ServiceKind;
  practice: string; // matches practices[].name in content.ts
  num: string;
  seoTitle: string;
  metaDescription: string;
  headline: [string, string];
  ctaLine: string;
  intro: string[];
  deliverables: { name: string; body: string }[];
  industries: string[];
  steps: { name: string; body: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // project slugs
};

export const services: Service[] = [
  {
    slug: "web-app-development",
    ctaLine: "Ready for a new website?",
    kind: "build",
    practice: "Build",
    num: "01",
    seoTitle: "Website & App Development in Bhubaneswar",
    metaDescription:
      "Premium websites, web apps, mobile apps and SaaS products built by FlyHi Social in Bhubaneswar, Odisha. Fast on every phone, easy to update, built to bring enquiries.",
    headline: ["Websites and apps", "that actually sell."],
    intro: [
      "Your website is often the first conversation a customer has with you. We design and build websites, web apps and mobile apps that load fast on everyday phones, explain what you do in seconds, and turn visitors into enquiries.",
      "Every build is custom — no recycled templates — and handed over so your team can update content without calling a developer. When you need more than a website, we build full SaaS products, customer portals and internal dashboards on the same foundation.",
    ],
    deliverables: [
      { name: "Business & brand websites", body: "Premium, mobile-first sites with motion, clear messaging and enquiry flows that work." },
      { name: "Landing pages for ads", body: "Focused pages for campaigns, launches and events, built to convert paid traffic." },
      { name: "Web apps & portals", body: "Client portals, booking systems, dashboards and admin panels built around your workflow." },
      { name: "Mobile apps", body: "Android and iOS apps for customers or field teams, sharing one codebase where possible." },
      { name: "SaaS products", body: "From idea to launched product — accounts, subscriptions, admin and analytics." },
      { name: "Care & growth", body: "Hosting, updates, speed and SEO checks so the site keeps performing after launch." },
    ],
    industries: ["Healthcare & clinics", "Education & coaching", "Real estate", "Hospitality", "Startups", "Institutions & events"],
    steps: [
      { name: "Discovery call", body: "We learn your business, customers and goals, and agree what the site must achieve." },
      { name: "Structure & design", body: "Page plan, copy direction and a clickable design you approve before we build." },
      { name: "Build & test", body: "Engineered for speed, accessibility and search, tested on real phones." },
      { name: "Launch & handover", body: "Go live on your domain, set up analytics, and show your team how to edit." },
    ],
    tools: ["Next.js", "React", "Supabase", "Tailwind", "GSAP", "Three.js", "Vercel", "Render"],
    faqs: [
      { q: "Do you build websites for small businesses in Bhubaneswar?", a: "Yes. We work with clinics, coaching centres, shops, startups and institutions across Bhubaneswar and Odisha, and with clients elsewhere in India remotely." },
      { q: "Will I be able to update the website myself?", a: "Yes. We set up simple editing for text, images, projects and blog posts, and walk your team through it at handover." },
      { q: "Is the website optimised for Google?", a: "Every site ships with fast loading, clean page structure, meta titles and descriptions, a sitemap and structured data so search engines understand your business." },
      { q: "Can you add WhatsApp and online booking?", a: "Yes. WhatsApp chat, enquiry forms that reach you instantly, and booking or payment flows are all common additions." },
      { q: "Do you also build mobile apps and SaaS products?", a: "Yes. We build Android and iOS apps and full SaaS products — including our own, SANHEM Health." },
    ],
    related: ["nature-cm-2026", "sanhem-health"],
  },
  {
    slug: "ai-automation",
    ctaLine: "Ready to put AI to work?",
    kind: "ai",
    practice: "AI & Automation",
    num: "02",
    seoTitle: "AI Automation & WhatsApp AI Assistants for Businesses",
    metaDescription:
      "AI automation for your brand: WhatsApp AI assistants, website chatbots, lead follow-up, content engines and custom AI tools. Built by FlyHi Social, Bhubaneswar.",
    headline: ["AI that answers,", "books and follows up."],
    intro: [
      "Most businesses lose customers in the gaps — the WhatsApp message answered the next morning, the enquiry nobody followed up, the report someone forgot to send. We build AI assistants and automations that close those gaps, around the clock.",
      "We start with one high-value workflow, prove it saves time or brings revenue, and grow from there. Everything connects to the tools you already use — WhatsApp, Google Sheets, your CRM, email — and a human can always step in.",
    ],
    deliverables: [
      { name: "WhatsApp AI assistant", body: "Answers FAQs, shares prices, books appointments and sends reminders on your WhatsApp number." },
      { name: "Website AI chat", body: "An assistant trained on your services that captures leads and answers questions on your site." },
      { name: "Lead follow-up autopilot", body: "Enquiries from ads, forms and Instagram collected in one place and replied to in minutes." },
      { name: "AI content engine", body: "Turns one video or article into posts, captions and scripts in your brand voice." },
      { name: "Document automation", body: "Invoices, quotes, certificates and reports generated and sent automatically." },
      { name: "Custom AI tools", body: "Internal assistants, dashboards and agents built around your data and processes." },
    ],
    industries: ["Clinics & hospitals", "Salons & wellness", "Coaching & education", "Real estate", "Retail & D2C", "Events & conferences"],
    steps: [
      { name: "Free AI audit", body: "A 20-minute call to map how you get and serve customers, and spot what to automate first." },
      { name: "Design the workflow", body: "We script the conversations and rules, including when to hand over to a person." },
      { name: "Build & train", body: "We connect the AI to your channels and train it on your information." },
      { name: "Launch & improve", body: "Go live, review real conversations, and keep improving answers every week." },
    ],
    tools: ["Claude API", "WhatsApp Business API", "n8n", "Supabase", "Google Workspace", "WATI"],
    faqs: [
      { q: "What is a WhatsApp AI assistant?", a: "It's an AI connected to your business WhatsApp number that replies to customers instantly — answering questions, sharing details, taking bookings and sending reminders — and passes the chat to your team when needed." },
      { q: "Can the AI reply in Hindi and Odia?", a: "Yes. Modern AI models understand and reply in Hindi and Odia as well as English, and we test replies in the languages your customers use." },
      { q: "Will AI replace my staff?", a: "No — it takes the repetitive questions and follow-ups off their plate so they can focus on customers who need a person." },
      { q: "Is my customer data safe?", a: "We use official business APIs, keep data in your own accounts where possible, and only give the AI the information it needs." },
      { q: "What should we automate first?", a: "Usually the task that happens most often and costs you customers when it's slow — enquiry replies and bookings for most businesses. A free AI audit helps decide." },
    ],
    related: ["sanhem-health"],
  },
  {
    slug: "branding-digital-marketing",
    ctaLine: "Ready to stand out?",
    kind: "brand",
    practice: "Brand",
    num: "03",
    seoTitle: "Branding, Social Media & Digital Marketing in Odisha",
    metaDescription:
      "Brand identity, social media management, digital marketing, video and photography by FlyHi Social — a creative technology studio in Bhubaneswar, Odisha.",
    headline: ["Brands people", "remember."],
    intro: [
      "A strong brand makes every other thing easier — ads cost less, customers trust faster and your team knows how to talk. We create identities and campaigns that are distinctive, consistent and made for the screens your audience lives on.",
      "From a new logo and brand system to a month of reels, we plan, design and produce in-house — strategy, design, film and social under one roof, with AI-assisted workflows that keep output high without losing your voice.",
    ],
    deliverables: [
      { name: "Brand identity", body: "Logo, colours, typography and a brand system with guidelines your team can follow." },
      { name: "Social media management", body: "Content calendars, posting and community management for Instagram, Facebook and LinkedIn." },
      { name: "Reels & short video", body: "Scripted, shot and edited short-form video built for reach." },
      { name: "Brand & product films", body: "Launch films, explainers and motion graphics with original sound." },
      { name: "Photography", body: "Product, team, event and space photography for web and social." },
      { name: "Performance marketing", body: "Meta and Google ad campaigns with landing pages and clear reporting." },
    ],
    industries: ["Startups & D2C", "Healthcare", "Hospitality & food", "Education", "Real estate", "Events"],
    steps: [
      { name: "Brand discovery", body: "Audience, competitors and personality — what you want people to feel and remember." },
      { name: "Identity & direction", body: "Logo, system and content direction presented as real examples." },
      { name: "Produce", body: "Design, film, photograph and write — in a steady monthly rhythm." },
      { name: "Measure & refine", body: "Monthly recaps of what worked, and what we'll do more of next." },
    ],
    tools: ["Figma", "Adobe Creative Cloud", "Meta Business Suite", "Google Ads", "Canva", "AI-assisted editing"],
    faqs: [
      { q: "Do you manage social media for businesses in Bhubaneswar?", a: "Yes — planning, content creation, posting and monthly reporting for Instagram, Facebook and LinkedIn." },
      { q: "Can you redesign our existing logo?", a: "Yes. We can refresh an existing logo while keeping recognition, or create a new identity from scratch." },
      { q: "Do you shoot videos and reels?", a: "Yes. We script, shoot and edit reels, brand films and event videos, including motion graphics and original music." },
      { q: "Do you run paid ads?", a: "Yes, on Meta and Google, paired with landing pages built to convert and simple monthly reports." },
    ],
    related: ["openex", "nature-cm-2026"],
  },
  {
    slug: "live-streaming-event-technology",
    ctaLine: "Planning an event?",
    kind: "broadcast",
    practice: "Broadcast & Events",
    num: "04",
    seoTitle: "Live Streaming, Hybrid Events & Event Technology in Odisha",
    metaDescription:
      "Live streaming, hybrid and virtual sessions, LED wall content, event registration and event management by FlyHi Social, Bhubaneswar.",
    headline: ["The live moment,", "handled end to end."],
    intro: [
      "Conferences, launches and ceremonies happen once — there's no second take. We run the technology that makes live moments work: streaming to YouTube and Zoom, hybrid sessions with remote speakers, LED wall content and the registration desk at the door.",
      "We've run seventeen hybrid sessions for ISACON Odisha 2026 and delivered the website, registration, social media and invitation film for a national seminar at CSIR-IMMT. One partner for the stage and the screen means fewer things fall between vendors.",
    ],
    deliverables: [
      { name: "Live streaming", body: "Multi-camera streams to YouTube, Facebook or private links, with titles and branding." },
      { name: "Hybrid & virtual sessions", body: "Zoom and Meet operations, speaker checks, session timers and moderation." },
      { name: "LED wall & screen content", body: "Stage visuals, lower-thirds and screen output built for your venue." },
      { name: "Registration & check-in", body: "Online registration, QR passes, venue check-in and badge printing." },
      { name: "Event websites & films", body: "Event sites, invitation films and highlight videos." },
      { name: "Event management", body: "Planning and on-ground coordination for corporate and academic events." },
    ],
    industries: ["Medical & academic conferences", "Corporate events", "Government & institutions", "Product launches", "Weddings & ceremonies", "Sports & cultural events"],
    steps: [
      { name: "Event brief", body: "Agenda, venue, audience and what must be streamed, shown or recorded." },
      { name: "Tech plan", body: "Cameras, connectivity, screens and a run-of-show with backups." },
      { name: "Rehearse", body: "Venue checks and speaker tests before the day." },
      { name: "Run & deliver", body: "Operate on the day, then deliver recordings and highlights." },
    ],
    tools: ["OBS", "vMix", "Resolume Arena", "NDI", "Zoom", "YouTube Live"],
    faqs: [
      { q: "Do you provide live streaming services in Bhubaneswar?", a: "Yes. We stream conferences, launches and ceremonies across Bhubaneswar and Odisha to YouTube, Facebook, Zoom or private links." },
      { q: "Can you run hybrid sessions with remote speakers?", a: "Yes. We operate Zoom and Meet sessions, test each presenter's slides beforehand, and manage timing and moderation live." },
      { q: "Can you handle event registration too?", a: "Yes — online registration, QR passes sent by email and WhatsApp, and fast check-in with badge printing at the venue." },
      { q: "What happens if the internet drops?", a: "We plan backups — secondary connections and local recording — so the session and the recording are protected." },
    ],
    related: ["isacon-odisha-2026", "nature-cm-2026"],
  },
  {
    slug: "cloud-erp-enterprise",
    ctaLine: "Ready to modernise?",
    kind: "enterprise",
    practice: "Enterprise",
    num: "05",
    seoTitle: "Cloud, ERP, Healthcare Technology & Marine Consultancy",
    metaDescription:
      "Cloud and AI infrastructure, ERP solutions, healthcare technology and marine consultancy for organisations — delivered by FlyHi Social, Bhubaneswar.",
    headline: ["Systems that keep", "organisations running."],
    intro: [
      "Growing organisations eventually outgrow spreadsheets and disconnected tools. We help plan and deliver the systems underneath — cloud infrastructure, ERP, healthcare platforms and operational tools for maritime and logistics teams.",
      "We focus on practical outcomes: fewer manual steps, one source of truth, and systems your staff will actually use. AI is built in where it saves real time, not bolted on for show.",
    ],
    deliverables: [
      { name: "Cloud & AI infrastructure", body: "Secure, scalable hosting, APIs and data pipelines, with AI services where they add value." },
      { name: "ERP solutions", body: "Selection, integration and customisation of ERP for finance, inventory and operations." },
      { name: "Healthcare technology", body: "Booking, patient records and clinic automation platforms built for Indian healthcare." },
      { name: "Marine consultancy", body: "Logistics planning, fleet operations support and maritime systems architecture." },
      { name: "Integrations", body: "Connecting the tools you already use so data flows without re-typing." },
      { name: "Dashboards & reporting", body: "Live views of the numbers leadership actually needs." },
    ],
    industries: ["Hospitals & clinics", "Manufacturing", "Logistics & maritime", "Education institutions", "Government bodies", "Growing SMEs"],
    steps: [
      { name: "Assess", body: "Map current systems, pain points and what the organisation needs next." },
      { name: "Architect", body: "A clear plan: what to build, buy or integrate, and in what order." },
      { name: "Deliver", body: "Build and integrate in phases, with training for each team." },
      { name: "Support", body: "Monitoring, improvements and help as the organisation grows." },
    ],
    tools: ["AWS", "Google Cloud", "Supabase", "SAP integrations", "n8n", "Claude API"],
    faqs: [
      { q: "Do you work with institutions and government bodies?", a: "Yes. We've delivered work for national institutions and professional bodies, and can support procurement with the documentation it needs." },
      { q: "Can you integrate with our existing ERP?", a: "Usually, yes. We connect ERPs and other tools through their APIs or automation platforms so data flows between them." },
      { q: "What kind of healthcare technology do you build?", a: "Appointment booking, WhatsApp confirmations and reminders, patient logs and clinic dashboards — including our own platform, SANHEM Health." },
      { q: "What does marine consultancy cover?", a: "Logistics planning, fleet operations support and the systems architecture behind maritime operations." },
    ],
    related: ["sanhem-health", "isacon-odisha-2026"],
  },
];

export const serviceByPractice = (name: string) => services.find((s) => s.practice === name);
