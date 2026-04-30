import { useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import KitSection from "@/components/KitSection";

import FAQSection from "@/components/FAQSection";
import heroImg from "@/assets/hero-servicos-desktop.jpg";
import heroImgMobile from "@/assets/hero-servicos-mobile.jpg";

const Servicos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Treinos de Futebol | ProTopo Academy"
        description="Treinos individuais e em grupo para jovens dos 6 aos 16 anos. Foco na evolução técnica, confiança e performance."
        ogTitle="Treinos de Futebol Personalizados"
        ogDescription="Escolhe treino individual ou em grupo e evolui ao teu ritmo."
        ogImage="/og/servicos.jpg"
        path="/servicos"
      />
      <Navbar />
      <PageHero
        title="Os nossos"
        highlight="treinos"
        subtitle="Treinos personalizados para evoluíres ao teu ritmo, com planos adaptados a cada atleta."
        image={heroImg}
        imageMobile={heroImgMobile}
        objectPositionStyle="85% 50%"
      />
      <ServicesSection />
      <PricingSection />
      <KitSection />
      
      <FAQSection
        title={<>Dúvidas sobre os <span className="text-gradient-gold">treinos</span></>}
        subtitle="Tudo o que precisas de saber antes de marcares o teu treino regular."
        faqs={[
          { question: "Para que idades são os treinos?", answer: "Os treinos são destinados a jovens atletas dos 6 aos 16 anos, com grupos organizados por faixa etária e nível de desenvolvimento." },
          { question: "Os treinos são individuais ou em grupo?", answer: "Oferecemos ambos os formatos. O treino individual é totalmente personalizado e o treino em grupo tem um máximo de 6 atletas para garantir acompanhamento próximo." },
          { question: "Onde decorrem os treinos?", answer: "Os treinos decorrem no Campo da Caridade, em Ourém. Podes ver a localização exata na nossa página de contacto." },
          { question: "Com que frequência são realizados?", answer: "A frequência é ajustada aos objetivos de cada atleta. Recomendamos pelo menos uma sessão semanal para garantir evolução consistente." },
          { question: "Preciso de experiência prévia?", answer: "Não. Os treinos são adaptados a cada atleta, independentemente do nível de experiência. O importante é a vontade de aprender e evoluir." },
          { question: "Como faço a marcação?", answer: "Podes marcar diretamente através do formulário na página de contacto ou falar connosco pelo Instagram. Respondemos rapidamente para confirmar o horário." },
          { question: "É necessário equipamento próprio?", answer: "Os atletas devem trazer equipamento desportivo adequado e chuteiras. Para qualquer atividade especial, daremos indicações com antecedência." },
        ]}
      />
      <Footer />
    </div>
  );
};

export default Servicos;
