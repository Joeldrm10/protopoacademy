import { useEffect, useMemo, useState, Fragment } from "react";
import AdminAuth from "@/components/AdminAuth";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import {
  CalendarIcon, Phone, User, Clock, Users, Loader2, RefreshCw,
  Trash2, Check, Filter, X, LogOut, Shield, LayoutDashboard, Search,
  ChevronDown, ChevronUp, Trophy, FileText, UserCheck, MessageCircle,
  XCircle, Euro,
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
  nome_irmaos: string | null;
  autorizacao_imagem: boolean | null;
  restricao_alimentar: boolean | null;
  restricao_alimentar_desc: string | null;
  tamanho_tshirt: string | null;
  tamanho_calcas: string | null;
  data_nascimento: string | null;
  clube_atual: string | null;
  posicao: string | null;
  escalao: string | null;
  email_encarregado: string | null;
  emergencia_nome: string | null;
  emergencia_parentesco: string | null;
  emergencia_telemovel: string | null;
  tem_alergias: boolean | null;
  alergias_descricao: string | null;
  toma_medicacao: boolean | null;
  medicacao_descricao: string | null;
  informacao_medica: string | null;
};


const ESTADOS = ["pendente", "contactado", "confirmado", "cancelado"] as const;
const estadoStyles: Record<string, string> = {
  pendente: "bg-primary/10 text-primary border-primary/20",
  contactado: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  confirmado: "bg-green-500/15 text-green-500 border-green-500/20",
  cancelado: "bg-destructive/15 text-destructive border-destructive/25",
};

