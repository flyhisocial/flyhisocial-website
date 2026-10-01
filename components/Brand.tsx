// The FlyHi stair mark: five squares climbing bottom-left → top-right, the last one red.

export const STAIR: [number, number][] = [[0, 2], [1, 2], [1, 1], [2, 1], [2, 0]];

export function StairMark({ size = 34, color = "#fff", accent = "#EC3013", className = "" }:
  { size?: number; color?: string; accent?: string; className?: string }) {
  const cell = 10, gap = 2, s = cell * 3 + gap * 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${s} ${s}`} className={className} aria-hidden="true">
      {STAIR.map(([c, r], i) => (
        <rect key={i} className="stair-cell" x={c * (cell + gap)} y={r * (cell + gap)} width={cell} height={cell}
          fill={i === 4 ? accent : color} />
      ))}
    </svg>
  );
}

export function Wordmark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`flex items-center gap-3.5 ${className}`}>
      <StairMark size={size * 1.55} />
      <span className="flex flex-col leading-none">
        <span style={{ fontWeight: 900, fontStretch: "118%", fontSize: size, letterSpacing: "0.01em" }}>FLYHI</span>
        <span style={{ fontSize: size * 0.41, letterSpacing: "0.55em", marginTop: size * 0.18 }}>SOCIAL</span>
      </span>
    </span>
  );
}

/* Typographic project cover — used until real photography is ready. */
export function Cover({ cover, sub, bg, accent, image, alt, big = false }:
  { cover: string; sub: string; bg: string; accent: string; image?: string; alt?: string; big?: boolean }) {
  const light = bg.toLowerCase() === "#edf2fb";
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />;
  }
  return (
    <div className="absolute inset-0" style={{ background: bg, color: light ? "#000" : "#fff", containerType: "size" }}>
      <div className="absolute left-[7%] right-[7%] top-[9%] truncate font-semibold opacity-70"
        style={{ fontSize: "clamp(9px, 2.6cqw, 13px)", letterSpacing: "0.2em" }}>{sub}</div>
      {/* The name is sized to the card, so it always ends before the logo squares. */}
      <div className="absolute bottom-[9%] left-[7%] whitespace-nowrap font-black leading-[0.9] tracking-[-0.03em]"
        style={{ fontSize: big ? "min(8.6cqw, 128px)" : "min(7.4cqw, 60px)", fontStretch: "112%" }}>{cover}</div>
      <div className="absolute bottom-[9%] right-[7%] aspect-square" style={{ width: big ? "26%" : "30%" }}>
        {STAIR.map(([c, r], i) => (
          <div key={i} className="cover-cell absolute" style={{
            left: `${c * 34.5}%`, top: `${r * 34.5}%`, width: "31%", height: "31%",
            background: i === 4 ? accent : light ? "rgba(0,0,0,.88)" : "rgba(255,255,255,.9)",
          }} />
        ))}
      </div>
    </div>
  );
}
