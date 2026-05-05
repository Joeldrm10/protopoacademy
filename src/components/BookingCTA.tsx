import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_URL_MARCAR as WHATSAPP_URL } from "@/lib/constants";

const BookingCTA = () => {
  return (
    <section id="marcacao" className="py-24 md:py-28 bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Marcação
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-foreground">
              Marca já o teu <span className="text-gradient-gold">treino</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto">
              Dá o próximo passo na tua evolução.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                to="/marcar"
                className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold text-base uppercase tracking-wider hover:opacity-90 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                Marcar treino
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold text-base uppercase tracking-wider hover:opacity-90 transition-all shadow-lg w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default BookingCTA;
