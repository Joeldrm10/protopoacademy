import { useEffect } from "react";
import { Moon, Zap, Brain, ShieldAlert, StretchHorizontal, Activity, Shield, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";

type Tip = {
  icon: React.ComponentType<{ className?: string }>;
  text: React.ReactNode;
};

type Category = {
  id: string;
  title: string;
  intro?: React.ReactNode;
  tips: Tip[];
};

const categories: Category[] = [
  {
    id: "sono-recuperacao",
    title: "Sono e Recuperação",
    intro: (
      <>
        <span className="text-gradient-gold font-semibold">Dormir bem</span> melhora a recuperação e o rendimento físico no treino seguinte. O sono é uma das ferramentas mais poderosas — e mais subestimadas — de qualquer atleta.
      </>
    ),
    tips: [
      {
        icon: Moon,
        text: (
          <>
            Dormir <span className="text-gradient-gold font-semibold">menos de 6 horas</span> aumenta o risco de lesões musculares.
          </>
        ),
      },
      {
        icon: Zap,
        text: (
          <>
            Dormir pouco reduz o <span className="text-gradient-gold font-semibold">tempo de reação</span> em campo.
          </>
        ),
      },
      {
        icon: Brain,
        text: (
          <>
            Dormir pouco prejudica a <span className="text-gradient-gold font-semibold">tomada de decisão</span> sob pressão.
          </>
        ),
      },
      {
        icon: ShieldAlert,
        text: (
          <>
            Dormir pouco aumenta a probabilidade de <span className="text-gradient-gold font-semibold">lesões</span> nos treinos e jogos.
          </>
        ),
      },
    ],
  },
  {
    id: "alongamentos",
    title: "Alongamentos",
    tips: [
      {
        icon: StretchHorizontal,
        text: (
          <>
            Os alongamentos podem melhorar a tua <span className="text-gradient-gold font-semibold">postura</span>.
          </>
        ),
      },
      {
        icon: Activity,
        text: (
          <>
            Alongar melhora a <span className="text-gradient-gold font-semibold">flexibilidade</span>, reduz a tensão muscular e aumenta a <span className="text-gradient-gold font-semibold">circulação sanguínea</span>.
          </>
        ),
      },
      {
        icon: Shield,
        text: (
          <>
            Alongamentos regulares ajudam a <span className="text-gradient-gold font-semibold">prevenir lesões</span>, melhorando a amplitude de movimento nas articulações.
          </>
        ),
      },
      {
        icon: Scale,
        text: (
          <>
            Alongamentos diários melhoram o <span className="text-gradient-gold font-semibold">equilíbrio</span>.
          </>
        ),
      },
    ],
  },
];

const Educacao = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sabias que? | Educação | ProTopo Academy"
        description="Dicas simples sobre sono, recuperação, alongamentos, rendimento e prevenção de lesões para atletas."
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

      {/* Categories */}
      <div className="container mx-auto px-4 pb-24 md:pb-32">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="mb-16 md:mb-20 scroll-mt-32">
            <AnimateOnScroll>
              <div className="max-w-4xl mx-auto mb-8 md:mb-10">
                <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                  {cat.title}
                </h2>
                <div className="h-1 w-16 bg-gradient-gold rounded-full" />
                {cat.intro && (
                  <div className="mt-6 bg-surface-elevated/50 border border-border rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                      {cat.intro}
                    </p>
                  </div>
                )}
              </div>
            </AnimateOnScroll>

            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {cat.tips.map((tip, idx) => {
                const Icon = tip.icon;
                return (
                  <AnimateOnScroll key={idx} delay={idx * 80}>
                    <div className="group h-full bg-card/60 border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-foreground/90 text-base md:text-[1.05rem] leading-relaxed pt-1.5">
                          {tip.text}
                        </p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </section>
        ))}

        {/* Closing CTA */}
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center mt-4">
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

      <Footer />
    </div>
  );
};

export default Educacao;
