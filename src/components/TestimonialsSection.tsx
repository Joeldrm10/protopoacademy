import { Quote, Star, Instagram } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const INSTAGRAM_URL = "https://www.instagram.com/protopo_academy/";

const testimonials = [
  {
    text: "O meu filho",
    highlight: "evoluiu bastante em poucas semanas",
    rest: ". Nota-se mais confiança e qualidade no jogo. Excelente acompanhamento.",
    author: "Pai de atleta",
    age: "13 anos",
  },
  {
    text: "Treinos muito bem organizados e ",
    highlight: "ambiente top",
    rest: ". O meu filho adora e está sempre motivado.",
    author: "Mãe de atleta",
    age: "11 anos",
  },
  {
    text: "",
    highlight: "Diferença enorme desde que começou",
    rest: ". Mais técnica, mais intensidade e mais confiança em campo.",
    author: "Pai de atleta",
    age: "14 anos",
  },
  {
    text: "Equipa muito profissional e atenta aos atletas. ",
    highlight: "Recomendo a qualquer jovem que queira evoluir",
    rest: ".",
    author: "Mãe de atleta",
    age: "12 anos",
  },
  {
    text: "Treinos exigentes mas muito positivos. ",
    highlight: "Nota-se evolução real",
    rest: ".",
    author: "Atleta",
    age: "15 anos",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testemunhos" className="py-28 bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll className="text-center mb-16">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Testemunhos
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            O que dizem os <span className="text-gradient-gold">nossos atletas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados reais de quem já treina connosco
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 100}>
              <div className="relative h-full bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-[0_10px_40px_hsl(var(--gold)/0.1)] transition-all duration-300 flex flex-col">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20" />

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-foreground/90 text-base leading-relaxed mb-6 flex-1">
                  "{t.text}
                  <span className="text-primary font-semibold">{t.highlight}</span>
                  {t.rest}"
                </p>

                <div className="pt-4 border-t border-border">
                  <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">
                    {t.author}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">{t.age}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={200} className="text-center mb-20">
          <p className="font-heading font-semibold text-xl md:text-2xl text-foreground mb-6">
            Junta-te aos atletas que já estão a evoluir connosco.
          </p>
          <a
            href="#marcacao"
            className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            Quero começar
          </a>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="max-w-2xl mx-auto bg-card/50 border border-border rounded-2xl p-8 md:p-10 text-center backdrop-blur-sm">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">
              Já treinaste connosco?
            </h3>
            <p className="text-muted-foreground mb-6">
              Deixa a tua opinião ou testemunho.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
            >
              <Instagram className="w-5 h-5" />
              Deixar opinião
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TestimonialsSection;
