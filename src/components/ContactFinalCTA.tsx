import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_URL_DUVIDAS as WHATSAPP_URL } from "@/lib/constants";

const ContactFinalCTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12 overflow-hidden text-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="relative font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
              Pronto para <span className="text-gradient-gold">começar?</span>
            </h2>
            <p className="relative text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
              Marca já o teu treino ou tira as tuas dúvidas connosco.
            </p>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/marcar"
                className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                Marcar treino
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ContactFinalCTA;
