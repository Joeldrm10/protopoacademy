import { useState, useRef } from "react";
import { Send, Loader2, MessageCircle, Shield, Zap } from "lucide-react";
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

const COOLDOWN_MS = 60_000;

const semanasOptions = [
  { id: "s1", label: "1ª Semana — 6 a 10 de julho" },
  { id: "s2", label: "2ª Semana — 13 a 17 de julho" },
  { id: "s3", label: "3ª Semana — 20 a 24 de julho" },
  { id: "s4", label: "4ª Semana — 27 a 31 de julho" },
];

const precosTabela: Record<number, number> = { 1: 95, 2: 180, 3: 260, 4: 340 };
const SEGURO_ANUAL = 20;

const ptPhoneRegex = /^9\d{8}$/;

const schema = z.object({
  nome: z.string().trim().min(2, "Nome é obrigatório").max(100),
  idade: z.string().trim().min(1, "Idade é obrigatória").refine(
    (v) => { const n = Number(v); return !isNaN(n) && n >= 6 && n <= 16; },
    "Idades dos 6 aos 16 anos"
  ),
  encarregado: z.string().trim().min(2, "Nome do encarregado é obrigatório").max(100),
  telemovel: z.string().trim().refine(
    (val) => ptPhoneRegex.test(val.replace(/\s/g, "")),
    "Telemóvel inválido. 9 dígitos a começar por 9."
  ),
  semanas: z.array(z.string()).min(1, "Seleciona pelo menos uma semana"),
  irmaos: z.boolean().optional(),
  observacoes: z.string().max(500).optional(),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "Tens de autorizar o tratamento dos dados" }),
  }),
});

type FormData = z.infer<typeof schema>;

const FootcampSignupForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastSubmitRef = useRef<number>(0);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      idade: "",
      encarregado: "",
      telemovel: "",
      semanas: [],
      irmaos: false,
      observacoes: "",
      consentimento: false as unknown as true,
    },
  });

  const semanasSelecionadas = form.watch("semanas") || [];
  const irmaos = form.watch("irmaos");
  const numSemanas = semanasSelecionadas.length;
  const precoBase = precosTabela[numSemanas] ?? 0;
  const precoComIrmaos = irmaos ? +(precoBase * 0.9).toFixed(2) : precoBase;
  const seguroOferta = numSemanas === 4;

  const onSubmit = async (data: FormData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      toast({ title: "Aguarda", description: "Espera 1 minuto entre envios.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const semanasLabels = data.semanas
        .map((id) => semanasOptions.find((s) => s.id === id)?.label)
        .filter(Boolean) as string[];

      const { error: dbError } = await supabase.from("marcacoes").insert({
        nome: data.nome,
        idade: data.idade,
        telemovel: data.telemovel,
        tipo: "footcamp",
        data: null,
        hora: null,
        encarregado: data.encarregado,
        semanas: semanasLabels,
        seguro_anual: seguroOferta,
        desconto_irmaos: !!data.irmaos,
        observacoes: data.observacoes || null,
        estado: "pendente",
      } as any);

      if (dbError) {
        console.error("Erro ao guardar inscrição:", dbError);
        toast({ title: "Erro", description: "Não foi possível guardar a inscrição. Tenta novamente.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const parts = [
        `Olá! Quero inscrever-me na ProTopo Footcamp — Edição Verão 2026.`,
        ``,
        `Atleta: ${data.nome}`,
        `Idade: ${data.idade}`,
        `Encarregado: ${data.encarregado}`,
        `Telemóvel: ${data.telemovel}`,
        ``,
        `Semanas pretendidas:`,
        ...semanasLabels.map((l) => `- ${l}`),
        ``,
        `Desconto irmãos: ${data.irmaos ? "Sim" : "Não"}`,
        precoBase > 0 ? `Valor estimado: ${precoComIrmaos}€${seguroOferta ? " (seguro anual oferecido)" : ""}` : "",
        data.observacoes ? `\nObservações: ${data.observacoes}` : "",
      ].filter(Boolean);

      const message = encodeURIComponent(parts.join("\n"));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      lastSubmitRef.current = Date.now();
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Erro", description: "Ocorreu um erro inesperado.", variant: "destructive" });
    } finally {
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
              <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">Inscrição enviada!</h3>
              <p className="text-muted-foreground mb-6">
                A equipa ProTopo entra em contacto por WhatsApp para confirmar a vaga e enviar os dados de pagamento.
              </p>
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
                <Button variant="hero" size="lg" onClick={() => { setSubmitted(false); form.reset(); }}>
                  Nova inscrição
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimateOnScroll delay={150}>
          <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    name="idade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Idade</FormLabel>
                        <FormControl>
                          <Input type="number" min={6} max={16} placeholder="6 a 16" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </div>

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

                <FormField
                  control={form.control}
                  name="semanas"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-foreground">Semanas pretendidas</FormLabel>
                      <div className="space-y-2">
                        {semanasOptions.map((opt) => (
                          <FormField
                            key={opt.id}
                            control={form.control}
                            name="semanas"
                            render={({ field }) => {
                              const checked = field.value?.includes(opt.id);
                              return (
                                <label
                                  className={cn(
                                    "flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-all",
                                    checked ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                                  )}
                                >
                                  <Checkbox
                                    checked={checked}
                                    onCheckedChange={(c) => {
                                      const next = c
                                        ? [...(field.value || []), opt.id]
                                        : (field.value || []).filter((v: string) => v !== opt.id);
                                      field.onChange(next);
                                    }}
                                  />
                                  <span className="text-sm text-foreground">{opt.label}</span>
                                </label>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {numSemanas > 0 && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                    <p className="text-sm text-muted-foreground">Valor estimado</p>
                    <p className="font-heading font-bold text-2xl text-gradient-gold">
                      {precoComIrmaos}€
                    </p>
                    {seguroOferta && (
                      <p className="text-xs text-primary mt-1">+ Seguro anual oferecido</p>
                    )}
                  </div>
                )}

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
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
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

                <Button type="submit" variant="hero" size="lg" className="w-full py-5 text-base" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                  {loading ? "A enviar..." : "Enviar inscrição por WhatsApp"}
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>A equipa confirma a vaga e envia os dados de pagamento por WhatsApp.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Resposta rápida via WhatsApp.</span>
                  </div>
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
