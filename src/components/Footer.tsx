import { Instagram, Mail, MapPin, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contactos" className="relative pt-20 pb-8 bg-card overflow-hidden">
      {/* Subtle gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--gold)/0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center gap-8 mb-12">
          <img src={logo} alt="ProTopo Academy" className="h-14" />

          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Academia de treinos personalizados focada no desenvolvimento individual de cada atleta.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a
              href="mailto:protopoacademy@gmail.com"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors text-sm group"
            >
              <span className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              protopoacademy@gmail.com
            </a>
            <a
              href="https://www.instagram.com/protopo_academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors text-sm group"
            >
              <span className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </span>
              @protopo_academy
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} ProTopo Academy. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
