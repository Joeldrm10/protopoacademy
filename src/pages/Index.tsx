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
import DidYouKnowSection from "@/components/DidYouKnowSection";
import MarqueeBanner from "@/components/MarqueeBanner";

import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { SHOW_INDIVIDUAL_GROUP_TRAININGS } from "@/lib/featureFlags";

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
      <MarqueeBanner />
      <AboutSection />
      {/* Treinos individuais e de grupo temporariamente ocultos — reativar via SHOW_INDIVIDUAL_GROUP_TRAININGS */}
      {SHOW_INDIVIDUAL_GROUP_TRAININGS && <ServicesSection />}
      <TestimonialsSection />
      <FootcampHighlight />
      <GalleryCTA />
      <DidYouKnowSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
