import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL_MARCAR } from "@/lib/constants";

const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_URL_MARCAR}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-4 z-40 lg:hidden w-14 h-14 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center shadow-xl hover:opacity-90 transition-opacity"
      style={{ animation: "pulse-gold 2s infinite" }}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default FloatingWhatsApp;