type FamilyBadgeProps = {
  self: Marcacao;
  related: Marcacao[];
};
const FamilyBadge = ({ self, related }: FamilyBadgeProps) => {
  if (related.length === 0) return null;
  const all = [self, ...related];
  const total = all.length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors bg-green-500/15 text-green-500 border-green-500/25 hover:bg-green-500/25"
          title="Clica para ver inscrições relacionadas"
        >
          🟢 Família identificada ({total} atletas)
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
          <UserCheck className="w-3 h-3" /> Família identificada ({total} atletas)
        </p>
        <ul className="space-y-1.5">
          {all.map((r) => (
            <li key={r.id} className="text-sm">
              <p className="font-semibold text-foreground">{r.nome}</p>
              <p className="text-xs text-muted-foreground">
                {r.encarregado || "—"} · <span className="font-mono">{r.telemovel}</span>
              </p>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

const hasMedicalInfo = (m: Marcacao) =>
  m.tem_alergias === true || m.toma_medicacao === true || m.restricao_alimentar === true || !!(m.informacao_medica && m.informacao_medica.trim());

const MedicalAlerts = ({ m }: { m: Marcacao }) => {
  const has = hasMedicalInfo(m);
  return (
    <div className={cn(
      "rounded-lg border p-3 text-xs space-y-1",
      has ? "border-destructive/40 bg-destructive/10" : "border-border bg-surface-elevated/30"
    )}>
      <p className={cn("font-bold uppercase tracking-wider text-[11px]", has ? "text-destructive" : "text-muted-foreground")}>
        🚨 Alertas médicos
      </p>
      {!has ? (
        <p className="text-muted-foreground">Sem alertas médicos.</p>
      ) : (
        <ul className="space-y-0.5 text-foreground">
          {m.tem_alergias && <li><span className="text-muted-foreground">Alergias: </span>{m.alergias_descricao || "(sem descrição)"}</li>}
          {m.toma_medicacao && <li><span className="text-muted-foreground">Medicação: </span>{m.medicacao_descricao || "(sem descrição)"}</li>}
          {m.restricao_alimentar && <li><span className="text-muted-foreground">Restrição alimentar: </span>{m.restricao_alimentar_desc || "(sem descrição)"}</li>}
          {m.informacao_medica && <li><span className="text-muted-foreground">Informação médica: </span>{m.informacao_medica}</li>}
        </ul>
      )}
    </div>
  );
};



// Build WhatsApp URL from a Portuguese phone number
const waUrl = (phone: string | null | undefined, nome?: string, tipo?: string) => {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "#";
  const intl = digits.startsWith("351") ? digits : `351${digits}`;
  const atleta = nome || "—";
  const msg = tipo === "footcamp"
    ? `Olá, sou da ProTopo Academy relativamente à inscrição de ${atleta} no Footcamp Verão 2026.`
    : `Olá${nome ? ` ${nome.split(" ")[0]}` : ""}! Contacto da ProTopo Academy sobre a tua inscrição.`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
};



const Marcacoes = () => {
  const { session, loading: authLoading, signOut } = useAuth();
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterSemana, setFilterSemana] = useState<string>("todos");
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const [filterEstado, setFilterEstado] = useState<string>("todos");
  const [searchNome, setSearchNome] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredMarcacoes = useMemo(() => {
    return marcacoes.filter((m) => {
      if (filterTipo !== "todos" && m.tipo !== filterTipo) return false;
      if (filterEstado !== "todos" && m.estado !== filterEstado) return false;
      if (filterSemana !== "todos") {
        const semanas = m.semanas || [];
        const hasWeek = semanas.some((s) => {
          const match = s.match(/(\d)/);
          return match && match[1] === filterSemana;
        });
        if (!hasWeek) return false;
      }
      if (searchNome && !m.nome.toLowerCase().includes(searchNome.toLowerCase())) return false;
      return true;
    });
  }, [marcacoes, filterSemana, filterTipo, filterEstado, searchNome]);

  // Family detection: index marcações by normalized encarregado and telemóvel
  const normalize = (s: string | null | undefined) =>
    (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();
  const normalizePhone = (s: string | null | undefined) => (s || "").replace(/\D/g, "");

  const splitSiblings = (s: string | null | undefined) =>
    (s || "")
      .split(/[,;\n/]|\s+e\s+|\s+&\s+/i)
      .map((n) => normalize(n))
      .filter(Boolean);

  const familyMap = useMemo(() => {
    const map = new Map<string, Marcacao[]>();
    // Only consider non-cancelled real registrations for family detection
    const candidates = marcacoes.filter((m) => m.estado !== "cancelado");
    candidates.forEach((m) => {
      const mPhone = normalizePhone(m.telemovel);
      const mEnc = normalize(m.encarregado);
      const mName = normalize(m.nome);
      const mSiblings = splitSiblings(m.nome_irmaos);

      const related: Marcacao[] = [];
      const seenNames = new Set<string>([mName]);
      candidates.forEach((other) => {
        if (other.id === m.id) return;
        const otherName = normalize(other.nome);
        if (!otherName || seenNames.has(otherName)) return; // dedupe same athlete
        const otherPhone = normalizePhone(other.telemovel);
        const otherEnc = normalize(other.encarregado);
        const otherSiblings = splitSiblings(other.nome_irmaos);

        const samePhone = !!mPhone && mPhone === otherPhone;
        const sameEnc = !!mEnc && mEnc === otherEnc;
        const nameInOtherSiblings = !!mName && otherSiblings.includes(mName);
        const otherInMySiblings = mSiblings.includes(otherName);

        if (samePhone || sameEnc || nameInOtherSiblings || otherInMySiblings) {
          related.push(other);
          seenNames.add(otherName);
        }
      });
      map.set(m.id, related);
    });
    return map;
  }, [marcacoes]);

  const confirmados = useMemo(() => marcacoes.filter((m) => m.estado === "confirmado").length, [marcacoes]);
  const pendentes = useMemo(() => marcacoes.filter((m) => m.estado === "pendente").length, [marcacoes]);
  const cancelados = useMemo(() => marcacoes.filter((m) => m.estado === "cancelado").length, [marcacoes]);

  // Receita prevista (uses valor_total, excludes cancelled)
  const receita = useMemo(() => {
    const active = marcacoes.filter((m) => m.estado !== "cancelado" && m.valor_total != null);
    const total = active.reduce((s, m) => s + (m.valor_total || 0), 0);
    const confirmado = active.filter((m) => m.estado === "confirmado").reduce((s, m) => s + (m.valor_total || 0), 0);
    const pendente = total - confirmado;
    return { total, confirmado, pendente };
  }, [marcacoes]);

  // Equipamento (footcamp, non-cancelled)
  const TAMANHOS = ["6/8", "8/10", "10/12", "12/14", "XS", "S", "M", "L", "XL"] as const;
  const equipamentoStats = useMemo(() => {
    const fc = marcacoes.filter((m) => m.tipo === "footcamp" && m.estado !== "cancelado");
    const tshirts: Record<string, number> = {};
    const calcas: Record<string, number> = {};
    TAMANHOS.forEach((t) => { tshirts[t] = 0; calcas[t] = 0; });
    fc.forEach((m) => {
      if (m.tamanho_tshirt && tshirts[m.tamanho_tshirt] != null) tshirts[m.tamanho_tshirt]++;
      if (m.tamanho_calcas && calcas[m.tamanho_calcas] != null) calcas[m.tamanho_calcas]++;
    });
    return { tshirts, calcas };
  }, [marcacoes]);


  // Footcamp stats
  const footcampStats = useMemo(() => {
    const fc = marcacoes.filter((m) => m.tipo === "footcamp" && m.estado !== "cancelado");
    const weekCounts = [0, 0, 0, 0];
    fc.forEach((m) => {
      (m.semanas || []).forEach((s) => {
        const match = s.match(/(\d)/);
        if (match) {
          const idx = parseInt(match[1], 10) - 1;
          if (idx >= 0 && idx < 4) weekCounts[idx]++;
        }
      });
    });
    // Families: groups of 2+ that share encarregado/telemóvel
    const seen = new Set<string>();
    let familiesCount = 0;
    fc.forEach((m) => {
      if (seen.has(m.id)) return;
      const rel = (familyMap.get(m.id) || []).filter((r) => r.tipo === "footcamp" && r.estado !== "cancelado");
      if (rel.length > 0) {
        familiesCount++;
        seen.add(m.id);
        rel.forEach((r) => seen.add(r.id));
      }
    });
    return { total: fc.length, weeks: weekCounts, families: familiesCount };
  }, [marcacoes, familyMap]);

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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6">
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
              <div className="bg-card border border-border rounded-xl p-4 col-span-2 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider mb-1 text-destructive">🔴 Cancelados</p>
                <p className="font-heading text-2xl text-destructive">{cancelados}</p>
              </div>
            </div>

            {/* Footcamp Stats */}
            {footcampStats.total > 0 && (
              <div className="bg-gradient-to-br from-amber-500/10 via-card to-card border border-amber-500/30 rounded-xl p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h2 className="font-heading text-sm uppercase tracking-wider text-amber-400">Estatísticas Footcamp</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-sm">
                  <div className="bg-surface-elevated/40 rounded-lg p-2.5">
                    <p className="text-xs text-muted-foreground">👥 Atletas</p>
                    <p className="font-heading text-xl text-foreground">{footcampStats.total}</p>
                  </div>
                  {footcampStats.weeks.map((c, i) => (
                    <div key={i} className="bg-surface-elevated/40 rounded-lg p-2.5">
                      <p className="text-xs text-muted-foreground">⚽ Semana {i + 1}</p>
                      <p className="font-heading text-xl text-foreground">{c}</p>
                    </div>
                  ))}
                  <div className="bg-surface-elevated/40 rounded-lg p-2.5">
                    <p className="text-xs text-muted-foreground">👨‍👦 Famílias</p>
                    <p className="font-heading text-xl text-foreground">{footcampStats.families}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Receita Prevista */}
            <div className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 rounded-xl p-4 sm:p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Euro className="w-4 h-4 text-primary" />
                <h2 className="font-heading text-sm uppercase tracking-wider text-primary">💰 Receita Prevista</h2>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-surface-elevated/40 rounded-lg p-2.5">
                  <p className="text-xs text-muted-foreground">Total previsto</p>
                  <p className="font-heading text-xl text-foreground">{receita.total}€</p>
                </div>
                <div className="bg-surface-elevated/40 rounded-lg p-2.5">
                  <p className="text-xs" style={{ color: "hsl(142 71% 45%)" }}>Confirmado</p>
                  <p className="font-heading text-xl" style={{ color: "hsl(142 71% 45%)" }}>{receita.confirmado}€</p>
                </div>
                <div className="bg-surface-elevated/40 rounded-lg p-2.5">
                  <p className="text-xs text-primary">Pendente</p>
                  <p className="font-heading text-xl text-primary">{receita.pendente}€</p>
                </div>
              </div>
            </div>

            {/* Equipamento */}
            {footcampStats.total > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="font-heading text-sm uppercase tracking-wider text-foreground">👕 Equipamento</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">T-shirts</p>
                    <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-xs">
                      {TAMANHOS.map((t) => (
                        <div key={t} className="bg-surface-elevated/40 rounded-md p-2 text-center">
                          <p className="text-muted-foreground">{t}</p>
                          <p className="font-heading text-base text-foreground">{equipamentoStats.tshirts[t]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Calções</p>
                    <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-xs">
                      {TAMANHOS.map((t) => (
                        <div key={t} className="bg-surface-elevated/40 rounded-md p-2 text-center">
                          <p className="text-muted-foreground">{t}</p>
                          <p className="font-heading text-base text-foreground">{equipamentoStats.calcas[t]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}



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
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { value: "todos", label: "Todos os atletas" },
                    { value: "1", label: "Semana 1" },
                    { value: "2", label: "Semana 2" },
                    { value: "3", label: "Semana 3" },
                    { value: "4", label: "Semana 4" },
                  ].map((opt) => {
                    const active = filterSemana === opt.value;
                    return (
                      <Button
                        key={opt.value}
                        type="button"
                        variant={active ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterSemana(opt.value)}
                        className={cn(
                          "border-border",
                          active && "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-md shadow-primary/20"
                        )}
                      >
                        {opt.label}
                      </Button>
                    );
                  })}
                </div>
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
                <Select value={filterEstado} onValueChange={setFilterEstado}>
                  <SelectTrigger className="w-[170px] border-border">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os estados</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="contactado">Contactado</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                {(filterSemana !== "todos" || filterTipo !== "todos" || filterEstado !== "todos" || searchNome) && (
                  <Button variant="ghost" size="sm" onClick={() => { setFilterSemana("todos"); setFilterTipo("todos"); setFilterEstado("todos"); setSearchNome(""); }} className="text-muted-foreground hover:text-foreground">
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
                        const related = familyMap.get(m.id) || [];
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
                                <div className="flex items-center gap-2 flex-wrap">
                                  {m.nome}
                                  {isFootcamp && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setExpandedRow(expanded ? null : m.id)}>
                                      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </Button>
                                  )}
                                  <FamilyBadge self={m} related={related} />
                                </div>
                                {isFootcamp && m.encarregado && (
                                  <p className="text-xs text-muted-foreground font-normal mt-0.5">
                                    Enc: <span className="text-foreground">{m.encarregado}</span>
                                  </p>
                                )}
                              </TableCell>
                              <TableCell className="text-muted-foreground text-center">{m.idade}</TableCell>
                              <TableCell className="text-foreground font-mono text-sm font-semibold">
                                <div className="flex items-center gap-2">
                                  <span>{m.telemovel}</span>
                                  <a
                                    href={waUrl(m.telemovel, m.nome, m.tipo)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Abrir WhatsApp"
                                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/15 text-green-500 hover:bg-green-500/25 transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                                {isFootcamp && m.valor_total != null && (
                                  <p className="text-xs font-sans font-bold text-primary mt-1 flex items-center gap-0.5">
                                    <Euro className="w-3 h-3" />{m.valor_total}
                                  </p>
                                )}
                              </TableCell>
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
                                  <div className="space-y-4">
                                    {/* Atleta */}
                                    <div>
                                      <p className="text-xs uppercase tracking-wider text-primary/80 mb-2">👤 Atleta</p>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                        <div><p className="text-xs text-muted-foreground">Data nasc.</p><p className="text-foreground">{m.data_nascimento || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Clube atual</p><p className="text-foreground">{m.clube_atual || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Posição</p><p className="text-foreground">{m.posicao || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Escalão</p><p className="text-foreground">{m.escalao || "—"}</p></div>
                                      </div>
                                    </div>

                                    {/* Encarregado */}
                                    <div>
                                      <p className="text-xs uppercase tracking-wider text-primary/80 mb-2">👨‍👩‍👦 Encarregado</p>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                        <div><p className="text-xs text-muted-foreground">Nome</p><p className="text-foreground">{m.encarregado || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Telemóvel</p><p className="text-foreground font-mono">{m.telemovel}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Email</p><p className="text-foreground break-all">{m.email_encarregado || "—"}</p></div>
                                      </div>
                                    </div>

                                    {/* Emergência */}
                                    <div>
                                      <p className="text-xs uppercase tracking-wider text-destructive/90 mb-2">🚨 Contacto de emergência</p>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                        <div><p className="text-xs text-muted-foreground">Nome</p><p className="text-foreground">{m.emergencia_nome || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Parentesco</p><p className="text-foreground">{m.emergencia_parentesco || "—"}</p></div>
                                        <div><p className="text-xs text-muted-foreground">Telemóvel</p><p className="text-foreground font-mono">{m.emergencia_telemovel || "—"}</p></div>
                                      </div>
                                    </div>

                                    {/* Saúde */}
                                    <MedicalAlerts m={m} />

                                    {/* Equipamento + Semanas + Resumo */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Equipamento</p>
                                        <p className="text-foreground">👕 {m.tamanho_tshirt || "—"} · 🩳 {m.tamanho_calcas || "—"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Seguro anual</p>
                                        <p className="text-foreground">{m.seguro_anual ? "Oferecido 🎁" : "Incluído (+20€)"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Desconto irmãos</p>
                                        <p className="text-foreground">{m.desconto_irmaos ? "Sim (-10%)" : "Não"}</p>
                                        {m.desconto_irmaos && m.nome_irmaos && (
                                          <p className="text-xs text-muted-foreground mt-1">Irmão(s): <span className="text-foreground">{m.nome_irmaos}</span></p>
                                        )}
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Imagem autorizada</p>
                                        <p className="text-foreground">{m.autorizacao_imagem == null ? "—" : m.autorizacao_imagem ? "Sim" : "Não"}</p>
                                      </div>
                                      <div className="col-span-2 md:col-span-2">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Semanas</p>
                                        <ul className="text-foreground space-y-0.5">
                                          {(m.semanas || []).map((s, i) => <li key={i}>• {s}</li>)}
                                        </ul>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Valor final</p>
                                        <p className="text-foreground font-semibold text-primary">{m.valor_total != null ? `${m.valor_total}€` : "—"}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Inscrito em</p>
                                        <p className="text-foreground">{formatCreatedAt(m.created_at)}</p>
                                      </div>
                                      {m.observacoes && (
                                        <div className="col-span-2 md:col-span-4">
                                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Observações</p>
                                          <p className="text-foreground whitespace-pre-wrap">{m.observacoes}</p>
                                        </div>
                                      )}
                                    </div>
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
                    const related = familyMap.get(m.id) || [];
                    return (
                    <div key={m.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-foreground text-lg leading-tight">{m.nome}</span>
                          <FamilyBadge self={m} related={related} />
                        </div>
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0",
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
                      {/* Destaque: Encarregado + Telemóvel + Valor */}
                      <div className="rounded-lg bg-surface-elevated/60 border border-primary/20 p-3 space-y-2 text-sm">
                        {m.encarregado && (
                          <div className="flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground text-xs">Encarregado:</span>
                            <span className="text-foreground font-semibold">{m.encarregado}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <a href={`tel:${m.telemovel}`} className="flex items-center gap-1.5 font-mono text-foreground font-bold">
                            <Phone className="w-4 h-4 text-primary" />
                            {m.telemovel}
                          </a>
                          <a
                            href={waUrl(m.telemovel, m.nome, m.tipo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 text-green-500 border border-green-500/30 text-xs font-bold uppercase tracking-wider hover:bg-green-500/25 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>
                        </div>
                        {isFootcamp && m.valor_total != null && (
                          <div className="flex items-center justify-between pt-2 border-t border-border/40">
                            <span className="text-muted-foreground text-xs uppercase tracking-wider">Valor final</span>
                            <span className="font-heading text-lg text-primary flex items-center gap-0.5">
                              <Euro className="w-4 h-4" />{m.valor_total}
                            </span>
                          </div>
                        )}
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
                          <span className="text-xs">Idade:</span>
                          <span className="text-foreground">{m.idade}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3 text-primary/60" />
                        <span>📅 Inscrito em:</span>
                        <span className="text-foreground">{formatCreatedAt(m.created_at)}</span>
                      </div>
                      {isFootcamp && (
                        <div className="space-y-2 rounded-lg bg-surface-elevated/40 p-3 text-xs">
                          {/* Atleta */}
                          <div>
                            <p className="text-[11px] uppercase tracking-wider text-primary/80 mb-1">👤 Atleta</p>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                              {m.data_nascimento && <div><span className="text-muted-foreground">Nasc.: </span><span className="text-foreground">{m.data_nascimento}</span></div>}
                              {m.clube_atual && <div><span className="text-muted-foreground">Clube: </span><span className="text-foreground">{m.clube_atual}</span></div>}
                              {m.posicao && <div><span className="text-muted-foreground">Posição: </span><span className="text-foreground">{m.posicao}</span></div>}
                              {m.escalao && <div><span className="text-muted-foreground">Escalão: </span><span className="text-foreground">{m.escalao}</span></div>}
                            </div>
                          </div>

                          {/* Encarregado email */}
                          {m.email_encarregado && (
                            <div><span className="text-muted-foreground">Email enc.: </span><span className="text-foreground break-all">{m.email_encarregado}</span></div>
                          )}

                          {/* Emergência */}
                          {(m.emergencia_nome || m.emergencia_telemovel) && (
                            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-2">
                              <p className="text-[11px] uppercase tracking-wider text-destructive mb-1">🚨 Emergência</p>
                              <div className="text-foreground">{m.emergencia_nome || "—"} {m.emergencia_parentesco ? `(${m.emergencia_parentesco})` : ""}</div>
                              {m.emergencia_telemovel && (
                                <a href={`tel:${m.emergencia_telemovel}`} className="font-mono text-foreground">{m.emergencia_telemovel}</a>
                              )}
                            </div>
                          )}

                          {/* Alertas médicos */}
                          <MedicalAlerts m={m} />

                          {m.semanas && m.semanas.length > 0 && (
                            <div>
                              <p className="text-muted-foreground mb-1">Semanas:</p>
                              <ul className="text-foreground space-y-0.5">
                                {m.semanas.map((s, i) => <li key={i}>• {s}</li>)}
                              </ul>
                            </div>
                          )}
                          <div className="flex gap-4 flex-wrap">
                            <span><span className="text-muted-foreground">Seguro: </span><span className="text-foreground">{m.seguro_anual ? "Oferecido 🎁" : "Incluído (+20€)"}</span></span>
                            <span><span className="text-muted-foreground">Irmãos: </span><span className="text-foreground">{m.desconto_irmaos ? "Sim (-10%)" : "Não"}</span></span>
                            {m.valor_total != null && <span><span className="text-muted-foreground">Valor final: </span><span className="text-primary font-semibold">{m.valor_total}€</span></span>}
                          </div>
                          {m.desconto_irmaos && m.nome_irmaos && (
                            <div><span className="text-muted-foreground">Outro(s) irmão(s): </span><span className="text-foreground">{m.nome_irmaos}</span></div>
                          )}
                          {m.autorizacao_imagem != null && (
                            <div><span className="text-muted-foreground">Imagem autorizada: </span><span className="text-foreground">{m.autorizacao_imagem ? "Sim" : "Não"}</span></div>
                          )}
                          {(m.tamanho_tshirt || m.tamanho_calcas) && (
                            <div>
                              <span className="text-muted-foreground">Equipamento: </span>
                              <span className="text-foreground">👕 {m.tamanho_tshirt || "—"} · 🩳 {m.tamanho_calcas || "—"}</span>
                            </div>
                          )}
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
