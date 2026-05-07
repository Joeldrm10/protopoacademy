import { Target, TrendingUp, Users, Shield } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const stats = [
  { icon: Users, value: "50+", label: "Atletas" },
  { icon: Target, value: "4", label: "Treinadores" },
  { icon: TrendingUp, value: "100%", label: "Foco na evolução" },
  { icon: Shield, value: "6-16", label: "Anos de idade" },
];

const handleTilt = (mult: number) => (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  e.currentTarget.style.transform = `perspective(800px) rotateY(${x * mult}deg) rotateX(${-y * mult}deg) translateZ(${mult === 12 ? 12 : 8}px)`;
  e.currentTarget.style.transition = "transform 0.1s ease";
  e.currentTarget.style.boxShadow = "0 20px 40px hsla(43, 100%, 50%, 0.18)";
};

const handleTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  e.currentTarget.style.transition = "transform 0.4s ease";
  e.currentTarget.style.boxShadow = "";
};

const AboutSection = () => {
  return (
    <section id="sobre" className="py-28 bg-background relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Sobre Nós
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8">
            O teu caminho para o <span className="text-gradient-gold">topo</span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              A ProTopo Academy é uma academia de treinos personalizados criada para atletas de futebol que querem evoluir de forma consistente e atingir o seu máximo potencial.
            </p>
            <p>
              O nosso foco está em elevar o desempenho individual, através de treinos ajustados a cada atleta, com acompanhamento próximo e uma metodologia centrada na evolução contínua.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 100}>
              <div
                onMouseMove={handleTilt(12)}
                onMouseLeave={handleTiltLeave}
                className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group will-change-transform"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
