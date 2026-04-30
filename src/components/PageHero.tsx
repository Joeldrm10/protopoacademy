interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  /** Optional separate image for mobile (<md). Falls back to `image` if not provided. */
  imageMobile?: string;
  highlight?: string;
  layout?: "overlay" | "split";
  /** Tailwind object-position class for desktop (md+). Ex: "md:object-center" */
  objectPositionDesktop?: string;
  /** Tailwind object-position class for mobile (default). Ex: "object-top" */
  objectPositionMobile?: string;
  /** Inline CSS object-position (highest priority, applies on all sizes). Ex: "70% center" */
  objectPositionStyle?: string;
}

const PageHero = ({
  title,
  subtitle,
  image,
  imageMobile,
  highlight,
  layout = "overlay",
  objectPositionDesktop = "md:object-center",
  objectPositionMobile = "object-center",
  objectPositionStyle,
}: PageHeroProps) => {
  const imageAlt = highlight ? `${title} ${highlight}` : title;
  const mobileSrc = imageMobile ?? image;
  const imgStyle = objectPositionStyle ? { objectPosition: objectPositionStyle } : undefined;

  if (layout === "split") {
    return (
      <section className="relative overflow-hidden bg-background pt-28 pb-12 md:pt-36 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-16">
            <div className="relative z-10 max-w-2xl animate-fade-in-up text-left">
              <h1 className="text-headline mb-4">
                {title}
                {highlight && <span className="block text-gradient-gold mt-1">{highlight}</span>}
              </h1>
              <p className="text-body text-muted-foreground max-w-xl">{subtitle}</p>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border/60 bg-secondary md:aspect-[16/11] lg:aspect-[5/4]">
                <picture>
                  <source media="(min-width: 768px)" srcSet={image} />
                  <img
                    src={mobileSrc}
                    alt={imageAlt}
                    className={`absolute inset-0 h-full w-full object-cover ${objectPositionMobile} ${objectPositionDesktop}`}
                    style={imgStyle}
                    width={1920}
                    height={1280}
                    fetchPriority="high"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-background/12 via-background/0 to-background/8 md:bg-gradient-to-r md:from-background/6 md:via-transparent md:to-background/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] min-h-[440px] md:h-[65vh] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={image} />
          <img
            src={mobileSrc}
            alt={imageAlt}
            className={`w-full h-full object-cover ${objectPositionMobile} ${objectPositionDesktop}`}
            style={imgStyle}
            width={1920}
            height={1024}
            fetchPriority="high"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background/85" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-headline mb-4">
            {title}
            {highlight && <span className="block text-gradient-gold mt-1">{highlight}</span>}
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
