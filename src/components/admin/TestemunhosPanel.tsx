import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Loader2, RefreshCw, Trash2, Check, X, Star, MessageSquare, Clock, CheckCircle2, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Estado = "pendente" | "aprovado" | "rejeitado";

type Testemunho = {
  id: string;
  nome: string;
  idade: string | null;
  experiencia: string;
  avaliacao: number;
  aprovado: boolean;
  estado: Estado;
  created_at: string;
};

const TestemunhosPanel = () => {
  const [items, setItems] = useState<Testemunho[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testemunhos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast.error("Erro ao carregar testemunhos");
    } else {
      setItems((data as any) || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const pendentes = useMemo(() => items.filter((t) => t.estado === "pendente"), [items]);
  const aprovados = useMemo(() => items.filter((t) => t.estado === "aprovado"), [items]);
  const rejeitados = useMemo(() => items.filter((t) => t.estado === "rejeitado"), [items]);

  const updateEstado = async (id: string, estado: Estado) => {
    setBusy(id);
    const { error } = await supabase
      .from("testemunhos")
      .update({ estado } as any)
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar estado");
    } else {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, estado, aprovado: estado === "aprovado" } : t)));
      toast.success(
        estado === "aprovado" ? "Testemunho aprovado" :
        estado === "rejeitado" ? "Testemunho rejeitado" : "Estado atualizado"
      );
    }
    setBusy(null);
  };

  const handleDelete = async (id: string) => {
    setBusy(id);
    const { error } = await supabase.from("testemunhos").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao eliminar");
    } else {
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast.success("Testemunho eliminado");
    }
    setBusy(null);
  };

  const formatCreatedAt = (d: string) => {
    try { return format(new Date(d), "dd/MM/yyyy HH:mm", { locale: pt }); } catch { return d; }
  };

  const renderStars = (n: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={cn("w-3.5 h-3.5", i <= n ? "fill-primary text-primary" : "text-muted-foreground/30")} />
      ))}
    </div>
  );

  const estadoBadge = (estado: Estado) => {
    const cfg = {
      pendente: { label: "Pendente", cls: "bg-primary/10 text-primary border-primary/20", Icon: Clock },
      aprovado: { label: "Aprovado", cls: "bg-green-500/15 text-green-500 border-green-500/20", Icon: CheckCircle2 },
      rejeitado: { label: "Rejeitado", cls: "bg-destructive/15 text-destructive border-destructive/20", Icon: XCircle },
    }[estado];
    const Icon = cfg.Icon;
    return (
      <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border", cfg.cls)}>
        <Icon className="w-3 h-3" />
        {cfg.label}
      </span>
    );
  };

  const TestemunhoCard = ({ t }: { t: Testemunho }) => (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5 space-y-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{t.nome}</span>
            {t.idade && <span className="text-muted-foreground text-sm">· {t.idade} anos</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{formatCreatedAt(t.created_at)}</p>
        </div>
        <div className="flex items-center gap-2">
          {renderStars(t.avaliacao)}
          {estadoBadge(t.estado)}
        </div>
      </div>

      <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{t.experiencia}</p>

      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
        {t.estado !== "aprovado" && (
          <Button
            size="sm"
            disabled={busy === t.id}
            onClick={() => updateEstado(t.id, "aprovado")}
            className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border border-green-500/20 h-8"
          >
            <Check className="w-3.5 h-3.5 mr-1" /> Aprovar
          </Button>
        )}
        {t.estado !== "rejeitado" && (
          <Button
            size="sm"
            variant="outline"
            disabled={busy === t.id}
            onClick={() => updateEstado(t.id, "rejeitado")}
            className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20 h-8"
          >
            <X className="w-3.5 h-3.5 mr-1" /> Rejeitar
          </Button>
        )}
        {t.estado !== "pendente" && (
          <Button
            size="sm"
            variant="ghost"
            disabled={busy === t.id}
            onClick={() => updateEstado(t.id, "pendente")}
            className="text-muted-foreground hover:text-foreground h-8"
          >
            <Clock className="w-3.5 h-3.5 mr-1" /> Marcar pendente
          </Button>
        )}
        <div className="ml-auto">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8" disabled={busy === t.id}>
                {busy === t.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Eliminar testemunho?</AlertDialogTitle>
                <AlertDialogDescription>
                  Vais eliminar permanentemente o testemunho de <strong>{t.nome}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(t.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );

  const Section = ({ title, list, accent, Icon }: { title: string; list: Testemunho[]; accent: string; Icon: typeof Clock }) => (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={cn("w-5 h-5", accent)} />
        <h2 className="font-heading text-xl text-foreground tracking-wider">{title}</h2>
        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", accent === "text-primary" ? "bg-primary/10 text-primary border-primary/20" : accent === "text-green-500" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-destructive/10 text-destructive border-destructive/20")}>
          {list.length}
        </span>
      </div>
      {list.length === 0 ? (
        <div className="bg-card/40 border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
          Sem testemunhos nesta secção.
        </div>
      ) : (
        <div className="space-y-3">{list.map((t) => <TestemunhoCard key={t.id} t={t} />)}</div>
      )}
    </section>
  );

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Total</p>
          <p className="font-heading text-2xl text-foreground">{items.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider mb-1 text-primary">Pendentes</p>
          <p className="font-heading text-2xl text-primary">{pendentes.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "hsl(142 71% 45%)" }}>Aprovados</p>
          <p className="font-heading text-2xl" style={{ color: "hsl(142 71% 45%)" }}>{aprovados.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider mb-1 text-destructive">Rejeitados</p>
          <p className="font-heading text-2xl text-destructive">{rejeitados.length}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-end mb-6">
        <Button variant="outline" size="sm" onClick={fetchItems} disabled={loading} className="border-border">
          <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <MessageSquare className="w-14 h-14 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Ainda não existem testemunhos.</p>
          <p className="text-sm mt-1">Os testemunhos submetidos pelo formulário aparecerão aqui.</p>
        </div>
      ) : (
        <>
          <Section title="Pendentes" list={pendentes} accent="text-primary" Icon={Clock} />
          <Section title="Aprovados" list={aprovados} accent="text-green-500" Icon={CheckCircle2} />
          <Section title="Rejeitados" list={rejeitados} accent="text-destructive" Icon={XCircle} />
        </>
      )}
    </div>
  );
};

export default TestemunhosPanel;
