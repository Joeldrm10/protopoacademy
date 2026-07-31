import { useEffect, useMemo, useState } from "react";
import {
  Moon,
  Zap,
  Brain,
  ShieldAlert,
  StretchHorizontal,
  Activity,
  Shield,
  Scale,
  ArrowRight,
  TrendingDown,
  Timer,
  Footprints,
  BedDouble,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CategoryId = "sono" | "alongamentos" | "ferias";

type Tip = {
  id: string;
  category: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  short: React.ReactNode;
  full: React.ReactNode;
};

const CATEGORIES: { id: CategoryId; label: string; full: string }[] = [
  { id: "sono", label: "Sono", full: "Sono e Recuperação" },
  { id: "alongamentos", label: "Alongamentos", full: "Alongamentos" },
  { id: "ferias", label: "Férias", full: "Férias / Regresso à época" },
];

const categoryLabel = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)?.full ?? "";

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gradient-gold font-semibold">{children}</span>
);

// Edita/acrescenta dicas aqui — o layout adapta-se automaticamente.
const TIPS: Tip[] = [
  {
    id: "sono-1",
    category: "sono",
    icon: BedDouble,
    title: "Dormir bem melhora o rendimento",
    short: (
      <>
        <H>Dormir bem</H> melhora a recuperação e o rendimento físico no treino seguinte.
      </>
    ),
    full: (
      <>
        O sono é uma das ferramentas mais poderosas — e mais subestimadas — de qualquer atleta.
        Durante o sono profundo o corpo repara o tecido muscular e consolida o que foi aprendido no
        treino. Um atleta que dorme bem chega ao treino seguinte com mais <H>energia</H>, melhor{" "}
        <H>concentração</H> e menor risco de lesão.
      </>
    ),
  },
  {
    id: "sono-2",
    category: "sono",
    icon: Moon,
    title: "Menos de 6 horas aumenta lesões",
    short: (
      <>
        Dormir <H>menos de 6 horas</H> aumenta o risco de lesões musculares.
      </>
    ),
    full: (
      <>
        Noites curtas de forma repetida deixam o músculo sem tempo suficiente de reparação. O
        resultado é maior <H>fadiga acumulada</H>, perda de controlo motor e um aumento claro do
        risco de <H>lesões musculares</H>, sobretudo em arranques, mudanças de direção e remates.
      </>
    ),
  },
  {
    id: "sono-3",
    category: "sono",
    icon: Zap,
    title: "Tempo de reação mais lento",
    short: (
      <>
        Dormir pouco reduz o <H>tempo de reação</H> em campo.
      </>
    ),
    full: (
      <>
        O tempo de reação é decisivo em duelos, desarmes e no primeiro toque. Com privação de sono,
        o sistema nervoso responde mais devagar — no futebol, alguns <H>milésimos de segundo</H>{" "}
        fazem a diferença entre ganhar ou perder a bola.
      </>
    ),
  },
  {
    id: "sono-4",
    category: "sono",
    icon: Brain,
    title: "Pior tomada de decisão",
    short: (
      <>
        Dormir pouco prejudica a <H>tomada de decisão</H> sob pressão.
      </>
    ),
    full: (
      <>
        Passe, condução ou remate? Sob cansaço mental, o cérebro processa menos informação por
        segundo e o atleta tende a escolher a opção mais fácil em vez da melhor. Dormir bem melhora
        a <H>leitura de jogo</H> e a qualidade das decisões nos momentos críticos.
      </>
    ),
  },
  {
    id: "sono-5",
    category: "sono",
    icon: ShieldAlert,
    title: "Mais probabilidade de lesões",
    short: (
      <>
        Dormir pouco aumenta a probabilidade de <H>lesões</H> nos treinos e jogos.
      </>
    ),
    full: (
      <>
        Além da recuperação muscular, o sono regula hormonas ligadas ao crescimento e à
        inflamação. Atletas jovens com rotinas de sono irregulares apresentam mais queixas de{" "}
        <H>dores</H> e maior número de paragens ao longo da época.
      </>
    ),
  },
  {
    id: "along-1",
    category: "alongamentos",
    icon: StretchHorizontal,
    title: "Melhor postura",
    short: (
      <>
        Os alongamentos podem melhorar a tua <H>postura</H>.
      </>
    ),
    full: (
      <>
        Muitas horas sentado encurtam músculos da anca e da zona lombar. Alongar de forma regular
        devolve comprimento a esses músculos e ajuda a manter uma <H>postura alinhada</H>, o que se
        traduz em melhor corrida e menos dores nas costas.
      </>
    ),
  },
  {
    id: "along-2",
    category: "alongamentos",
    icon: Activity,
    title: "Flexibilidade e circulação",
    short: (
      <>
        Alongar melhora a <H>flexibilidade</H>, reduz a tensão muscular e aumenta a{" "}
        <H>circulação sanguínea</H>.
      </>
    ),
    full: (
      <>
        Com mais flexibilidade, o gesto técnico torna-se mais livre e eficiente. O aumento da
        circulação leva mais <H>oxigénio</H> e nutrientes ao músculo, acelerando a recuperação
        depois do esforço.
      </>
    ),
  },
  {
    id: "along-3",
    category: "alongamentos",
    icon: Shield,
    title: "Prevenção de lesões",
    short: (
      <>
        Alongamentos regulares ajudam a <H>prevenir lesões</H> e melhoram a amplitude de movimento.
      </>
    ),
    full: (
      <>
        Uma articulação com boa <H>amplitude de movimento</H> tolera melhor as posições extremas
        que o futebol exige. Isso reduz o risco de entorses e de roturas em movimentos rápidos e
        inesperados.
      </>
    ),
  },
  {
    id: "along-4",
    category: "alongamentos",
    icon: Scale,
    title: "Mais equilíbrio",
    short: (
      <>
        Alongamentos diários melhoram o <H>equilíbrio</H>.
      </>
    ),
    full: (
      <>
        O equilíbrio depende da relação entre músculos, articulações e sistema nervoso. Rotinas
        curtas e diárias de alongamento melhoram esta coordenação e ajudam o atleta a manter-se{" "}
        <H>estável</H> em duelos e apoios instáveis.
      </>
    ),
  },
  {
    id: "ferias-1",
    category: "ferias",
    icon: TrendingDown,
    title: "Pausas longas reduzem a capacidade física",
    short: (
      <>
        Após <H>2 a 4 semanas</H> sem treinar, um atleta pode perder entre <H>5% e 15%</H> da sua
        capacidade física.
      </>
    ),
    full: (
      <>
        A paragem total leva a uma perda progressiva de adaptações conquistadas ao longo da época.
        Quanto mais longa a pausa, maior a perda — e maior o tempo necessário para{" "}
        <H>recuperar o nível</H> no regresso aos treinos.
      </>
    ),
  },
  {
    id: "ferias-2",
    category: "ferias",
    icon: Timer,
    title: "A resistência é a primeira a baixar",
    short: (
      <>
        A força e a velocidade mantêm-se mais tempo, mas a <H>resistência</H> é das primeiras
        capacidades a diminuir.
      </>
    ),
    full: (
      <>
        A capacidade aeróbia responde muito depressa à falta de estímulo. Por isso, no regresso, é
        comum o atleta sentir-se rápido em ações curtas mas <H>sem fôlego</H> para manter o ritmo
        durante todo o jogo.
      </>
    ),
  },
  {
    id: "ferias-3",
    category: "ferias",
    icon: Footprints,
    title: "Mantém-te ativo nas férias",
    short: (
      <>
        Manter uma rotina de <H>atividade física</H> durante as férias ajuda a preservar o
        rendimento.
      </>
    ),
    full: (
      <>
        Não é preciso treinar como na época. Correr, nadar, andar de bicicleta ou jogar bola com os
        amigos <H>2 a 3 vezes por semana</H> é suficiente para travar grande parte da perda de
        condição física.
      </>
    ),
  },
  {
    id: "ferias-4",
    category: "ferias",
    icon: Sparkles,
    title: "Descanso e atividade física",
    short: (
      <>
        <H>Descanso</H> e <H>atividade física</H> devem andar lado a lado.
      </>
    ),
    full: (
      <>
        As férias servem para recuperar corpo e cabeça — mas descanso não significa paragem total.
        O equilíbrio entre repouso e movimento é o que permite voltar à época{" "}
        <H>fresco e preparado</H>.
      </>
    ),
  },
];

