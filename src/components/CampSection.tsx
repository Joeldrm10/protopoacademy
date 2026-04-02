import { Calendar, Clock, MapPin, Users } from "lucide-react";
import campBg from "@/assets/camp-bg.jpg";
import AnimateOnScroll from "./AnimateOnScroll";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const info = [
  { icon: Calendar, label: "Datas", value: "1, 2, 3 e 6 de abril" },
  { icon: Clock, label: "Horário", value: "9h – 12h" },
  { icon: Users, label: "Idades", value: "6 aos 16 anos" },
  { icon: MapPin, label: "Local", value: "Campo da Caridade, Ourém" },
];

const CampSection = () => {
  return (
    <section id="camp" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={campBg} alt="Football Camp" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <AnimateOnScroll>
            <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              🔥 Destaque
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              ProTopo Football Camp
              <span className="block text-gradient-gold text-2xl md:text-3xl mt-2">Edição Páscoa</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Não deixes as férias passarem em branco. Treinos intensivos focados na evolução técnica e física, com acompanhamento especializado.
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-gold text-primary-foreground px-8 py-4 rounded-md font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              👉 Inscrever agora
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <h3 className="font-heading font-bold text-xl text-primary">Informações</h3>
              {info.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-heading font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default CampSection;
