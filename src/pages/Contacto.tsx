import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LocationSection from "@/components/LocationSection";
import DirectContactSection from "@/components/DirectContactSection";
import heroImg from "@/assets/hero-contacto-desktop.jpg";
import heroImgMobile from "@/assets/hero-contacto-mobile.jpg";

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contacto | ProTopo Academy"
        description="Entra em contacto connosco e marca o teu treino. Resposta rápida via WhatsApp."
        ogTitle="Contacta a ProTopo Academy"
        ogDescription="Marca já o teu treino de forma simples e rápida."
        ogImage="/og/contacto.jpg"
        path="/contacto"
      />
      <Navbar />
      <PageHero
        title="Fala"
        highlight="connosco"
        subtitle="Marca o teu treino, tira dúvidas ou descobre onde estamos. Estamos prontos para te receber."
        image={heroImg}
        imageMobile={heroImgMobile}
        objectPositionStyle="80% 50%"
      />
      <DirectContactSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default Contacto;
