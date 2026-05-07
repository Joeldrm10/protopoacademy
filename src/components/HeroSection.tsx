import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { WHATSAPP_URL_GERAL as WHATSAPP_URL } from "@/lib/constants";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-16 md:pb-0">
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background">
        {/* Floating gold particles */}
        {[
          { top: "12%", left: "8%", size: "w-1 h-1", dur: "6s", delay: "0s" },
          { top: "22%", left: "82%", size: "w-2 h-2", dur: "8s", delay: "1s" },
          { top: "35%", left: "18%", size: "w-1.5 h-1.5", dur: "7s", delay: "2s" },
          { top: "48%", left: "72%", size: "w-1 h-1", dur: "5s", delay: "0.5s" },
          { top: "58%", left: "30%", size: "w-2 h-2", dur: "9s", delay: "3s" },
          { top: "65%", left: "88%", size: "w-1 h-1", dur: "4s", delay: "1.5s" },
          { top: "78%", left: "12%", size: "w-1.5 h-1.5", dur: "7s", delay: "2.5s" },
          { top: "85%", left: "60%", size: "w-1 h-1", dur: "6s", delay: "4s" },
          { top: "15%", left: "45%", size: "w-1 h-1", dur: "8s", delay: "3.5s" },
          { top: "40%", left: "55%", size: "w-2 h-2", dur: "9s", delay: "0s" },
          { top: "70%", left: "48%", size: "w-1 h-1", dur: "5s", delay: "5s" },
          { top: "28%", left: "92%", size: "w-1.5 h-1.5", dur: "6s", delay: "2s" },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full pointer-events-none bg-primary/40 ${p.size}`}
            style={{ top: p.top, left: p.left, animation: `float-particle ${p.dur} ease-in-out infinite`, animationDelay: p.delay }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="animate-fade-in-up">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Academia de Treinos Personalizados
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-[0.1em] leading-none mb-6">
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
            <Link
              to="/marcar"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground w-full sm:w-auto px-10 py-5 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ animation: "pulse-gold 2s infinite" }}
            >
              Marca já o teu treino
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white w-full sm:w-auto px-8 py-5 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg"
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
