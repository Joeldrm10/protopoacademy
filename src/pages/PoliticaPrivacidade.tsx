import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              1. Dados recolhidos
            </h2>
            <p className="mb-3">
              No âmbito da marcação de treinos, a ProTopo Academy recolhe os seguintes dados pessoais:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Nome completo</li>
              <li>Idade</li>
              <li>Número de telemóvel</li>
              <li>Tipo de treino, data e hora pretendidos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              2. Finalidade dos dados
            </h2>
            <p className="text-muted-foreground">
              Os dados recolhidos são utilizados <strong className="text-foreground">exclusivamente</strong> para
              gerir a marcação de treinos, confirmar a sessão e estabelecer contacto com o utilizador através de
              telefone ou WhatsApp. Não são utilizados para fins de marketing nem para qualquer outra finalidade
              que não a gestão da marcação solicitada.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              3. Partilha com terceiros
            </h2>
            <p className="text-muted-foreground">
              A ProTopo Academy <strong className="text-foreground">não partilha, vende nem cede</strong> os
              dados pessoais a terceiros. O acesso aos dados é restrito à equipa responsável pela gestão das
              marcações.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              4. Direitos do utilizador
            </h2>
            <p className="mb-3 text-muted-foreground">
              Em conformidade com o RGPD, o utilizador pode, a qualquer momento, solicitar:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Acesso aos seus dados pessoais</li>
              <li>Retificação ou atualização de dados incorretos</li>
              <li>Eliminação dos seus dados ("direito ao esquecimento")</li>
              <li>Oposição ao tratamento dos dados</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Para exercer estes direitos, contacta-nos através do email{" "}
              <a
                href="mailto:protopoacademy@gmail.com"
                className="text-primary hover:underline"
              >
                protopoacademy@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              5. Conservação dos dados
            </h2>
            <p className="text-muted-foreground">
              Os dados são conservados apenas durante o período necessário à gestão da marcação e cumprimento
              das obrigações legais aplicáveis, sendo posteriormente eliminados.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-bold text-2xl mb-3 text-foreground">
              6. Contacto
            </h2>
            <p className="text-muted-foreground">
              Para qualquer questão relacionada com esta Política de Privacidade, podes contactar-nos através
              do email{" "}
              <a
                href="mailto:protopoacademy@gmail.com"
                className="text-primary hover:underline"
              >
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

export default PoliticaPrivacidade;
