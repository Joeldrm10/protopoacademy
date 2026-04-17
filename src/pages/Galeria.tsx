import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

interface GalleryItem {
  src: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  { src: galleryCover, alt: "ProTopo Footcamp — início do treino" },
  { src: gallerySprint, alt: "Sprint explosivo" },
  { src: galleryResistance, alt: "Treino de resistência" },
  { src: galleryField, alt: "Jogo em campo inteiro" },
  { src: galleryGk, alt: "Treino de guarda-redes" },
  { src: galleryCones, alt: "Exercício com cones" },
  { src: gallery1v1, alt: "Exercício técnico individual" },
  { src: galleryHurdles, alt: "Saltos com barreiras" },
  { src: galleryKids, alt: "Exercício técnico com bola" },
  { src: galleryCoach, alt: "Treino individual com treinador" },
  { src: galleryCoachKid, alt: "Treinador a orientar jovem atleta" },
  { src: galleryCoachDrill, alt: "Treinador em exercício com atletas" },
  { src: galleryTalk, alt: "Treinador a conversar com atletas" },
  { src: galleryCircle, alt: "Roda de equipa no campo" },
  { src: galleryTeamFull, alt: "Foto de grupo completa ProTopo Academy" },
];

const Galeria = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Galeria | ProTopo Academy";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (lightbox === null) return;
    setLightbox((prev) => (prev === null ? null : (prev + dir + galleryItems.length) % galleryItems.length));
  }, [lightbox]);

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

  useEffect(() => {
    if (lightbox === null) return;
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? -1 : 1);
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightbox, navigate]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="pt-32 pb-20 md:pt-36 md:pb-28 flex-1">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h1 className="font-heading font-bold text-4xl md:text-6xl mb-3">
                Galeria <span className="text-gradient-gold">ProTopo</span>
              </h1>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 max-w-6xl mx-auto">
            {galleryItems.map((item, i) => (
              <AnimateOnScroll key={item.alt} delay={Math.min(i * 40, 400)}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer aspect-square"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="absolute top-4 left-4 md:top-6 md:left-6 text-muted-foreground text-sm font-heading z-10">
            {lightbox + 1} / {galleryItems.length}
          </div>
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2 bg-card/50 rounded-full backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2 bg-card/50 rounded-full backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Próxima"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="max-w-5xl w-full mx-4 md:mx-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Galeria;
