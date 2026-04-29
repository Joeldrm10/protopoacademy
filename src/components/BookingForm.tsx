import { useState, useRef } from "react";
import { CalendarIcon, Clock, Send, Loader2, MessageCircle, Shield, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimateOnScroll from "./AnimateOnScroll";

const WHATSAPP_NUMBER = "351911102405";
const WHATSAPP_DIRECT = "https://wa.me/351911102405?text=Ol%C3%A1,%20quero%20marcar%20um%20treino";
const COOLDOWN_MS = 60_000; // 1 minute between submissions

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

const ptPhoneRegex = /^9\d{8}$/;

const bookingSchema = z.object({
  nome: z.string().trim().min(2, "Nome é obrigatório (mínimo 2 caracteres)").max(100, "Máximo 100 caracteres"),
  idade: z.string().trim().min(1, "Idade é obrigatória").max(2, "Idade inválida").refine(
    (val) => { const n = Number(val); return !isNaN(n) && n >= 6 && n <= 16; },
    "Treinos disponíveis apenas para atletas dos 6 aos 16 anos"
  ),
  telemovel: z.string().trim()
    .refine((val) => ptPhoneRegex.test(val.replace(/\s/g, "")), "Telemóvel inválido. Deve ter 9 dígitos e começar por 9."),
  tipo: z.enum(["individual", "grupo"], { required_error: "Seleciona o tipo de treino" }),
  data: z.date({ required_error: "Seleciona uma data" }),
  hora: z.string({ required_error: "Seleciona uma hora" }).min(1, "Seleciona uma hora"),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "Tens de autorizar o tratamento dos dados para continuar" }),
  }),
});

type BookingData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  showHeader?: boolean;
}

const BookingForm = ({ showHeader = true }: BookingFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastSubmitRef = useRef<number>(0);
  const [searchParams] = useSearchParams();
  const tipoParam = searchParams.get("tipo");
  const initialTipo = tipoParam === "individual" || tipoParam === "grupo" ? tipoParam : undefined;

  const form = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nome: "",
      idade: "",
      telemovel: "",
      tipo: initialTipo,
      consentimento: false as unknown as true,
    },
  });
  const onSubmit = async (data: BookingData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      toast({ title: "Aguarda", description: "Espera pelo menos 1 minuto entre envios.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const dataFormatada = format(data.data, "yyyy-MM-dd");

      const { error } = await supabase.from("marcacoes").insert({
        nome: data.nome,
        idade: data.idade,
        telemovel: data.telemovel,
        tipo: data.tipo,
        data: dataFormatada,
        hora: data.hora,
      });

      if (error) {
        console.error("Erro ao guardar marcação:", error);
        toast({ title: "Erro", description: "Não foi possível guardar a marcação. Tenta novamente.", variant: "destructive" });
        setLoading(false);
        return;
      }

      const tipoLabel = data.tipo === "individual" ? "Individual" : "Pequeno Grupo";
      const dataDisplay = format(data.data, "dd/MM/yyyy", { locale: pt });

      const parts = [
        `Olá, gostaria de marcar um treino com os seguintes dados:`,
        ``,
        `Nome: ${data.nome}`,
        `Idade: ${data.idade}`,
        `Tipo de treino: ${tipoLabel}`,
        `Data: ${dataDisplay}`,
        `Hora: ${data.hora}`,
      ];

      const message = encodeURIComponent(parts.join("\n"));
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      lastSubmitRef.current = Date.now();
      setSubmitted(true);
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast({ title: "Erro", description: "Ocorreu um erro inesperado.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="marcacao" className="py-28 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-lg mx-auto text-center bg-card border border-border rounded-2xl p-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Send className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">Pedido enviado com sucesso!</h3>
              <p className="text-muted-foreground mb-6">
                Serás contactado em breve. Se preferires, podes falar connosco diretamente no WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={WHATSAPP_DIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-heading font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-lg text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp
                </a>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => { setSubmitted(false); form.reset(); }}
                >
                  Nova marcação
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section id="marcacao" className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {showHeader && (
          <AnimateOnScroll className="text-center mb-12">
            <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              Marcação
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
              Marca já o teu <span className="text-gradient-gold">treino</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Preenche o formulário abaixo e começa a evoluir hoje.
            </p>
          </AnimateOnScroll>
        )}

        <AnimateOnScroll delay={150}>
          <div className="max-w-lg mx-auto bg-card border border-border rounded-2xl p-6 md:p-10 shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Nome */}
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Idade + Telemóvel */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="idade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Idade</FormLabel>
                        <FormControl>
                          <Input type="number" min={6} max={16} placeholder="Ex: 10 (6 a 16 anos)" {...field} />
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

                {/* Tipo de treino */}
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Tipo de treino</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-3"
                        >
                          <label
                            className={cn(
                              "flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all duration-200",
                              field.value === "individual"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/40"
                            )}
                          >
                            <RadioGroupItem value="individual" />
                            <span className="text-sm font-medium text-foreground">Individual</span>
                          </label>
                          <label
                            className={cn(
                              "flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition-all duration-200",
                              field.value === "grupo"
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/40"
                            )}
                          >
                            <RadioGroupItem value="grupo" />
                            <span className="text-sm font-medium text-foreground">Grupo</span>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Data + Hora */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground">Data</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "dd/MM/yyyy")
                                  : "Selecionar"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hora"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Hora</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Hora" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          Autorizo o tratamento dos meus dados para efeitos de contacto e marcação de treino.
                        </FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Consulta a nossa{" "}
                          <Link
                            to="/politica-privacidade"
                            target="_blank"
                            className="text-primary hover:underline"
                          >
                            Política de Privacidade
                          </Link>
                          .
                        </p>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" variant="hero" size="lg" className="w-full py-5 text-base" disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                  {loading ? "A enviar..." : "Enviar por WhatsApp"}
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Dados protegidos e utilizados apenas para marcação.</span>
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

export default BookingForm;
