import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import footcampHero from "@/assets/footcamp-hero.jpg";
import AnimateOnScroll from "./AnimateOnScroll";

const FootcampHighlight = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-primary/20 shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={footcampHero}
              alt="ProTopo Footcamp - Edição Páscoa 2026"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-20 md:px-16 md:py-32 max-w-2xl">
            <AnimateOnScroll>
              <span className="inline-block bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
                ⚡ Prova Social
              </span>
              <h2 className="font-heading font-black text-4xl md:text-6xl leading-[0.95] mb-4">
                ProTopo
                <span className="block text-gradient-gold">Footcamp</span>
              </h2>
              <p className="text-foreground/90 text-lg md:text-xl mb-8 font-body leading-relaxed">
                <span className="text-primary font-bold">43 atletas.</span> 4 dias de trabalho, foco e evolução.
              </p>
              <Link
                to="/footcamp"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver Footcamp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FootcampHighlight;
