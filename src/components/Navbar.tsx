import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, X, Menu, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/351911102405?text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20um%20treino%20na%20ProTopo%20Academy.";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open (preserve scroll position, works on iOS/Android)
  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const previousHtmlScrollBehavior = html.style.scrollBehavior;

    // Disable smooth scroll temporarily so restore is instant (no visual jump)
    html.style.scrollBehavior = "auto";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      // Restore exact position instantly
      window.scrollTo(0, scrollY);
      // Restore previous scroll-behavior on next frame to avoid affecting the restore
      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousHtmlScrollBehavior;
      });
    };
  }, [menuOpen]);

  const isLinkActive = (href: string) => {
    // For full pages like /galeria, /footcamp
    if (href.startsWith("/") && href !== "/") {
      return location.pathname === href;
    }
    // For home page
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    // For anchor links on home page
    return location.pathname === "/" && location.hash === href;
  };

  const getLinkClasses = (href: string, isMobile = false) => {
    const active = isLinkActive(href);
    const baseClasses = isMobile
      ? "text-2xl font-heading font-bold uppercase tracking-wider transition-colors"
      : "text-sm font-medium uppercase tracking-wider font-heading transition-colors";
    
    if (active) {
      return `${baseClasses} text-primary`;
    }
    return `${baseClasses} text-foreground hover:text-primary`;
  };

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Serviços", href: "/servicos" },
    { label: "Galeria", href: "/galeria" },
    { label: "Footcamp", href: "/footcamp" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contacto", href: "/contacto" },
  ];

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
      return;
    }
    // Already on home — smooth scroll to anchor
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-2 relative z-50 cursor-pointer" aria-label="Ir para a página inicial">
          <img src={logo} alt="ProTopo Academy" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={link.href === "/" ? handleHomeClick : () => setMenuOpen(false)}
                className={getLinkClasses(link.href)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={getLinkClasses(link.href)}
              >
                {link.label}
              </a>
            )
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-2.5 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            Marcar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden relative z-[70] p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu - full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 w-screen bg-background backdrop-blur-md z-[60] flex flex-col items-center justify-center gap-6 overflow-y-auto transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          height: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 5rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        {navLinks.map((link) =>
          link.href.startsWith("/") ? (
            <Link
              key={link.href}
              to={link.href}
              onClick={link.href === "/" ? handleHomeClick : () => setMenuOpen(false)}
              className={getLinkClasses(link.href, true)}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={getLinkClasses(link.href, true)}
            >
              {link.label}
            </a>
          )
        )}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-10 py-4 rounded-lg font-heading font-bold text-lg uppercase tracking-wider"
        >
          Marcar
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;