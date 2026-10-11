import { site } from "@/lib/content";

// Simple 24×24 line/solid glyphs for each profile (no external icon library, keeps the bundle and CSP clean).
const GLYPHS: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="9" width="4" height="12" fill="currentColor" />
      <circle cx="5" cy="5" r="2.2" fill="currentColor" />
      <path d="M10 9h4v1.8c.6-1.1 2-2.1 4-2.1 3.2 0 4 2.1 4 5V21h-4v-6.4c0-1.5-.3-2.8-1.9-2.8-1.7 0-2.1 1.2-2.1 2.8V21h-4z" fill="currentColor" />
    </>
  ),
  Facebook: (
    <path d="M14 8.5V6.8c0-.9.2-1.3 1.4-1.3H17V2h-2.9C10.9 2 10 3.6 10 6.3v2.2H7.5V12H10v10h4V12h2.8l.4-3.5z" fill="currentColor" />
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
      <path d="M10 9l5 3-5 3z" fill="var(--yt-play, #000)" />
    </>
  ),
  Maps: (
    <>
      <path d="M12 2c-4 0-7 3-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-4-3-7-7-7z" fill="currentColor" />
      <circle cx="12" cy="9" r="2.6" fill="var(--yt-play, #000)" />
    </>
  ),
};

/** Round icon buttons linking to FlyHi's official profiles and Google Maps listing. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = [...site.socials, { name: "Maps", href: site.maps }];
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="FlyHi Social on social media">
      {links.map((l) => (
        <li key={l.name}>
          <a
            href={l.href}
            target="_blank"
            rel="me noopener"
            aria-label={l.name === "Maps" ? "Find FlyHi Social on Google Maps" : `FlyHi Social on ${l.name}`}
            title={l.name === "Maps" ? "Google Maps" : l.name}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 [--yt-play:#000] hover:bg-white hover:text-black hover:[--yt-play:#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">{GLYPHS[l.name]}</svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
