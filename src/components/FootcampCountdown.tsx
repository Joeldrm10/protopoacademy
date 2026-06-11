import { useEffect, useState } from "react";

// Data de início do Footcamp Verão 2026 (1ª semana — 6 de julho, 09:00 Lisboa)
const TARGET = new Date("2026-07-06T09:00:00+01:00").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const Unit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-[72px] md:min-w-[110px]">
    <div className="relative w-full bg-card border border-primary/30 rounded-xl md:rounded-2xl px-3 py-4 md:px-6 md:py-6 shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.4)]">
      <span className="block text-center font-heading font-black text-3xl md:text-5xl text-gradient-gold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-[10px] md:text-xs font-heading font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </span>
  </div>
);

const FootcampCountdown = () => {
  const [t, setT] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/40 to-background border-y border-primary/15">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
          ⏳ Contagem Decrescente
        </p>
        <h2 className="font-heading font-bold text-2xl md:text-4xl mb-2">
          Faltam apenas
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8">
          até ao início do <span className="text-foreground font-semibold">Footcamp Verão 2026</span>
        </p>
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
          <Unit value={t.days} label="Dias" />
          <Unit value={t.hours} label="Horas" />
          <Unit value={t.minutes} label="Minutos" />
          <Unit value={t.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
};

export default FootcampCountdown;
