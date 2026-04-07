import { Instagram } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SIGNUP_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehTziF9gbt6HgIV9hIP6ai7E6jUUXYAH1_NkifcbQSoZ-beA/viewform";

const faqs = [
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
    answer: "Em caso de condições meteorológicas adversas, a situação será avaliada pela equipa da academia. Sempre que necessário, os encarregados de educação serão informados atempadamente sobre qualquer alteração, adiamento ou ajuste da atividade.",
  },
  {
    question: "Os treinos são adaptados à idade dos atletas?",
    answer: "Sim. Os treinos são organizados tendo em conta a idade, o nível e as necessidades dos atletas, para garantir um acompanhamento adequado e uma evolução progressiva.",
  },
  {
    question: "Há acompanhamento individual?",
    answer: "Sim. A ProTopo Academy valoriza o acompanhamento próximo de cada atleta, procurando desenvolver as suas capacidades técnicas, físicas e competitivas de forma personalizada.",
  },
  {
    question: "Como posso obter mais informações?",
    answer: "Os pais podem entrar em contacto com a ProTopo Academy através do Instagram ou do formulário de inscrição disponível no site.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
              ❓ FAQ
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Perguntas <span className="text-gradient-gold">Frequentes</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Esclarecemos aqui algumas das dúvidas mais comuns dos pais sobre os treinos da ProTopo Academy.
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
                  className="border border-border rounded-lg bg-card px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-heading font-semibold hover:no-underline hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
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
              Ainda tens dúvidas? Entra em contacto connosco e teremos todo o gosto em ajudar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-gold text-primary-foreground px-8 py-4 rounded-md font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                👉 Inscrever agora
              </a>
              <a
                href="https://www.instagram.com/protopo_academy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-md font-heading font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
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
