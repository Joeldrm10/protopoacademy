import { useState, useEffect } from "react";
import { X, ArrowLeft, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "@/components/AnimateOnScroll";

import galleryCover from "@/assets/gallery-cover.jpg";
import galleryCones from "@/assets/gallery-cones.jpg";
import gallery1v1 from "@/assets/gallery-1v1.jpg";
import galleryHurdles from "@/assets/gallery-hurdles-new.jpg";
import gallerySprint from "@/assets/gallery-sprint.jpg";
import galleryField from "@/assets/gallery-field.jpg";
import galleryCoach from "@/assets/gallery-coach-new.jpg";
import galleryCircle from "@/assets/gallery-circle.jpg";
import galleryGk from "@/assets/gallery-gk.jpg";
import galleryKids from "@/assets/gallery-kids-new.jpg";
import galleryGroup from "@/assets/gallery-group-new.jpg";
import galleryFootcamp from "@/assets/gallery-footcamp.jpg";
import galleryTalk from "@/assets/gallery-talk.jpg";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

interface GalleryItem {
  src: string;
  alt: string;
  category: "Treino & Ação" | "Exercícios" | "Momentos de Grupo";
  description: string;
  span?: string;
}

const galleryItems: GalleryItem[] = [
  // Treino & Ação
  { src: galleryCover, alt: "ProTopo Footcamp — início do treino", category: "Treino & Ação", description: "Tudo começa com preparação, foco e disciplina.", span: "md:col-span-2" },
  { src: gallerySprint, alt: "Sprint explosivo", category: "Treino & Ação", description: "Treino de alta intensidade para ganhar vantagem em campo.", span: "md:col-span-2" },
  { src: galleryField, alt: "Jogo em campo inteiro", category: "Treino & Ação", description: "Aplicação prática do treino em contexto real de jogo." },
  { src: galleryGk, alt: "Treino de guarda-redes", category: "Treino & Ação", description: "Treino específico para todas as posições, incluindo guarda-redes." },

  // Exercícios
  { src: galleryCones, alt: "Exercício com cones", category: "Exercícios", description: "Coordenação, agilidade e domínio de bola desde o primeiro minuto." },
  { src: gallery1v1, alt: "Exercício técnico individual", category: "Exercícios", description: "Trabalho técnico para cada atleta." },
  { src: galleryHurdles, alt: "Saltos com barreiras", category: "Exercícios", description: "Velocidade, explosão e superação de limites." },
  { src: galleryKids, alt: "Exercício técnico com bola", category: "Exercícios", description: "Exercícios pensados para desenvolver confiança com bola.", span: "md:col-span-2" },
  { src: galleryCoach, alt: "Treino individual com treinador", category: "Exercícios", description: "Acompanhamento próximo em exercícios de 1v1 e técnica com bola." },
  { src: galleryTalk, alt: "Treinador a conversar com atletas", category: "Exercícios", description: "Comunicação, liderança e transmissão de valores." },

  // Momentos de Grupo
  { src: galleryFootcamp, alt: "Reunião de equipa no campo", category: "Momentos de Grupo", description: "Momento de união e conversa entre atletas e treinadores." },
  { src: galleryCircle, alt: "Roda de equipa no campo", category: "Momentos de Grupo", description: "Juntos somos mais fortes — o espírito de equipa em cada treino.", span: "md:col-span-2" },
];

const categories = ["Todos", "Treino & Ação", "Exercícios", "Momentos de Grupo"] as const;

const Galeria = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filtered = activeCategory === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + filtered.length) % filtered.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-heading uppercase tracking-wider text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Title */}
          <AnimateOnScroll>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
                📸 Galeria
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-6xl mb-4">
                Momentos de <span className="text-gradient-gold">Treino</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Mais do que treinos, criamos evolução, disciplina e paixão pelo futebol.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Category filters */}
          <AnimateOnScroll delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-gold text-primary-foreground shadow-lg"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {filtered.map((item, i) => (
              <AnimateOnScroll key={item.alt + activeCategory} delay={i * 60}>
                <div
                  className={`group relative overflow-hidden rounded-lg cursor-pointer ${item.span || ""}`}
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative h-[250px] md:h-[300px] w-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-400 flex items-end">
                      <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                        <span className="text-xs font-heading font-semibold uppercase tracking-wider text-primary">
                          {item.category}
                        </span>
                        <p className="text-sm text-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Group photo */}
          <AnimateOnScroll delay={200}>
            <div className="max-w-6xl mx-auto mt-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={galleryGroup}
                  alt="Foto de grupo ProTopo Academy"
                  loading="lazy"
                  className="w-full h-[200px] md:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center pb-6">
                  <p className="text-foreground font-heading font-semibold text-lg md:text-xl text-center px-4">
                    Uma equipa unida, com o mesmo objetivo: evoluir.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* CTAs */}
          <AnimateOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-gold text-primary-foreground px-8 py-4 rounded-md font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                👉 Quero inscrever o meu filho
              </a>
              <a
                href="https://www.instagram.com/protopo_academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-md font-heading font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                Ver mais no Instagram
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 md:left-8 text-foreground hover:text-primary text-4xl font-bold z-10"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            ‹
          </button>
          <button
            className="absolute right-4 md:right-8 text-foreground hover:text-primary text-4xl font-bold z-10"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            ›
          </button>
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="text-primary font-heading font-semibold uppercase tracking-wider text-sm">
                {filtered[lightbox].category}
              </span>
              <p className="text-muted-foreground mt-1">{filtered[lightbox].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
