import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import LocationSection from "@/components/LocationSection";
import BookingForm from "@/components/BookingForm";
import heroImg from "@/assets/hero-contacto.jpg";

const Contacto = () => {
  useEffect(() => {
    document.title = "Contacto | ProTopo Academy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Fala"
        highlight="connosco"
        subtitle="Marca o teu treino, tira dúvidas ou descobre onde estamos. Estamos prontos para te receber."
        image={heroImg}
      />
      <LocationSection />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Contacto;
