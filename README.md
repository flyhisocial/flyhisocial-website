# flyhisocial.com

The FlyHi Social website — Next.js 16 (App Router), TypeScript, Tailwind 4, GSAP + ScrollTrigger, Lenis and three.js (React Three Fiber).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy

- **Vercel:** import the repo, framework "Next.js", no settings needed.
- **Render:** new *Web Service*, build `npm install && npm run build`, start `npm start`.
- Needs a Node host (not a plain static host) because the contact form runs on a secure server route.

## Contact form

The form posts to `/api/contact`, which validates, rate-limits and forwards to your n8n webhook server-side.
Set `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_SECRET` in your host's environment settings (see `.env.example`).
n8n receives JSON `{ name, contact, message, interest, source, receivedAt }` plus an `X-FlyHi-Secret` header — check it,
then email you, send a WhatsApp alert and save to Supabase. Until the webhook is set, the form opens the visitor's email app.

## Security

See `SECURITY.md` for the full checklist: security headers, API protection, rate limiting, secrets handling.

## Editing content

Homepage copy lives in `lib/content.ts` (practices, AI solutions, SaaS products, packages, case studies).
The five service pages (`/services/...`) — descriptions, deliverables, industries, steps, tools and FAQs — live in `lib/services.ts`.
The six solution sub pages (Cloud Computing & AI, ERP Solutions, App & Web Development, Digital Marketing, Event Management, Marine Consultancy) live in `lib/solutions.ts`; each sits under a parent service and appears in the Services menu, the footer and its parent page. Old addresses like `/erp-solutions` or `/marine` redirect to them (`next.config.ts`).
Each service page ships Service, FAQPage and Breadcrumb structured data for search. Add a `price` to any package to show it.
Confirm each client is happy to be named before launch.
To use a real photo on a project, drop it in `public/media/` and set `image` + `alt` on that project.

## Where the motion lives

| Effect | File |
| --- | --- |
| Smooth scroll (Lenis synced to ScrollTrigger) | `components/SmoothScroll.tsx` |
| Pixel-wipe intro + page transitions (stair direction) | `components/PageTransition.tsx`, `TransitionLink.tsx` |
| Custom cursor with labels (`data-cursor="View"`) | `components/Cursor.tsx` |
| Line-by-line headline reveals, scrubbed words, magnetic buttons, counters | `components/effects.tsx` |
| Hero film that grows to full-bleed on scroll | `components/sections/Hero.tsx` |
| Stacking practice cards | `components/sections/Services.tsx` |
| Cursor-following work preview with displacement ripple | `components/sections/Work.tsx` |
| Spotlight cards + scroll-played WhatsApp AI demo | `components/sections/AIAutomation.tsx` |
| Climbing process steps | `components/sections/Process.tsx` |
| Parallax case-study cover + count-up stats | `components/CaseStudy.tsx` |
| 3D objects (hero stair mark + one scene per service) | `components/three/Scenes.tsx`, loaded lazily by `components/Object3D.tsx` |
| Animated vector illustrations per service | `components/ServiceArt.tsx` |
| Solution pages: pinned horizontal platform track, tilt + spotlight cards, drawn-in icons, climbing steps, opening case-study frame, rolling phone number | `components/SolutionPage.tsx`, `components/Icons.tsx` |
| Services mega menu | `components/Header.tsx` |

3D only loads when it's about to scroll into view, pauses off-screen, and falls back to a flat logo without WebGL.
Everything respects `prefers-reduced-motion`, the cursor and hover preview only run on mouse/trackpad devices,
and content stays readable with JavaScript off.
