import { ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";
const WHATSAPP_URL = "https://wa.me/351911102405?text=Ol%C3%A1%21%20Vi%20o%20site%20da%20ProTopo%20Academy%20e%20gostava%20de%20saber%20mais%20sobre%20os%20treinos.";

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
            objectPosition: "center top",
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
          <h1 className="text-display mb-6">
            Elevamos o teu
            <span className="block text-gradient-gold mt-1">futebol</span>
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-4">
            Treinos personalizados para atletas que querem evoluir, competir e atingir o próximo nível.
          </p>
          <p className="text-title text-foreground/90 max-w-2xl mx-auto mb-2">
            Treinos para atletas dos 6 aos 16 anos
          </p>
          <p className="text-body-sm text-muted-foreground max-w-2xl mx-auto mb-10 italic">
            Treinos adaptados a cada faixa etária.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#marcacao"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ animation: "pulse-gold 2s infinite" }}
            >
              Marca já o teu treino
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Tirar dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
