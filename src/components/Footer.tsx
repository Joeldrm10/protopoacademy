import { Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="contactos" className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ProTopo Academy" className="h-10" />
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:protopoacademy@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              protopoacademy@gmail.com
            </a>
            <a
              href="https://www.instagram.com/protopo_academy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              @protopo_academy
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} ProTopo Academy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
