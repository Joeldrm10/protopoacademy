import { useState } from "react";
import { X, Instagram } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

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

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

interface GalleryItem {
  src: string;
  alt: string;
  category: string;
  description: string;
  span?: string;
}

const galleryItems: GalleryItem[] = [
  { src: galleryCover, alt: "ProTopo Footcamp", category: "Capa", description: "A experiência ProTopo começa aqui.", span: "md:col-span-2" },
  { src: galleryCones, alt: "Exercício com cones", category: "Treino Técnico", description: "Foco no detalhe e evolução técnica de cada atleta." },
  { src: gallery1v1, alt: "Treino individual", category: "Treino Técnico", description: "Foco no detalhe e evolução técnica de cada atleta." },
  { src: galleryKids, alt: "Exercício técnico com bola", category: "Treino Técnico", description: "Foco no detalhe e evolução técnica de cada atleta.", span: "md:col-span-2" },
  { src: galleryHurdles, alt: "Saltos com barreiras", category: "Intensidade & Performance", description: "Desenvolvimento físico, velocidade e resistência." },
  { src: gallerySprint, alt: "Sprint explosivo", category: "Intensidade & Performance", description: "Desenvolvimento físico, velocidade e resistência." },
  { src: galleryField, alt: "Jogo em campo inteiro", category: "Jogo Real", description: "Aplicação prática do treino em contexto real.", span: "md:col-span-2" },
  { src: galleryFootcamp, alt: "Situação de jogo", category: "Jogo Real", description: "Aplicação prática do treino em contexto real." },
  { src: galleryGk, alt: "Treino de guarda-redes", category: "Especialização", description: "Treino específico para todas as posições." },
  { src: galleryCoach, alt: "Treinador a orientar atletas", category: "Organização & Disciplina", description: "Estrutura, foco e acompanhamento constante." },
  { src: galleryCircle, alt: "Roda de equipa no campo", category: "Organização & Disciplina", description: "Estrutura, foco e acompanhamento constante.", span: "md:col-span-2" },
];

const GallerySection = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const navigate = (dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="galeria" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimateOnScroll>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              📸 Galeria
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Momentos que constroem <span className="text-gradient-gold">jogadores</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Mais do que treinos, criamos evolução, disciplina e paixão pelo futebol.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {galleryItems.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 60}>
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
                  {/* Overlay */}
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

        {/* Placeholder for group photo */}
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

          {/* Navigation */}
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
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="text-primary font-heading font-semibold uppercase tracking-wider text-sm">
                {galleryItems[lightbox].category}
              </span>
              <p className="text-muted-foreground mt-1">{galleryItems[lightbox].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
