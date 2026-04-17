import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import PricingSection from "@/components/PricingSection";
import KitSection from "@/components/KitSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";

const Sobre = () => {
  useEffect(() => {
    document.title = "Sobre | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <TeamSection />
        <PricingSection />
        <KitSection />
        <LocationSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;
