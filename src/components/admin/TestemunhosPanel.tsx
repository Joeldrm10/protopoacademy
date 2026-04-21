import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Loader2, RefreshCw, Trash2, Check, X, Star, Search, MessageSquare, Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Testemunho = {
  id: string;
  nome: string;
  idade: string | null;
  experiencia: string;
  avaliacao: number;
  aprovado: boolean;
  created_at: string;
};

const TestemunhosPanel = () => {
  const [items, setItems] = useState<Testemunho[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

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
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const filtered = useMemo(() => items.filter((t) => {
    if (filterStatus === "aprovados" && !t.aprovado) return false;
    if (filterStatus === "pendentes" && t.aprovado) return false;
    if (search && !t.nome.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [items, search, filterStatus]);

  const aprovados = useMemo(() => items.filter((t) => t.aprovado).length, [items]);
  const pendentes = items.length - aprovados;

  const handleToggle = async (id: string, current: boolean) => {
    setBusy(id);
    const { error } = await supabase
      .from("testemunhos")
      .update({ aprovado: !current })
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar");
    } else {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, aprovado: !current } : t)));
      toast.success(!current ? "Testemunho aprovado" : "Aprovação removida");
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

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Total</p>
          <p className="font-heading text-2xl text-foreground">{items.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Filtrados</p>
          <p className="font-heading text-2xl text-foreground">{filtered.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "hsl(142 71% 45%)" }}>Aprovados</p>
          <p className="font-heading text-2xl" style={{ color: "hsl(142 71% 45%)" }}>{aprovados}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Pendentes</p>
          <p className="font-heading text-2xl text-primary">{pendentes}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-primary" />
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px] border-border"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="aprovados">Aprovados</SelectItem>
            </SelectContent>
          </Select>
          {(search || filterStatus !== "todos") && (
            <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setFilterStatus("todos"); }} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4 mr-1" /> Limpar
            </Button>
          )}
          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={fetchItems} disabled={loading} className="border-border">
              <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <MessageSquare className="w-14 h-14 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Nenhum testemunho recebido</p>
          <p className="text-sm mt-1">Os testemunhos submetidos pelo formulário aparecerão aqui.</p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-lg shadow-black/20">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[130px]">Estado</TableHead>
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase min-w-[140px]">Nome</TableHead>
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[80px] text-center">Idade</TableHead>
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[120px]">Avaliação</TableHead>
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase">Experiência</TableHead>
                  <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[140px]">Recebido em</TableHead>
                  <TableHead className="w-[110px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id} className="border-border/50 hover:bg-surface-elevated/50 transition-colors align-top">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy === t.id}
                        onClick={() => handleToggle(t.id, t.aprovado)}
                        className={cn(
                          "text-xs font-semibold rounded-full px-3 transition-all",
                          t.aprovado
                            ? "bg-green-500/15 text-green-500 hover:bg-green-500/25 border border-green-500/20"
                            : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                        )}
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        {t.aprovado ? "Aprovado" : "Pendente"}
                      </Button>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">{t.nome}</TableCell>
                    <TableCell className="text-muted-foreground text-center">{t.idade || "—"}</TableCell>
                    <TableCell>{renderStars(t.avaliacao)}</TableCell>
                    <TableCell className="text-foreground/90 text-sm max-w-md whitespace-pre-wrap">{t.experiencia}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{formatCreatedAt(t.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {!t.aprovado && (
                          <Button
                            size="sm"
                            disabled={busy === t.id}
                            onClick={() => handleToggle(t.id, t.aprovado)}
                            className="bg-green-500/15 text-green-500 hover:bg-green-500/25 border border-green-500/20 h-8"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                        )}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {filtered.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{t.nome}{t.idade ? ` · ${t.idade}` : ""}</span>
                  {renderStars(t.avaliacao)}
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap">{t.experiencia}</p>
                <p className="text-xs text-muted-foreground">{formatCreatedAt(t.created_at)}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={busy === t.id}
                    onClick={() => handleToggle(t.id, t.aprovado)}
                    className={cn(
                      "text-xs font-semibold rounded-full px-3",
                      t.aprovado
                        ? "bg-green-500/15 text-green-500 border border-green-500/20"
                        : "bg-primary/10 text-primary border border-primary/20"
                    )}
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    {t.aprovado ? "Aprovado" : "Aprovar"}
                  </Button>
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
                          Vais eliminar o testemunho de <strong>{t.nome}</strong>.
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestemunhosPanel;
