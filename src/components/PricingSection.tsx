import { Check, MessageCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const WHATSAPP_URL = "https://wa.me/351911102405?text=Ol%C3%A1,%20quero%20saber%20mais%20sobre%20os%20planos%20da%20ProTopo%20Academy";

const plans = [
  {
    name: "Sessão Avulso",
    price: "Desde 25€",
    unit: "/sessão",
    description: "Treino individual ou em grupo, sem compromisso mensal.",
    features: [
      "Treino personalizado",
      "Sem fidelização",
      "Marcação flexível",
    ],
  },
  {
    name: "Plano Mensal",
    price: "Sob consulta",
    unit: "",
    description: "Pacote mensal com várias sessões e acompanhamento contínuo.",
    features: [
      "Várias sessões por mês",
      "Plano de evolução personalizado",
      "Acompanhamento próximo",
      "Condições especiais",
    ],
    featured: true,
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Preços
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Planos <span className="text-gradient-gold">Disponíveis</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções flexíveis para todos os atletas. Fala connosco para receber uma proposta à medida.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-10">
          {plans.map((plan, i) => (
            <AnimateOnScroll key={plan.name} delay={i * 150}>
              <div
                className={`relative rounded-2xl border p-8 md:p-10 h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${
                  plan.featured
                    ? "border-primary/40 bg-card shadow-[0_0_40px_hsl(var(--gold)/0.08)]"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-8 bg-gradient-gold text-primary-foreground px-4 py-1 rounded-full text-xs font-heading font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                )}
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-heading font-bold text-3xl text-primary">{plan.price}</span>
                  {plan.unit && <span className="text-muted-foreground text-sm">{plan.unit}</span>}
                </div>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={300} className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Pedir proposta no WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Resposta rápida via WhatsApp · Sem compromisso
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default PricingSection;
