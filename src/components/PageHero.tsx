interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  highlight?: string;
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
  objectPositionDesktop = "md:object-center",
  objectPositionMobile = "object-center",
}: PageHeroProps) => {
  return (
    <section className="relative h-[60vh] min-h-[440px] md:h-[65vh] md:min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${objectPositionMobile} ${objectPositionDesktop}`}
          width={1920}
          height={1024}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background" />
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
