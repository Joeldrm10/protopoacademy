import { Link } from "react-router-dom";

const ITEMS = [
  "🔥 INSCRIÇÕES ABERTAS",
  "FOOTCAMP VERÃO 2026",
  "⚠️ VAGAS LIMITADAS",
  "📅 JULHO 2026",
];

const MarqueeBanner = () => {
  // Render the full sequence twice, side by side, so a -50% translate
  // creates a perfect seamless loop with no visible reset.
  const Sequence = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className="mx-4 md:mx-6 font-heading uppercase tracking-[0.15em] md:tracking-[0.18em] text-[11px] md:text-sm text-primary flex items-center gap-4 md:gap-6 whitespace-nowrap"
        >
          {item}
          <span className="text-primary/40">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <Link
      to="/footcamp"
      aria-label="Inscrições abertas — ProTopo Footcamp Verão 2026"
      className="block relative overflow-hidden bg-black border-b border-primary/30 group cursor-pointer"
    >
      <div className="flex w-max py-1.5 md:py-2 animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
        <Sequence />
        <Sequence ariaHidden />
      </div>
    </Link>
  );
};

export default MarqueeBanner;
