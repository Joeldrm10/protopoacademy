import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import KitSection from "@/components/KitSection";
import heroImg from "@/assets/hero-servicos.jpg";

const Servicos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Treinos de Futebol | ProTopo Academy"
        description="Treinos individuais e em grupo para jovens dos 6 aos 16 anos. Foco na evolução técnica, confiança e performance."
        ogTitle="Treinos de Futebol Personalizados"
        ogDescription="Escolhe treino individual ou em grupo e evolui ao teu ritmo."
        ogImage="/og/servicos.jpg"
        path="/servicos"
      />
      <Navbar />
      <PageHero
        title="Os nossos"
        highlight="treinos"
        subtitle="Treinos personalizados para evoluíres ao teu ritmo, com planos adaptados a cada atleta."
        image={heroImg}
        layout="split"
        objectPositionMobile="object-[44%_18%]"
        objectPositionDesktop="md:object-[30%_18%]"
      />
      <ServicesSection />
      <PricingSection />
      <KitSection />
      <Footer />
    </div>
  );
};

export default Servicos;
