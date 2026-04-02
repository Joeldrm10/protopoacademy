import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Football Camp", href: "#camp" },
    { label: "Localização", href: "#localizacao" },
    { label: "Contactos", href: "#contactos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="ProTopo Academy" className="h-10" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-heading"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-gold text-primary-foreground px-5 py-2 rounded-md font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Inscreve-te
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-heading"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-gold text-primary-foreground px-5 py-3 rounded-md font-heading font-bold text-sm uppercase tracking-wider text-center"
          >
            Inscreve-te
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
