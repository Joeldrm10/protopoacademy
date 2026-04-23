interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  highlight?: string;
  layout?: "overlay" | "split";
  /** Tailwind object-position class for desktop (md+). Ex: "md:object-center" */
  objectPositionDesktop?: string;
  /** Tailwind object-position class for mobile (default). Ex: "object-top" */
  objectPositionMobile?: string;
}

const PageHero = ({
  title,
  subtitle,
  image,
  highlight,
  layout = "overlay",
  objectPositionDesktop = "md:object-center",
  objectPositionMobile = "object-center",
}: PageHeroProps) => {
  const imageAlt = highlight ? `${title} ${highlight}` : title;

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
                <img
                  src={image}
                  alt={imageAlt}
                  className={`absolute inset-0 h-full w-full object-cover ${objectPositionMobile} ${objectPositionDesktop}`}
                  width={1920}
                  height={1280}
                  fetchPriority="high"
                />
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
        <img
          src={image}
          alt={imageAlt}
          className={`w-full h-full object-cover ${objectPositionMobile} ${objectPositionDesktop}`}
          width={1920}
          height={1024}
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/38 to-background/88" />
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
