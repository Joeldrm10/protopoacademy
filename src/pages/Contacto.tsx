import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LocationSection from "@/components/LocationSection";
import heroImg from "@/assets/hero-contacto.jpg";

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
        objectPositionMobile="object-[30%_30%]"
        objectPositionDesktop="md:object-[20%_40%]"
      />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default Contacto;
