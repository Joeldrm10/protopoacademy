import { Instagram, Mail, ArrowUp, MessageCircle, ShieldCheck } from "lucide-react";
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
    { label: "Treinos", href: "#servicos" },
    { label: "Galeria", href: "/galeria" },
    { label: "Footcamp", href: "/footcamp" },
  ];

  const infoLinks = [
    { label: "FAQ", href: "#faq" },
    { label: "Localização", href: "#localizacao" },
  ];

  const legalLinks = [
    { label: "Política de Privacidade", href: "/politica-privacidade" },
    { label: "Termos e Condições", href: "/termos-condicoes" },
  ];

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  const renderAnchorLink = (link: { label: string; href: string }) => {
    if (link.href.startsWith("#")) {
      return (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleAnchorClick(e, link.href)}
          className="text-muted-foreground hover:text-primary transition-colors text-sm"
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link
        key={link.label}
        to={link.href}
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <footer id="contactos" className="relative pt-20 pb-8 bg-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-gold" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--gold)/0.08)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img src={logo} alt="ProTopo Academy" className="h-14 mb-4" />
            <h3 className="font-heading font-bold text-foreground text-lg mb-2">
              ProTopo Academy
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Treinos personalizados de futebol focados na evolução real dos atletas.
            </p>
          </div>

          {/* Navegação */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-lg mb-4 uppercase tracking-wider text-sm">
              Navegação
            </h4>
            <div className="flex flex-col gap-2.5 items-center sm:items-start">
              {navLinks.map(renderNavLink)}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-lg mb-4 uppercase tracking-wider text-sm">
              Legal
            </h4>
            <div className="flex flex-col gap-2.5 items-center sm:items-start">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 max-w-[220px] text-center sm:text-left">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/70 mt-0.5 shrink-0" />
              <span>Dados protegidos e utilizados apenas para efeitos de contacto.</span>
            </p>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-heading font-bold text-foreground text-lg mb-4 uppercase tracking-wider text-sm">
              Contacto
            </h4>
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
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
