import type { ServiceKind } from "@/lib/services";

// Brand-style vector illustrations, one per service. Pure SVG + CSS animation (no JS),
// so they're crisp at any size, tiny to load, and readable by search engines via <title>.

const R = "#EC3013", W = "#FFFFFF", G = "#2A2A2A", M = "#5A5A5A";

function Build() {
  return (
    <>
      <rect x="24" y="36" width="332" height="236" rx="16" fill="#0B0B0B" stroke={G} strokeWidth="2" />
      <rect x="24" y="36" width="332" height="36" rx="16" fill="#151515" />
      <circle cx="48" cy="54" r="6" fill={R} /><circle cx="68" cy="54" r="6" fill={M} /><circle cx="88" cy="54" r="6" fill={M} />
      <rect x="112" y="46" width="200" height="16" rx="8" fill={G} />
      <rect x="48" y="96" width="170" height="22" rx="4" fill={W} className="art-grow" />
      <rect x="48" y="128" width="120" height="22" rx="4" fill={R} className="art-grow d2" />
      <rect x="48" y="168" width="200" height="8" rx="4" fill={M} /><rect x="48" y="184" width="160" height="8" rx="4" fill={M} />
      <rect x="48" y="216" width="92" height="30" rx="15" fill={R} />
      <rect x="244" y="96" width="92" height="92" rx="10" fill="#1A1A1A" stroke={G} />
      <path d="M270 128l-12 14 12 14M310 128l12 14-12 14" stroke={W} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="286" y="156" width="10" height="10" fill={R} className="art-blink" />
      <g className="art-float">
        <rect x="336" y="140" width="118" height="200" rx="18" fill="#0B0B0B" stroke={W} strokeWidth="2" />
        <rect x="376" y="150" width="38" height="6" rx="3" fill={G} />
        <rect x="350" y="170" width="90" height="60" rx="8" fill={R} />
        <rect x="350" y="242" width="70" height="8" rx="4" fill={M} /><rect x="350" y="258" width="54" height="8" rx="4" fill={M} />
        <rect x="350" y="290" width="90" height="28" rx="14" fill={W} />
      </g>
    </>
  );
}

function AI() {
  return (
    <>
      <g stroke={G} strokeWidth="2">
        <line x1="380" y1="70" x2="430" y2="130" /><line x1="380" y1="70" x2="330" y2="140" /><line x1="430" y1="130" x2="400" y2="200" />
        <line x1="330" y1="140" x2="400" y2="200" /><line x1="330" y1="140" x2="430" y2="130" />
      </g>
      <circle cx="380" cy="70" r="10" fill={W} /><circle cx="430" cy="130" r="8" fill={W} /><circle cx="400" cy="200" r="10" fill={W} />
      <circle cx="330" cy="140" r="16" fill={R} className="art-pulse" />
      <rect x="24" y="60" width="230" height="56" rx="20" fill="#1D2420" />
      <rect x="44" y="80" width="150" height="8" rx="4" fill="#8FB8A0" /><rect x="44" y="96" width="100" height="8" rx="4" fill="#8FB8A0" />
      <rect x="110" y="136" width="220" height="56" rx="20" fill="#1F7A4D" className="art-pop" />
      <rect x="130" y="156" width="140" height="8" rx="4" fill={W} /><rect x="130" y="172" width="90" height="8" rx="4" fill={W} />
      <rect x="24" y="212" width="250" height="72" rx="20" fill="#1D2420" className="art-pop d2" />
      <rect x="44" y="232" width="180" height="8" rx="4" fill="#8FB8A0" /><rect x="44" y="248" width="150" height="8" rx="4" fill="#8FB8A0" />
      <rect x="44" y="264" width="60" height="8" rx="4" fill={R} />
      <rect x="24" y="304" width="84" height="40" rx="20" fill="#1D2420" />
      {[0, 1, 2].map((i) => <circle key={i} cx={48 + i * 18} cy={324} r="5" fill="#8FB8A0" className={`art-typing d${i}`} />)}
      <rect x="300" y="262" width="150" height="36" rx="18" fill="none" stroke={R} strokeWidth="2" />
      <rect x="316" y="276" width="118" height="8" rx="4" fill={R} opacity=".7" />
    </>
  );
}

