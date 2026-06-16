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
        title="ProTopo Footcamp Verão 2026 | Inscrições Abertas"
        description="ProTopo Footcamp — Edição Verão 2026. 4 semanas de julho. Treino diferenciado para atletas dos 6 aos 16 anos. Inscrições abertas."
        ogTitle="ProTopo Footcamp — Edição Verão 2026"
        ogDescription="Treino diferenciado e de excelência. Inscrições abertas para julho 2026."
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
              alt="ProTopo Footcamp - Edição Verão 2026"
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
              Inscrições Abertas · Edição Verão 2026
            </span>
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              ProTopo
              <span className="block text-gradient-gold mt-1">Footcamp</span>
            </h1>
            <p className="text-foreground/90 text-lg md:text-2xl max-w-2xl mx-auto font-body leading-relaxed mb-6">
              Evolui este verão com treinos intensivos, competição e experiências únicas para atletas dos 6 aos 16 anos.
            </p>

            {/* Quick highlights */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl mx-auto mb-4">
              {[
                "📅 Julho 2026",
                "🗓️ 4 semanas disponíveis",
                "👕 Kit de treino incluído",
                "⏰ Quinta-feira: dia completo",
              ].map((t) => (
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
              <span className="inline-flex items-center gap-1.5 bg-primary/15 border border-primary/50 text-primary px-3 py-1.5 rounded-full font-heading font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse">
                🔥 Inscrições Abertas
              </span>
              <span className="inline-flex items-center gap-1.5 bg-destructive/15 border border-destructive/50 text-destructive px-3 py-1.5 rounded-full font-heading font-bold text-xs md:text-sm uppercase tracking-wider animate-pulse">
                ⚠️ Vagas Limitadas
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                to="/marcar?tipo=footcamp"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                style={{ animation: "pulse-gold 2.4s ease-in-out infinite" }}
              >
                Garantir vaga
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
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

      <FootcampCountdown />

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

      {/* DATAS E SEMANAS */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📅 Datas
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Semanas <span className="text-gradient-gold">de julho</span>
              </h2>
              <p className="text-muted-foreground">Escolhe uma ou mais semanas. Inscrições sujeitas a vagas.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { n: "1ª", datas: "6 a 10 de julho" },
              { n: "2ª", datas: "13 a 17 de julho" },
              { n: "3ª", datas: "20 a 24 de julho" },
              { n: "4ª", datas: "27 a 31 de julho" },
            ].map((s, i) => (
              <AnimateOnScroll key={s.n} delay={i * 100}>
                <div className="group relative bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.3)]">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-heading font-black text-3xl text-gradient-gold mb-2">{s.n} Semana</p>
                  <p className="text-foreground font-heading font-semibold">{s.datas}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={400}>
            <div className="mt-8 max-w-3xl mx-auto rounded-xl border border-primary/30 bg-primary/5 p-5 text-center">
              <p className="text-foreground">
                <span className="font-heading font-bold text-primary">Dia completo:</span> Na quinta-feira de cada semana o programa decorre das <span className="font-semibold">09:00 às 17:30</span>.
              </p>
            </div>
          </AnimateOnScroll>
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
              { icon: MapPin, label: "Local", value: "Campo da Caridade — Adelino dos Santos Júnior, Ourém" },
              { icon: Clock, label: "Horário normal", value: "09:00 às 12:30 · 3h30 por dia" },
              { icon: Sparkles, label: "Flexibilidade", value: "Existe flexibilidade de horários mediante necessidade de cada atleta." },
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
                title: "Kit de treino ProTopo",
                items: ["T-shirt ProTopo", "Calções de treino ProTopo", "Par de meias"],
              },
              {
                icon: Apple,
                title: "Alimentação diária",
                items: ["Lanche diário incluído", "Barras energéticas", "Águas", "Fruta"],
              },
              {
                icon: Gift,
                title: "Nos dias completos",
                items: ["Almoço incluído", "Lanches incluídos"],
              },
              {
                icon: ShowerHead,
                title: "Condições no local",
                items: ["Balneários disponíveis", "Banho de água quente após o treino"],
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

          <AnimateOnScroll delay={500}>
            <div className="mt-8 max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">Novidade</p>
                  <p className="text-foreground leading-relaxed">
                    Um dia completo por semana dedicado a <span className="font-semibold">atividades diferenciadas</span>, permitindo aos atletas contactar com novas experiências e desenvolver competências num ambiente divertido e educativo.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* PREÇOS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                💰 Preços
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Escolhe o teu <span className="text-gradient-gold">pacote</span>
              </h2>
              <p className="text-muted-foreground">Quanto mais semanas, melhor o valor por semana.</p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { sem: "1ª Semana", preco: "95€", featured: false },
              { sem: "2ª Semana", preco: "170€", featured: false },
              { sem: "3ª Semana", preco: "250€", featured: false },
              { sem: "4ª Semana", preco: "340€", featured: true, badge: "Melhor valor" },
            ].map((p, i) => (
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
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <AnimateOnScroll delay={100}>
              <div className="rounded-xl p-5 h-full border-2 border-primary/40 bg-primary/5">
                <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">🛡️ Seguro Anual</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• <span className="font-semibold">Obrigatório</span> para todos os participantes</li>
                  <li>• Custo: <span className="font-bold">20€</span></li>
                  <li>• Válido durante <span className="font-semibold">12 meses</span></li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div className="rounded-xl p-5 h-full border border-primary/40 bg-primary/5">
                <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">🎁 Oferta especial</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Inscrição de <span className="font-bold">4 semanas</span> = Seguro anual incluído</li>
                  <li>• Poupança imediata de <span className="font-bold text-primary">20€</span></li>
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <div className="bg-card border border-border rounded-xl p-5 h-full">
                <p className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-2">Desconto irmãos</p>
                <p className="text-foreground"><span className="font-bold">10%</span> de desconto no valor total.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* DIA COMPLETO */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto bg-card border border-primary/30 rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-primary font-heading font-semibold uppercase tracking-wider text-xs mb-1 block">
                    🎉 Novidade Verão 2026
                  </span>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">
                    Dia Completo às Quintas-Feiras
                  </h3>
                </div>
              </div>
              <p className="text-foreground text-base md:text-lg leading-relaxed mb-6">
                Todas as quintas-feiras realizamos um dia completo das <span className="font-semibold">09:00 às 17:30</span>.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Atividades diferenciadas",
                  "Almoço incluído",
                  "Lanche da manhã",
                  "Lanche da tarde",
                  "Experiências complementares para desenvolvimento dos atletas",
                ].map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-foreground/90">
                    <span className="text-primary mt-1 flex-shrink-0">•</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* VAGAS LIMITADAS */}
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

      {/* MÉTODOS DE PAGAMENTO */}
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

      {/* COMO FUNCIONA A INSCRIÇÃO */}
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
              { n: 1, title: "Preenche o formulário", desc: "Seleciona as semanas pretendidas e preenche os dados do atleta." },
              { n: 2, title: "Confirmamos a disponibilidade", desc: "A equipa ProTopo verifica as vagas disponíveis para as semanas escolhidas." },
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

      {/* INSCRIÇÃO E PAGAMENTO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center bg-card border border-border rounded-2xl p-8 md:p-12">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📝 Inscrição e pagamento
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Pronto para <span className="text-gradient-gold">inscrever?</span>
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
                <Link
                  to="/marcar?tipo=footcamp"
                  className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                >
                  Inscrever no Footcamp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
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
                📊 Edição anterior · em números
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
                🌟 Experiência
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
                📸 Momentos
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
              "Equipamento oficial ProTopo incluído",
              "Treinadores certificados UEFA",
              "Lanches diários incluídos",
              "Almoço incluído nos dias completos",
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
        subtitle="Tudo o que pais e atletas precisam de saber sobre a Edição Verão 2026."
        faqs={[
          { question: "O seguro é obrigatório?", answer: "Sim. O seguro anual tem validade de 1 ano e cobre a participação nas atividades da ProTopo. Custa 20€ e é oferecido na inscrição das 4 semanas." },
          { question: "O que está incluído na inscrição?", answer: "Kit de treino ProTopo (t-shirt, calções e meias), seguro anual, lanches diários, acompanhamento técnico especializado e acesso a todas as atividades selecionadas. Nos dias completos, almoço e lanches estão incluídos." },
          { question: "Há balneários?", answer: "Sim. Os atletas podem equipar-se e tomar banho de água quente após os treinos." },
          { question: "O almoço está incluído?", answer: "Nos dias completos (quinta-feira) o almoço e os lanches estão incluídos. Nos restantes dias, são fornecidos lanches, água e fruta." },
          { question: "Posso inscrever apenas uma semana?", answer: "Sim. Cada família pode escolher as semanas pretendidas. Quanto mais semanas, melhor o valor por semana." },
          { question: "Existe desconto para irmãos?", answer: "Sim. Existe um desconto de 10% sobre o valor total para famílias com mais do que um atleta inscrito." },
          { question: "Para que idades é o Footcamp?", answer: "O Footcamp é destinado a jovens atletas dos 6 aos 16 anos, com grupos organizados por faixa etária para garantir um trabalho ajustado a cada idade." },
          { question: "Como funciona a inscrição e o pagamento?", answer: "Preenches o formulário de inscrição. Depois, a equipa ProTopo entra em contacto por WhatsApp para confirmar a vaga, esclarecer dúvidas e enviar os dados de pagamento." },
          { question: "O atleta pode tomar banho após o treino?", answer: "Sim. Existem balneários com água quente disponíveis para todos os atletas." },
          { question: "O que devo levar para o Footcamp?", answer: "Roupa desportiva adequada, chuteiras e vontade de aprender. O equipamento ProTopo está incluído na inscrição." },
          { question: "Como funciona a confirmação da vaga?", answer: "Após o envio do formulário a equipa ProTopo entra em contacto por WhatsApp para confirmar a disponibilidade e fornecer os dados de pagamento." },
          { question: "Existem restrições alimentares?", answer: "Sim. No formulário de inscrição existe um campo específico para indicar alergias ou restrições alimentares." },
        ]}
      />


      <Footer />

      <TestemunhoFormDialog open={testemunhoOpen} onOpenChange={setTestemunhoOpen} />
    </div>
  );
};

export default Footcamp;
