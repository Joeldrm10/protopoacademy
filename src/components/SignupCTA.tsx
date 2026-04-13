import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const SignupCTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4 text-foreground">
              Garante já a tua vaga nos{" "}
              <span className="text-gradient-gold">treinos personalizados</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto">
              Vagas limitadas. Inscreve-te agora e começa a tua evolução.
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-12 py-5 rounded-xl font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Inscrever agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default SignupCTA;
