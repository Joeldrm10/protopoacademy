import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "./AnimateOnScroll";

const GalleryCTA = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <AnimateOnScroll>
          <Camera className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Vê os nossos <span className="text-gradient-gold">momentos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Treinos, exercícios e o espírito de equipa que nos define. Descobre a galeria completa.
          </p>
          <Link
            to="/galeria"
            className="inline-block bg-gradient-gold text-primary-foreground px-10 py-4 rounded-md font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ animation: "pulse-gold 2s infinite" }}
          >
            📸 Ver Galeria
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default GalleryCTA;
