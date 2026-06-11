import { Link } from "react-router-dom";

const ITEMS = [
  "⚡ Inscrições abertas",
  "ProTopo Footcamp Verão 2026",
  "Julho",
  "Atletas dos 6 aos 16 anos",
  "Vagas limitadas",
];

const MarqueeBanner = () => {
  // Repeat enough times for seamless loop
  const loop = Array.from({ length: 4 }).flatMap(() => ITEMS);

  return (
    <Link
      to="/marcar?tipo=footcamp"
      aria-label="Inscrições abertas — ProTopo Footcamp Verão 2026"
      className="block relative overflow-hidden bg-gradient-to-r from-black via-[#1a1407] to-black border-y border-primary/30 group"
    >
      <div className="flex whitespace-nowrap py-2.5 animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-heading uppercase tracking-[0.18em] text-xs md:text-sm text-primary/90 flex items-center gap-6"
          >
            {item}
            <span className="text-primary/40">·</span>
          </span>
        ))}
      </div>
    </Link>
  );
};

export default MarqueeBanner;
