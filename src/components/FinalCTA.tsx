import AnimateOnScroll from "./AnimateOnScroll";
import teamFinalBg from "@/assets/team-final-cta.png";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const FinalCTA = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image with cinematic zoom */}
      <div
        className="absolute inset-0 animate-[hero-zoom_20s_ease-in-out_infinite_alternate]"
      >
        <img
          src={teamFinalBg}
          alt="Equipa completa ProTopo Academy"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/[0.55]" />

      {/* Content */}
      <div className="relative z-10 py-28 md:py-40 px-4">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl mb-4 text-foreground leading-tight">
              Forma mais do que jogadores.{" "}
              <span className="text-gradient-gold">Forma uma equipa.</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Treino, disciplina e evolução num ambiente profissional e motivador.
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-gold text-primary-foreground px-10 py-4 rounded-md font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              👉 Inscrever agora
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FinalCTA;
