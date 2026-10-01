# Security checklist — flyhisocial.com

Audit date: 30 September 2026. Every item below was checked against this codebase and the running production build.

| # | Check | Status | What's in place |
| - | --- | --- | --- |
| 1 | Hide API keys | ✅ Fixed | The n8n webhook used to be a `NEXT_PUBLIC_` variable (visible to anyone in the browser). It is now server-only (`CONTACT_WEBHOOK_URL`) and called from `/api/contact`. |
| 2 | Check env variables | ✅ | No secrets in code. Only `.env.example` (empty values) is committed; `.gitignore` blocks every other `.env*` file. Nothing server-side uses the `NEXT_PUBLIC_` prefix. |
| 3 | Protect admin routes | ➖ N/A | The site has no admin area. If one is added, protect it with Supabase Auth + server-side checks, never a hidden URL. |
| 4 | Proper authentication | ➖ N/A | No logins on the public site. |
| 5 | Access control | ✅ | `/api/contact` accepts `POST` only (other methods get 405) and only from the site's own origin (cross-site requests get 403). |
| 6 | Sanitize forms | ✅ | Server re-validates every field (length limits, email/phone format, allowed interest values) and strips control characters. The browser adds `maxLength`/`required` for early feedback only. |
| 7 | XSS protection | ✅ | React escapes all rendered text; structured-data JSON is serialised with `<` escaped (`lib/jsonld.ts`); a Content Security Policy blocks third-party scripts. In n8n, send enquiry emails as **plain text** so submitted text can't become HTML. |
| 8 | Rate limiting | ✅ | 5 enquiries per 10 minutes per IP (429 after). Plus a hidden honeypot field and a minimum fill time that silently drop bot submissions. For multi-server hosting, move the counter to Upstash Redis. |
| 9 | Secure API endpoints | ✅ | 8 KB body limit (413), JSON-only (415), 8-second upstream timeout, generic error messages (no stack traces), `Cache-Control: no-store`, and a shared secret header (`X-FlyHi-Secret`) so n8n can reject anything that isn't from the site. |
| 10 | CORS settings | ✅ | No CORS headers are sent, so browsers block other websites from calling the API; plus the Origin check above. |
| 11 | Security headers | ✅ | CSP, HSTS (2 years), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy` on every page (`next.config.ts`). |
| 12 | Debug mode off | ✅ | Production build only; `X-Powered-By` removed; no browser source maps; no `console.log` of user data. |
| 13 | Update dependencies | ✅ | All packages on current versions; `npm audit`: 0 vulnerabilities. Re-run `npm audit` monthly. |
| 14 | Remove unused packages | ✅ | Every dependency is used (Next, React, GSAP, Lenis, three, React Three Fiber). |
| 15 | Check exposed files | ✅ | `public/` holds only fonts, media and `/.well-known/security.txt`. No `.env`, backups or source maps are served. |
| 16 | Secure database | ➖ N/A today | The site has no database. When n8n saves leads to Supabase, enable Row Level Security and keep the service-role key inside n8n only. |
| 17 | Hash passwords | ➖ N/A | No passwords are stored. Supabase Auth handles hashing if logins are added later. |
| 18 | Scan git for leaked secrets | ✅ | Code scanned for keys/tokens — none found. Before the first push, run `npx gitleaks detect` (or GitHub secret scanning) to keep it that way. |
| 19 | Full security audit | ✅ | Verified live: headers present, API rejects bad origin / invalid data / oversized body / floods, honeypot works, and pages load with zero CSP violations. |

## Environment variables (set in Vercel or Render, never in code)

| Name | Purpose |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | n8n webhook that receives enquiries |
| `CONTACT_WEBHOOK_SECRET` | long random string; in n8n, reject requests whose `X-FlyHi-Secret` header doesn't match |

Generate a secret with `openssl rand -hex 32`.