function Brand() {
  return (
    <>
      <rect x="24" y="36" width="210" height="210" rx="16" fill="#0B0B0B" stroke={G} strokeWidth="2" />
      <text x="48" y="190" fill={W} fontSize="130" fontWeight="800" fontFamily="Archivo, sans-serif" letterSpacing="-6">Aa</text>
      <rect x="48" y="210" width="60" height="6" rx="3" fill={M} />
      {[W, "#000", R].map((c, i) => (
        <g key={i} className={`art-float d${i}`}>
          <rect x={260 + i * 66} y={36} width="56" height="120" rx="12" fill={c} stroke={G} strokeWidth="2" />
        </g>
      ))}
      <g transform="translate(270 190)">
        {[[0, 2], [1, 2], [1, 1], [2, 1], [2, 0]].map(([c, r], i) => (
          <rect key={i} x={c * 44} y={r * 44} width="40" height="40" fill={i === 4 ? R : W} className={`art-step d${i}`} />
        ))}
      </g>
      <rect x="24" y="266" width="210" height="64" rx="14" fill="#151515" />
      <circle cx="58" cy="298" r="16" fill={R} /><rect x="86" y="286" width="120" height="8" rx="4" fill={W} /><rect x="86" y="302" width="80" height="8" rx="4" fill={M} />
    </>
  );
}

function Broadcast() {
  return (
    <>
      <rect x="40" y="110" width="240" height="150" rx="18" fill="#0B0B0B" stroke={W} strokeWidth="2" />
      <rect x="70" y="84" width="90" height="30" rx="8" fill="#151515" stroke={G} strokeWidth="2" />
      <circle cx="160" cy="185" r="52" fill="#151515" stroke={W} strokeWidth="2" />
      <circle cx="160" cy="185" r="32" fill="#000" stroke={G} strokeWidth="6" />
      <circle cx="148" cy="173" r="8" fill={W} opacity=".7" />
      <path d="M280 150l80-40v150l-80-40z" fill="#151515" stroke={W} strokeWidth="2" strokeLinejoin="round" />
      <rect x="60" y="130" width="70" height="26" rx="13" fill={R} />
      <circle cx="76" cy="143" r="5" fill={W} className="art-blink" />
      <text x="88" y="148" fill={W} fontSize="14" fontWeight="800" fontFamily="Archivo, sans-serif" letterSpacing="2">LIVE</text>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${392 + i * 22} ${130 - i * 18} q ${28 + i * 10} ${55 + i * 18} 0 ${110 + i * 36}`} fill="none" stroke={R}
          strokeWidth="5" strokeLinecap="round" className={`art-wave d${i}`} />
      ))}
      <rect x="40" y="290" width="400" height="12" rx="6" fill={G} />
      <rect x="40" y="290" width="240" height="12" rx="6" fill={R} className="art-grow" />
    </>
  );
}

function Enterprise() {
  return (
    <>
      <path d="M300 96a44 44 0 0 1 86-10 36 36 0 1 1 8 72H300a32 32 0 0 1 0-62z" fill="none" stroke={W} strokeWidth="2" />
      <rect x="330" y="112" width="44" height="8" rx="4" fill={R} className="art-blink" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(40 ${60 + i * 88})`}>
          <rect width="220" height="72" rx="12" fill="#0B0B0B" stroke={G} strokeWidth="2" />
          <rect x="20" y="22" width="110" height="8" rx="4" fill={M} /><rect x="20" y="40" width="70" height="8" rx="4" fill={M} />
          <circle cx="170" cy="36" r="6" fill={i === 1 ? R : W} className={`art-blink d${i}`} /><circle cx="192" cy="36" r="6" fill={W} opacity=".4" />
        </g>
      ))}
      <path d="M260 96 C 290 96, 290 140, 320 150 M260 184 C 300 184, 300 200, 330 210 M260 272 C 300 272, 300 250, 330 250"
        stroke={G} strokeWidth="2" fill="none" />
      <g transform="translate(320 196)">
        <rect width="136" height="116" rx="12" fill="#151515" stroke={G} strokeWidth="2" />
        {[40, 64, 50, 86].map((h, i) => (
          <rect key={i} x={18 + i * 28} y={100 - h} width="18" height={h} rx="3" fill={i === 3 ? R : W} className={`art-bar d${i}`} />
        ))}
      </g>
    </>
  );
}

const ART = { build: Build, ai: AI, brand: Brand, broadcast: Broadcast, enterprise: Enterprise };
const TITLES: Record<ServiceKind, string> = {
  build: "Illustration of a website and mobile app being built",
  ai: "Illustration of an AI assistant chatting with a customer",
  brand: "Illustration of a brand identity system with type, colours and logo",
  broadcast: "Illustration of a live-streaming camera sending a signal",
  enterprise: "Illustration of cloud servers connected to a live dashboard",
};

export default function ServiceArt({ kind, className = "" }: { kind: ServiceKind; className?: string }) {
  const Art = ART[kind];
  return (
    <svg viewBox="0 0 480 360" className={`service-art ${className}`} role="img" aria-label={TITLES[kind]}>
      <title>{TITLES[kind]}</title>
      <Art />
    </svg>
  );
}
