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
import BookingForm from "@/components/BookingForm";
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
        title="ProTopo Academy | Treinos de Futebol em Ourém (6-16 anos)"
        description="Treinos de futebol para jovens dos 6 aos 16 anos. Evolui com treinos adaptados a cada faixa etária na ProTopo Academy. Marca já pelo WhatsApp."
        ogTitle="ProTopo Academy | Treinos em Ourém"
        ogDescription="Treinos de futebol personalizados para jovens dos 6 aos 16 anos. Evolui com treinos adaptados a cada faixa etária."
        ogImage="/og/home.jpg"
        path="/"
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <FootcampHighlight />
      <GalleryCTA />
      <BookingForm />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
