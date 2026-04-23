import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LocationSection from "@/components/LocationSection";
import BookingForm from "@/components/BookingForm";
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
        layout="split"
        objectPositionMobile="object-[38%_20%]"
        objectPositionDesktop="md:object-[24%_18%]"
      />
      <LocationSection />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Contacto;
