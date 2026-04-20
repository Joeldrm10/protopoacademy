import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Users, Camera, UserCheck, Handshake, Zap, Target, Trophy, Medal } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import CountUp from "@/components/CountUp";

import footcampHero from "@/assets/footcamp-hero.jpg";
import footcampIns from "@/assets/footcamp-ines.jpg";
import footcampFilipe from "@/assets/footcamp-filipe.jpg";
import footcampJoao from "@/assets/footcamp-joao.jpg";
import galleryFootcamp from "@/assets/gallery-footcamp.jpg";
import galleryGroup from "@/assets/gallery-group-new.jpg";
import galleryCircle from "@/assets/gallery-circle.jpg";
import gallerySprint from "@/assets/gallery-sprint.jpg";
import galleryCones from "@/assets/gallery-cones.jpg";
import galleryTalk from "@/assets/gallery-talk.jpg";
import galleryTeamFull from "@/assets/gallery-team-full.png";
import galleryCoach from "@/assets/gallery-coach-new.jpg";

const WHATSAPP_URL = "https://wa.me/351911102405?text=Ol%C3%A1,%20quero%20participar%20no%20pr%C3%B3ximo%20ProTopo%20Footcamp";

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

const timeline = [
  {
    day: "Dia 1",
    title: "Integração e fundamentos",
    description: "Adaptação ao grupo, exercícios técnicos e primeiros desafios.",
    icon: Handshake,
  },
  {
    day: "Dia 2",
    title: "Drible e velocidade",
    description: "Trabalho individual com bola e desenvolvimento da rapidez.",
    icon: Zap,
  },
  {
    day: "Dia 3",
    title: "Finalização e jogo",
    description: "Treino de remate e aplicação em situações reais.",
    icon: Target,
  },
  {
    day: "Dia 4",
    title: "Competição e desafios",
    description: "Jogos e desafios para estimular competitividade.",
    icon: Trophy,
  },
  {
    day: "Dia 5",
    title: "Torneio final e prémios",
    description: "Competição final com entrega de prémios e reconhecimento.",
    icon: Medal,
  },
];

const galleryImages = [
  { src: galleryFootcamp, alt: "Reunião da equipa no campo" },
  { src: gallerySprint, alt: "Atleta em sprint durante o treino" },
  { src: galleryCones, alt: "Exercício técnico com cones" },
  { src: galleryGroup, alt: "Grupo de atletas no Footcamp" },
  { src: galleryCircle, alt: "Roda de equipa no campo" },
  { src: galleryTalk, alt: "Treinador a conversar com atletas" },
  { src: galleryCoach, alt: "Acompanhamento individual" },
  { src: galleryTeamFull, alt: "Foto de grupo do Footcamp" },
];

const Footcamp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={footcampHero}
            alt="ProTopo Footcamp - Edição Páscoa 2026"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <div className="animate-fade-in-up">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à página inicial
            </Link>
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
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📸 Momentos
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
                Galeria do <span className="text-gradient-gold">Footcamp</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Treinos, equipa, ação e bastidores.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, i) => (
              <AnimateOnScroll key={i} delay={i * 60}>
                <div className="group relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Frase emocional */}
          <AnimateOnScroll delay={200}>
            <p className="text-center text-2xl md:text-3xl font-heading font-bold mt-16 max-w-3xl mx-auto leading-relaxed">
              Obrigado a todos os atletas que fizeram parte
              <span className="block text-gradient-gold mt-1">desta edição.</span>
            </p>
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
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Garante já o teu lugar na próxima edição do ProTopo Footcamp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
              Quero Participar
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Footcamp;
