import { useEffect, useMemo, useState, Fragment } from "react";
import AdminAuth from "@/components/AdminAuth";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  CalendarIcon, Phone, User, Clock, Users, Loader2, RefreshCw,
  Trash2, Check, Filter, X, LogOut, Shield, LayoutDashboard, Search,
  ChevronDown, ChevronUp, Trophy, FileText,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestemunhosPanel from "@/components/admin/TestemunhosPanel";

type Marcacao = {
  id: string;
  nome: string;
  idade: string;
  telemovel: string;
  tipo: string;
  data: string | null;
  hora: string | null;
  created_at: string;
  confirmado: boolean;
  estado: string;
  semanas: string[] | null;
  seguro_anual: boolean | null;
  desconto_irmaos: boolean | null;
  observacoes: string | null;
  encarregado: string | null;
  valor_total: number | null;
};

const ESTADOS = ["pendente", "contactado", "confirmado", "cancelado"] as const;
const estadoStyles: Record<string, string> = {
  pendente: "bg-primary/10 text-primary border-primary/20",
  contactado: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  confirmado: "bg-green-500/15 text-green-500 border-green-500/20",
  cancelado: "bg-destructive/15 text-destructive border-destructive/25",
};

const Marcacoes = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [searchNome, setSearchNome] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredMarcacoes = useMemo(() => {
    return marcacoes.filter((m) => {
      if (filterTipo !== "todos" && m.tipo !== filterTipo) return false;
      if (filterDate) {
        const selected = format(filterDate, "yyyy-MM-dd");
        if (m.data !== selected) return false;
      }
      if (searchNome && !m.nome.toLowerCase().includes(searchNome.toLowerCase())) return false;
      return true;
    });
  }, [marcacoes, filterDate, filterTipo, searchNome]);

  const confirmados = useMemo(() => marcacoes.filter((m) => m.estado === "confirmado").length, [marcacoes]);
  const pendentes = useMemo(() => marcacoes.filter((m) => m.estado === "pendente").length, [marcacoes]);

  const fetchMarcacoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marcacoes")
      .select("*")
      .order("data", { ascending: false })
      .order("hora", { ascending: false });

    if (error) {
      console.error("Erro ao carregar marcações:", error);
    } else {
      setMarcacoes((data || []) as unknown as Marcacao[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    const { error } = await supabase.from("marcacoes").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao eliminar marcação");
      console.error(error);
    } else {
      toast.success("Marcação eliminada com sucesso");
      setMarcacoes((prev) => prev.filter((m) => m.id !== id));
    }
    setDeleting(null);
  };

  const handleEstadoChange = async (id: string, novoEstado: string) => {
    const { error } = await supabase
      .from("marcacoes")
      .update({ estado: novoEstado, confirmado: novoEstado === "confirmado" } as any)
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar estado");
    } else {
      setMarcacoes((prev) =>
        prev.map((m) => (m.id === id ? { ...m, estado: novoEstado, confirmado: novoEstado === "confirmado" } : m))
      );
    }
  };

  useEffect(() => {
    fetchMarcacoes();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd/MM/yyyy", { locale: pt });
    } catch {
      return dateStr;
    }
  };

  const formatCreatedAt = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "dd/MM/yyyy HH:mm", { locale: pt });
    } catch {
      return dateStr;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <AdminAuth onAuthenticated={() => {}} />;
  }

  return (
        <div className="min-h-screen bg-gradient-dark">
          {/* Top Bar */}
          <div className="border-b border-border bg-card/60 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">Área Reservada</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-muted-foreground hover:text-destructive text-xs gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair
              </Button>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-3xl sm:text-4xl text-foreground tracking-wider">
                    Painel de Administração
                  </h1>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base ml-[52px]">
                Gere as marcações de treinos e os testemunhos recebidos
              </p>
            </div>

            <Tabs defaultValue="marcacoes" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="marcacoes">Marcações</TabsTrigger>
                <TabsTrigger value="testemunhos">Testemunhos</TabsTrigger>
              </TabsList>

              <TabsContent value="marcacoes" className="mt-0">


            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Total</p>
                <p className="font-heading text-2xl text-foreground">{marcacoes.length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Filtrados</p>
                <p className="font-heading text-2xl text-foreground">{filteredMarcacoes.length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "hsl(142 71% 45%)" }}>Confirmados</p>
                <p className="font-heading text-2xl" style={{ color: "hsl(142 71% 45%)" }}>{confirmados}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Pendentes</p>
                <p className="font-heading text-2xl text-primary">{pendentes}</p>
              </div>
            </div>

            {/* Filters + Refresh */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Filter className="w-4 h-4 text-primary" />
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por nome..."
                    value={searchNome}
                    onChange={(e) => setSearchNome(e.target.value)}
                    className="pl-9 w-[200px] border-border"
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[200px] justify-start text-left font-normal border-border",
                        !filterDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterDate ? format(filterDate, "dd/MM/yyyy", { locale: pt }) : "Filtrar por data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} locale={pt} className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger className="w-[180px] border-border">
                    <SelectValue placeholder="Tipo de treino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="individual">Treino Individual</SelectItem>
                    <SelectItem value="grupo">Treino de Grupo</SelectItem>
                    <SelectItem value="footcamp">Footcamp</SelectItem>
                  </SelectContent>
                </Select>
                {(filterDate || filterTipo !== "todos" || searchNome) && (
                  <Button variant="ghost" size="sm" onClick={() => { setFilterDate(undefined); setFilterTipo("todos"); setSearchNome(""); }} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4 mr-1" /> Limpar
                  </Button>
                )}
                <div className="ml-auto">
                  <Button variant="outline" size="sm" onClick={fetchMarcacoes} disabled={loading} className="border-border">
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
            ) : marcacoes.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                <CalendarIcon className="w-14 h-14 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Nenhuma marcação encontrada</p>
                <p className="text-sm mt-1">As marcações aparecerão aqui quando forem criadas.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block bg-card border border-border rounded-xl overflow-hidden shadow-lg shadow-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[130px]">Estado</TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase min-w-[140px]">
                          <User className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Nome
                        </TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[70px] text-center">Idade</TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[130px]">
                          <Phone className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Telemóvel
                        </TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[120px] text-center">
                          <Users className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Tipo
                        </TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[110px]">
                          <CalendarIcon className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Data
                        </TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[70px] text-center">
                          <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Hora
                        </TableHead>
                        <TableHead className="text-primary/80 font-heading tracking-wider text-xs uppercase w-[140px]">Criado em</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMarcacoes.map((m) => {
                        const isFootcamp = m.tipo === "footcamp";
                        const expanded = expandedRow === m.id;
                        return (
                          <Fragment key={m.id}>
                            <TableRow className="border-border/50 hover:bg-surface-elevated/50 transition-colors">
                              <TableCell>
                                <Select value={m.estado} onValueChange={(v) => handleEstadoChange(m.id, v)}>
                                  <SelectTrigger className={cn("h-8 text-xs font-semibold rounded-full px-3 border", estadoStyles[m.estado] || estadoStyles.pendente)}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {ESTADOS.map((e) => (
                                      <SelectItem key={e} value={e} className="capitalize">{e}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="font-semibold text-foreground">
                                <div className="flex items-center gap-2">
                                  {m.nome}
                                  {isFootcamp && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpandedRow(expanded ? null : m.id)}>
                                      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-center">{m.idade}</TableCell>
                              <TableCell className="text-muted-foreground font-mono text-sm">{m.telemovel}</TableCell>
                              <TableCell className="text-center">
                                <span className={cn(
                                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                  m.tipo === "individual"
                                    ? "bg-primary/15 text-primary border border-primary/25"
                                    : m.tipo === "grupo"
                                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                                    : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                                )}>
                                  {m.tipo === "individual" ? <User className="w-3 h-3" /> : m.tipo === "grupo" ? <Users className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                                  {m.tipo === "individual" ? "Individual" : m.tipo === "grupo" ? "Grupo" : "Footcamp"}
                                </span>
                              </TableCell>
                              <TableCell className="text-foreground font-medium">{m.data ? formatDate(m.data) : <span className="text-muted-foreground">—</span>}</TableCell>
                              <TableCell className="text-foreground font-medium text-center">{m.hora || <span className="text-muted-foreground">—</span>}</TableCell>
                              <TableCell className="text-muted-foreground text-xs">{formatCreatedAt(m.created_at)}</TableCell>
                              <TableCell>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full" disabled={deleting === m.id}>
                                      {deleting === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Eliminar marcação?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Tens a certeza que queres eliminar a marcação de <strong>{m.nome}</strong>? Esta ação não pode ser revertida.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(m.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                            </TableRow>
                            {isFootcamp && expanded && (
                              <TableRow key={m.id + "-details"} className="border-border/50 bg-surface-elevated/30">
                                <TableCell colSpan={9} className="py-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Encarregado</p>
                                      <p className="text-foreground">{m.encarregado || "—"}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Seguro anual</p>
                                      <p className="text-foreground">{m.seguro_anual ? "Sim" : "Não"}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Desconto irmãos</p>
                                      <p className="text-foreground">{m.desconto_irmaos ? "Sim" : "Não"}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Valor total</p>
                                      <p className="text-foreground font-semibold text-primary">{m.valor_total != null ? `${m.valor_total}€` : "—"}</p>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Semanas</p>
                                      <ul className="text-foreground space-y-0.5">
                                        {(m.semanas || []).map((s, i) => <li key={i}>• {s}</li>)}
                                      </ul>
                                    </div>
                                    {m.observacoes && (
                                      <div className="col-span-2 md:col-span-4">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Observações</p>
                                        <p className="text-foreground whitespace-pre-wrap">{m.observacoes}</p>
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {filteredMarcacoes.map((m) => {
                    const isFootcamp = m.tipo === "footcamp";
                    return (
                    <div key={m.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground text-base">{m.nome}</span>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
                          m.tipo === "individual"
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : m.tipo === "grupo"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                        )}>
                          {m.tipo === "individual" ? <User className="w-3 h-3" /> : m.tipo === "grupo" ? <Users className="w-3 h-3" /> : <Trophy className="w-3 h-3" />}
                          {m.tipo === "individual" ? "Individual" : m.tipo === "grupo" ? "Grupo" : "Footcamp"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {m.data && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <CalendarIcon className="w-3.5 h-3.5 text-primary/60" />
                            <span className="text-foreground font-medium">{formatDate(m.data)}</span>
                          </div>
                        )}
                        {m.hora && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 text-primary/60" />
                            <span className="text-foreground font-medium">{m.hora}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5 text-primary/60" />
                          <span className="font-mono text-foreground">{m.telemovel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="text-xs">Idade:</span>
                          <span className="text-foreground">{m.idade}</span>
                        </div>
                      </div>
                      {isFootcamp && (
                        <div className="space-y-2 rounded-lg bg-surface-elevated/40 p-3 text-xs">
                          {m.encarregado && <div><span className="text-muted-foreground">Encarregado: </span><span className="text-foreground">{m.encarregado}</span></div>}
                          {m.semanas && m.semanas.length > 0 && (
                            <div>
                              <p className="text-muted-foreground mb-1">Semanas:</p>
                              <ul className="text-foreground space-y-0.5">
                                {m.semanas.map((s, i) => <li key={i}>• {s}</li>)}
                              </ul>
                            </div>
                          )}
                          <div className="flex gap-4 flex-wrap">
                            <span><span className="text-muted-foreground">Seguro: </span><span className="text-foreground">{m.seguro_anual ? "Sim" : "Não"}</span></span>
                            <span><span className="text-muted-foreground">Irmãos: </span><span className="text-foreground">{m.desconto_irmaos ? "Sim" : "Não"}</span></span>
                            {m.valor_total != null && <span><span className="text-muted-foreground">Total: </span><span className="text-primary font-semibold">{m.valor_total}€</span></span>}
                          </div>
                          {m.observacoes && (
                            <div>
                              <p className="text-muted-foreground mb-0.5 flex items-center gap-1"><FileText className="w-3 h-3" /> Observações:</p>
                              <p className="text-foreground whitespace-pre-wrap">{m.observacoes}</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-1 border-t border-border/50 gap-2">
                        <Select value={m.estado} onValueChange={(v) => handleEstadoChange(m.id, v)}>
                          <SelectTrigger className={cn("h-8 text-xs font-semibold rounded-full px-3 border w-auto", estadoStyles[m.estado] || estadoStyles.pendente)}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ESTADOS.map((e) => (
                              <SelectItem key={e} value={e} className="capitalize">{e}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8" disabled={deleting === m.id}>
                              {deleting === m.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Eliminar marcação?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tens a certeza que queres eliminar a marcação de <strong>{m.nome}</strong>? Esta ação não pode ser revertida.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(m.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </>
            )}
            </TabsContent>

            <TabsContent value="testemunhos" className="mt-0">
              <TestemunhosPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

export default Marcacoes;
