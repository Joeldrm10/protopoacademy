import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const schema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome demasiado longo" }),
  idade: z
    .string()
    .trim()
    .max(10, { message: "Idade inválida" })
    .optional()
    .or(z.literal("")),
  experiencia: z
    .string()
    .trim()
    .min(10, { message: "Conta-nos um pouco mais (mín. 10 caracteres)" })
    .max(1000, { message: "Texto demasiado longo (máx. 1000 caracteres)" }),
  avaliacao: z
    .number()
    .int()
    .min(1, { message: "Escolhe uma avaliação" })
    .max(5),
});

interface TestemunhoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestemunhoFormDialog = ({ open, onOpenChange }: TestemunhoFormDialogProps) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setNome("");
    setIdade("");
    setExperiencia("");
    setAvaliacao(0);
    setHover(0);
    setSuccess(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) {
      // Reset after close animation
      setTimeout(reset, 200);
    }
    onOpenChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse({ nome, idade, experiencia, avaliacao });
    if (!result.success) {
      const first = result.error.issues[0];
      toast.error(first.message);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("testemunhos").insert({
      nome: result.data.nome,
      idade: result.data.idade || null,
      experiencia: result.data.experiencia,
      avaliacao: result.data.avaliacao,
    });
    setSubmitting(false);

    if (error) {
      toast.error("Erro ao enviar testemunho. Tenta novamente.");
      return;
    }

    setSuccess(true);
    toast.success("Obrigado pelo seu testemunho!");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        {success ? (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 border border-primary/30 mb-5">
              <Star className="w-8 h-8 fill-primary text-primary" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
              Obrigado pelo seu testemunho!
            </h3>
            <p className="text-muted-foreground mb-6">
              Vamos rever a tua mensagem em breve.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="bg-gradient-gold text-primary-foreground font-heading font-bold uppercase tracking-wider"
            >
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                Deixar a minha opinião
              </DialogTitle>
              <DialogDescription>
                Partilha a tua experiência no ProTopo Footcamp.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="nome">
                  Nome <span className="text-primary">*</span>
                </Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome do atleta ou encarregado"
                  maxLength={100}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idade">Idade do atleta (opcional)</Label>
                <Input
                  id="idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  placeholder="Ex: 12 anos"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experiencia">
                  Experiência no Footcamp <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="experiencia"
                  value={experiencia}
                  onChange={(e) => setExperiencia(e.target.value)}
                  placeholder="Conta-nos como foi a tua experiência..."
                  rows={4}
                  maxLength={1000}
                  required
                />
                <p className="text-xs text-muted-foreground text-right">
                  {experiencia.length}/1000
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  Avaliação <span className="text-primary">*</span>
                </Label>
                <div
                  className="flex gap-2"
                  onMouseLeave={() => setHover(0)}
                  role="radiogroup"
                  aria-label="Avaliação de 1 a 5 estrelas"
                >
                  {[1, 2, 3, 4, 5].map((n) => {
                    const active = (hover || avaliacao) >= n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setAvaliacao(n)}
                        onMouseEnter={() => setHover(n)}
                        aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                        aria-checked={avaliacao === n}
                        role="radio"
                        className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                      >
                        <Star
                          className={cn(
                            "w-9 h-9 transition-colors",
                            active
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/40"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-gold text-primary-foreground font-heading font-bold uppercase tracking-wider py-6"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    A enviar...
                  </>
                ) : (
                  "Enviar testemunho"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TestemunhoFormDialog;
