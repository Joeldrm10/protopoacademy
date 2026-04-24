import { MapPin, Mail, ArrowUp, MessageCircle, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/351911102405?text=Ol%C3%A1,%20quero%20marcar%20um%20treino";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Footcamp", href: "/footcamp" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contacto", href: "/contacto" },
  ];

  const trainingLinks = [
    { label: "Treinos individuais", href: "/servicos" },
    { label: "Treinos de grupo", href: "/servicos" },
    { label: "Footcamp", href: "/footcamp" },
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contactos" className="relative pt-20 pb-8 bg-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--gold)/0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* CTA destacado */}
        <div className="relative mb-14 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-10 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
                Marca já o teu <span className="text-gradient-gold">treino</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-md">
                Dá o próximo passo na tua evolução. Reserva o teu lugar hoje.
              </p>
            </div>
            <Link
              to="/marcacoes"
              className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-7 py-3.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Marcar treino
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12">
          {/* Coluna 1 - Marca */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img src={logo} alt="ProTopo Academy" className="h-12 mb-3" />
            <h3 className="font-heading font-bold text-foreground text-base mb-2">
              ProTopo Academy
            </h3>
            <p className="text-muted-foreground text-sm max-w-[240px] leading-relaxed">
              Treinos personalizados para atletas que querem evoluir.
            </p>
          </div>

          {/* Coluna 2 - Navegação */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-base mb-4 uppercase tracking-wider">
              Navegação
            </h4>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={link.href === "/" ? handleHomeClick : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 3 - Treinos */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-base mb-4 uppercase tracking-wider">
              Treinos
            </h4>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              {trainingLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Coluna 4 - Contacto */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-base mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <span className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href="mailto:protopoacademy@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <span className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="text-sm">protopoacademy@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span className="p-2 rounded-full bg-muted">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-sm">Campo da Caridade, Ourém</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ProTopo Academy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/politica-privacidade"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Privacidade
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
