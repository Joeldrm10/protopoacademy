import { useState, useRef, useCallback } from "react";
import { Shirt, X } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import kitTshirt from "@/assets/kit-tshirt.png";
import kitSocks from "@/assets/kit-socks.png";
import kitBag from "@/assets/kit-bag.png";

const kitItems = [
  { name: "T-shirt ProTopo", image: kitTshirt },
  { name: "Meias", image: kitBag },
  { name: "Saco para chuteiras", image: kitSocks },
];

const KitSection = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((i: number) => {
    const isClosing = selectedItem === i;
    setSelectedItem(isClosing ? null : i);
    if (!isClosing) {
      setTimeout(() => {
        imageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [selectedItem]);

  return (
    <section id="equipamento" className="py-24 bg-secondary">
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
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`bg-card border rounded-lg px-8 py-6 flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                    selectedItem === i
                      ? "border-primary shadow-[0_0_24px_hsl(var(--gold)/0.4)] scale-105"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <Shirt className="w-6 h-6 text-primary" />
                  <span className="font-heading font-semibold text-foreground">{item.name}</span>
                </button>
              </AnimateOnScroll>
            ))}
          </div>

          <div
            ref={imageRef}
            className={`relative mt-12 flex justify-center transition-all duration-500 ease-out ${
              selectedItem !== null ? "overflow-visible" : "overflow-hidden"
            }`}
            style={{ height: selectedItem !== null ? "430px" : "0", opacity: selectedItem !== null ? 1 : 0 }}
          >
            {kitItems.map((item, i) => (
              <div
                key={item.name}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  opacity: selectedItem === i ? 1 : 0,
                  transform:
                    selectedItem === i
                      ? "scale(1) translateY(0)"
                      : "scale(0.8) translateY(30px)",
                  transition:
                    "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: selectedItem === i ? "auto" : "none",
                }}
              >
                <div className="relative group isolate">
                  <div
                    className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[68px]"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(var(--gold) / 0.92) 0%, hsl(var(--gold) / 0.62) 34%, hsl(var(--gold) / 0.24) 58%, transparent 78%)",
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[38px]"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(var(--gold) / 0.72) 0%, hsl(var(--gold) / 0.28) 52%, transparent 76%)",
                      boxShadow:
                        "0 0 110px hsl(var(--gold) / 0.34)",
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-[72%] h-[18%] w-[48%] -translate-x-1/2 rounded-full blur-[30px]"
                    style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.56) 0%, transparent 72%)" }}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative z-10 w-80 h-80 md:w-[24rem] md:h-[24rem] object-contain drop-shadow-[0_24px_50px_hsl(var(--background)/0.95)] group-hover:scale-[1.05] group-hover:-translate-y-1 transition-transform duration-500"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="absolute -top-2 -right-2 z-20 bg-card border border-border rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-3 font-heading font-semibold text-foreground text-lg">{item.name}</p>
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
