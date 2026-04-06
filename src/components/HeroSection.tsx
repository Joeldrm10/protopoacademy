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
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <p className="text-primary font-heading font-semibold uppercase tracking-[0.3em] text-sm mb-4">
            Academia de Treinos Personalizados
          </p>
          <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
            Elevamos o teu
            <span className="block text-gradient-gold">futebol</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
            Treinos personalizados para atletas que querem evoluir, competir e atingir o próximo nível.
          </p>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-gold text-primary-foreground px-10 py-4 rounded-md font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ animation: "pulse-gold 2s infinite" }}
          >
            👉 Inscreve-te já
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary/60 rounded-full mt-2" style={{ animation: "scroll-bounce 2s infinite" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
