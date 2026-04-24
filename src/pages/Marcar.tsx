import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

const Marcar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Marcar Treino | ProTopo Academy"
        description="Marca já o teu treino na ProTopo Academy. Preenche o formulário e envia diretamente para o WhatsApp."
        ogTitle="Marca já o teu treino"
        ogDescription="Preenche o formulário e envia diretamente para o WhatsApp."
        path="/marcar"
      />
      <Navbar />

      {/* Hero simples + formulário centrado */}
      <main className="flex-1 pt-28 md:pt-36 pb-16 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto text-center mb-10 animate-fade-in-up">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Marcação
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-foreground">
              Marca já o teu <span className="text-gradient-gold">treino</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Preenche o formulário e envia diretamente para o WhatsApp.
            </p>
          </div>
        </div>

        {/* Reaproveita BookingForm — já tem o formulário completo */}
        <div className="-mt-6">
          <BookingForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marcar;
