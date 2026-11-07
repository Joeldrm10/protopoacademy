import { Mail } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EMAIL, EMAIL_URL_GERAL, EMAIL_URL_DADOS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/constants";

const PoliticaPrivacidade = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
          Política de <span className="text-gradient-gold">Privacidade</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Última atualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <div className="space-y-10 text-foreground/90 leading-relaxed">
          <section>
            <p className="text-muted-foreground">
              A tua privacidade é importante para nós. Esta página explica, de forma simples e clara, que
              dados recolhemos quando efetuas a inscrição no Footcamp da ProTopo Academy, para que servem e quais são os
              teus direitos.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              1. Que dados recolhemos
            </h2>
            <p className="mb-3 text-muted-foreground">
              Os dados são recolhidos para inscrições de atletas com idades compreendidas entre os 6 e os 16 anos.
              Quando preencheres o formulário de inscrição, pedimos apenas o essencial:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Nome</li>
              <li>Idade</li>
              <li>Número de telemóvel</li>
              <li>Edição e período de participação, data de nascimento, clube, posição e escalão</li>
              <li>Dados e contactos do encarregado de educação e contacto de emergência</li>
              <li>Informações médicas, alergias, medicação e restrições alimentares relevantes</li>
              <li>Tamanhos do equipamento, irmãos indicados, participação anterior e situação do seguro</li>
              <li>Consentimentos e autorização de imagem</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              2. Para que servem os teus dados
            </h2>
            <p className="text-muted-foreground">
              Os teus dados são usados <strong className="text-foreground">apenas</strong> para organizar a
              tua participação no Footcamp e para entrarmos em contacto contigo (por chamada ou WhatsApp) a confirmar a
              inscrição. Não enviamos publicidade nem usamos os teus dados para qualquer outro fim.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              3. Base legal do tratamento de dados
            </h2>
            <p className="text-muted-foreground">
              Os dados pessoais são tratados com base no consentimento do utilizador e na necessidade de gestão da inscrição, comunicação com os participantes e organização do Footcamp da ProTopo Academy.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              4. Partilha com terceiros
            </h2>
            <p className="text-muted-foreground">
              Os teus dados <strong className="text-foreground">não são partilhados, vendidos nem cedidos</strong>{" "}
              a outras empresas ou pessoas. Apenas a equipa da ProTopo Academy tem acesso à informação.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              5. Segurança e conservação dos dados
            </h2>
            <p className="text-muted-foreground">
              Os dados são tratados com medidas de segurança adequadas para proteger a informação
              pessoal dos utilizadores. Os dados pessoais serão conservados apenas durante o período necessário à gestão da inscrição, participação e acompanhamento relacionado com o Footcamp, sendo posteriormente eliminados, salvo quando exista obrigação legal que imponha a sua conservação por um período superior.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              6. Menores de idade
            </h2>
            <p className="text-muted-foreground">
              As inscrições de participantes menores de idade devem ser efetuadas ou autorizadas pelo respetivo encarregado de educação.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              7. Os teus direitos
            </h2>
            <p className="mb-3 text-muted-foreground">
              A qualquer momento podes pedir-nos para:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Saber que dados temos sobre ti</li>
              <li>Corrigir informação que esteja errada</li>
              <li>Eliminar os teus dados</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Basta enviar-nos um pedido por email e tratamos disso o mais rapidamente possível.
            </p>
          </section>

          <section className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8">
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              8. Responsável pelo tratamento dos dados
            </h2>
            <p className="text-muted-foreground mb-5">
              O responsável pela recolha e tratamento dos teus dados pessoais é a{" "}
              <strong className="text-foreground">ProTopo Academy</strong>. Para qualquer pedido
              relacionado com os teus dados — acesso, alteração, remoção ou esclarecimento de dúvidas —
              contacta-nos diretamente:
            </p>
            <div className="space-y-2 mb-6 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-medium">Entidade:</span> ProTopo Academy
              </p>
              <p>
                <span className="text-foreground font-medium">Email:</span>{" "}
                <a
                  href={EMAIL_URL_GERAL}
                  className="text-primary hover:underline"
                >
                  {EMAIL}
                </a>
              </p>
              <p>
                <span className="text-foreground font-medium">Instagram:</span>{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @{INSTAGRAM_HANDLE}
                </a>
              </p>
            </div>
            <a
              href={EMAIL_URL_DADOS}
              className="inline-flex items-center gap-2.5 bg-gradient-gold text-primary-foreground px-5 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              Contactar responsável
            </a>
          </section>

          <section>
            <p className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-4">
              Ao submeter o formulário, o utilizador confirma que leu e aceita esta Política de Privacidade.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
