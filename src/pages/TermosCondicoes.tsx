import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EMAIL, EMAIL_URL_GERAL } from "@/lib/constants";

const TermosCondicoes = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
          Termos e <span className="text-gradient-gold">Condições</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <p className="text-muted-foreground">
              Os presentes Termos e Condições aplicam-se a todos os utilizadores que efetuem a inscrição no Footcamp Verão 2026 da ProTopo Academy. Ao submeter o formulário de inscrição, o utilizador declara que leu, compreendeu e aceita as condições abaixo descritas.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">1. Inscrições</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>A inscrição é efetuada através do formulário disponibilizado pela ProTopo Academy.</li>
              <li>O envio do formulário <strong className="text-foreground">não garante automaticamente a vaga</strong>.</li>
              <li>A inscrição apenas fica confirmada após validação da disponibilidade, contacto da equipa ProTopo e confirmação do pagamento.</li>
              <li>As vagas são limitadas e atribuídas por ordem de confirmação.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">2. Pagamentos</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Os pagamentos podem ser efetuados pelos métodos disponibilizados pela ProTopo Academy.</li>
              <li>Após a inscrição, a equipa entrará em contacto para fornecer os dados necessários.</li>
              <li>A vaga apenas fica garantida após confirmação do pagamento.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">3. Seguro Desportivo</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>O seguro anual é <strong className="text-foreground">obrigatório</strong> para todos os participantes.</li>
              <li>O valor do seguro é definido pela organização.</li>
              <li>Nas campanhas ou promoções em que seja indicado, o seguro poderá ser oferecido sem custo adicional.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">4. Menores de Idade</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Todos os participantes são menores de idade.</li>
              <li>A inscrição deve ser efetuada ou autorizada pelo respetivo encarregado de educação.</li>
              <li>A ProTopo Academy poderá solicitar confirmação da autorização sempre que necessário.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">5. Cancelamentos e Alterações</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>A organização reserva-se o direito de alterar horários, atividades, treinadores ou outros elementos do programa por motivos operacionais, climatéricos, de segurança ou força maior.</li>
              <li>Qualquer alteração relevante será comunicada aos encarregados de educação.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">6. Responsabilidade</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Os encarregados de educação declaram que as informações fornecidas na inscrição são verdadeiras e completas.</li>
              <li>Qualquer informação médica, alergia, restrição alimentar ou necessidade especial relevante deverá ser comunicada através do formulário de inscrição.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">7. Isenção de responsabilidade</h2>
            <p className="text-muted-foreground">
              A prática desportiva envolve riscos inerentes. A ProTopo Academy não se responsabiliza por lesões, acidentes ou danos resultantes da prática desportiva, desde que a atividade decorra dentro das normas de segurança e das instruções dadas pelos treinadores. Recomenda-se que o participante esteja apto fisicamente para a prática desportiva.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">8. Contactos</h2>
            <p className="mb-3 text-muted-foreground">
              Para esclarecimento de dúvidas relacionadas com inscrições, participação ou proteção de dados:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>
                <span className="text-foreground font-medium">Email:</span>{" "}
                <a href={EMAIL_URL_GERAL} className="text-primary hover:underline">
                  {EMAIL}
                </a>
              </li>
              <li>
                <span className="text-foreground font-medium">WhatsApp:</span>{" "}
                <a href={WHATSAPP_URL_GERAL} className="text-primary hover:underline">
                  {WHATSAPP_NUMBER_EXPORT}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">9. Aceitação dos termos</h2>
            <p className="text-muted-foreground">
              Ao submeter o formulário de inscrição, o utilizador confirma que leu e aceita integralmente os presentes Termos e Condições, bem como a{" "}
              <Link to="/politica-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4">
              Para qualquer dúvida, contacta-nos através de{" "}
              <a href={EMAIL_URL_GERAL} className="text-primary hover:underline">
                {EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosCondicoes;
