import AnimateOnScroll from "./AnimateOnScroll";
import { Badge } from "./ui/badge";
import teamNuno from "@/assets/team-nuno.jpg";
import teamJoao from "@/assets/team-joao.jpg";
import teamLucas from "@/assets/team-lucas.jpg";
import teamJeremy from "@/assets/team-jeremy.jpg";

interface TeamMember {
  name: string;
  role: string;
  specialty?: string;
  description: string;
  image: string;
}

const leadership: TeamMember[] = [
  {
    name: "Nuno Rodrigues",
    role: "Co-Fundador & CEO | Treinador",
    description:
      "Responsável pela visão e desenvolvimento da ProTopo Academy, Nuno Rodrigues acompanha de perto a evolução dos atletas, com especial foco no trabalho técnico de passe e receção. A sua abordagem centra-se na consistência, na qualidade do gesto técnico e na melhoria contínua do desempenho individual.",
    image: teamNuno,
  },
  {
    name: "João Alves",
    role: "Co-Fundador & CEO | Treinador",
    description:
      "Co-fundador da ProTopo Academy, João Alves é especialista em preparação física, trabalhando o desenvolvimento da resistência, velocidade e intensidade de jogo. A sua metodologia procura potenciar o rendimento físico dos atletas, preparando-os para responder às exigências do jogo.",
    image: teamJoao,
  },
];

const technicalTeam: TeamMember[] = [
  {
    name: "Nuno Rodrigues",
    role: "Treinador",
    specialty: "Passe e Receção",
    description:
      "Focado no desenvolvimento técnico, Nuno Rodrigues trabalha sobretudo o passe e a receção, garantindo maior controlo de jogo, precisão e qualidade nas decisões dos atletas.",
    image: teamNuno,
  },
  {
    name: "João Alves",
    role: "Treinador",
    specialty: "Preparação Física",
    description:
      "Responsável pela componente física, João Alves desenvolve treinos orientados para melhorar a capacidade física, intensidade e desempenho global dos atletas em campo.",
    image: teamJoao,
  },
  {
    name: "Lucas Marques",
    role: "Treinador",
    specialty: "Finalização",
    description:
      "Especialista em finalização, Lucas Marques trabalha a eficácia ofensiva dos atletas, ajudando-os a melhorar o remate, a tomada de decisão em zonas de finalização e a confiança no momento de marcar.",
    image: teamLucas,
  },
  {
    name: "Jérémy Pereira",
    role: "Treinador de Guarda-Redes",
    specialty: "Guarda-Redes",
    description:
      "Responsável pelo treino específico de guarda-redes, Jérémy Pereira desenvolve competências técnicas e posicionais, trabalhando reflexos, tomada de decisão e segurança entre os postes.",
    image: teamJeremy,
  },
];

const MemberCard = ({ member, delay, featured = false }: { member: TeamMember; delay: number; featured?: boolean }) => (
  <AnimateOnScroll delay={delay}>
    <div
      className={`group relative overflow-hidden rounded-xl border transition-all duration-500 ${
        featured
          ? "border-primary/30 bg-card hover:border-primary/60"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          width={512}
          height={640}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: member.name === "João Alves" ? "center 20%" : "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading font-bold text-xl text-foreground">{member.name}</h3>
          <p className="text-primary text-sm font-medium mt-1">{member.role}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-3">
        {member.specialty && (
          <Badge className="mb-3 bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
            {member.specialty}
          </Badge>
        )}
        <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
      </div>
    </div>
  </AnimateOnScroll>
);

const TeamSection = () => {
  return (
    <section id="equipa" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-6">
          <p className="text-primary font-heading font-semibold uppercase tracking-[0.25em] text-sm mb-4">
            Quem somos
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            A Nossa <span className="text-gradient-gold">Equipa</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Conhece os profissionais responsáveis por acompanhar, orientar e desenvolver cada atleta na ProTopo Academy.
          </p>
        </AnimateOnScroll>

        {/* Leadership */}
        <AnimateOnScroll className="mb-4">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/40" />
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">Direção</h3>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
          {leadership.map((member, i) => (
            <MemberCard key={member.name + "-lead"} member={member} delay={i * 150} featured />
          ))}
        </div>

        {/* Technical Team */}
        <AnimateOnScroll className="mb-4">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/40" />
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">Equipa Técnica</h3>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {technicalTeam.map((member, i) => (
            <MemberCard key={member.name + "-tech"} member={member} delay={i * 100} />
          ))}
        </div>

        {/* Final quote */}
        <AnimateOnScroll className="text-center">
          <div className="max-w-3xl mx-auto border border-primary/20 rounded-xl p-8 bg-card/50 backdrop-blur-sm">
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              "Uma equipa especializada, dedicada a desenvolver cada atleta de forma completa, combinando{" "}
              <span className="text-primary font-medium not-italic">técnica</span>,{" "}
              <span className="text-primary font-medium not-italic">físico</span> e{" "}
              <span className="text-primary font-medium not-italic">inteligência de jogo</span>."
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TeamSection;
