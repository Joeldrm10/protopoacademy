import { Heart, Target, Trophy, Flame, Compass, Users } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const values = [
  {
    icon: Flame,
    title: "Disciplina",
    description: "Treinar com foco e compromisso, mesmo nos dias mais difíceis.",
  },
  {
    icon: Target,
    title: "Consistência",
    description: "Pequenos progressos, todos os dias, fazem grandes atletas.",
  },
  {
    icon: Trophy,
    title: "Evolução",
    description: "Cada treino é uma oportunidade de ser melhor do que ontem.",
  },
  {
    icon: Compass,
    title: "Mentalidade",
    description: "Acreditar, persistir e nunca desistir do próprio caminho.",
  },
];

const StorySection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* História */}
        <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            A Nossa História
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8">
            Como nasceu a <span className="text-gradient-gold">ProTopo Academy</span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
            <p>
              A ProTopo Academy nasceu da paixão pelo futebol e da vontade de criar um espaço onde os jovens atletas pudessem evoluir verdadeiramente — com qualidade, atenção individual e uma metodologia pensada para cada faixa etária.
            </p>
            <p>
              A ideia surgiu de <span className="text-foreground font-medium">Nuno Rodrigues</span>, em conjunto com <span className="text-foreground font-medium">João Alves</span>, dois treinadores que sentiram a necessidade de oferecer algo diferente: treinos personalizados, com foco no desenvolvimento técnico e físico, longe da pressão dos resultados imediatos e perto daquilo que realmente importa — o crescimento do atleta.
            </p>
            <p>
              Hoje, a academia é a casa de dezenas de jovens dos <span className="text-foreground font-medium">6 aos 16 anos</span>, que treinam com motivação, aprendem com profissionais dedicados e descobrem, treino após treino, o seu próprio potencial.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Missão */}
        <AnimateOnScroll className="max-w-4xl mx-auto mb-20">
          <div className="relative border border-primary/20 rounded-2xl p-8 md:p-12 bg-card/50 backdrop-blur-sm">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background px-4">
              <div className="flex items-center gap-2 text-primary">
                <Heart className="w-5 h-5" />
                <span className="font-heading font-semibold uppercase tracking-[0.2em] text-xs">
                  A Nossa Missão
                </span>
              </div>
            </div>
            <p className="text-foreground text-lg md:text-xl leading-relaxed text-center font-light">
              Desenvolver jovens atletas de forma <span className="text-primary font-medium">completa</span> — técnica, física e mentalmente — proporcionando um ambiente de treino exigente, próximo e inspirador, onde cada criança possa <span className="text-primary font-medium">evoluir ao seu ritmo</span> e descobrir o melhor de si dentro e fora do campo.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Valores */}
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Os Nossos Valores
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            O que nos <span className="text-gradient-gold">define</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mais do que um clube de treino, somos uma academia com princípios claros que orientam cada sessão.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, i) => (
            <AnimateOnScroll key={value.title} delay={i * 100}>
              <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
