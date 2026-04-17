import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import heroImg from "@/assets/hero-sobre.jpg";

const Sobre = () => {
  useEffect(() => {
    document.title = "Sobre | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Sobre a"
        highlight="ProTopo Academy"
        subtitle="Conhece a equipa e a missão que move cada treino: ajudar atletas a chegar mais longe."
        image={heroImg}
      />
      <TeamSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Sobre;
