import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import KitSection from "@/components/KitSection";
import heroImg from "@/assets/hero-servicos.jpg";

const Servicos = () => {
  useEffect(() => {
    document.title = "Serviços | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Os nossos"
        highlight="treinos"
        subtitle="Treinos personalizados para evoluíres ao teu ritmo, com planos adaptados a cada atleta."
        image={heroImg}
      />
      <ServicesSection />
      <PricingSection />
      <KitSection />
      <Footer />
    </div>
  );
};

export default Servicos;
