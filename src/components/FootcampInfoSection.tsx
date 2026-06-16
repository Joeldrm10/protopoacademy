import {
  Calendar, MapPin, Clock, Shirt, Package, Gift, ShowerHead, Apple,
  Sparkles, MessageCircle, CheckCircle2, HelpCircle, Users, Trophy,
  Shield,
} from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_URL_FOOTCAMP_INFO } from "@/lib/constants";

const resumoItems = [
  { icon: Sparkles, text: "ProTopo Footcamp — Edição Verão 2026" },
  { icon: Users, text: "Atletas dos 6 aos 16 anos" },
  { icon: MapPin, text: "Campo da Caridade — Adelino dos Santos Júnior, Ourém" },
  { icon: Calendar, text: "Julho 2026" },
  { icon: Clock, text: "Horário normal: 09:00 às 12:30" },
  { icon: Clock, text: "Quinta-feira: dia completo das 09:00 às 17:30" },
];

const incluidoCards = [
  {
    icon: Shirt,
    title: "Kit oficial ProTopo",
    items: ["T-shirt de treino ProTopo", "T-shirt casual ProTopo", "Calções ProTopo", "Par de meias", "Saco ProTopo"],
  },
  {
    icon: Apple,
    title: "Alimentação diária",
    items: ["Lanches diários", "Água", "Fruta", "Barras energéticas"],
  },
  {
    icon: Gift,
    title: "Nas quintas-feiras",
    items: ["Almoço incluído", "Atividades diferenciadas"],
  },
  {
    icon: ShowerHead,
    title: "Condições no local",
    items: ["Balneários com água quente", "Acompanhamento técnico especializado"],
  },
];

const pacotes = [
  { sem: "1ª Semana", preco: "95€", featured: false },
  { sem: "2ª Semana", preco: "170€", featured: false },
  { sem: "3ª Semana", preco: "250€", featured: false },
  { sem: "4ª Semana", preco: "340€", featured: true, badge: "Melhor valor" },
];

const aposPassos = [
  "A equipa ProTopo analisa a inscrição",
  "Confirmamos a disponibilidade das semanas escolhidas",
  "Entramos em contacto por WhatsApp",
  "Enviamos os dados de pagamento",
  "A vaga fica reservada após confirmação do pagamento",
];

const FootcampInfoSection = () => {
  return (
    <section className="py-6 md:py-10 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 space-y-6 md:space-y-8 max-w-5xl">

        {/* 1. RESUMO */}
        <AnimateOnScroll>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">⚽ Resumo do Footcamp</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resumoItems.map((it) => (
                <li key={it.text} className="flex items-start gap-2.5 text-foreground/90 text-sm md:text-base">
                  <it.icon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>

        {/* 2. O QUE ESTÁ INCLUÍDO */}
        <AnimateOnScroll>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">🎁 O que está incluído</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incluidoCards.map((card) => (
                <div key={card.title} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                      <card.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">{card.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-foreground/90 text-sm">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* 3. PACOTES */}
        <AnimateOnScroll>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">💰 Pacotes disponíveis</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {pacotes.map((p) => (
                <div
                  key={p.sem}
                  className={`relative rounded-2xl border p-4 md:p-5 text-center transition-all ${
                    p.featured
                      ? "border-primary/50 bg-card shadow-[0_0_30px_hsl(var(--gold)/0.12)]"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider whitespace-nowrap">
                      {p.badge}
                    </span>
                  )}
                  <p className="text-foreground font-heading font-semibold uppercase tracking-wider text-[11px] mb-2">{p.sem}</p>
                  <p className="font-heading font-black text-2xl md:text-3xl text-gradient-gold">{p.preco}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">Seguro Anual</h3>
                </div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-foreground/90 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Obrigatório para todos os participantes</span>
                  </li>
                  <li className="flex items-start gap-2 text-foreground/90 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Cobertura válida durante 12 meses</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
                    <Gift className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">Oferta Especial</h3>
                </div>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-foreground/90 text-sm">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Incluído gratuitamente na inscrição de 4 semanas</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              👨‍👦 Desconto irmãos: <span className="font-semibold text-foreground">-10% sobre o valor total</span>
            </p>
          </div>
        </AnimateOnScroll>

        {/* 4. APÓS A INSCRIÇÃO */}
        <AnimateOnScroll>
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">📲 Após a inscrição</h2>
            </div>
            <ol className="space-y-2.5">
              {aposPassos.map((p, i) => (
                <li key={p} className="flex items-start gap-3 text-foreground/90 text-sm md:text-base">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary font-heading font-bold text-xs">
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-lg bg-primary/5 border border-primary/20 p-3">
              <p className="text-xs md:text-sm text-foreground">
                ℹ️ A inscrição apenas fica garantida após confirmação da vaga e validação do pagamento.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* 5. DÚVIDAS */}
        <AnimateOnScroll>
          <div className="bg-card border border-primary/30 rounded-2xl p-6 md:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-2">
              ❓ Tens dúvidas antes de te inscrever?
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-5">
              Fala diretamente com a equipa ProTopo no WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL_FOOTCAMP_INFO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg text-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};

export default FootcampInfoSection;
