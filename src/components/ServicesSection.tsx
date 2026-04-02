import { Target, Users, TrendingUp, Dumbbell, Trophy } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const services = [
  { icon: Target, title: "Treinos personalizados", desc: "Planos ajustados ao perfil e objetivos de cada atleta." },
  { icon: Users, title: "Acompanhamento individual", desc: "Atenção dedicada para maximizar o teu potencial." },
  { icon: TrendingUp, title: "Evolução contínua", desc: "Metodologia focada no progresso constante." },
  { icon: Dumbbell, title: "Desenvolvimento técnico e físico", desc: "Trabalho completo para um atleta completo." },
  { icon: Trophy, title: "Performance em jogo", desc: "Melhoria direta no teu rendimento competitivo." },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            O que oferecemos
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl">
            Serviços <span className="text-gradient-gold">ProTopo</span>
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.title} delay={i * 100}>
              <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/40 transition-all duration-300 group h-full">
                <service.icon className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-lg mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
