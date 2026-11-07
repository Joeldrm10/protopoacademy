import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users, Camera, UserCheck, Quote, Star, ArrowRight,
  Calendar, MapPin, Clock, Shirt, Apple, ShowerHead, Sparkles, Gift, MessageCircle,
  Trophy, AlertTriangle, CreditCard, CheckCircle2, Smartphone,
} from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import CountUp from "@/components/CountUp";
import TestemunhoFormDialog from "@/components/TestemunhoFormDialog";

import FootcampCountdown from "@/components/FootcampCountdown";
import { supabase } from "@/integrations/supabase/client";
import { FOOTCAMP_ENCERRADO } from "@/lib/featureFlags";
import { WHATSAPP_URL_PROXIMA_EDICAO } from "@/lib/constants";
import { WHATSAPP_URL_FOOTCAMP_INFO } from "@/lib/constants";

import footcampHero from "@/assets/hero-footcamp-desktop-wide.jpg";
import footcampHeroMobile from "@/assets/hero-footcamp-mobile.jpg";
import footcampIns from "@/assets/footcamp-ines.jpg";
import footcampFilipe from "@/assets/footcamp-filipe.jpg";
import footcampJoao from "@/assets/footcamp-joao.jpg";
import galleryCircle from "@/assets/gallery-circle.jpg";
import gallerySprint from "@/assets/gallery-sprint.jpg";
import galleryCones from "@/assets/gallery-cones.jpg";
import galleryTeamFull from "@/assets/gallery-team-full.png";
import galleryCoachDrill from "@/assets/gallery-coach-drill.png";
import galleryResistance from "@/assets/gallery-resistance.png";


const stats = [
  { value: 43, label: "Atletas", icon: Users },
  { value: 4, label: "Treinadores Principais", icon: UserCheck },
  { value: 8, label: "Treinadores Adjuntos", icon: UserCheck },
  { value: 1, label: "Fotógrafo", icon: Camera },
];

const guests = [
  { name: "Inês Conceição", role: "Psicóloga", image: footcampIns },
  { name: "Filipe Batista", role: "Árbitro", image: footcampFilipe },
  { name: "João Pereira", role: "Ex Jogador Profissional", image: footcampJoao },
];

// Galeria do Footcamp — apenas momentos de ação, intensidade e grupo
// Layout dinâmico: imagens com tamanhos variados (large = col-span-2 row-span-2)
const galleryImages = [
  { src: galleryTeamFull, alt: "Foto de grupo do Footcamp", size: "large" },
  { src: gallerySprint, alt: "Atleta em sprint durante o treino", size: "small" },
  { src: galleryCoachDrill, alt: "Treinador a acompanhar atleta em exercício", size: "small" },
  { src: galleryResistance, alt: "Treino de resistência com elástico", size: "wide" },
  { src: galleryCones, alt: "Atleta em exercício de agilidade com cones", size: "small" },
  { src: galleryCircle, alt: "Equipa e treinador no campo", size: "small" },
];



type DisplayTestemunho = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  createdAt: string;
};

