import { MapPin, Navigation } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Localização
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Onde <span className="text-gradient-gold">estamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Treina num espaço preparado para potenciar o teu desenvolvimento.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.8!2d-8.58!3d39.66!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18a3c9b0b89a73%3A0x0!2sCampo%20da%20Caridade%2C%20Our%C3%A9m!5e0!3m2!1spt-PT!2spt!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Campo da Caridade, Ourém"
            />
            <div className="p-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">Campo da Caridade</p>
                  <p className="text-muted-foreground text-sm">R. do Campo de Futebol 37, 2490, Ourém</p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Campo+da+Caridade+Ourém"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-heading font-semibold text-sm uppercase tracking-wider transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Direções
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default LocationSection;
