import { useEffect, useMemo, useState } from "react";
import AdminAuth from "@/components/AdminAuth";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  CalendarIcon, Phone, User, Clock, Users, Loader2, RefreshCw,
  Trash2, Check, Filter, X, LogOut, Shield, LayoutDashboard, Search,
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

type Marcacao = {
  id: string;
  nome: string;
  idade: string;
  telemovel: string;
  tipo: string;
  data: string;
  hora: string;
  created_at: string;
  confirmado: boolean;
};

const Marcacoes = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [searchNome, setSearchNome] = useState("");

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

  const confirmados = useMemo(() => marcacoes.filter((m) => m.confirmado).length, [marcacoes]);
  const pendentes = useMemo(() => marcacoes.filter((m) => !m.confirmado).length, [marcacoes]);

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
      setMarcacoes(data || []);
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

  const handleToggleConfirmado = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("marcacoes")
      .update({ confirmado: !current } as any)
      .eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar estado");
    } else {
      setMarcacoes((prev) =>
        prev.map((m) => (m.id === id ? { ...m, confirmado: !current } : m))
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
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading text-3xl sm:text-4xl text-foreground tracking-wider">
                    Painel de Marcações
                  </h1>
                </div>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base ml-[52px]">
                Aqui pode consultar e gerir todos os pedidos de treino
              </p>
            </div>

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
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="grupo">Grupo</SelectItem>
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
                      {filteredMarcacoes.map((m) => (
                        <TableRow key={m.id} className="border-border/50 hover:bg-surface-elevated/50 transition-colors">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleConfirmado(m.id, m.confirmado)}
                              className={cn(
                                "text-xs font-semibold rounded-full px-3 transition-all",
                                m.confirmado
                                  ? "bg-green-500/15 text-green-500 hover:bg-green-500/25 hover:text-green-400 border border-green-500/20"
                                  : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                              )}
                            >
                              <Check className="w-3.5 h-3.5 mr-1" />
                              {m.confirmado ? "Confirmado" : "Pendente"}
                            </Button>
                          </TableCell>
                          <TableCell className="font-semibold text-foreground">{m.nome}</TableCell>
                          <TableCell className="text-muted-foreground text-center">{m.idade}</TableCell>
                          <TableCell className="text-muted-foreground font-mono text-sm">{m.telemovel}</TableCell>
                          <TableCell className="text-center">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                              m.tipo === "individual"
                                ? "bg-primary/15 text-primary border border-primary/25"
                                : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                            )}>
                              {m.tipo === "individual" ? <User className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                              {m.tipo === "individual" ? "Individual" : "Grupo"}
                            </span>
                          </TableCell>
                          <TableCell className="text-foreground font-medium">{formatDate(m.data)}</TableCell>
                          <TableCell className="text-foreground font-medium text-center">{m.hora}</TableCell>
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
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {filteredMarcacoes.map((m) => (
                    <div key={m.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground text-base">{m.nome}</span>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider",
                          m.tipo === "individual"
                            ? "bg-primary/15 text-primary border border-primary/25"
                            : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                        )}>
                          {m.tipo === "individual" ? <User className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          {m.tipo === "individual" ? "Individual" : "Grupo"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CalendarIcon className="w-3.5 h-3.5 text-primary/60" />
                          <span className="text-foreground font-medium">{formatDate(m.data)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary/60" />
                          <span className="text-foreground font-medium">{m.hora}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5 text-primary/60" />
                          <span className="font-mono text-foreground">{m.telemovel}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="text-xs">Idade:</span>
                          <span className="text-foreground">{m.idade}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleConfirmado(m.id, m.confirmado)}
                          className={cn(
                            "text-xs font-semibold rounded-full px-3",
                            m.confirmado
                              ? "bg-green-500/15 text-green-500 border border-green-500/20"
                              : "bg-primary/10 text-primary border border-primary/20"
                          )}
                        >
                          <Check className="w-3.5 h-3.5 mr-1" />
                          {m.confirmado ? "Confirmado" : "Pendente"}
                        </Button>
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
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </PasswordGate>
  );
};

export default Marcacoes;
