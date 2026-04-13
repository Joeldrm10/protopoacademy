import { useState } from "react";
import { CalendarIcon, Clock, Send } from "lucide-react";
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

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

const bookingSchema = z.object({
  nome: z.string().trim().min(2, "Nome é obrigatório").max(100, "Máximo 100 caracteres"),
  idade: z.string().trim().min(1, "Idade é obrigatória").max(3, "Idade inválida"),
  telemovel: z.string().trim().min(9, "Telemóvel inválido").max(15, "Telemóvel inválido"),
  tipo: z.enum(["individual", "grupo"], { required_error: "Seleciona o tipo de treino" }),
  data: z.date({ required_error: "Seleciona uma data" }),
  hora: z.string({ required_error: "Seleciona uma hora" }).min(1, "Seleciona uma hora"),
});

type BookingData = z.infer<typeof bookingSchema>;

const BookingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      nome: "",
      idade: "",
      telemovel: "",
    },
  });

  const onSubmit = (data: BookingData) => {
    const tipoLabel = data.tipo === "individual" ? "Individual" : "Pequeno Grupo";
    const dataFormatada = format(data.data, "dd/MM/yyyy", { locale: pt });

    const message = [
      `Olá! Quero marcar um treino:`,
      ``,
      `*Nome:* ${encodeURIComponent(data.nome)}`,
      `*Idade:* ${encodeURIComponent(data.idade)}`,
      `*Telemóvel:* ${encodeURIComponent(data.telemovel)}`,
      `*Tipo:* ${encodeURIComponent(tipoLabel)}`,
      `*Data:* ${encodeURIComponent(dataFormatada)}`,
      `*Hora:* ${encodeURIComponent(data.hora)}`,
    ].join("%0A");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setSubmitted(true);
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
              <h3 className="font-heading font-bold text-2xl mb-3 text-foreground">Pedido enviado!</h3>
              <p className="text-muted-foreground mb-6">
                A tua marcação foi enviada por WhatsApp. Entraremos em contacto brevemente.
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={() => { setSubmitted(false); form.reset(); }}
              >
                Nova marcação
              </Button>
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
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-block bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-heading font-semibold uppercase tracking-[0.2em] text-xs mb-6">
            Marcação
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Marca o teu <span className="text-gradient-gold">Treino</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Preenche o formulário e envia a tua marcação diretamente por WhatsApp.
          </p>
        </AnimateOnScroll>

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
                          <Input type="number" placeholder="Ex: 14" {...field} />
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
                          <Input type="tel" placeholder="912 345 678" {...field} />
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

                <Button type="submit" variant="hero" size="lg" className="w-full py-5 text-base">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar por WhatsApp
                </Button>
              </form>
            </Form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default BookingForm;
