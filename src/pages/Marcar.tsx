import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import FootcampSignupForm from "@/components/FootcampSignupForm";
import FootcampInfoSection from "@/components/FootcampInfoSection";
import { SHOW_INDIVIDUAL_GROUP_TRAININGS } from "@/lib/featureFlags";

const Marcar = () => {
  const [searchParams] = useSearchParams();
  // Treinos individuais/grupo ocultos — força sempre o formulário Footcamp.
  // Para reativar: SHOW_INDIVIDUAL_GROUP_TRAININGS = true.
  const isFootcamp = !SHOW_INDIVIDUAL_GROUP_TRAININGS || searchParams.get("tipo") === "footcamp";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title={isFootcamp ? "Inscrição Footcamp | ProTopo Academy" : "Marcar Treino | ProTopo Academy"}
        description={
          isFootcamp
            ? "Inscreve-te na ProTopo Footcamp — Edição Verão 2026. Preenche o formulário e a equipa entra em contacto."
            : "Marca já o teu treino na ProTopo Academy. Preenche o formulário e envia diretamente para o WhatsApp."
        }
        ogTitle={isFootcamp ? "Inscrição ProTopo Footcamp — Verão 2026" : "Marca já o teu treino"}
        ogDescription={
          isFootcamp
            ? "Garante o teu lugar na Edição Verão 2026 da ProTopo Footcamp."
            : "Preenche o formulário e envia diretamente para o WhatsApp."
        }
        path={isFootcamp ? "/marcar?tipo=footcamp" : "/marcar"}
      />
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20 pb-16 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-lg mx-auto text-center mb-3 animate-fade-in-up">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-3">
              {isFootcamp ? "Footcamp · Verão 2026" : "Marcação"}
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-3 text-foreground">
              {isFootcamp ? (
                <>Inscreve-te no <span className="text-gradient-gold">Footcamp</span></>
              ) : (
                <>Marca já o teu <span className="text-gradient-gold">treino</span></>
              )}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {isFootcamp
                ? "Preenche o formulário. A equipa ProTopo confirma a vaga e envia os dados de pagamento por WhatsApp."
                : "Preenche o formulário e envia diretamente para o WhatsApp."}
            </p>
          </div>
        </div>

        {isFootcamp && <FootcampInfoSection />}

        <div className="-mt-4">
          {isFootcamp ? <FootcampSignupForm /> : <BookingForm showHeader={false} />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Marcar;
