import { useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import videoAsset from "@/assets/protopo-treino-video.mp4.asset.json";
import posterAsset from "@/assets/protopo-treino-capa.jpg.asset.json";

interface VideoSectionProps {
  /** Etiqueta opcional acima do título (ex.: futura edição de outono). */
  badge?: string;
  /** Conteúdo opcional por baixo da descrição (ex.: botão de uma futura edição). */
  cta?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Conteúdo extra entre a descrição e o CTA (ex.: datas, destaque). */
  extra?: ReactNode;
}

const VideoSection = ({ badge = "ProTopo Academy", cta, title, description, extra }: VideoSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handlePlay = () => {
    setStarted(true);
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {
      /* se o browser bloquear, os controlos nativos ficam visíveis */
    });
  };

  return (
    <section id="video" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <AnimateOnScroll className="text-center md:text-left">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              {badge}
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              {title ?? <>O treino fala <span className="text-gradient-gold">por si.</span></>}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              {description ?? "Conhece a energia, a dedicação e o acompanhamento que fazem parte da experiência ProTopo."}
            </p>
            <div className="hidden md:block h-px w-24 bg-gradient-gold mt-8" />
            {extra}
            {cta && <div className="mt-8">{cta}</div>}
          </AnimateOnScroll>

          <AnimateOnScroll delay={150} className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[320px] md:max-w-[360px]">
              <div className="absolute -inset-3 rounded-[2rem] bg-primary/10 blur-2xl pointer-events-none" />
              <div className="relative aspect-[9/16] rounded-[1.75rem] overflow-hidden border border-primary/30 bg-card shadow-2xl ring-1 ring-primary/10">
                <video
                  ref={videoRef}
                  src={videoAsset.url}
                  poster={posterAsset.url}
                  preload="none"
                  playsInline
                  controls={started}
                  controlsList="nodownload"
                  className="absolute inset-0 w-full h-full object-contain bg-background"
                  aria-label="Vídeo promocional ProTopo Academy"
                />

                {!started && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label="Reproduzir vídeo"
                    className="group absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-background/80 via-background/10 to-background/20 transition-colors hover:bg-background/10"
                  >
                    <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-gold text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110" style={{ animation: "pulse-gold 2s infinite" }}>
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </span>
                    <span className="absolute bottom-6 font-heading uppercase tracking-[0.2em] text-sm text-foreground/90">
                      Ver vídeo · 0:45
                    </span>
                  </button>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