const Footcamp = () => {
  const [testemunhoOpen, setTestemunhoOpen] = useState(false);
  const [approved, setApproved] = useState<DisplayTestemunho[]>([]);
  const [loadingTestemunhos, setLoadingTestemunhos] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    let attempts = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // re-align after late content (images/testimonials) shifts layout
        setTimeout(() => {
          if (cancelled) return;
          const el2 = document.getElementById(id);
          if (el2) el2.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 600);
      } else if (attempts < 40) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
    return () => {
      cancelled = true;
    };
  }, [location.hash, location.key, loadingTestemunhos]);

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
    supabase
      .from("testemunhos")
      .select("id, nome, idade, experiencia, avaliacao, created_at")
      .eq("aprovado", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setApproved(
            data.map((t) => ({
              id: t.id,
              quote: t.experiencia,
              name: t.nome,
              role: t.idade ? `${t.idade}` : "Testemunho",
              rating: t.avaliacao,
              createdAt: t.created_at,
            }))
          );
        }
        setLoadingTestemunhos(false);
      });
  }, []);

  const displayed = approved;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={FOOTCAMP_ENCERRADO ? "ProTopo Footcamp Outono 2026 | Edição concluída" : "ProTopo Footcamp Outono 2026 | Inscrições Abertas"}
        description={FOOTCAMP_ENCERRADO ? "O ProTopo Footcamp Outono 2026 terminou. Obrigado a todos os atletas, famílias e equipa técnica. Footcamp Outono 2026: 16 a 20 de novembro." : "ProTopo Footcamp — Edição Outono 2026. 16 a 20 de novembro, das 09h00 às 12h30. Treino diferenciado para atletas dos 6 aos 16 anos. Inscrições abertas."}
        ogTitle={FOOTCAMP_ENCERRADO ? "ProTopo Footcamp Outono 2026 — Edição concluída" : "ProTopo Footcamp — Edição Outono 2026"}
        ogDescription={FOOTCAMP_ENCERRADO ? "Obrigado a todos os atletas. Footcamp Outono 2026: 16 a 20 de novembro." : "Treino diferenciado e de excelência. Inscrições abertas para novembro 2026."}
        ogImage="/og/footcamp.jpg"
        path="/footcamp"
      />
      <Navbar />
      

      {/* HERO */}
      <section className="relative min-h-[640px] md:min-h-[680px] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={footcampHero} />
            <img
              src={footcampHeroMobile}
              alt="ProTopo Footcamp - Edição Outono 2026"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 50%" }}
              width={1920}
              height={1024}
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background/95" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-heading font-bold uppercase tracking-[0.2em] text-xs mb-5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
              {FOOTCAMP_ENCERRADO ? "Footcamp Outono 2026 concluído" : "Inscrições Abertas · Edição Outono 2026"}
            </span>
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              ProTopo
              <span className="block text-gradient-gold mt-1">Footcamp</span>
            </h1>
            <p className="text-foreground/90 text-lg md:text-2xl max-w-2xl mx-auto font-body leading-relaxed mb-6">
              {FOOTCAMP_ENCERRADO
                ? "A edição Outono 2026 terminou a 31 de julho. Obrigado a todos os atletas, famílias e equipa técnica que fizeram parte desta edição."
                : "Evolui este outono com treinos intensivos, competição e experiências únicas para atletas dos 6 aos 16 anos."}
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto mb-4">
              {(FOOTCAMP_ENCERRADO
                ? [
                    "✅ Edição concluída",
                    "🍂 Footcamp Outono 2026 · 16 a 20 nov",
                    "👕 Kit para novos inscritos",
                    "⚽ Dos 6 aos 16 anos",
                  ]
                : [
                "📅 16 a 20 de novembro",
                "🗓️ 1 semana · 80€",
                "👕 Kit para novos inscritos",
                "⏰ 09h00 às 12h30",
              ]).map((t) => (
                <span
                  key={t}
                  className="bg-background/50 backdrop-blur-sm border border-primary/30 text-foreground px-3 py-1.5 rounded-full font-heading font-semibold text-xs md:text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Urgency badges */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto mb-8">
              {FOOTCAMP_ENCERRADO ? (
                <span className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/50 text-primary px-3 py-1.5 rounded-full font-heading font-bold text-xs md:text-sm uppercase tracking-wider">
                  🍂 Footcamp Outono 2026 · 16 a 20 nov
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/50 text-primary px-3 py-1.5 rounded-full font-heading font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse">
                    🔥 Inscrições Abertas
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-destructive/15 border border-destructive/50 text-destructive px-3 py-1.5 rounded-full font-heading font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse">
                    ⚠️ Vagas Limitadas
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {FOOTCAMP_ENCERRADO ? (
                <a
                  href={WHATSAPP_URL_PROXIMA_EDICAO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-center"
                >
                  Receber novidades
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <Link
                  to="/marcar?tipo=footcamp"
                  className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  style={{ animation: "pulse-gold 2.4s ease-in-out infinite" }}
                >
                  Inscrever agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <a
                href={WHATSAPP_URL_FOOTCAMP_INFO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Tirar dúvidas no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      

      {/* O QUE É O FOOTCAMP */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                ⚡ Sobre
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                O que é o <span className="text-gradient-gold">Footcamp?</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto grid gap-5">
            {[
              "A ProTopo Footcamp foi criada para proporcionar uma experiência de treino diferenciada e de excelência para jovens atletas dos 6 aos 16 anos.",
              "Procuramos criar dias inesquecíveis, mas ao mesmo tempo focados no desenvolvimento do atleta, através de treinos específicos com intensidade competitiva — onde a evolução será sempre o mais importante.",
              "A nossa metodologia combina desenvolvimento técnico, físico e mental com inteligência de jogo e intensidade competitiva, sempre num ambiente seguro, organizado e altamente profissional.",
              "Mais do que um camp, é uma oportunidade para evoluir sob orientação especializada e atenção ao detalhe — fatores essenciais para o crescimento no futebol.",
            ].map((p, i) => (
              <AnimateOnScroll key={i} delay={i * 80}>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{p}</p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL E HORÁRIOS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📍 Local e horários
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Onde e <span className="text-gradient-gold">quando</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { icon: MapPin, label: "Local", value: "Clube Atlético Ouriense — Campo da Caridade, Ourém" },
              { icon: Clock, label: "Horário", value: "09h00 às 12h30 · 3h30 por dia" },
              { icon: Calendar, label: "Dias", value: "16 a 20 de novembro de 2026 · Segunda a sexta-feira (1 semana)" },
            ].map((item, i) => (
              <AnimateOnScroll key={item.label} delay={i * 120}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">{item.label}</p>
                  <p className="text-foreground leading-relaxed">{item.value}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUÍDO NA INSCRIÇÃO */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                🎁 Incluído
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Tudo o que está <span className="text-gradient-gold">incluído</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Shirt,
                title: "Kit oficial oferecido",
                items: ["T-shirt oficial ProTopo", "Calções ProTopo", "Par de meias", "Saco ProTopo", "Oferecido a quem se inscreve pela primeira vez"],
              },
              {
                icon: Apple,
                title: "Alimentação diária",
                items: ["Lanche diário incluído", "Barras energéticas", "Águas", "Fruta"],
              },

              {
                icon: ShowerHead,
                title: "Condições no local",
                items: ["Balneários disponíveis para os atletas se equiparem", "Banho com água quente após os treinos"],
              },
            ].map((card, i) => (
              <AnimateOnScroll key={card.title} delay={i * 100}>
                <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">{card.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {card.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-foreground/90">
                        <span className="text-primary mt-1">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>


        </div>
      </section>

      {/* PREÇOS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                {FOOTCAMP_ENCERRADO ? "💰 Preços da última edição" : "💰 Preços"}
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                {FOOTCAMP_ENCERRADO ? (
                  <>Preços da <span className="text-gradient-gold">última edição</span></>
                ) : (
                  <>Uma semana de <span className="text-gradient-gold">futebol</span></>
                )}
              </h2>
              <p className="text-muted-foreground">
                {FOOTCAMP_ENCERRADO
                  ? "Valores praticados no Footcamp Outono 2026 (edição concluída). As condições do Footcamp Outono 2026 serão anunciadas em breve."
                  : "80€ por atleta pela semana completa."}
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-md mx-auto">
            {[
              { sem: "1 SEMANA", preco: "80€", featured: false },
            ].map((p: any, i) => (
              <AnimateOnScroll key={p.sem} delay={i * 100}>
                <div
                  className={`relative h-full rounded-2xl border p-6 md:p-8 text-center transition-all duration-300 ${
                    p.featured
                      ? "border-primary/50 bg-card shadow-[0_0_40px_hsl(var(--gold)/0.12)]"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider whitespace-nowrap">
                      {p.badge}
                    </span>
                  )}
                  <p className="text-foreground font-heading font-semibold uppercase tracking-wider text-xs mb-3">{p.sem}</p>
                  <p className="font-heading font-black text-3xl md:text-4xl text-gradient-gold">{p.preco}</p>
                  {p.seguroInfo && (
                    <p className="mt-2 text-xs text-primary font-semibold">{p.seguroInfo}</p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <AnimateOnScroll delay={100}>
              <div className="rounded-xl p-5 h-full border-2 border-primary/40 bg-primary/5">
                <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">🛡️ Seguro anual</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Na primeira inscrição na ProTopo Academy, acresce <span className="font-bold">10€</span> de seguro anual, válido durante um ano e utilizável em futuras edições enquanto estiver em vigor.</li>
                  <li>• Atletas que já participaram e tenham seguro anual ainda válido: <span className="font-bold">0€ — já incluído</span>.</li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div className="bg-card border border-border rounded-xl p-5 h-full">
                <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">👨‍👦 Desconto irmãos</p>
                <p className="text-foreground"><span className="font-bold">10%</span> de desconto sobre a participação, sem desconto sobre o seguro. Aplicação após validação bidirecional dos irmãos.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* VAGAS LIMITADAS / ESTADO PÓS-EVENTO */}
      {!FOOTCAMP_ENCERRADO && (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto bg-card border-2 border-destructive/40 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/0 via-destructive/60 to-destructive/0" />
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 border border-destructive/30 mb-5">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
                Vagas Limitadas
              </h3>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Para garantir qualidade de acompanhamento e atenção individualizada, cada semana possui um número limitado de atletas.
              </p>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-3">
                As inscrições serão confirmadas por ordem de receção e validação do pagamento.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      )}

      {/* MÉTODOS DE PAGAMENTO */}
      {!FOOTCAMP_ENCERRADO && (
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-5">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-4">
                Métodos de Pagamento
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-heading font-semibold text-sm">
                  <Smartphone className="w-4 h-4" />
                  MB WAY
                </span>
                <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-heading font-semibold text-sm">
                  <CreditCard className="w-4 h-4" />
                  Transferência Bancária
                </span>
              </div>
              <p className="text-muted-foreground text-base">
                Após a inscrição a equipa ProTopo entra em contacto por WhatsApp para confirmar a vaga e enviar os dados de pagamento.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      )}

      {/* COMO FUNCIONA A INSCRIÇÃO */}
      {!FOOTCAMP_ENCERRADO && (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📝 Inscrição
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Como funciona a <span className="text-gradient-gold">inscrição</span>
              </h2>
              <p className="text-muted-foreground">Em 4 passos simples garantes o lugar do atleta.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { n: 1, title: "Preenche o formulário", desc: "Preenche os dados do atleta para 16 a 20 de novembro." },
              { n: 2, title: "Confirmamos a disponibilidade", desc: "A equipa ProTopo verifica a vaga e confirma os dados da inscrição." },
              { n: 3, title: "Recebes contacto por WhatsApp", desc: "Enviamos todas as informações necessárias e os dados para pagamento." },
              { n: 4, title: "Vaga garantida", desc: "Após validação do pagamento, a inscrição fica concluída." },
            ].map((p, i) => (
              <AnimateOnScroll key={p.n} delay={i * 100}>
                <div className="relative bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition-all">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <span className="font-heading font-black text-xl text-gradient-gold">{p.n}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={500}>
            <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-destructive/40 bg-destructive/5 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-foreground">
                <span className="font-semibold">As vagas são limitadas e atribuídas por ordem de confirmação.</span>
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      )}

      {/* INSCRIÇÃO E PAGAMENTO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-2xl p-8 md:p-12">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                {FOOTCAMP_ENCERRADO ? "✅ Edição concluída" : "📝 Inscrição e pagamento"}
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                {FOOTCAMP_ENCERRADO ? (
                  <>Footcamp <span className="text-gradient-gold">Outono 2026</span></>
                ) : (
                  <>Pronto para <span className="text-gradient-gold">inscrever?</span></>
                )}
              </h2>
              <div className="max-w-xl mx-auto mb-8 space-y-4">
                <p className="text-foreground font-heading font-bold text-lg md:text-xl">
                  Mais do que um camp, uma experiência de crescimento.
                </p>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Na ProTopo acreditamos que cada atleta merece um acompanhamento próximo, profissional e focado na sua evolução dentro e fora do campo.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                {FOOTCAMP_ENCERRADO ? (
                  <a
                    href={WHATSAPP_URL_PROXIMA_EDICAO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg text-center"
                  >
                    Receber novidades
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to="/marcar?tipo=footcamp"
                    className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                  >
                    Inscrever no Footcamp
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                <a
                  href={WHATSAPP_URL_FOOTCAMP_INFO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tirar dúvidas
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* RESULTADOS — Edição anterior */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📊 Edição anterior · Verão 2026 · em números
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Resultados do <span className="text-gradient-gold">Footcamp</span>
              </h2>
            </div>
          </AnimateOnScroll>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 100}>
                <div className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 text-center hover:border-primary/60 transition-all duration-500 h-full overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.4)]">
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      <stat.icon className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-heading font-black text-5xl md:text-6xl text-gradient-gold mb-2 tabular-nums">
                      <CountUp end={stat.value} />
                    </p>
                    <p className="text-muted-foreground text-xs md:text-sm font-heading uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                🌟 Experiência · Verão 2026
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
                Mais do que <span className="text-gradient-gold">treinos</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Durante 4 dias, os atletas participaram em treinos intensivos, sessões técnicas e
                acompanhamento especializado. Contámos também com profissionais experientes para
                enriquecer a experiência.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {guests.map((guest, i) => (
              <AnimateOnScroll key={guest.name} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-2xl border border-border hover:border-primary/40 transition-all">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={guest.image}
                      alt={`${guest.name} - ${guest.role}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-1">
                      {guest.role}
                    </p>
                    <h3 className="font-heading font-bold text-2xl text-foreground">
                      {guest.name}
                    </h3>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
      {/* GALERIA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📸 Momentos · Verão 2026
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                A intensidade do <span className="text-gradient-gold">Footcamp</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Quatro dias. Uma equipa. Memórias que ficam para sempre.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Layout dinâmico — mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, i) => {
              const sizeClass =
                img.size === "large"
                  ? "col-span-2 row-span-2"
                  : img.size === "wide"
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1";
              return (
                <AnimateOnScroll key={i} delay={i * 60}>
                  <div className={`group relative overflow-hidden rounded-xl h-full w-full ${sizeClass}`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* CTA Ver mais momentos */}
          <AnimateOnScroll delay={200}>
            <div className="text-center mt-14">
              <Link
                to="/galeria"
                className="group inline-flex items-center gap-3 border-2 border-primary/40 text-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-all"
              >
                Ver mais momentos
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Frase emocional */}
          <AnimateOnScroll delay={300}>
            <p className="text-center text-2xl md:text-3xl font-heading font-bold mt-16 max-w-3xl mx-auto leading-relaxed">
              Obrigado a todos os atletas que fizeram parte
              <span className="block text-gradient-gold mt-1">desta edição.</span>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* TESTEMUNHOS */}
      <section id="testemunhos" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                💬 Testemunhos
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                O que dizem <span className="text-gradient-gold">pais e atletas</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Histórias reais de quem já viveu o Footcamp.
              </p>
            </div>
          </AnimateOnScroll>

          {loadingTestemunhos ? null : displayed.length === 0 ? (
            <AnimateOnScroll>
              <div className="max-w-2xl mx-auto text-center py-10 px-6 bg-card/40 border border-dashed border-border rounded-2xl">
                <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg italic">
                  Ainda não existem testemunhos aprovados.
                  <br />
                  Sê o primeiro a partilhar a tua experiência.
                </p>
              </div>
            </AnimateOnScroll>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {displayed.map((t, i) => (
                <AnimateOnScroll key={t.id} delay={i * 100}>
                  <div className="group relative h-full bg-card border border-border rounded-2xl p-8 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.3)]">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/15 group-hover:text-primary/30 transition-colors" />
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={
                            n <= t.rating
                              ? "w-4 h-4 fill-primary text-primary"
                              : "w-4 h-4 text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-6 font-body italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-gold text-primary-foreground font-heading font-bold text-lg shrink-0">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-bold text-foreground truncate">{t.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {t.role}
                          <span className="text-muted-foreground/60">
                            {" · "}
                            {new Date(t.createdAt).toLocaleDateString("pt-PT", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}

          <AnimateOnScroll delay={200}>
            <div className="mt-14 max-w-2xl mx-auto bg-card/60 border border-border rounded-2xl p-8 md:p-10 text-center backdrop-blur-sm">
              <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">
                Já participaste no Footcamp?
              </h3>
              <p className="text-muted-foreground mb-6">
                Partilha a tua experiência e ajuda outros pais e atletas.
              </p>
              <button
                type="button"
                onClick={() => setTestemunhoOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
              >
                <Star className="w-5 h-5" />
                Deixar a minha opinião
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* PORQUE ESCOLHER */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                🏆 Diferenciação
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Porque escolher a <span className="text-gradient-gold">ProTopo Footcamp?</span>
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              "Treinos especializados e acompanhamento técnico individualizado",
              "Desenvolvimento técnico, físico e mental",
              "Ambiente seguro, organizado e profissional",
              "Kit oficial oferecido aos novos inscritos",
              "Treinadores certificados UEFA",
              "Lanches diários incluídos",
              "Balneários com água quente",
              "Intensidade competitiva adequada à idade",
              "Atenção personalizada a cada atleta",
            ].map((item, i) => (
              <AnimateOnScroll key={item} delay={i * 60}>
                <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 h-full hover:border-primary/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base leading-relaxed">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        title={<>Perguntas <span className="text-gradient-gold">Frequentes</span></>}
        subtitle="Tudo o que pais e atletas precisam de saber sobre a Edição Outono 2026."
        faqs={[
          { question: "Quando e onde decorre?", answer: "De 16 a 20 de novembro de 2026, segunda a sexta-feira, das 09h00 às 12h30, no Clube Atlético Ouriense — Campo da Caridade, Ourém." },
          { question: "Quanto custa?", answer: "80€ por atleta pela semana completa. Desconto de irmãos de 10% sobre a participação, após validação bidirecional; não incide sobre o seguro." },
          { question: "Preciso de novo seguro?", answer: "Na primeira inscrição na ProTopo Academy, acresce 10€ de seguro anual, válido durante um ano e utilizável em futuras edições enquanto estiver em vigor. Os atletas que já participaram e tenham seguro anual ainda válido não precisam de pagar novamente." },
          { question: "Quem recebe o kit?", answer: "O kit oficial ProTopo é oferecido aos atletas que se inscrevem pela primeira vez na ProTopo Academy: T-shirt oficial, calções, meias e saco." },
          { question: "O lanche está incluído?", answer: "Sim, o lanche diário inclui barras, água e fruta. Indica as restrições alimentares no formulário." },
          { question: "Há balneários?", answer: "Sim, estão disponíveis para os atletas se equiparem e tomarem banho após os treinos." },
          { question: "Para que idades é o Footcamp?", answer: "Dos 6 aos 16 anos, com grupos ajustados à idade." },
          { question: "Como funciona a inscrição?", answer: "Preenche o formulário. A equipa confirma a vaga, valida o seguro e eventuais descontos e envia os dados de pagamento por WhatsApp. A vaga fica garantida após validação do pagamento." },
        ]}
      />


      <Footer />

      <TestemunhoFormDialog open={testemunhoOpen} onOpenChange={setTestemunhoOpen} />
    </div>
  );
};

export default Footcamp;
