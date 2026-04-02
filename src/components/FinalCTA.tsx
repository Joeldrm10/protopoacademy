import AnimateOnScroll from "./AnimateOnScroll";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <AnimateOnScroll>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
            Estás pronto para subir de <span className="text-gradient-gold">nível</span>?
          </h2>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-gold text-primary-foreground px-10 py-4 rounded-md font-heading font-bold text-lg uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            👉 Inscreve-te já
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FinalCTA;
