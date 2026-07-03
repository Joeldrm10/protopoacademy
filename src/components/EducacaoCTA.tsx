import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const EducacaoCTA = () => {
  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center bg-surface-elevated/50 border border-border rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="inline-flex w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-foreground leading-tight">
              Queres aprender <span className="text-gradient-gold">mais?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              Descobre dicas simples sobre sono, recuperação, alongamentos, rendimento e prevenção de lesões.
            </p>
            <Link
              to="/educacao"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-base md:text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver dicas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default EducacaoCTA;
