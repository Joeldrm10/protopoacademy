import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
              Os presentes Termos e Condições aplicam-se a todos os utilizadores que marquem treinos
              com a ProTopo Academy. Ao efetuar uma marcação, o utilizador declara que leu, compreendeu
              e aceita as condições abaixo descritas.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">1. Marcação de treinos</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>As marcações são efetuadas através do formulário disponível no site.</li>
              <li>Toda a marcação está <strong className="text-foreground">sujeita a confirmação</strong> por parte da ProTopo Academy.</li>
              <li>O treino só é considerado confirmado após contacto direto da nossa equipa (telefone ou WhatsApp).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">2. Cancelamento e reagendamento</h2>
            <p className="text-muted-foreground mb-3">
              Em caso de impossibilidade de comparecer, o utilizador deve avisar com a maior antecedência possível.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Cancelamentos ou reagendamentos devem ser comunicados com pelo menos <strong className="text-foreground">24 horas de antecedência</strong>.</li>
              <li>Avisos abaixo deste prazo poderão não permitir a remarcação do treino.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">3. Faltas e atrasos</h2>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>A falta sem aviso prévio pode implicar a perda do treino marcado.</li>
              <li>Em caso de atraso, o tempo de treino poderá ser reduzido para não comprometer marcações seguintes.</li>
              <li>Atrasos superiores a 15 minutos podem levar ao cancelamento da sessão.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">4. Responsabilidade do utilizador</h2>
            <p className="text-muted-foreground">
              Durante os treinos, o utilizador compromete-se a seguir as orientações dos treinadores,
              utilizar equipamento adequado e informar previamente sobre qualquer condição médica,
              lesão ou limitação física que possa afetar a prática desportiva.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">5. Alteração de horários</h2>
            <p className="text-muted-foreground">
              A ProTopo Academy reserva-se o direito de alterar horários de treinos por motivos
              meteorológicos, logísticos ou de força maior, comprometendo-se a comunicar a alteração
              ao utilizador com a maior brevidade possível e a propor uma nova data.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">6. Isenção de responsabilidade</h2>
            <p className="text-muted-foreground">
              A prática desportiva envolve riscos inerentes. A ProTopo Academy não se responsabiliza
              por lesões, acidentes ou danos resultantes da prática desportiva, desde que a atividade
              decorra dentro das normas de segurança e das instruções dadas pelos treinadores.
              Recomenda-se que o utilizador esteja apto fisicamente para a prática desportiva.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">7. Menores de idade</h2>
            <p className="text-muted-foreground">
              Utilizadores com menos de 18 anos devem efetuar a marcação com autorização de um
              encarregado de educação, que assume a responsabilidade pela inscrição.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">8. Aceitação dos termos</h2>
            <p className="text-muted-foreground">
              Ao submeter o formulário de marcação, o utilizador confirma que leu e aceita
              integralmente os presentes Termos e Condições, bem como a{" "}
              <Link to="/politica-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4">
              Para qualquer dúvida, contacta-nos através de{" "}
              <a href="mailto:protopoacademy@gmail.com?subject=Pedido%20de%20informa%C3%A7%C3%A3o&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20treinos." className="text-primary hover:underline">
                protopoacademy@gmail.com
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
