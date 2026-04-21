import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Quote, Star, ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { supabase } from "@/integrations/supabase/client";

type Testemunho = {
  id: string;
  nome: string;
  idade: string | null;
  experiencia: string;
  avaliacao: number;
};

const TestimonialsSection = () => {
  const [items, setItems] = useState<Testemunho[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("testemunhos")
      .select("id, nome, idade, experiencia, avaliacao")
      .eq("aprovado", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setItems((data as Testemunho[]) || []);
        setLoading(false);
      });
  }, []);

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

        {loading ? null : items.length === 0 ? (
          <AnimateOnScroll>
            <p className="text-center text-muted-foreground italic max-w-xl mx-auto mb-16">
              Os primeiros testemunhos estarão disponíveis em breve.
            </p>
          </AnimateOnScroll>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {items.map((t, i) => (
                <AnimateOnScroll key={t.id} delay={i * 100}>
                  <div className="relative h-full bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-[0_10px_40px_hsl(var(--gold)/0.1)] transition-all duration-300 flex flex-col">
                    <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/20" />

                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={
                            idx < t.avaliacao
                              ? "w-4 h-4 fill-primary text-primary"
                              : "w-4 h-4 text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-foreground/90 text-base leading-relaxed mb-6 flex-1 line-clamp-3">
                      "{t.experiencia}"
                    </p>

                    <div className="pt-4 border-t border-border">
                      <p className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">
                        {t.nome}
                      </p>
                      {t.idade && (
                        <p className="text-muted-foreground text-xs mt-1">{t.idade}</p>
                      )}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll delay={150} className="text-center mb-16">
              <Link
                to="/footcamp#testemunhos"
                className="inline-flex items-center gap-2 border border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-heading font-bold uppercase tracking-wider transition-all"
              >
                Ver todos os testemunhos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateOnScroll>
          </>
        )}

        <AnimateOnScroll delay={200} className="text-center">
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
