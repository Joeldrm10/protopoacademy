import type React from "react";
import { Instagram, MessageCircle } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_URL = "https://wa.me/351911102405?text=" + encodeURIComponent("Olá, gostaria de tirar algumas dúvidas sobre os treinos da ProTopo Academy.");
const INSTAGRAM_URL = "https://www.instagram.com/protopo_academy/";

export type FAQItem = { question: string; answer: string };

const defaultFaqs: FAQItem[] = [
  {
    question: "É preciso ter experiência para participar?",
    answer: "Não. Os treinos da ProTopo Academy podem ser frequentados por atletas com diferentes níveis de experiência. O mais importante é a vontade de aprender, evoluir e treinar com dedicação.",
  },
  {
    question: "O que é necessário levar para o treino?",
    answer: "Os atletas devem levar equipamento desportivo adequado, chuteiras e vontade de trabalhar. Sempre que necessário, a academia poderá dar indicações adicionais antes de atividades ou eventos específicos.",
  },
  {
    question: "Como funciona a inscrição?",
    answer: "A inscrição é feita de forma simples através do formulário disponível no site. Após o envio, a equipa da ProTopo Academy entra em contacto para confirmar os dados necessários e dar seguimento ao processo.",
  },
  {
    question: "E se chover?",
    answer: "Em caso de condições meteorológicas adversas, a situação será avaliada pela equipa da academia. Sempre que necessário, os encarregados de educação serão informados atempadamente sobre qualquer alteração.",
  },
  {
    question: "Os treinos são adaptados à idade dos atletas?",
    answer: "Sim. Os treinos são organizados tendo em conta a idade, o nível e as necessidades dos atletas, para garantir um acompanhamento adequado e uma evolução progressiva.",
  },
  {
    question: "Há acompanhamento de perto?",
    answer: "Sim. A ProTopo Academy valoriza o acompanhamento próximo de cada atleta, procurando desenvolver as suas capacidades técnicas, físicas e competitivas de forma personalizada.",
  },
  {
    question: "Como posso obter mais informações?",
    answer: "Os pais podem entrar em contacto com a ProTopo Academy através do Instagram ou do nosso email.",
  },
];

interface FAQSectionProps {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  faqs?: FAQItem[];
}

const FAQSection = ({
  title,
  subtitle = "Esclarecemos aqui algumas das dúvidas mais comuns dos pais sobre os treinos.",
  badge = "FAQ",
  faqs = defaultFaqs,
}: FAQSectionProps) => {
  const heading = title ?? (
    <>
      Perguntas <span className="text-gradient-gold">Frequentes</span>
    </>
  );
  return (
    <section id="faq" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              {badge}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              {heading}
            </h2>
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl bg-card px-6 overflow-hidden data-[state=open]:border-primary/30 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-heading font-semibold hover:no-underline hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={200}>
          <div className="text-center mt-16">
            <p className="text-muted-foreground text-lg mb-8">
              Ainda tens dúvidas? Entra em contacto connosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Tirar dúvidas no WhatsApp
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                }}
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FAQSection;
