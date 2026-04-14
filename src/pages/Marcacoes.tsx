import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, Phone, User, Clock, Users, Loader2, RefreshCw, Trash2, Check } from "lucide-react";
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

  const fetchMarcacoes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marcacoes")
      .select("*")
      .order("created_at", { ascending: false });

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Marcações de Treino
            </h1>
            <p className="text-muted-foreground mt-1">
              {marcacoes.length} marcação{marcacoes.length !== 1 ? "ões" : ""} registada{marcacoes.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" onClick={fetchMarcacoes} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
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
                {marcacoes.map((m) => (
                  <TableRow key={m.id}>
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
  );
};

export default Marcacoes;
