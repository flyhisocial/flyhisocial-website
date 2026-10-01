// Specialist solution pages that sit under each practice (e.g. Enterprise → ERP Solutions).
// Each page: what it is, the platforms or practice areas we cover, how we work, proof, FAQs and a direct line.

import type { SceneKind } from "@/components/three/Scenes";
import type { IconName } from "@/components/Icons";

export type SolutionItem = { name: string; body: string; mark?: string; icon?: IconName };
export type SolutionGroup = { title: string; intro: string; items: SolutionItem[] };

export type Solution = {
  slug: string;
  name: string;
  parent: string; // service slug in services.ts
  scene: SceneKind;
  seoTitle: string;
  metaDescription: string;
  headline: [string, string];
  lede: string;
  statement: [string, string];
  overview: string[];
  groups: SolutionGroup[];
  steps: { name: string; body: string }[];
  featured?: string; // project slug
  faqs: { q: string; a: string }[];
  desk: string; // "cloud & AI desk"
  ctaLine: string;
};

export const solutions: Solution[] = [
  {
    slug: "cloud-computing-ai",
    name: "Cloud Computing & AI",
    parent: "cloud-erp-enterprise",
    scene: "cloud",
    seoTitle: "Cloud Computing & AI Integration — AWS, Azure, Google Cloud",
    metaDescription:
      "Cloud infrastructure on AWS, Azure and Google Cloud, Kubernetes and Terraform, plus practical AI integration with Gemini, ChatGPT, Claude and Copilot. FlyHi Social, Bhubaneswar.",
    headline: ["Cloud and AI,", "built to scale."],
    lede: "Scalable cloud infrastructure and practical AI integration — from moving your first workload to running AI across your operations.",
    statement: [
      "We design cloud foundations that stay fast, secure and affordable as you grow —",
      "then put AI to work on top of them, where it saves real time.",
    ],
    overview: [
      "Cloud done well is invisible: pages load fast, releases don't cause downtime, backups exist and the monthly bill makes sense. We plan, migrate and run infrastructure on the platform that fits you — not the one we happen to prefer.",
      "On top of that foundation we connect the AI models that suit each job — document reading, assistants, search, forecasting — with clear boundaries on what data each model can see.",
    ],
    groups: [
      {
        title: "Cloud ecosystems",
        intro: "The platforms and practices we build on.",
        items: [
          { name: "Amazon Web Services", mark: "AWS", body: "Well-architected AWS setups — compute, storage, databases and networking — with security and cost controls from day one." },
          { name: "Microsoft Azure", mark: "AZ", body: "Azure environments for organisations already on Microsoft 365, with identity, access and backups done properly." },
          { name: "Google Cloud", mark: "GCP", body: "Google Cloud for data-heavy work — BigQuery pipelines, serverless apps and analytics dashboards." },
          { name: "Kubernetes", mark: "K8s", body: "Container platforms that scale services up and down automatically, with zero-downtime releases." },
          { name: "Terraform", mark: "TF", body: "Infrastructure as code, so every environment is repeatable, reviewable and quick to rebuild." },
          { name: "Observability", icon: "pulse", body: "Monitoring, logs and alerts, so you hear about problems before your customers do." },
        ],
      },
      {
        title: "AI platforms",
        intro: "The models we integrate, matched to the task.",
        items: [
          { name: "Gemini", mark: "GEM", body: "Google's Gemini models for multimodal work — documents, images and long reports." },
          { name: "ChatGPT", mark: "GPT", body: "OpenAI models for chat assistants, drafting and pulling structured data out of messy text." },
          { name: "Claude", mark: "CL", body: "Anthropic's Claude for careful reasoning over long documents — and the assistants we build for clients." },
          { name: "Copilot", mark: "CP", body: "Microsoft Copilot rolled out across Microsoft 365, with sensible data boundaries and team training." },
          { name: "Llama (Meta AI)", mark: "LL", body: "Open models self-hosted inside your own infrastructure when data must never leave it." },
          { name: "Perplexity", mark: "PX", body: "Research assistants that answer with cited sources, for teams that need to check the facts." },
        ],
      },
    ],
    steps: [
      { name: "Assess", body: "Map what you run today, what it costs and where the risks are." },
      { name: "Architect", body: "A clear target design — platform, security, backups, budget — agreed before we build." },
      { name: "Migrate & build", body: "Move workloads in phases, automate deployments and connect the AI services." },
      { name: "Operate", body: "Monitoring, cost reviews and improvements every month." },
    ],
    featured: "sanhem-health",
    faqs: [
      { q: "Which cloud should we choose — AWS, Azure or Google Cloud?", a: "It depends on what you already use and what you're building. Microsoft-heavy organisations often fit Azure, data and analytics work suits Google Cloud, and AWS has the broadest range of services. We recommend one after looking at your systems, skills and budget." },
      { q: "Can you move our existing systems to the cloud?", a: "Yes. We migrate in phases — usually starting with the least risky workloads — with backups and a rollback plan at every step." },
      { q: "How do you keep cloud costs under control?", a: "Right-sized servers, auto-scaling, budgets with alerts and a monthly review of what's being paid for. Most savings come from switching off what nobody uses." },
      { q: "How do you use AI with our private data?", a: "We give each AI model only the data its task needs, use business agreements that exclude your data from training, and self-host open models when data must stay in-house." },
      { q: "Do you provide ongoing cloud support?", a: "Yes — monitoring, updates, security patches and help when something changes in your business." },
    ],
    desk: "cloud & AI desk",
    ctaLine: "Ready to scale?",
  },
  {
    slug: "erp-solutions",
    name: "ERP Solutions",
    parent: "cloud-erp-enterprise",
    scene: "enterprise",
    seoTitle: "ERP Solutions — SAP, Oracle, Dynamics 365, Salesforce Integration",
    metaDescription:
      "ERP planning, implementation support, customisation and integration across SAP S/4HANA, Oracle, JD Edwards, Microsoft Dynamics 365, ServiceNow and Salesforce. FlyHi Social, Bhubaneswar.",
    headline: ["One system for", "the whole business."],
    lede: "ERP planning, implementation support and integration that connect finance, inventory, sales and operations in one place.",
    statement: [
      "Most businesses don't need more software —",
      "they need the software they already have to talk to each other.",
    ],
    overview: [
      "When finance, stock, sales and service live in separate tools, people spend their day re-typing numbers and chasing reports. An ERP puts them on one source of truth — if it's chosen well and set up around how your business really works.",
      "We help you pick the right platform, shape it to your processes, move your data across, and connect it to the website, WhatsApp, e-commerce and reporting tools around it.",
    ],
    groups: [
      {
        title: "Platforms we work with",
        intro: "Enterprise systems we plan around, integrate and extend.",
        items: [
          { name: "SAP S/4HANA", mark: "SAP", body: "Planning, integration and reporting around SAP S/4HANA, including links to the tools your teams use every day." },
          { name: "Oracle", mark: "ORA", body: "Oracle Cloud ERP and NetSuite for finance, procurement and multi-entity operations." },
          { name: "JD Edwards", mark: "JDE", body: "Upgrades, integrations and support for existing JD Edwards installations." },
          { name: "Microsoft Dynamics 365", mark: "D365", body: "Dynamics 365 for businesses already on Microsoft — from finance to field service." },
          { name: "ServiceNow", mark: "SN", body: "IT and service workflows — tickets, approvals and asset tracking — in one place." },
          { name: "Salesforce", mark: "SF", body: "CRM that connects sales and service to your ERP, so customers and orders stay in sync." },
        ],
      },
      {
        title: "What we deliver",
        intro: "The work that makes an ERP actually get used.",
        items: [
          { name: "Process mapping", icon: "flow", body: "We document how orders, stock and money move today, and design how they should." },
          { name: "Custom modules", icon: "grid", body: "Forms, workflows and approval flows built for the way your business actually runs." },
          { name: "Data migration", icon: "database", body: "Legacy data from spreadsheets or older systems cleaned, mapped and moved without losing history." },
          { name: "Integrations", icon: "link", body: "Your ERP connected to your website, e-commerce, WhatsApp and payment tools." },
          { name: "Dashboards", icon: "chart", body: "Live views of sales, stock and cash that leadership can open on a phone." },
          { name: "Training & support", icon: "users", body: "Hands-on training for each team, and help when questions come up after go-live." },
        ],
      },
    ],
    steps: [
      { name: "Assess", body: "Understand your processes, pain points and the systems you already have." },
      { name: "Choose", body: "Recommend the platform and scope that fit your size and budget." },
      { name: "Implement in phases", body: "Configure, customise and migrate one department at a time." },
      { name: "Train & support", body: "Teach every team, then keep improving as you grow." },
    ],
    faqs: [
      { q: "Which ERP is right for a growing Indian business?", a: "It depends on your size, industry and existing tools. Smaller businesses often do well with a cloud ERP they can grow into, while larger groups may need SAP, Oracle or Dynamics 365. We compare options against your real processes before recommending one." },
      { q: "Can you connect our ERP to our website, WhatsApp or online store?", a: "Yes. We connect ERPs to websites, e-commerce, WhatsApp and payment tools through their APIs or automation platforms, so orders and stock update without re-typing." },
      { q: "Can you move our data from spreadsheets or an older system?", a: "Yes. We clean and map customers, products, stock and history, test the import, and move it across with a rollback plan." },
      { q: "Can you customise an ERP we already use?", a: "Usually, yes — new forms, approval flows, reports and integrations built on top of your existing system." },
    ],
    desk: "ERP desk",
    ctaLine: "Ready to connect the business?",
  },
  {
    slug: "app-development",
    name: "App & Web Development",
    parent: "web-app-development",
    scene: "build",
    seoTitle: "Mobile App & Custom Software Development — React Native, Next.js, Node.js",
    metaDescription:
      "Full-stack web platforms and Android and iOS apps built with React Native, Next.js, Node.js, PostgreSQL, Supabase, Kotlin and more. Custom software by FlyHi Social, Bhubaneswar.",
    headline: ["Engineered for", "speed and scale."],
    lede: "Full-stack web platforms and mobile apps, built to perform on the phones and networks your users actually have.",
    statement: [
      "Good software feels simple to use —",
      "because the hard engineering is done underneath.",
    ],
    overview: [
      "We build web platforms, mobile apps and internal tools with a modern, proven stack — typed end to end, tested, and designed to stay fast as users and data grow.",
      "We keep an eye on the details that decide whether an app succeeds in India: small download sizes, offline-friendly screens, quick loading on 4G and budget Android phones, and admin panels your team can run without us.",
    ],
    groups: [
      {
        title: "Our engineering stack",
        intro: "Tools we choose for the job, not for the trend.",
        items: [
          { name: "React Native", mark: "RN", body: "Android and iOS apps from one codebase, with native performance where it counts." },
          { name: "Next.js", mark: "NX", body: "Fast, search-friendly websites and web apps, rendered on the server and cached at the edge." },
          { name: "Node.js", mark: "JS", body: "APIs and background jobs that handle many users at once without slowing down." },
          { name: "TypeScript", mark: "TS", body: "Typed code across the whole product, so bugs are caught before users see them." },
          { name: "PostgreSQL", mark: "PG", body: "Reliable relational databases, designed with the right structure and indexes from the start." },
          { name: "Supabase", mark: "SB", body: "Auth, database, storage and realtime in one — ideal for shipping products quickly." },
          { name: "GraphQL", mark: "GQL", body: "Flexible APIs that give each screen exactly the data it needs." },
          { name: "Kotlin & Jetpack Compose", mark: "KT", body: "Native Android apps and screens when an app needs the full power of the device." },
          { name: "Rust", mark: "RS", body: "High-performance services and WebAssembly modules for the heaviest workloads." },
          { name: "Docker", mark: "DK", body: "Containers that run the same on a laptop, a test server and in production." },
          { name: "MapLibre", mark: "MAP", body: "Custom maps for tracking, delivery and location features, without per-view fees." },
          { name: "Firebase", mark: "FB", body: "Push notifications, analytics and crash reports for mobile apps." },
        ],
      },
    ],
    steps: [
      { name: "Scope", body: "Users, features and success measures agreed in plain language." },
      { name: "Design", body: "Clickable screens you can test on your phone before we write code." },
      { name: "Build in sprints", body: "Working software every fortnight, so you see progress and can change course." },
      { name: "Launch & grow", body: "Store listings, monitoring and a roadmap for the next version." },
    ],
    featured: "openex",
    faqs: [
      { q: "Do you build both Android and iOS apps?", a: "Yes. We usually build both from one React Native codebase, and go fully native with Kotlin or Swift when an app needs it." },
      { q: "Which technology will you use for our project?", a: "The one that fits — most products use Next.js, Node.js and PostgreSQL or Supabase, with React Native for mobile. We explain the choice and avoid anything that locks you in." },
      { q: "Will we own the source code?", a: "Yes. The code, designs and accounts are yours, and we document everything at handover." },
      { q: "Can you take over an app someone else built?", a: "Yes. We review the code first, fix what's urgent, and then improve it step by step." },
      { q: "Do you publish apps to the Play Store and App Store?", a: "Yes — store listings, screenshots, review submission and updates after launch." },
    ],
    desk: "engineering desk",
    ctaLine: "Have an app in mind?",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    parent: "branding-digital-marketing",
    scene: "growth",
    seoTitle: "Digital Marketing Agency in Bhubaneswar — Google Ads, Meta Ads, SEO",
    metaDescription:
      "Performance marketing by FlyHi Social: Google Ads, Meta ads, GA4 analytics, SEO, programmatic and marketing automation, with clear monthly reporting. Bhubaneswar, Odisha.",
    headline: ["Growth you", "can measure."],
    lede: "Data-driven marketing that grows your visibility, brings qualified leads and shows exactly what every rupee returned.",
    statement: [
      "We don't guess what works —",
      "we test, measure and put more budget behind what's proven.",
    ],
    overview: [
      "Every campaign starts with tracking you can trust: what people clicked, what they did next and which ads led to real enquiries. Without that, marketing is just spending.",
      "With it, we run search, social and content together — cutting what doesn't perform, doubling down on what does, and reporting every month in numbers your team understands.",
    ],
    groups: [
      {
        title: "Performance marketing ecosystems",
        intro: "The channels and tools we run, measured together.",
        items: [
          { name: "Google Ads", mark: "G", body: "Search, YouTube and Performance Max campaigns aimed at people already looking for what you sell." },
          { name: "Meta Ads", mark: "M", body: "Facebook and Instagram campaigns with lookalike audiences, lead forms and WhatsApp click-to-chat." },
          { name: "GA4 Analytics", mark: "GA4", body: "Events, funnels and conversions set up properly, so every report reflects real behaviour." },
          { name: "Organic SEO", icon: "search", body: "Technical fixes, local search, structured data and content that earns rankings over time." },
          { name: "Programmatic", icon: "target", body: "Automated display and video buying that reaches the right audience across many sites." },
          { name: "Marketing automation", icon: "flow", body: "Email and WhatsApp follow-ups and CRM workflows, so no lead goes cold." },
        ],
      },
    ],
    steps: [
      { name: "Audit & tracking", body: "Check what's running, fix tracking and agree the numbers that matter." },
      { name: "Plan", body: "Channels, audiences, budget split and the landing pages each campaign needs." },
      { name: "Launch & test", body: "Run multiple creatives and audiences, and keep the winners." },
      { name: "Report & scale", body: "A clear monthly report, then more budget where it's proven." },
    ],
    featured: "nature-cm-2026",
    faqs: [
      { q: "How much should we spend on ads each month?", a: "Enough to learn quickly what works — it depends on your market and goals. We start with a test budget, measure the cost per enquiry, and scale once the numbers are good." },
      { q: "Do you run Google Ads and Instagram ads in Bhubaneswar?", a: "Yes. We run Google, Facebook and Instagram campaigns for businesses across Bhubaneswar and Odisha, including local targeting and WhatsApp lead campaigns." },
      { q: "How long does SEO take to work?", a: "SEO builds over months rather than days. Technical and local fixes often help first; content and authority keep compounding after that." },
      { q: "What will your monthly report show?", a: "Spend, leads, cost per lead, what changed and what we'll do next — in plain language, with the numbers behind it." },
    ],
    desk: "growth desk",
    ctaLine: "Ready to grow?",
  },
  {
    slug: "event-management",
    name: "Event Management",
    parent: "live-streaming-event-technology",
    scene: "broadcast",
    seoTitle: "Event Management Company in Bhubaneswar — Conferences, Summits, Launches",
    metaDescription:
      "End-to-end event management for conferences, corporate summits, product launches and brand activations — hybrid streaming, AV, logistics and registration. FlyHi Social, Bhubaneswar.",
    headline: ["Events that run", "like clockwork."],
    lede: "End-to-end planning and execution for conferences, corporate summits, product launches and brand activations.",
    statement: [
      "Behind every smooth event is a plan for everything that could go wrong —",
      "and a team that has already rehearsed it.",
    ],
    overview: [
      "We plan and run events from the first brief to the final report: venue layout, stage and AV, speaker schedules, registration, live streaming and the people on the ground who keep it all on time.",
      "Because we also build the technology — event websites, registration, streaming and screen content — there's one team accountable for the stage and the screen.",
    ],
    groups: [
      {
        title: "What we manage",
        intro: "Every layer of the event, coordinated by one team.",
        items: [
          { name: "Conferences & summits", icon: "mic", body: "Multi-track agendas, speaker coordination, session timing and stage management." },
          { name: "Hybrid sessions", icon: "split", body: "Remote speakers and online audiences joined to the room, with rehearsed backups." },
          { name: "Live broadcasting", icon: "broadcast", body: "Multi-camera streams to YouTube, Zoom or private links, with branded graphics." },
          { name: "AV & stage", icon: "speaker", body: "Sound, lighting, LED walls and screen content planned for your venue." },
          { name: "Logistics & flow", icon: "route", body: "Floor plans, stall layouts, delegate movement, zones and contingency routes." },
          { name: "Registration & reporting", icon: "check", body: "Online registration, QR check-in, badges, attendance data and a post-event report." },
        ],
      },
    ],
    steps: [
      { name: "Brief", body: "Goals, audience, agenda, venue and budget." },
      { name: "Plan", body: "Run-of-show, layouts, vendors and technology, with backups for each." },
      { name: "Rehearse", body: "Venue walk-through, tech checks and speaker tests." },
      { name: "Deliver & report", body: "Run the day, then hand over recordings, photos and attendance data." },
    ],
    featured: "isacon-odisha-2026",
    faqs: [
      { q: "What kinds of events do you manage?", a: "Medical and academic conferences, corporate summits, product launches, exhibitions and brand activations — in person, hybrid or online." },
      { q: "Do you handle registration and delegate check-in?", a: "Yes — online registration, QR passes by email and WhatsApp, fast venue check-in, badge printing and live attendance numbers." },
      { q: "Can you stream our event to remote attendees?", a: "Yes. We run multi-camera streams to YouTube, Zoom or private links, and bring remote speakers into the room." },
      { q: "Do you work outside Bhubaneswar?", a: "Yes. We're based in Bhubaneswar and work across Odisha and other cities in India." },
    ],
    desk: "events desk",
    ctaLine: "Planning an event?",
  },
  {
    slug: "marine-consultancy",
    name: "Marine Consultancy",
    parent: "cloud-erp-enterprise",
    scene: "marine",
    seoTitle: "Marine Consultancy — Chartering, Ship Sale & Purchase, Technical Audits",
    metaDescription:
      "Maritime advisory for shipowners, charterers and operators: chartering and brokerage, sale and purchase, technical audits, market intelligence, offshore support and CII/EEXI compliance.",
    headline: ["Navigating", "maritime operations."],
    lede: "Advisory for vessel operations, chartering, compliance and offshore logistics — backed by data and technology.",
    statement: [
      "Shipping decisions are expensive to get wrong —",
      "so we bring market data, technical checks and clear advice to each one.",
    ],
    overview: [
      "We advise shipowners, charterers and operators on the decisions that move the numbers: which cargo to fix, which vessel to buy or sell, how a ship is really performing and what regulation will ask of it next.",
      "Our technology practice adds what most advisors can't — dashboards, tracking and systems that turn scattered voyage and fleet data into decisions.",
    ],
    groups: [
      {
        title: "Core maritime practice areas",
        intro: "Advisory across the vessel lifecycle.",
        items: [
          { name: "Chartering & brokerage", icon: "anchor", body: "Connecting cargo owners and operators, with support on spot and time-charter negotiations across dry bulk, tanker and container segments." },
          { name: "Sale & purchase", icon: "ship", body: "Support on second-hand acquisitions, recycling decisions and newbuild placements, with independent valuations." },
          { name: "Technical audits", icon: "inspect", body: "Pre-purchase inspections, condition assessments and flag-state readiness checks to prevent downtime." },
          { name: "Market intelligence", icon: "chart", body: "Trade-lane outlooks, freight-rate trends and fleet valuation reports for owners and financiers." },
          { name: "Offshore solutions", icon: "rig", body: "Support for offshore energy projects, heavy-lift cargo and tug and barge mobilisation." },
          { name: "Green compliance", icon: "leaf", body: "Guidance on CII and EEXI ratings, cleaner-fuel readiness and emissions reporting." },
        ],
      },
    ],
    steps: [
      { name: "Understand", body: "Your fleet, trade and the decision in front of you." },
      { name: "Analyse", body: "Market data, vessel condition and regulatory exposure." },
      { name: "Advise", body: "A clear recommendation with the numbers and risks behind it." },
      { name: "Support", body: "Stay alongside through negotiation, inspection and delivery." },
    ],
    faqs: [
      { q: "What does your marine consultancy cover?", a: "Chartering and brokerage support, ship sale and purchase, technical audits, market intelligence, offshore project support and environmental compliance such as CII and EEXI." },
      { q: "Can you help us prepare for CII and EEXI requirements?", a: "Yes. We review a vessel's current rating, explain what's driving it and outline practical options — operational, technical and fuel-related — to improve it." },
      { q: "Do you also build software for maritime operations?", a: "Yes. Through our technology practice we build fleet dashboards, tracking tools and systems that bring voyage and vessel data together." },
      { q: "Do you work with owners and operators outside India?", a: "Yes — shipping is global, and we work with clients remotely across regions." },
    ],
    desk: "marine desk",
    ctaLine: "Facing a maritime decision?",
  },
];

export const solutionsFor = (parentSlug: string) => solutions.filter((s) => s.parent === parentSlug);
