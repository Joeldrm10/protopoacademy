import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/TeamSection";

import heroImg from "@/assets/hero-sobre.jpg";

const Sobre = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sobre Nós | ProTopo Academy"
        description="Conhece a equipa da ProTopo Academy e a nossa missão: desenvolver jovens atletas através de treino de qualidade."
        ogTitle="Sobre a ProTopo Academy"
        ogDescription="Uma equipa dedicada à evolução de jovens atletas."
        ogImage="/og/sobre.png"
        path="/sobre"
      />
      <Navbar />
      <PageHero
        title="Sobre a"
        highlight="ProTopo Academy"
        subtitle="Conhece a equipa e a missão que move cada treino: ajudar atletas a chegar mais longe."
        image={heroImg}
        objectPositionMobile="object-[50%_25%]"
        objectPositionDesktop="md:object-center"
      />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Sobre;
