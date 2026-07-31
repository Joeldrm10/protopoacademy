import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CalendarX, MessageCircle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import FootcampSignupForm from "@/components/FootcampSignupForm";
import FootcampInfoSection from "@/components/FootcampInfoSection";
import { SHOW_INDIVIDUAL_GROUP_TRAININGS, FOOTCAMP_ENCERRADO } from "@/lib/featureFlags";
import { WHATSAPP_URL_PROXIMA_EDICAO } from "@/lib/constants";

const Marcar = () => {
  const [searchParams] = useSearchParams();
  // Treinos individuais/grupo ocultos — força sempre o formulário Footcamp.
  // Para reativar: SHOW_INDIVIDUAL_GROUP_TRAININGS = true.
  const isFootcamp = !SHOW_INDIVIDUAL_GROUP_TRAININGS || searchParams.get("tipo") === "footcamp";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Estado pós-evento: formulário de inscrição desativado.
  if (FOOTCAMP_ENCERRADO) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO
          title="Inscrições encerradas | ProTopo Academy"
          description="As inscrições para o ProTopo Footcamp Verão 2026 já terminaram. Em breve serão anunciadas novas edições."
          ogTitle="Inscrições encerradas — ProTopo Footcamp Verão 2026"
          ogDescription="Em breve serão anunciadas novas edições do ProTopo Footcamp."
          path="/marcar"
        />
        <Navbar />

        <main className="flex-1 pt-16 md:pt-20 pb-20 bg-secondary relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-8 md:p-12 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <CalendarX className="w-7 h-7 text-primary" />
              </div>
              <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                Footcamp Verão 2026 concluído
              </span>
              <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-foreground">
                Inscrições <span className="text-gradient-gold">encerradas</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                As inscrições para o ProTopo Footcamp Verão 2026 já terminaram. Em breve serão
                anunciadas novas edições.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  href={WHATSAPP_URL_PROXIMA_EDICAO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-[#25D366] text-white w-full sm:w-auto px-8 py-4 rounded-lg font-heading font-bold text-sm md:text-base uppercase tracking-wider hover:opacity-90 transition-all shadow-lg text-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  Receber informações da próxima edição
                </a>
                <Link
                  to="/footcamp"
                  className="group inline-flex items-center justify-center gap-2 border border-primary/40 text-foreground w-full sm:w-auto px-8 py-4 rounded-lg font-heading font-bold text-sm md:text-base uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-all"
                >
                  Ver a edição 2026
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

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
