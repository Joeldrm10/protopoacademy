import { useEffect, useMemo, useState, useCallback } from "react";
import PasswordGate from "@/components/PasswordGate";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, Phone, User, Clock, Users, Loader2, RefreshCw, Trash2, Check, Filter, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterTipo, setFilterTipo] = useState<string>("todos");

  const filteredMarcacoes = useMemo(() => {
    return marcacoes.filter((m) => {
      if (filterTipo !== "todos" && m.tipo !== filterTipo) return false;
      if (filterDate) {
        const selected = format(filterDate, "yyyy-MM-dd");
        if (m.data !== selected) return false;
      }
      return true;
    });
  }, [marcacoes, filterDate, filterTipo]);

  const fetchMarcacoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marcacoes")
      .select("*")
      .order("data", { ascending: true })
      .order("hora", { ascending: true });

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

  return (
    <PasswordGate>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Marcações de Treino
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredMarcacoes.length} de {marcacoes.length} marcação{marcacoes.length !== 1 ? "ões" : ""} registada{marcacoes.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" onClick={fetchMarcacoes} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[200px] justify-start text-left font-normal", !filterDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterDate ? format(filterDate, "dd/MM/yyyy", { locale: pt }) : "Filtrar por data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} locale={pt} className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          <Select value={filterTipo} onValueChange={setFilterTipo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de treino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="grupo">Grupo</SelectItem>
            </SelectContent>
          </Select>
          {(filterDate || filterTipo !== "todos") && (
            <Button variant="ghost" size="sm" onClick={() => { setFilterDate(undefined); setFilterTipo("todos"); }}>
              <X className="w-4 h-4 mr-1" /> Limpar filtros
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : marcacoes.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Nenhuma marcação encontrada.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estado</TableHead>
                  <TableHead><User className="w-4 h-4 inline mr-1" /> Nome</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead><Phone className="w-4 h-4 inline mr-1" /> Telemóvel</TableHead>
                  <TableHead><Users className="w-4 h-4 inline mr-1" /> Tipo</TableHead>
                  <TableHead><CalendarIcon className="w-4 h-4 inline mr-1" /> Data</TableHead>
                  <TableHead><Clock className="w-4 h-4 inline mr-1" /> Hora</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarcacoes.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleConfirmado(m.id, m.confirmado)}
                        className={m.confirmado
                          ? "bg-green-500/20 text-green-600 hover:bg-green-500/30 hover:text-green-700"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }
                      >
                        <Check className="w-4 h-4 mr-1" />
                        {m.confirmado ? "Confirmado" : "Pendente"}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{m.nome}</TableCell>
                    <TableCell>{m.idade}</TableCell>
                    <TableCell>{m.telemovel}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        m.tipo === "individual"
                          ? "bg-primary/20 text-primary"
                          : "bg-accent/20 text-accent-foreground"
                      }`}>
                        {m.tipo === "individual" ? "Individual" : "Grupo"}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(m.data)}</TableCell>
                    <TableCell>{m.hora}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatCreatedAt(m.created_at)}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" disabled={deleting === m.id}>
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
        )}
      </div>
    </div>
    </PasswordGate>
  );
};

export default Marcacoes;
