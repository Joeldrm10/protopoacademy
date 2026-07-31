import { useEffect, useMemo, useState } from "react";
import { Moon, StretchHorizontal, Sun, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type CategoryId = "sono" | "alongamentos" | "ferias";

type Block = {
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  title: React.ReactNode;
  tips: React.ReactNode[];
};

const CATEGORIES: { id: "todos" | CategoryId; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "sono", label: "Sono" },
  { id: "alongamentos", label: "Alongamentos" },
  { id: "ferias", label: "Férias" },
];

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gradient-gold font-semibold">{children}</span>
);

// Edita/acrescenta blocos e dicas aqui — o layout adapta-se automaticamente.
const BLOCKS: Block[] = [
  {
    id: "sono",
    icon: Moon,
    category: "Sono e Recuperação",
    title: (
      <>
        O teu desempenho em campo começa no <H>sono</H>.
      </>
    ),
    tips: [
      <>
        <H>Dormir bem</H> melhora a recuperação e o rendimento físico no treino seguinte.
      </>,
      <>
        Dormir <H>menos de 6 horas</H> pode reduzir o <H>tempo de reação</H> e a velocidade de
        decisão em jogo.
      </>,
      <>
        Dormir pouco aumenta o risco de <H>lesões musculares</H>.
      </>,
    ],
  },
  {
    id: "alongamentos",
    icon: StretchHorizontal,
    category: "Alongamentos",
    title: (
      <>
        Os alongamentos podem melhorar a tua <H>postura</H>?
      </>
    ),
    tips: [
      <>
        Alongar melhora a <H>flexibilidade</H>, reduz a tensão muscular e aumenta a{" "}
        <H>circulação sanguínea</H>.
      </>,
      <>
        Alongamentos regulares ajudam a <H>prevenir lesões</H>, melhorando a amplitude de movimento
        nas articulações.
      </>,
      <>
        Alongamentos diários melhoram o <H>equilíbrio</H>.
      </>,
    ],
  },
  {
    id: "ferias",
    icon: Sun,
    category: "Férias / Regresso à época",
    title: (
      <>
        Antes de começares a nova época, prepara o teu <H>regresso</H>.
      </>
    ),
    tips: [
      <>
        Após <H>2 a 4 semanas</H> sem treinar, um atleta pode perder entre <H>5% e 15%</H> da sua
        capacidade física.
      </>,
      <>
        A força e a velocidade tendem a manter-se durante mais tempo, mas a <H>resistência</H> é
        uma das primeiras capacidades a diminuir.
      </>,
      <>
        Manter uma rotina de <H>atividade física</H> durante as férias ajuda a preservar o
        rendimento.
      </>,
      <>
        <H>Descanso</H> e <H>atividade física</H> devem andar lado a lado.
      </>,
    ],
  },
];

const Educacao = () => {
  const [filter, setFilter] = useState<"todos" | CategoryId>("todos");
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const shown = useMemo(
    () => (filter === "todos" ? BLOCKS : BLOCKS.filter((b) => b.id === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sabias que? | Educação | ProTopo Academy"
        description="Dicas sobre sono, recuperação, alongamentos e regresso à época para atletas da ProTopo Academy."
        path="/educacao"
      />
      <Navbar />

      {/* Header */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Educação
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground leading-tight">
            Sabias <span className="text-gradient-gold">que?</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Pequenas dicas que fazem{" "}
            <span className="text-foreground font-medium">grande diferença</span> no teu rendimento
            em campo.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24 md:pb-32">
        {/* Filtros */}
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {CATEGORIES.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                aria-pressed={active}
                className={`px-4 md:px-5 py-2 rounded-full font-heading font-semibold text-xs md:text-sm uppercase tracking-wider border transition-all duration-300 ${
                  active
                    ? "bg-gradient-gold text-primary-foreground border-transparent shadow-lg"
                    : "bg-card/60 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Blocos */}
        <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
          {shown.map((block, idx) => {
            const Icon = block.icon;
            const isOpen = !!open[block.id];
            return (
              <AnimateOnScroll key={block.id} delay={idx * 80}>
                <div className="bg-card/60 border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[0.65rem] font-heading font-semibold uppercase tracking-[0.15em] text-primary/80 mb-2">
                        {block.category}
                      </span>
                      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground leading-snug">
                        {block.title}
                      </h2>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-3">
                        {block.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-muted-foreground text-sm md:text-base leading-relaxed"
                          >
                            <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen((o) => ({ ...o, [block.id]: !o[block.id] }))}
                    aria-expanded={isOpen}
                    className="mt-5 inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    {isOpen ? "Ver menos" : "Ver dicas"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Closing CTA */}
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center mt-16 md:mt-20">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 italic">
              Na{" "}
              <span className="text-foreground font-semibold not-italic">ProTopo Academy</span>, não
              treinamos só no campo — também ajudamos os atletas a evoluir fora dele.
            </p>
            <Link
              to="/marcar?tipo=footcamp"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-base md:text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Inscrever Footcamp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>

      <Footer />
    </div>
  );
};

export default Educacao;
