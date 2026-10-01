import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Content Security Policy: only our own scripts, styles, fonts, media and API.
// 'unsafe-inline' is needed for Next's inline bootstrap scripts on a statically rendered site.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,            // don't advertise the framework
  productionBrowserSourceMaps: false, // don't ship source maps to visitors
  reactStrictMode: true,
  images: { unoptimized: true },
  // Addresses the old site (or people) may use, sent to the new solution pages.
  async redirects() {
    const map: Record<string, string> = {
      "cloud-computing-ai": "cloud-computing-ai", "cloud-computing": "cloud-computing-ai", "cloud-computing-and-ai": "cloud-computing-ai",
      "erp-solutions": "erp-solutions", "erp": "erp-solutions",
      "app-web-development": "app-development", "app-and-web-development": "app-development", "app-development": "app-development",
      "digital-marketing": "digital-marketing", "event-management": "event-management",
      "marine-consultancy": "marine-consultancy", "marine": "marine-consultancy",
    };
    return [
      ...Object.entries(map).map(([from, to]) => ({ source: `/${from}`, destination: `/services/${to}`, permanent: true })),
      { source: "/services/app-web-development", destination: "/services/app-development", permanent: true },
    ];
  },
  async headers() {
    if (!isProd) return []; // dev tooling needs eval; production gets the full set
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
