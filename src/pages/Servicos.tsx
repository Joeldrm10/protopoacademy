import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import KitSection from "@/components/KitSection";

const Servicos = () => {
  useEffect(() => {
    document.title = "Serviços | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <ServicesSection />
        <PricingSection />
        <KitSection />
      </div>
      <Footer />
    </div>
  );
};

export default Servicos;
