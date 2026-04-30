import { Moon, Zap, Brain, ShieldAlert, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";

const stats = [
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
        Reduz o <span className="text-gradient-gold font-semibold">tempo de reação</span> em campo.
      </>
    ),
  },
  {
    icon: Brain,
    text: (
      <>
        Prejudica a <span className="text-gradient-gold font-semibold">tomada de decisão</span> sob pressão.
      </>
    ),
  },
  {
    icon: ShieldAlert,
    text: (
      <>
        Aumenta a probabilidade de <span className="text-gradient-gold font-semibold">lesões</span> nos treinos e jogos.
      </>
    ),
  },
];

const DidYouKnowSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Educação
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-5 text-foreground leading-tight">
              Sabias <span className="text-gradient-gold">que?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Pequenas dicas que fazem <span className="text-foreground font-medium">grande diferença</span> no teu rendimento em campo.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Lead block */}
        <AnimateOnScroll delay={100}>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-surface-elevated/50 border border-border rounded-2xl p-8 md:p-10 backdrop-blur-sm">
              <p className="text-foreground/90 text-lg md:text-xl leading-relaxed text-center">
                <span className="text-gradient-gold font-semibold">Dormir bem</span> melhora a recuperação e o rendimento físico no treino seguinte. O sono é uma das ferramentas mais poderosas — e mais subestimadas — de qualquer atleta.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Stats grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <AnimateOnScroll key={idx} delay={150 + idx * 80}>
                <div className="group h-full bg-card/60 border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground/90 text-base md:text-[1.05rem] leading-relaxed pt-1.5">
                      {stat.text}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* Closing message */}
        <AnimateOnScroll delay={500}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 italic">
              Na <span className="text-foreground font-semibold not-italic">ProTopo Academy</span>, não treinamos só no campo — também ajudamos os atletas a evoluir fora dele.
            </p>
            <Link
              to="/marcar"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-base md:text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Quero melhorar o meu rendimento
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default DidYouKnowSection;