const INITIAL_COUNT = 6;

const Educacao = () => {
  const [filter, setFilter] = useState<"todas" | CategoryId>("todas");
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [openTip, setOpenTip] = useState<Tip | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const filtered = useMemo(
    () => (filter === "todas" ? TIPS : TIPS.filter((t) => t.category === filter)),
    [filter]
  );

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > shown.length;

  const selectFilter = (id: "todas" | CategoryId) => {
    setFilter(id);
    setVisible(INITIAL_COUNT);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sabias que? | Educação | ProTopo Academy"
        description="Biblioteca de dicas sobre sono, recuperação, alongamentos, férias e regresso à época para atletas."
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
            Pequenas dicas que fazem <span className="text-foreground font-medium">grande diferença</span> no teu rendimento em campo.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24 md:pb-32">
        {/* Filtros */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {[{ id: "todas" as const, label: "Todas" }, ...CATEGORIES].map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => selectFilter(c.id)}
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

        {/* Grelha de dicas */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {shown.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <AnimateOnScroll key={tip.id} delay={(idx % 3) * 80}>
                <div className="group h-full flex flex-col bg-card/60 border border-border rounded-xl p-5 md:p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[0.65rem] font-heading font-semibold uppercase tracking-[0.15em] text-primary/80">
                      {categoryLabel(tip.category)}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-[0.95rem] leading-relaxed mb-4">
                    {tip.short}
                  </p>
                  <button
                    onClick={() => setOpenTip(tip)}
                    className="mt-auto inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    Ler mais
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => v + INITIAL_COUNT)}
              className="inline-flex items-center gap-2 border border-primary/40 text-primary px-8 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:bg-primary/10 transition-all duration-300"
            >
              Ver mais dicas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Closing CTA */}
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center mt-16 md:mt-20">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 italic">
              Na <span className="text-foreground font-semibold not-italic">ProTopo Academy</span>, não treinamos só no campo — também ajudamos os atletas a evoluir fora dele.
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

      <Dialog open={!!openTip} onOpenChange={(o) => !o && setOpenTip(null)}>
        <DialogContent className="max-w-lg">
          {openTip && (
            <>
              <DialogHeader>
                <span className="text-[0.65rem] font-heading font-semibold uppercase tracking-[0.15em] text-primary/80 text-left">
                  {categoryLabel(openTip.category)}
                </span>
                <DialogTitle className="font-heading text-xl md:text-2xl text-left">
                  {openTip.title}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="text-left text-foreground/90 text-base leading-relaxed pt-2 space-y-3">
                    <p>{openTip.short}</p>
                    <p>{openTip.full}</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Educacao;
