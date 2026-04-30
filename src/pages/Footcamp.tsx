import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Camera, UserCheck, Quote, Star, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import CountUp from "@/components/CountUp";
import TestemunhoFormDialog from "@/components/TestemunhoFormDialog";
import { supabase } from "@/integrations/supabase/client";

import footcampHero from "@/assets/hero-footcamp-desktop.jpg";
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
        title="ProTopo Footcamp | Experiência Intensiva de Futebol"
        description="Footcamp ProTopo: dias intensivos de treino, foco e evolução. Para jovens atletas dos 6 aos 16 anos."
        ogTitle="ProTopo Footcamp"
        ogDescription="Treino intensivo, evolução real e experiência única."
        ogImage="/og/footcamp.jpg"
        path="/footcamp"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] md:h-[65vh] md:min-h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 768px)" srcSet={footcampHero} />
            <img
              src={footcampHeroMobile}
              alt="ProTopo Footcamp - Edição Páscoa 2026"
              className="w-full h-full object-cover object-[center_35%] md:object-[center_40%]"
              width={1920}
              height={1024}
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background/85" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <span className="block text-primary font-heading font-semibold uppercase tracking-[0.3em] text-sm mb-4">
              Edição Páscoa 2026
            </span>
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
              ProTopo
              <span className="block text-gradient-gold mt-1">Footcamp</span>
            </h1>
            <p className="text-foreground/90 text-xl md:text-2xl max-w-2xl mx-auto font-body leading-relaxed">
              4 dias de trabalho, foco e evolução.
            </p>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📊 Em números
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

      {/* CONVERSÃO FINAL */}
      <section className="relative py-28 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--gold)/0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimateOnScroll>
            <span className="inline-block bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              🔥 Próxima Edição
            </span>
            <h2 className="font-heading font-black text-4xl md:text-6xl mb-6 max-w-3xl mx-auto leading-tight">
              Nova edição <span className="text-gradient-gold">em breve.</span>
              <span className="block text-foreground mt-2">Fica atento!</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Em breve partilharemos mais informações sobre a próxima edição do ProTopo Footcamp.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <FAQSection
        title={<>Dúvidas sobre o <span className="text-gradient-gold">Footcamp</span></>}
        subtitle="Tudo o que pais e atletas precisam de saber sobre a experiência Footcamp."
        faqs={[
          { question: "Para que idades é o Footcamp?", answer: "O Footcamp é destinado a jovens atletas dos 6 aos 16 anos, com grupos organizados por faixa etária para garantir um trabalho ajustado a cada idade." },
          { question: "O que está incluído?", answer: "A experiência inclui treinos intensivos, sessões técnicas, atividades com profissionais convidados (psicóloga, árbitro, ex-jogador profissional), acompanhamento próximo e cobertura fotográfica." },
          { question: "O que os atletas precisam levar?", answer: "Equipamento desportivo, chuteiras, sapatilhas, garrafa de água e muita vontade de evoluir. Indicações específicas serão partilhadas antes da edição começar." },
          { question: "Qual é a duração?", answer: "O Footcamp tem a duração de 4 dias intensivos, com programa diário pensado para maximizar a evolução técnica, física e mental dos atletas." },
          { question: "Onde se realiza?", answer: "O Footcamp realiza-se no Campo da Caridade, em Ourém, o mesmo local dos nossos treinos regulares." },
          { question: "Como funciona a inscrição?", answer: "As inscrições para a próxima edição serão abertas em breve. Acompanha o nosso Instagram ou fala connosco para receberes informação assim que abrirmos as vagas." },
          { question: "Há acompanhamento profissional?", answer: "Sim. Contamos com 4 treinadores principais, 8 treinadores adjuntos e profissionais convidados, garantindo um rácio que permite acompanhamento individualizado." },
        ]}
      />

      <Footer />

      <TestemunhoFormDialog open={testemunhoOpen} onOpenChange={setTestemunhoOpen} />
    </div>
  );
};

export default Footcamp;
