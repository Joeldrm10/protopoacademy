import { ArrowRight, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="ProTopo Academy - Treino de futebol"
          className="w-full h-full object-cover"
          style={{
            transform: "scale(1.05)",
            animation: "hero-zoom 8s ease-out infinite",
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="animate-fade-in-up">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Academia de Treinos Personalizados
          </span>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            Elevamos o teu
            <span className="block text-gradient-gold mt-1">futebol</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Treinos personalizados para atletas que querem evoluir, competir e atingir o próximo nível.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ animation: "pulse-gold 2s infinite" }}
            >
              Inscrever agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 border-2 border-foreground/20 text-foreground/80 px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all duration-300"
            >
              Saber mais
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <a href="#sobre" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-xs font-heading uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" style={{ animation: "scroll-bounce 2s infinite" }} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
