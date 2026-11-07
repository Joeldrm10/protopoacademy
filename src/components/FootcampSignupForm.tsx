import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageCircle, Phone, Siren, Stethoscope, User as UserIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AnimateOnScroll from "./AnimateOnScroll";
import { WHATSAPP_NUMBER_EXPORT as WHATSAPP_NUMBER, WHATSAPP_URL_FOOTCAMP_INFO } from "@/lib/constants";

import { AUTUMN, AUTUMN_EDITION, autumnPrice } from "@/lib/footcampEdition";

const COOLDOWN_MS = 60_000;

const semanasOptions = [{ id: "outono", label: AUTUMN.week }];

const SEGURO_1_SEMANA = AUTUMN.insurance;
const DESCONTO_IRMAOS = AUTUMN.siblingRate;

const ptPhoneRegex = /^9\d{8}$/;

const tamanhos = ["6/8", "8/10", "10/12", "12/14", "XS", "S", "M", "L", "XL"] as const;
const posicoes = ["Guarda-redes", "Defesa", "Médio", "Avançado", "Várias posições"] as const;
const escaloes = ["Petiz", "Traquina", "Benjamim", "Infantil", "Iniciado", "Juvenil", "Outro"] as const;

const MIN_AGE = 6;
const MAX_AGE = 16;
// Datas-limite calculadas dinamicamente com base na data atual.
// Mais novo permitido: hoje - MIN_AGE anos. Mais velho permitido: (hoje - MAX_AGE anos) + 1 dia.
const getBirthDateRange = () => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());
  const minDate = new Date(today.getFullYear() - MAX_AGE - 1, today.getMonth(), today.getDate() + 1);
  const toIso = (d: Date) => d.toISOString().split("T")[0];
  return { min: toIso(minDate), max: toIso(maxDate) };
};

