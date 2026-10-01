import { marquee } from "@/lib/content";

export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-[#1e1e1e] py-5 md:py-7" aria-label={`What we do: ${marquee.join(", ")}`}>
      <div className="marquee-track items-center gap-8 whitespace-nowrap text-[18px] font-bold md:gap-11 md:text-[26px]" aria-hidden="true">
        {row.map((m, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-11">
            {m}<span className="h-2 w-2 bg-red md:h-2.5 md:w-2.5" />
          </span>
        ))}
      </div>
    </div>
  );
}
