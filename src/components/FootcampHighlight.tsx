import { ArrowRight, Flame, Calendar, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import footcampHero from "@/assets/footcamp-hero.jpg";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_URL_PROXIMA_EDICAO } from "@/lib/constants";
import { FOOTCAMP_ENCERRADO } from "@/lib/featureFlags";

const highlights = FOOTCAMP_ENCERRADO
  ? [
      { icon: "✅", label: "Edição concluída" },
      { icon: "🔜", label: "Próxima edição em breve" },
      { icon: "⚽", label: "Dos 6 aos 16 anos" },
      { icon: "🎁", label: "Kit ProTopo Incluído" },
    ]
  : [
  { icon: "🔥", label: "Vagas Limitadas" },
  { icon: "📅", label: "Julho 2026" },
  { icon: "⚽", label: "Dos 6 aos 16 anos" },
  { icon: "🎁", label: "Kit ProTopo Incluído" },
];

const FootcampHighlight = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="group relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
          {/* Background Image with zoom on hover */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={footcampHero}
              alt="ProTopo Footcamp - Edição Verão 2026"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              style={{ objectPosition: "50% 35%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-20 md:px-16 md:py-32 max-w-2xl">
            <AnimateOnScroll>
              <span className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-heading font-bold uppercase tracking-[0.2em] text-xs mb-6 shadow-lg overflow-hidden">
                <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                {FOOTCAMP_ENCERRADO ? "Footcamp Verão 2026 concluído" : "Edição Verão 2026 · Inscrições Abertas"}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[marquee_3s_linear_infinite]" />
              </span>
              <h2 className="font-heading font-black text-4xl md:text-6xl leading-[0.95] mb-4">
                ProTopo
                <span className="block text-gradient-gold">Footcamp</span>
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl mb-6 font-body leading-relaxed">
                {FOOTCAMP_ENCERRADO ? (
                  <>A edição de <span className="text-primary font-bold">Verão 2026</span> terminou a 31 de julho. Obrigado a todos os atletas, famílias e equipa técnica.</>
                ) : (
                  <><span className="text-primary font-bold">4 semanas</span> de treino intensivo, evolução técnica e experiências únicas para atletas dos 6 aos 16 anos.</>
                )}
              </p>

              {/* Highlight chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {highlights.map((h) => (
                  <span
                    key={h.label}
                    className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-primary/30 text-foreground px-3 py-1.5 rounded-full text-xs md:text-sm font-body font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  >
                    <span aria-hidden>{h.icon}</span>
                    {h.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {FOOTCAMP_ENCERRADO ? (
                  <a
                    href={WHATSAPP_URL_PROXIMA_EDICAO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                  >
                    Quero saber da próxima edição
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    to="/marcar?tipo=footcamp"
                    className="group/btn inline-flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Inscrever no Footcamp
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                )}
                <Link
                  to="/footcamp"
                  className="inline-flex items-center justify-center gap-2 border border-primary/40 text-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-primary/10 hover:border-primary transition-all duration-300"
                >
                  Ver Programa Completo
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootcampHighlight;
