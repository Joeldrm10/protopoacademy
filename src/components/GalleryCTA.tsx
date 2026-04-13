import { Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";

const GalleryCTA = () => {
  return (
    <section className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <AnimateOnScroll>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Vê os nossos <span className="text-gradient-gold">momentos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Treinos, exercícios e o espírito de equipa que nos define. Descobre a galeria completa.
          </p>
          <Link
            to="/galeria"
            className="group inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Galeria
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default GalleryCTA;
