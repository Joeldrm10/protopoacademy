import { MessageCircle, Instagram, Mail } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const WHATSAPP_URL =
  "https://wa.me/351911102405?text=" +
  encodeURIComponent("Olá, queria tirar algumas dúvidas sobre os treinos.");
const INSTAGRAM_URL = "https://www.instagram.com/protopoacademy/";
const EMAIL = "protopoacademy@gmail.com";

const DirectContactSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Contacto direto
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Fala diretamente <span className="text-gradient-gold">connosco</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Escolhe o canal que preferes. Respondemos rapidamente.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* WhatsApp - destaque */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center text-center bg-[#25D366] text-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:opacity-95 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg uppercase tracking-wider mb-1">
                Falar no WhatsApp
              </h3>
              <p className="text-white/85 text-sm">Resposta rápida e direta</p>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center text-center text-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:opacity-95 transition-all"
              style={{
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
                <Instagram className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-lg uppercase tracking-wider mb-1">
                Ver Instagram
              </h3>
              <p className="text-white/85 text-sm">@protopoacademy</p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group relative flex flex-col items-center text-center bg-card border border-border rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg uppercase tracking-wider mb-1 text-foreground">
                Enviar Email
              </h3>
              <p className="text-muted-foreground text-sm break-all">{EMAIL}</p>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default DirectContactSection;
