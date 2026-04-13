import { useState, useEffect, useCallback } from "react";
import { X, ArrowLeft, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
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


import galleryTalk from "@/assets/gallery-talk.jpg";
import galleryResistance from "@/assets/gallery-resistance.png";
import galleryCoachKid from "@/assets/gallery-coach-kid.png";
import galleryCoachDrill from "@/assets/gallery-coach-drill.png";
import galleryTeamFull from "@/assets/gallery-team-full.png";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

type Category = "Treinos" | "Exercícios" | "Momentos" | "Equipa";

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  description: string;
  span?: string;
}

const galleryItems: GalleryItem[] = [
  // Treinos
  { src: galleryCover, alt: "ProTopo Footcamp — início do treino", category: "Treinos", description: "Tudo começa com preparação, foco e disciplina.", span: "col-span-2 row-span-2" },
  { src: gallerySprint, alt: "Sprint explosivo", category: "Treinos", description: "Treino de alta intensidade para ganhar vantagem em campo." },
  { src: galleryResistance, alt: "Treino de resistência com elástico", category: "Treinos", description: "Exercícios de resistência para ganhar força e explosão." },
  { src: galleryField, alt: "Jogo em campo inteiro", category: "Treinos", description: "Aplicação prática do treino em contexto real de jogo." },
  { src: galleryGk, alt: "Treino de guarda-redes", category: "Treinos", description: "Treino específico para todas as posições, incluindo guarda-redes." },

  // Exercícios
  { src: galleryCones, alt: "Exercício com cones", category: "Exercícios", description: "Coordenação, agilidade e domínio de bola.", span: "col-span-2" },
  { src: gallery1v1, alt: "Exercício técnico individual", category: "Exercícios", description: "Trabalho técnico para cada atleta." },
  { src: galleryHurdles, alt: "Saltos com barreiras", category: "Exercícios", description: "Velocidade, explosão e superação de limites." },
  { src: galleryKids, alt: "Exercício técnico com bola", category: "Exercícios", description: "Exercícios pensados para desenvolver confiança com bola." },
  { src: galleryCoach, alt: "Treino individual com treinador", category: "Exercícios", description: "Acompanhamento próximo em exercícios de 1v1." },
  { src: galleryCoachKid, alt: "Treinador a orientar jovem atleta", category: "Exercícios", description: "Orientação individual para confiança e técnica." },
  { src: galleryCoachDrill, alt: "Treinador em exercício com atletas", category: "Exercícios", description: "Trabalho próximo com os atletas em contexto de jogo." },

  // Equipa
  { src: galleryTalk, alt: "Treinador a conversar com atletas", category: "Equipa", description: "Comunicação, liderança e transmissão de valores." },
  { src: galleryCircle, alt: "Roda de equipa no campo", category: "Equipa", description: "Juntos somos mais fortes — o espírito de equipa.", span: "col-span-2" },
  { src: galleryTeamFull, alt: "Foto de grupo completa ProTopo Academy", category: "Equipa", description: "Uma equipa unida, com o mesmo objetivo: evoluir.", span: "col-span-3" },
];

const categories = ["Todos", "Treinos", "Exercícios", "Equipa"] as const;

const Galeria = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filtered = activeCategory === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((prev) => {
      if (prev === null) return null;
      return (prev + dir + filtered.length) % filtered.length;
    });
  }, [lightbox, filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, navigate]);

  // Touch swipe support
  useEffect(() => {
    if (lightbox === null) return;
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        navigate(diff > 0 ? -1 : 1);
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightbox, navigate]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-heading uppercase tracking-wider text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Title */}
          <AnimateOnScroll>
            <div className="text-center mb-6 max-w-3xl mx-auto">
              <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-3">
                📸 Galeria
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-6xl mb-3">
                Momentos dos nossos <span className="text-gradient-gold">treinos</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Evolução, intensidade e espírito de equipa.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Category filters */}
          <AnimateOnScroll delay={100}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-heading font-semibold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-gold text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Image count */}
          <AnimateOnScroll delay={150}>
            <p className="text-center text-muted-foreground text-sm mb-6">
              {filtered.length} {filtered.length === 1 ? "foto" : "fotos"}
            </p>
          </AnimateOnScroll>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 max-w-6xl mx-auto">
            {filtered.map((item, i) => (
              <AnimateOnScroll key={item.alt + activeCategory} delay={Math.min(i * 50, 400)}>
                <div
                  className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.span || ""}`}
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative aspect-square w-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-3 md:p-4">
                        <span className="text-[10px] md:text-xs font-heading font-semibold uppercase tracking-wider text-primary">
                          {item.category}
                        </span>
                        <p className="text-xs md:text-sm text-foreground mt-0.5 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTAs */}
          <AnimateOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-gold text-primary-foreground px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                👉 Quero inscrever o meu filho
              </a>
              <a
                href="https://www.instagram.com/protopo_academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
            onClick={closeLightbox}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 text-muted-foreground text-sm font-heading z-10">
            {lightbox + 1} / {filtered.length}
          </div>

          {/* Nav buttons */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2 bg-card/50 rounded-full backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2 bg-card/50 rounded-full backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl w-full mx-4 md:mx-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <span className="text-primary font-heading font-semibold uppercase tracking-wider text-xs">
                {filtered[lightbox].category}
              </span>
              <p className="text-muted-foreground text-sm mt-1 max-w-md mx-auto">
                {filtered[lightbox].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galeria;