export const footcampSignupSchema = z.object({
  nome: z.string().trim().min(2, "Nome é obrigatório").max(100),
  data_nascimento: z.string().trim().min(1, "Data de nascimento é obrigatória").superRefine((v, ctx) => {
    const d = new Date(v);
    if (isNaN(d.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Data inválida" });
      return;
    }
    const { min, max } = getBirthDateRange();
    const t = d.getTime();
    if (t < new Date(min).getTime() || t > new Date(max).getTime()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Este Footcamp destina-se apenas a atletas dos ${MIN_AGE} aos ${MAX_AGE} anos.` });
    }
  }),

  idade: z.string().trim().min(1, "Idade é obrigatória"),
  clube_atual: z.string().trim().min(2, "Clube é obrigatório").max(100),
  posicao: z.enum(posicoes, { errorMap: () => ({ message: "Seleciona uma posição" }) }),
  escalao: z.enum(escaloes, { errorMap: () => ({ message: "Seleciona um escalão" }) }),
  encarregado: z.string().trim().min(2, "Nome do encarregado é obrigatório").max(100),
  telemovel: z.string().trim().refine(
    (val) => ptPhoneRegex.test(val.replace(/\s/g, "")),
    "Telemóvel inválido. 9 dígitos a começar por 9."
  ),
  email_encarregado: z.string().trim().email("Email inválido").max(150),
  emergencia_nome: z.string().trim().min(2, "Nome obrigatório").max(100),
  emergencia_parentesco: z.string().trim().min(2, "Parentesco obrigatório").max(50),
  emergencia_telemovel: z.string().trim().refine(
    (val) => ptPhoneRegex.test(val.replace(/\s/g, "")),
    "Telemóvel inválido. 9 dígitos a começar por 9."
  ),
  semanas: z.array(z.string()).min(1, "Seleciona pelo menos uma semana"),
  participacao: z.enum(["primeira", "anterior"], { errorMap: () => ({ message: "Seleciona uma opção" }) }),
  aceita_termos: z.literal(true, { errorMap: () => ({ message: "Aceita os Termos e Condições" }) }),
  irmaos: z.boolean().optional(),
  nome_irmaos: z.string().trim().max(200).optional(),
  tamanho_tshirt: z.enum(tamanhos, { errorMap: () => ({ message: "Seleciona um tamanho" }) }).optional(),
  tamanho_calcas: z.enum(tamanhos, { errorMap: () => ({ message: "Seleciona um tamanho" }) }).optional(),
  autorizacao_imagem: z.enum(["sim", "nao"], { errorMap: () => ({ message: "Seleciona uma opção" }) }),
  tem_alergias: z.enum(["sim", "nao"], { errorMap: () => ({ message: "Seleciona uma opção" }) }),
  alergias_descricao: z.string().trim().max(300).optional(),
  toma_medicacao: z.enum(["sim", "nao"], { errorMap: () => ({ message: "Seleciona uma opção" }) }),
  medicacao_descricao: z.string().trim().max(300).optional(),
  informacao_medica: z.string().trim().max(500).optional(),
  restricao_alimentar: z.enum(["sim", "nao"], { errorMap: () => ({ message: "Seleciona uma opção" }) }),
  restricao_alimentar_desc: z.string().trim().max(300).optional(),
  observacoes: z.string().max(500).optional(),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "Tens de autorizar o tratamento dos dados" }),
  }),
}).superRefine((d, ctx) => {
  if (d.participacao === "primeira") {
    if (!d.tamanho_tshirt) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["tamanho_tshirt"], message: "Seleciona o tamanho da T-shirt" });
    if (!d.tamanho_calcas) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["tamanho_calcas"], message: "Seleciona o tamanho dos calções" });
  }
}).refine((d) => !d.irmaos || (d.nome_irmaos && d.nome_irmaos.trim().length >= 2), {
  message: "Indica o nome do(s) irmão(s) inscrito(s)",
  path: ["nome_irmaos"],
}).refine((d) => d.restricao_alimentar !== "sim" || (d.restricao_alimentar_desc && d.restricao_alimentar_desc.trim().length >= 2), {
  message: "Indica a restrição alimentar",
  path: ["restricao_alimentar_desc"],
}).refine((d) => d.tem_alergias !== "sim" || (d.alergias_descricao && d.alergias_descricao.trim().length >= 2), {
  message: "Indica as alergias",
  path: ["alergias_descricao"],
}).refine((d) => d.toma_medicacao !== "sim" || (d.medicacao_descricao && d.medicacao_descricao.trim().length >= 2), {
  message: "Indica a medicação",
  path: ["medicacao_descricao"],
});

type FormData = z.infer<typeof footcampSignupSchema>;

const calcAge = (iso: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 0 && age < 120 ? String(age) : "";
};

type Summary = {
  nome: string;
  semanasLabels: string[];
  numSemanas: number;
  precoBase: number;
  seguroCusto: number;
  seguroOferta: boolean;
  irmaos: boolean;
  precoPrevisto: number;
};

const FootcampSignupForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSummary, setLastSummary] = useState<Summary | null>(null);
  const lastSubmitRef = useRef<number>(0);
  const submittingRef = useRef(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);


  const form = useForm<FormData>({
    resolver: zodResolver(footcampSignupSchema),
    defaultValues: {
      nome: "",
      data_nascimento: "",
      idade: "",
      clube_atual: "",
      posicao: undefined as unknown as "Defesa",
      escalao: undefined as unknown as "Benjamim",
      encarregado: "",
      telemovel: "",
      email_encarregado: "",
      emergencia_nome: "",
      emergencia_parentesco: "",
      emergencia_telemovel: "",
      semanas: ["outono"],
      participacao: undefined as unknown as "primeira",
      aceita_termos: false as unknown as true,
      irmaos: false,
      nome_irmaos: "",
      tamanho_tshirt: undefined as unknown as "M",
      tamanho_calcas: undefined as unknown as "M",
      autorizacao_imagem: undefined as unknown as "sim",
      tem_alergias: undefined as unknown as "nao",
      alergias_descricao: "",
      toma_medicacao: undefined as unknown as "nao",
      medicacao_descricao: "",
      informacao_medica: "",
      restricao_alimentar: undefined as unknown as "nao",
      restricao_alimentar_desc: "",
      observacoes: "",
      consentimento: false as unknown as true,
    },
  });

  const semanasSelecionadas = form.watch("semanas") || [];
  const irmaos = form.watch("irmaos");
  const restricaoAlimentar = form.watch("restricao_alimentar");
  const temAlergias = form.watch("tem_alergias");
  const tomaMedicacao = form.watch("toma_medicacao");
  const dataNascimento = form.watch("data_nascimento");

  // Auto-calculate age from birthdate
  useEffect(() => {
    if (dataNascimento) {
      const age = calcAge(dataNascimento);
      if (age) form.setValue("idade", age, { shouldValidate: true });
    }
  }, [dataNascimento]);

  const numSemanas = semanasSelecionadas.length;
  const precoBase = AUTUMN.base;
  const participouAnterior = form.watch("participacao") === "anterior";
  // Atleta anterior declara seguro anual existente; a validade é confirmada no Admin.
  const seguroOferta = false;
  const seguroCusto = autumnPrice(true).insurance;
  const subtotal = precoBase + seguroCusto;
  // O desconto irmãos só é aplicado após validação bidirecional no Admin.
  // No formulário mostramos sempre o subtotal como valor previsto.
  const precoPrevisto = subtotal;


  const onSubmit = async (data: FormData) => {
    if (submittingRef.current || submitted) return;
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      toast({ title: "Aguarda", description: "Espera 1 minuto entre envios.", variant: "destructive" });
      return;
    }
    submittingRef.current = true;
    setLoading(true);
    const whatsappWindow = window.open("about:blank", "_blank");
    try {
      const semanasLabels = data.semanas
        .map((id) => semanasOptions.find((s) => s.id === id)?.label)
        .filter(Boolean) as string[];

      const restricaoSim = data.restricao_alimentar === "sim";
      const restricaoDesc = restricaoSim ? (data.restricao_alimentar_desc?.trim() || null) : null;
      const autorizaImagem = data.autorizacao_imagem === "sim";
      const alergiasSim = data.tem_alergias === "sim";
      const alergiasDesc = alergiasSim ? (data.alergias_descricao?.trim() || null) : null;
      const medicacaoSim = data.toma_medicacao === "sim";
      const medicacaoDesc = medicacaoSim ? (data.medicacao_descricao?.trim() || null) : null;
      const infoMedica = data.informacao_medica?.trim() || null;

      const { error: dbError } = await supabase.from("marcacoes").insert({
        nome: data.nome,
        idade: data.idade,
        telemovel: data.telemovel,
        tipo: "footcamp",
        data: "2026-11-16",
        hora: "09:00–12:30",
        edicao: AUTUMN_EDITION,
        participou_anterior: data.participacao === "anterior",
        seguro_existente_declarado: data.participacao === "anterior",
        preco_base: precoBase,
        seguro_valor: seguroCusto,
        desconto_percentagem: 10,
        desconto_valor: 0,
        encarregado: data.encarregado,
        semanas: semanasLabels,
        seguro_anual: seguroOferta,
        desconto_irmaos: !!data.irmaos,
        nome_irmaos: data.irmaos ? (data.nome_irmaos?.trim() || null) : null,
        tamanho_tshirt: data.tamanho_tshirt ?? null,
        tamanho_calcas: data.tamanho_calcas ?? null,
        autorizacao_imagem: autorizaImagem,
        restricao_alimentar: restricaoSim,
        restricao_alimentar_desc: restricaoDesc,
        observacoes: data.observacoes || null,
        valor_total: precoPrevisto,
        estado: "pendente",
        data_nascimento: data.data_nascimento,
        clube_atual: data.clube_atual,
        posicao: data.posicao,
        escalao: data.escalao,
        email_encarregado: data.email_encarregado,
        emergencia_nome: data.emergencia_nome,
        emergencia_parentesco: data.emergencia_parentesco,
        emergencia_telemovel: data.emergencia_telemovel,
        tem_alergias: alergiasSim,
        alergias_descricao: alergiasDesc,
        toma_medicacao: medicacaoSim,
        medicacao_descricao: medicacaoDesc,
        informacao_medica: infoMedica,
      } as any);

      if (dbError) {
        whatsappWindow?.close();
        console.error("Erro ao guardar inscrição:", dbError);
        toast({ title: "Erro", description: "Não foi possível guardar a inscrição. Tenta novamente.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const seguroTxt = `Seguro anual: ${SEGURO_1_SEMANA}€${data.participacao === "anterior" ? " — provisório; 0€ apenas após confirmação de cobertura ainda válida" : ""}`;
      const parts = [
        `📋 NOVA INSCRIÇÃO FOOTCAMP OUTONO 2026`,
        ``,
        `👤 ATLETA`,
        `Nome: ${data.nome}`,
        `Data de nascimento: ${data.data_nascimento}`,
        `Idade: ${data.idade}`,
        `Clube atual: ${data.clube_atual}`,
        `Posição: ${data.posicao}`,
        `Escalão: ${data.escalao}`,
        ``,
        `👨‍👩‍👦 ENCARREGADO DE EDUCAÇÃO`,
        `Nome: ${data.encarregado}`,
        `Telemóvel: ${data.telemovel}`,
        `Email: ${data.email_encarregado}`,
        ``,
        `🚨 CONTACTO DE EMERGÊNCIA`,
        `Nome: ${data.emergencia_nome}`,
        `Parentesco: ${data.emergencia_parentesco}`,
        `Telemóvel: ${data.emergencia_telemovel}`,
        ``,
        `📅 PERÍODO: ${AUTUMN.dates}`,
        `Horário: ${AUTUMN.hours}`,
        `Participação: ${data.participacao === "anterior" ? "Já participou numa edição anterior" : "Primeira vez na ProTopo"}`,
        `Kit oficial: ${data.participacao === "anterior" ? "Não incluído (oferecido apenas na primeira inscrição)" : "Oferecido (primeira inscrição)"}`,
        ...semanasLabels.map((l) => `- ${l}`),
        ``,
        ...(data.participacao === "primeira" ? [`👕 EQUIPAMENTO`, `T-shirt: ${data.tamanho_tshirt}`, `Calções: ${data.tamanho_calcas}`] : []),
        ``,
        `👨‍👩‍👧‍👦 IRMÃOS`,
        `Tem irmãos inscritos: ${data.irmaos ? "Sim" : "Não"}`,
        data.irmaos && data.nome_irmaos ? `Nome(s) do(s) irmão(s): ${data.nome_irmaos}` : "",
        ``,
        `🏥 SAÚDE`,
        ...(alergiasSim || medicacaoSim || restricaoSim || infoMedica
          ? [
              ...(alergiasSim
                ? [`⚠ Alergias: ${alergiasDesc}`]
                : [`✓ Sem alergias`]),
              ...(medicacaoSim
                ? [`⚠ Medicação regular: ${medicacaoDesc}`]
                : [`✓ Sem medicação regular`]),
              ...(restricaoSim
                ? [`⚠ Restrição alimentar: ${restricaoDesc}`]
                : [`✓ Sem restrição alimentar`]),
              ...(infoMedica ? [`⚠ Informação médica relevante: ${infoMedica}`] : []),
            ]
          : [`Sem informações médicas relevantes.`]),
        ``,
        `📸 AUTORIZAÇÃO DE IMAGEM`,
        autorizaImagem ? "Sim" : "Não",
        ``,
        `📝 OBSERVAÇÕES`,
        data.observacoes || "Sem observações",
        ``,
        `💰 VALOR`,
        `Participação: ${precoBase}€`,
        seguroTxt,
        data.irmaos
          ? `Valor sem desconto: ${precoPrevisto}€\nDesconto irmãos (-10%): A aguardar validação\nValor estimado após validação: ${((precoBase + seguroCusto) * (1 - DESCONTO_IRMAOS)).toFixed(2).replace(".", ",")}€\n\nNota: O desconto será confirmado pela equipa ProTopo após validação da inscrição do(s) irmão(s).`
          : `Valor previsto a pagar: ${precoPrevisto}€`,

        ``,
        `✅ Consentimento de dados: autorizado`,
        `✅ Termos e Condições: aceites`,
      ].filter(Boolean);

      const message = encodeURIComponent(parts.join("\n"));
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      setWhatsappUrl(url);
      lastSubmitRef.current = Date.now();
      setLastSummary({
        nome: data.nome,
        semanasLabels,
        numSemanas,
        precoBase,
        seguroCusto,
        seguroOferta,
        irmaos: !!data.irmaos,
        precoPrevisto,
      });
      setSubmitted(true);
      if (whatsappWindow) {
        try { whatsappWindow.location.href = url; } catch { whatsappWindow.close(); }
      }

    } catch (err) {
      whatsappWindow?.close();
      console.error(err);
      toast({ title: "Erro", description: "Ocorreu um erro inesperado.", variant: "destructive" });
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-2xl p-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">Pedido de inscrição registado!</h3>

              {lastSummary && (
                <div className="text-left rounded-xl border border-primary/30 bg-primary/5 p-4 mb-5">
                  <h4 className="font-heading text-sm uppercase tracking-wider text-primary mb-3">Resumo</h4>
                  <div className="space-y-1.5 text-sm text-foreground">
                    <div className="flex justify-between gap-3"><span className="text-muted-foreground">Atleta</span><span className="font-medium text-right">{lastSummary.nome}</span></div>
                    <div>
                      <span className="text-muted-foreground">Período · Outono 2026</span>
                      <ul className="mt-1 space-y-0.5">
                        {lastSummary.semanasLabels.map((l) => (
                          <li key={l} className="text-xs text-foreground">• {l}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-1.5 border-t border-primary/20 pt-3">
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Participação</span>
                        <span className="text-foreground font-medium">{lastSummary.precoBase}€</span>
                      </div>
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Seguro anual</span>
                        <span className="text-foreground font-medium">{lastSummary.seguroOferta ? "0€ — Já incluído" : `${lastSummary.seguroCusto}€`}</span>
                      </div>
                      <div className="flex justify-between gap-3 text-sm"><span className="text-foreground font-semibold">Total registado sem desconto</span><span>{lastSummary.precoPrevisto}€</span></div>
                      {lastSummary.irmaos ? (
                        <>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">Desconto irmãos (-10%)</span>
                            <span className="text-amber-400 font-medium text-xs text-right">A aguardar validação</span>
                          </div>
                          <div className="flex items-baseline justify-between gap-3 border-t border-primary/20 pt-2 mt-1">
                            <span className="text-foreground font-semibold">Valor estimado após validação</span>
                            <span className="font-heading font-bold text-xl text-gradient-gold">{((lastSummary.precoBase + lastSummary.seguroCusto) * (1 - DESCONTO_IRMAOS)).toFixed(2).replace(".", ",")}€</span>
                          </div>
                          <p className="text-xs text-amber-400/90 leading-snug pt-1">
                            O desconto será confirmado pela equipa ProTopo após validação da inscrição do(s) irmão(s).
                          </p>
                        </>
                      ) : (
                        <div className="flex items-baseline justify-between gap-3 border-t border-primary/20 pt-2 mt-1">
                          <span className="text-foreground font-semibold">Valor previsto a pagar</span>
                          <span className="font-heading font-bold text-xl text-gradient-gold">{lastSummary.precoPrevisto}€</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-muted-foreground mb-6">
                O pedido foi guardado. Envia a mensagem no WhatsApp para concluir o contacto. A abertura do WhatsApp não confirma o envio; a vaga só fica garantida após confirmação da equipa e validação do pagamento.
              </p>

              {whatsappUrl && <Button asChild variant="hero" size="lg" className="w-full mb-4"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 mr-2" />Abrir mensagem no WhatsApp</a></Button>}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={WHATSAPP_URL_FOOTCAMP_INFO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tirar dúvidas
                </a>
                <Button variant="hero" size="lg" onClick={() => { setSubmitted(false); setWhatsappUrl(null); form.reset(); }}>
                  Nova inscrição
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-2 pt-2 pb-1 border-b border-primary/20">
      <Icon className="w-4 h-4 text-primary" />
      <h3 className="font-heading text-sm uppercase tracking-wider text-primary">{title}</h3>
    </div>
  );

  return (
    <section id="formulario" className="py-16 bg-secondary relative overflow-hidden scroll-mt-24 md:scroll-mt-28">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll delay={150}>
          <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <SectionHeader icon={UserIcon} title="Dados do atleta" />
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nome do atleta</FormLabel>
                      <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="data_nascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Data de nascimento</FormLabel>
                        <FormControl>
                          <Input type="date" min={getBirthDateRange().min} max={getBirthDateRange().max} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="idade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Idade (auto)</FormLabel>
                        <FormControl>
                          <Input type="number" readOnly tabIndex={-1} placeholder="—" className="bg-muted/40 cursor-not-allowed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="clube_atual"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Clube atual</FormLabel>
                      <FormControl><Input placeholder="Nome do clube" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="posicao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Posição principal</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="border-border"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                            <SelectContent>
                              {posicoes.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="escalao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Escalão</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="border-border"><SelectValue placeholder="Selecionar" /></SelectTrigger>
                            <SelectContent>
                              {escaloes.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SectionHeader icon={UserIcon} title="Encarregado de educação" />
                <FormField
                  control={form.control}
                  name="encarregado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nome do encarregado de educação</FormLabel>
                      <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="telemovel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Telemóvel</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            maxLength={9}
                            placeholder="912345678"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email_encarregado"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl><Input type="email" placeholder="email@exemplo.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SectionHeader icon={Siren} title="🚨 Contacto de emergência" />
                <p className="text-xs text-muted-foreground -mt-2">
                  Sempre que possível, indica uma pessoa diferente do contacto principal.
                </p>
                <FormField
                  control={form.control}
                  name="emergencia_nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nome</FormLabel>
                      <FormControl><Input placeholder="Nome completo" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="emergencia_parentesco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Parentesco</FormLabel>
                        <FormControl><Input placeholder="Ex.: Pai, Mãe, Avó, Tio" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencia_telemovel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Telemóvel</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            maxLength={9}
                            placeholder="912345678"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SectionHeader icon={UserIcon} title="Período, seguro e equipamento" />
                <p className="text-foreground font-semibold">{AUTUMN.week} · {AUTUMN.hours}</p>
                <FormField control={form.control} name="participacao" render={({ field }) => (
                  <FormItem className="rounded-xl border border-border p-4 space-y-3">
                    <FormLabel className="text-foreground">Participação e seguro anual</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col gap-2">
                        <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all", field.value === "primeira" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                          <RadioGroupItem value="primeira" /><span className="text-sm text-foreground">É a primeira vez que o atleta participa na ProTopo (+10€ de seguro anual)</span>
                        </label>
                        <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all", field.value === "anterior" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                          <RadioGroupItem value="anterior" /><span className="text-sm text-foreground">O atleta já participou numa edição anterior da ProTopo</span>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {participouAnterior && (
                  <p className="text-xs text-muted-foreground">Até a equipa confirmar que o seguro anual ainda está válido, o resumo inclui 10€ de seguro. Após confirmação, o seguro passa a 0€ e o total é atualizado.</p>
                )}

                {form.watch("participacao") === "primeira" && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tamanho_tshirt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Tamanho da T-shirt</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="border-border">
                              <SelectValue placeholder="Selecionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {tamanhos.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tamanho_calcas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Tamanho dos Calções</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="border-border">
                              <SelectValue placeholder="Selecionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {tamanhos.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                )}

                <FormField
                  control={form.control}
                  name="irmaos"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <FormControl>
                        <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="text-sm text-foreground font-normal cursor-pointer !mt-0">
                        Tenho irmãos também inscritos (-10%)
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {irmaos && (
                  <FormField
                    control={form.control}
                    name="nome_irmaos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Nome do(s) outro(s) irmão(s) inscrito(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: João Rodrigues, Pedro Rodrigues" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Indica apenas o nome do(s) outro(s) irmão(s) inscrito(s) no Footcamp. Cada atleta deve ter a sua própria inscrição.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {numSemanas > 0 && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-foreground font-semibold">Total previsto (sem desconto)</span>
                      <span className="font-heading font-bold text-2xl text-gradient-gold">
                        {precoPrevisto}€
                      </span>
                    </div>
                  </div>
                )}

                <SectionHeader icon={Stethoscope} title="🏥 Informação médica" />

                <FormField
                  control={form.control}
                  name="tem_alergias"
                  render={({ field }) => (
                    <FormItem className="rounded-xl border border-border p-4 space-y-3">
                      <FormLabel className="text-foreground">O atleta tem alguma alergia?</FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "nao" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="nao" /><span className="text-sm text-foreground">Não</span>
                          </label>
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "sim" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="sim" /><span className="text-sm text-foreground">Sim</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {temAlergias === "sim" && (
                  <FormField
                    control={form.control}
                    name="alergias_descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Quais alergias?</FormLabel>
                        <FormControl><Input placeholder="Ex.: frutos secos, pólen, picadas..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="toma_medicacao"
                  render={({ field }) => (
                    <FormItem className="rounded-xl border border-border p-4 space-y-3">
                      <FormLabel className="text-foreground">O atleta toma alguma medicação regularmente?</FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "nao" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="nao" /><span className="text-sm text-foreground">Não</span>
                          </label>
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "sim" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="sim" /><span className="text-sm text-foreground">Sim</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {tomaMedicacao === "sim" && (
                  <FormField
                    control={form.control}
                    name="medicacao_descricao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Qual medicação?</FormLabel>
                        <FormControl><Input placeholder="Nome, dose e horário se aplicável" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="informacao_medica"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Informação médica relevante (opcional)</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="Exemplo: asma, lesões, cuidados especiais ou outras informações importantes." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="restricao_alimentar"
                  render={({ field }) => (
                    <FormItem className="rounded-xl border border-border p-4 space-y-3">
                      <FormLabel className="text-foreground">O atleta tem alguma restrição alimentar?</FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "nao" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="nao" /><span className="text-sm text-foreground">Não</span>
                          </label>
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "sim" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="sim" /><span className="text-sm text-foreground">Sim</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {restricaoAlimentar === "sim" && (
                  <FormField
                    control={form.control}
                    name="restricao_alimentar_desc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Indique a restrição alimentar</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: alergia a frutos secos, intolerância à lactose, sem glúten..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <SectionHeader icon={UserIcon} title="Autorização e observações" />

                <FormField
                  control={form.control}
                  name="autorizacao_imagem"
                  render={({ field }) => (
                    <FormItem className="rounded-xl border border-border p-4 space-y-3">
                      <FormLabel className="text-foreground">
                        Autoriza a recolha e utilização de fotografias/vídeos do atleta para divulgação da ProTopo?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "sim" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="sim" /><span className="text-sm text-foreground">Sim, autorizo</span>
                          </label>
                          <label className={cn("flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all flex-1", field.value === "nao" ? "border-primary bg-primary/10" : "border-border hover:border-primary/40")}>
                            <RadioGroupItem value="nao" /><span className="text-sm text-foreground">Não autorizo</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Observações (opcional)</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Algo que devamos saber?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consentimento"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 rounded-xl border border-border p-4">
                      <FormControl>
                        <Checkbox checked={!!field.value} onCheckedChange={field.onChange} className="mt-0.5" />
                      </FormControl>
                      <div className="space-y-1 leading-snug">
                        <FormLabel className="text-sm text-foreground font-normal cursor-pointer">
                          Autorizo o tratamento dos dados para efeitos de inscrição e contacto.
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Consulta a nossa{" "}
                          <Link to="/politica-privacidade" target="_blank" className="text-primary hover:underline">
                            Política de Privacidade
                          </Link>.
                        </p>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField control={form.control} name="aceita_termos" render={({ field }) => (
                  <FormItem className="flex items-start gap-3 border border-border rounded-lg p-4">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div><FormLabel>Li e aceito os <Link to="/termos-condicoes" target="_blank" className="text-primary underline">Termos e Condições do Outono 2026</Link>.</FormLabel><FormMessage /></div>
                  </FormItem>
                )} />

                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <h4 className="font-heading text-sm uppercase tracking-wider text-foreground">📞 O que acontece após a inscrição?</h4>
                  </div>
                  <ol className="space-y-1.5 text-sm text-foreground">
                    <li><span className="text-primary font-semibold">1.</span> Recebemos a tua inscrição.</li>
                    <li><span className="text-primary font-semibold">2.</span> Confirmamos a disponibilidade da vaga.</li>
                    <li><span className="text-primary font-semibold">3.</span> Entramos em contacto por WhatsApp.</li>
                    <li><span className="text-primary font-semibold">4.</span> Enviamos os dados de pagamento.</li>
                    <li><span className="text-primary font-semibold">5.</span> A vaga fica reservada após validação do pagamento.</li>
                  </ol>
                </div>

                <ul className="space-y-1 text-sm text-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔</span><span>Inscrição sujeita à confirmação de vaga</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔</span><span>Resposta em até 24h úteis</span></li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">✔</span><span>Dados utilizados apenas para gestão da inscrição</span></li>
                </ul>

                {numSemanas > 0 && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3">
                    <h4 className="font-heading text-sm uppercase tracking-wider text-primary">Resumo da inscrição</h4>

                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Período · Outono 2026</p>
                      <ul className="space-y-0.5">
                        {semanasSelecionadas.map((id) => {
                          const label = semanasOptions.find((s) => s.id === id)?.label;
                          return label ? <li key={id} className="text-sm text-foreground">• {label}</li> : null;
                        })}
                      </ul>
                    </div>

                    <div className="space-y-1.5 border-t border-primary/20 pt-3">
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Participação</span>
                        <span className="text-foreground font-medium">{precoBase}€</span>
                      </div>
                      <div className="flex justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">Seguro anual</span>
                        <span className="text-foreground font-medium">{participouAnterior ? `${seguroCusto}€ — por confirmar` : `${seguroCusto}€`}</span>
                      </div>
                      <div className="flex justify-between gap-3 text-sm"><span className="text-foreground font-semibold">Total previsto sem desconto</span><span>{precoPrevisto}€</span></div>
                      {irmaos ? (
                        <>
                          <div className="flex justify-between gap-3 text-sm">
                            <span className="text-muted-foreground">Desconto irmãos (-10%)</span>
                            <span className="text-amber-400 font-medium text-xs text-right">A aguardar validação</span>
                          </div>
                          <div className="flex items-baseline justify-between gap-3 border-t border-primary/20 pt-2 mt-1">
                            <span className="text-foreground font-semibold">Valor estimado após validação</span>
                            <span className="font-heading font-bold text-2xl text-gradient-gold">{((precoBase + seguroCusto) * (1 - DESCONTO_IRMAOS)).toFixed(2).replace(".", ",")}€</span>
                          </div>
                          <p className="text-xs text-amber-400/90 leading-snug pt-1">
                            O desconto será confirmado pela equipa ProTopo após validação da inscrição do(s) irmão(s).
                          </p>
                        </>
                      ) : (
                        <div className="flex items-baseline justify-between gap-3 border-t border-primary/20 pt-2 mt-1">
                          <span className="text-foreground font-semibold">Valor previsto a pagar</span>
                          <span className="font-heading font-bold text-2xl text-gradient-gold">{precoPrevisto}€</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <Button type="submit" variant="hero" size="lg" className="w-full py-6 text-base shadow-lg shadow-primary/20" disabled={loading}>
                    {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                    {loading ? "A enviar..." : "ENVIAR INSCRIÇÃO POR WHATSAPP"}
                  </Button>
                </div>


              </form>
            </Form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default FootcampSignupForm;
