import AnimateOnScroll from "./AnimateOnScroll";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Sobre Nós
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8">
            O teu caminho para o <span className="text-gradient-gold">topo</span>
          </h2>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              A ProTopo Academy é uma academia de treinos personalizados criada para atletas de futebol que querem evoluir de forma consistente e atingir o seu máximo potencial.
            </p>
            <p>
              O nosso foco está em elevar o desempenho individual, através de treinos ajustados a cada atleta, com acompanhamento próximo e uma metodologia centrada na evolução contínua.
            </p>
            <p>
              Aqui, cada jogador é desafiado a ultrapassar os seus limites e a aproximar-se cada vez mais do topo.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;
