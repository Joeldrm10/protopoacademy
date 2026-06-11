import { Link } from "react-router-dom";

const ITEMS = [
  "🔥 INSCRIÇÕES ABERTAS",
  "FOOTCAMP VERÃO 2026",
  "⚠️ VAGAS LIMITADAS",
  "📅 JULHO 2026",
];

const MarqueeBanner = () => {
  // Repeat enough times for seamless loop
  const loop = Array.from({ length: 6 }).flatMap(() => ITEMS);

  return (
    <Link
      to="/footcamp"
      aria-label="Inscrições abertas — ProTopo Footcamp Verão 2026"
      className="block relative overflow-hidden bg-black border-b border-primary/30 group cursor-pointer"
    >
      <div className="flex whitespace-nowrap py-1.5 md:py-2 animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-4 md:mx-6 font-heading uppercase tracking-[0.15em] md:tracking-[0.18em] text-[11px] md:text-sm text-primary flex items-center gap-4 md:gap-6"
          >
            {item}
            <span className="text-primary/40">•</span>
          </span>
        ))}
      </div>
    </Link>
  );
};

export default MarqueeBanner;
