import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import teamFinalBg from "@/assets/team-final-cta.png";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const FinalCTA = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with cinematic zoom */}
      <div className="absolute inset-0 animate-[hero-zoom_20s_ease-in-out_infinite_alternate]">
        <img
          src={teamFinalBg}
          alt="Equipa completa ProTopo Academy"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Content */}
      <div className="relative z-10 py-32 md:py-44 px-4">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl mb-6 text-foreground leading-tight">
              Forma mais do que jogadores.{" "}
              <span className="text-gradient-gold">Forma uma equipa.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Treino, disciplina e evolução num ambiente profissional e motivador. Começa a evoluir hoje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#marcacao"
                className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-12 py-5 rounded-lg font-heading font-bold text-xl uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Marca já o teu treino
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/351911102405?text=Ol%C3%A1,%20quero%20marcar%20um%20treino"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-10 py-5 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-xl"
              >
                Fala connosco no WhatsApp
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FinalCTA;
