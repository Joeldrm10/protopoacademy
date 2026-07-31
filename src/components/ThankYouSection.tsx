import { MessageCircle, Heart } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_URL_PROXIMA_EDICAO } from "@/lib/constants";

const ThankYouSection = () => {
  return (
    <section className="py-20 md:py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center bg-card border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <span className="block text-primary font-heading font-semibold uppercase tracking-[0.25em] text-xs mb-4">
              Footcamp Verão 2026 concluído
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-foreground">
              Obrigado a todos os <span className="text-gradient-gold">atletas!</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              O ProTopo Footcamp Verão 2026 chegou ao fim. Obrigado a todos os atletas, famílias e
              equipa técnica que fizeram parte desta edição.
            </p>
            <a
              href={WHATSAPP_URL_PROXIMA_EDICAO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white w-full sm:w-auto px-8 py-4 rounded-lg font-heading font-bold text-base uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Quero saber da próxima edição
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ThankYouSection;
