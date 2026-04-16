import { Instagram, Mail, ArrowUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Equipa", href: "#equipa" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  return (
    <footer id="contactos" className="relative pt-20 pb-8 bg-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--gold)/0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="ProTopo Academy" className="h-14 mb-4" />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed text-center md:text-left">
              Academia de treinos personalizados focada no desenvolvimento individual de cada atleta.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading font-bold text-foreground text-lg mb-4">Links Rápidos</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading font-bold text-foreground text-lg mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
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

            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              Inscreve-te
            </a>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-center">
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-2 text-xs">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} ProTopo Academy. Todos os direitos reservados.
            </p>
            <span className="hidden sm:inline text-muted-foreground/40">·</span>
            <Link
              to="/politica-privacidade"
              className="font-medium text-foreground/80 hover:text-primary transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              Política de Privacidade
            </Link>
          </div>
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
