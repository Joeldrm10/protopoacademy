import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

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
              dados recolhemos quando marcas um treino na ProTopo Academy, para que servem e quais são os
              teus direitos.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              1. Que dados recolhemos
            </h2>
            <p className="mb-3 text-muted-foreground">
              Quando preencheres o formulário de marcação, pedimos apenas o essencial:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Nome</li>
              <li>Idade</li>
              <li>Número de telemóvel</li>
              <li>Tipo de treino, data e hora pretendidos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              2. Para que servem os teus dados
            </h2>
            <p className="text-muted-foreground">
              Os teus dados são usados <strong className="text-foreground">apenas</strong> para organizar o
              teu treino e para entrarmos em contacto contigo (por chamada ou WhatsApp) a confirmar a
              marcação. Não enviamos publicidade nem usamos os teus dados para qualquer outro fim.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              3. Partilha com terceiros
            </h2>
            <p className="text-muted-foreground">
              Os teus dados <strong className="text-foreground">não são partilhados, vendidos nem cedidos</strong>{" "}
              a outras empresas ou pessoas. Apenas a equipa da ProTopo Academy tem acesso à informação.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              4. Segurança
            </h2>
            <p className="text-muted-foreground">
              Os dados são tratados com medidas de segurança adequadas para proteger a informação
              pessoal dos utilizadores e mantidos apenas durante o tempo estritamente necessário
              para gerir a marcação. Depois disso, são eliminados.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              5. Menores de idade
            </h2>
            <p className="text-muted-foreground">
              Se o utilizador tiver menos de 18 anos, recomenda-se que o pedido seja feito com
              autorização de um encarregado de educação.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              6. Os teus direitos
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
              7. Responsável pelo tratamento dos dados
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
                <span className="text-foreground font-medium">Email:</span> protopoacademy@gmail.com
              </p>
              <p>
                <span className="text-foreground font-medium">Instagram:</span>{" "}
                <a
                  href="https://www.instagram.com/protopo_academy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @protopo_academy
                </a>
              </p>
            </div>
            <a
              href="mailto:protopoacademy@gmail.com?subject=Pedido%20relativo%20a%20dados%20pessoais"
              className="inline-flex items-center gap-2.5 bg-gradient-gold text-primary-foreground px-5 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              Contactar responsável
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
