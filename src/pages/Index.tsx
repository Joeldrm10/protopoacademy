import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import VideoSection from "@/components/VideoSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FootcampHighlight from "@/components/FootcampHighlight";
import GalleryCTA from "@/components/GalleryCTA";
import EducacaoCTA from "@/components/EducacaoCTA";
import ThankYouSection from "@/components/ThankYouSection";
import { CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import { WHATSAPP_URL_PROXIMA_EDICAO } from "@/lib/constants";


import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SHOW_INDIVIDUAL_GROUP_TRAININGS, FOOTCAMP_ENCERRADO } from "@/lib/featureFlags";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="ProTopo Academy | Treinos Personalizados de Futebol em Ourém"
        description="Academia de futebol especializada em treinos individuais, treinos de grupo e Footcamps para atletas dos 6 aos 16 anos. Evolui o teu jogo com a ProTopo Academy."
        ogTitle="ProTopo Academy | Treinos Personalizados de Futebol em Ourém"
        ogDescription="Academia de futebol especializada em treinos individuais, treinos de grupo e Footcamps para atletas dos 6 aos 16 anos."
        ogImage="/og-image.jpg"
        path="/"
      />
      <Navbar />
      <HeroSection />
      {/* Anúncio Footcamp Outono 2026 (sem inscrições abertas) — usa o vídeo promocional existente */}
      <VideoSection
        badge="Nova edição anunciada"
        title={<>🍂 Footcamp <span className="text-gradient-gold">Outono 2026</span></>}
        description="Uma nova edição está a chegar! Novos desafios, experiências e muitas novidades."
        extra={
          <div className="mt-6 flex flex-col gap-3 items-center md:items-start">
            <span className="inline-flex items-center gap-2 bg-card border border-primary/30 text-foreground px-4 py-2 rounded-lg font-heading font-bold uppercase tracking-wider text-sm">
              <CalendarDays className="w-4 h-4 text-primary" /> 16 a 20 de novembro
            </span>
            <span className="inline-flex items-center gap-2 text-primary font-heading font-semibold uppercase tracking-[0.15em] text-xs">
              <Sparkles className="w-4 h-4" /> Em breve, todos os pormenores.
            </span>
          </div>
        }
        cta={
          <a
            href={WHATSAPP_URL_PROXIMA_EDICAO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground w-full sm:w-auto px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" /> Receber novidades
          </a>
        }
      />
      <AboutSection />
      {/* Treinos individuais e de grupo temporariamente ocultos — reativar via SHOW_INDIVIDUAL_GROUP_TRAININGS */}
      {SHOW_INDIVIDUAL_GROUP_TRAININGS && <ServicesSection />}
      <TestimonialsSection />
      {/* Edições anteriores (histórico) */}
      {FOOTCAMP_ENCERRADO && <ThankYouSection />}
      <FootcampHighlight />
      <GalleryCTA />
      <EducacaoCTA />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
