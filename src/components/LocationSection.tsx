import { MapPin } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            📍 Localização
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Onde <span className="text-gradient-gold">estamos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Treina num espaço preparado para potenciar o teu desenvolvimento.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200} className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
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
            <div className="p-6 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-heading font-semibold text-foreground">Campo da Caridade</p>
                <p className="text-muted-foreground text-sm">R. do Campo de Futebol 37, 2490, Ourém</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default LocationSection;
