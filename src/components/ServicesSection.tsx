import { User, Users, CheckCircle, ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const services = [
  {
    icon: User,
    title: "Treino Individual",
    description: "Para atletas que querem evolução rápida e personalizada. Foco técnico, físico e mental — ideal para quem quer melhorar um desempenho específico.",
    benefits: [
      "Plano 100% adaptado ao atleta",
      "Atenção exclusiva do treinador",
      "Foco técnico, físico e mental",
      "Evolução rápida e mensurável",
    ],
    featured: true,
  },
  {
    icon: Users,
    title: "Treino em Grupo",
    description: "Para atletas que querem evoluir em ambiente competitivo. Trabalhos dinâmicos e jogos reais — ideal para motivação e espírito de equipa.",
    benefits: [
      "Máximo 6 atletas por grupo",
      "Trabalhos dinâmicos e jogos reais",
      "Ambiente competitivo e motivador",
      "Desenvolve o espírito de equipa",
    ],
    featured: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-28 bg-secondary relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Serviços
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Os nossos <span className="text-gradient-gold">treinos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Treinos para jovens dos 6 aos 18 anos. Escolhe o formato que melhor se adapta aos teus objetivos e começa a evoluir hoje.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.title} delay={i * 150}>
              <div
                className={`relative rounded-2xl border p-8 md:p-10 h-full flex flex-col transition-all duration-300 group hover:shadow-2xl ${
                  service.featured
                    ? "border-primary/40 bg-card shadow-[0_0_40px_hsl(var(--gold)/0.08)]"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {service.featured && (
                  <span className="absolute -top-3 left-8 bg-gradient-gold text-primary-foreground px-4 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider">
                    Mais popular
                  </span>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    service.featured ? "bg-primary/20" : "bg-primary/10"
                  }`}>
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">{service.title}</h3>
                </div>

                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#marcacao"
                  className={`group/btn inline-flex items-center justify-center gap-2 w-full py-4 rounded-lg font-heading font-bold uppercase tracking-wider transition-all duration-300 text-base ${
                    service.featured
                      ? "bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-lg"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Marca já o teu treino
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
