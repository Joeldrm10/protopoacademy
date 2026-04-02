import { Shirt } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const kitItems = ["T-shirt ProTopo", "Meias", "Saco para chuteiras"];

const KitSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              🎽 Equipamento
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              O teu kit <span className="text-gradient-gold">ProTopo</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Ao inscreveres-te no Football Camp recebes um kit exclusivo:
            </p>
          </AnimateOnScroll>

          <div className="flex flex-wrap justify-center gap-6">
            {kitItems.map((item, i) => (
              <AnimateOnScroll key={item} delay={i * 150}>
                <div className="bg-card border border-border rounded-lg px-8 py-6 flex items-center gap-4 hover:border-primary/40 transition-colors">
                  <Shirt className="w-6 h-6 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={500}>
            <p className="text-primary font-heading font-semibold mt-10 text-lg">
              Preparação, foco e atitude. 🔥
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default KitSection;
