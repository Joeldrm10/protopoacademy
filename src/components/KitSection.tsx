import { useState } from "react";
import { Shirt, X } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import kitTshirt from "@/assets/kit-tshirt.png";
import kitSocks from "@/assets/kit-socks.png";
import kitBag from "@/assets/kit-bag.png";

const kitItems = [
  { name: "T-shirt ProTopo", image: kitTshirt },
  { name: "Meias", image: kitSocks },
  { name: "Saco para chuteiras", image: kitBag },
];

const KitSection = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

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
              <AnimateOnScroll key={item.name} delay={i * 150}>
                <button
                  onClick={() => setSelectedItem(selectedItem === i ? null : i)}
                  className={`bg-card border rounded-lg px-8 py-6 flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                    selectedItem === i
                      ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)] scale-105"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Shirt className="w-6 h-6 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{item.name}</span>
                </button>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Product Image Display */}
          <div className="relative mt-12 flex justify-center" style={{ minHeight: selectedItem !== null ? "420px" : "0" }}>
            {kitItems.map((item, i) => (
              <div
                key={item.name}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  opacity: selectedItem === i ? 1 : 0,
                  transform: selectedItem === i
                    ? "scale(1) rotateY(0deg)"
                    : "scale(0.7) rotateY(90deg)",
                  transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: selectedItem === i ? "auto" : "none",
                }}
              >
                <div className="relative group">
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-50 blur-xl"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--gold) / 0.2))" }}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative w-64 h-80 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute -top-2 -right-2 bg-card border border-border rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-4 font-heading font-semibold text-foreground text-lg">{item.name}</p>
              </div>
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
