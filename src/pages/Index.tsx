import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FootcampHighlight from "@/components/FootcampHighlight";
import GalleryCTA from "@/components/GalleryCTA";

import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

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
        title="ProTopo Academy | Treinos de Futebol em Ourém (6–16 anos)"
        description="Treinos de futebol para jovens dos 6 aos 16 anos em Ourém. Treinos adaptados a cada faixa etária para melhorar técnica, confiança e desempenho. Marca já pelo WhatsApp."
        ogTitle="ProTopo Academy | Treinos de Futebol em Ourém"
        ogDescription="Treinos personalizados para jovens atletas dos 6 aos 16 anos. Evolui com a ProTopo Academy."
        ogImage="/og-image.jpg"
        path="/"
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <FootcampHighlight />
      <GalleryCTA />
      <BookingCTA />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
