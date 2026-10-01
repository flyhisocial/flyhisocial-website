// Simple line icons drawn for FlyHi. Every path uses pathLength=1 so it can "draw in" with CSS.

const P = {
  pulse: ["M2 12h4l2.5-6 4 12 3-8 2 2H22"],
  flow: ["M4 5h5v5H4z", "M15 14h5v5h-5z", "M9 7.5h3.5a2 2 0 0 1 2 2V14"],
  grid: ["M4 4h7v7H4z", "M13 4h7v7h-7z", "M4 13h7v7H4z", "M13 16.5h7M16.5 13v7"],
  database: ["M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z", "M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6", "M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"],
  link: ["M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1", "M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"],
  chart: ["M4 20V10", "M10 20V4", "M16 20v-7", "M22 20H2"],
  users: ["M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z", "M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6", "M16 4.5a3.5 3.5 0 0 1 0 6.5", "M18 14c2 .7 3.2 2.8 3.5 6"],
  search: ["M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z", "M15.5 15.5 21 21"],
  target: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M12 12h.01", "M12 1v4M12 19v4M1 12h4M19 12h4"],
  mic: ["M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z", "M5 11a7 7 0 0 0 14 0", "M12 18v3M8 21h8"],
  split: ["M3 5h8v6H3z", "M13 13h8v6h-8z", "M11 8h3a3 3 0 0 1 3 3v2", "M7 11v2a3 3 0 0 0 3 3h3"],
  broadcast: ["M12 12h.01", "M8.5 15.5a5 5 0 0 1 0-7", "M15.5 8.5a5 5 0 0 1 0 7", "M5.5 18.5a9 9 0 0 1 0-13", "M18.5 5.5a9 9 0 0 1 0 13"],
  speaker: ["M6 3h12v18H6z", "M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M12 7h.01"],
  route: ["M6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M18 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M6 17V9a3 3 0 0 1 3-3h2", "M18 7v8a3 3 0 0 1-3 3h-2"],
  check: ["M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2", "M9 2h6v4H9z", "M8.5 14l2.5 2.5 5-5"],
  anchor: ["M12 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z", "M12 8v13", "M8 11h8", "M4 14a8 8 0 0 0 16 0", "M4 14l-1.5 1.5M20 14l1.5 1.5"],
  ship: ["M3 16l2 5h14l2-5z", "M6 16V10h12v6", "M9 10V6h6v4", "M12 3v3"],
  inspect: ["M4 4h9l5 5v11H4z", "M13 4v5h5", "M11 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M13.2 16.2 16 19"],
  rig: ["M8 21 12 3l4 18", "M9.5 14h5", "M10.5 9h3", "M4 21h16", "M16 7h4v4"],
  leaf: ["M5 19c0-8 6-14 15-15-1 9-7 15-15 15z", "M5 19 13 11"],
} satisfies Record<string, string[]>;

export type IconName = keyof typeof P;

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d, i) => <path key={i} d={d} pathLength={1} className="draw" style={{ transitionDelay: `${i * 0.12}s` }} />)}
    </svg>
  );
}
