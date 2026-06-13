import { Calendar, MapPin, Clock, Shirt, Apple, Package, Sparkles } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const infoCards = [
  {
    icon: Package,
    title: "O que está incluído",
    items: [
      "T-shirt ProTopo",
      "Calções ProTopo",
      "Par de meias",
      "Seguro anual",
      "Lanches diários",
      "Almoço incluído nos dias completos",
      "Balneários com água quente",
      "Acompanhamento técnico especializado",
    ],
  },
  {
    icon: Calendar,
    title: "Datas",
    items: [
      "1ª Semana — 6 a 10 de julho",
      "2ª Semana — 13 a 17 de julho",
      "3ª Semana — 20 a 24 de julho",
      "4ª Semana — 27 a 31 de julho",
    ],
  },
  {
    icon: Clock,
    title: "Horários",
    items: [
      "Treinos: 09:00 às 12:30",
      "Quinta-feira: dia completo (09:00 às 17:30)",
      "Flexibilidade de horários mediante necessidade",
    ],
  },
  {
    icon: MapPin,
    title: "Local",
    items: [
      "Campo da Caridade",
      "(Adelino dos Santos Júnior)",
      "Ourém",
    ],
  },
  {
    icon: Apple,
    title: "Alimentação",
    items: [
      "Água",
      "Fruta",
      "Barras energéticas",
      "Nos dias completos: almoço + lanche da manhã + lanche da tarde",
    ],
  },
  {
    icon: Sparkles,
    title: "Preços",
    items: [
      "1 Semana — 95€",
      "2 Semanas — 180€",
      "3 Semanas — 260€",
      "4 Semanas — 340€",
      "Seguro anual: 20€",
      "Desconto irmãos: -10% sobre o valor total",
      "🎁 Oferta: nas 4 semanas o seguro é oferecido",
    ],
  },
];

const FootcampInfoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              <Shirt className="w-3.5 h-3.5" />
              ProTopo Footcamp — Edição Verão 2026
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6 leading-tight">
              Uma experiência de treino<br className="hidden md:block" />{" "}
              <span className="text-gradient-gold">diferenciada</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              A ProTopo Footcamp foi criada para proporcionar uma experiência de treino diferenciada e de excelência para jovens atletas dos 6 aos 16 anos.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
              Procuramos criar dias inesquecíveis mas ao mesmo tempo focados no desenvolvimento técnico, físico, mental e competitivo de cada atleta.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-4">
              Mais do que um camp, é uma oportunidade para evoluir sob orientação especializada, num ambiente seguro, organizado e altamente profissional.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {infoCards.map((card, i) => (
            <AnimateOnScroll key={card.title} delay={i * 80}>
              <div className="group bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.15)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-foreground/90 text-sm">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FootcampInfoSection;
