import { useEffect, useState } from "react";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { buildMarcacoesExcel, DEFAULT_EXPORT_EDITION, exportExcelFilename, selectAthletes, type ExportEdition } from "@/lib/marcacoesExcel";
import { AUTUMN_EDITION, SUMMER_EDITION } from "@/lib/footcampEdition";
import { deliverFile, downloadBlob } from "@/lib/downloadFile";
import type { Tables } from "@/integrations/supabase/types";

const PAGE_SIZE = 1000;

async function fetchEveryMarcacao(edition: ExportEdition) {
  const records = new Map<string, Tables<"marcacoes">>();
  let from = 0;

  while (true) {
    let query = supabase
      .from("marcacoes")
      .select("*")
      .eq("tipo", "footcamp");
    if (edition === AUTUMN_EDITION) query = query.eq("edicao", AUTUMN_EDITION);
    if (edition === SUMMER_EDITION) query = query.or(`edicao.eq.${SUMMER_EDITION},edicao.is.null`);
    const { data, error } = await query
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    for (const record of data || []) records.set(record.id, record);
    if (!data || data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return [...records.values()];
}

type PreparedFile = { blob: Blob; filename: string };

const ExportMarcacoesExcel = () => {
  const { session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [prepared, setPrepared] = useState<PreparedFile | null>(null);
  const [edition, setEdition] = useState<ExportEdition>(DEFAULT_EXPORT_EDITION);
  const [unidentifiedCount, setUnidentifiedCount] = useState(0);

  useEffect(() => {
    let active = true;
    const checkRole = async () => {
      if (!session?.user.id) {
        if (active) { setIsAdmin(false); setCheckingRole(false); }
        return;
      }
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (active) {
        setIsAdmin(!error && data === true);
        setCheckingRole(false);
      }
      if (!error && data === true) {
        const { count } = await supabase.from("marcacoes")
          .select("id", { count: "exact", head: true }).eq("tipo", "footcamp").is("edicao", null);
        if (active) setUnidentifiedCount(count ?? 0);
      }
    };
    void checkRole();
    return () => { active = false; };
  }, [session?.user.id]);

  if (!session || checkingRole || !isAdmin) return null;

  const prepareExport = async () => {
    setExporting(true);
    try {
      const { data: authorised, error: roleError } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (roleError || authorised !== true) {
        setIsAdmin(false);
        throw new Error("A exportação está reservada a administradores.");
      }

      const records = await fetchEveryMarcacao(edition);
      const blob = await buildMarcacoesExcel(records, edition);
      const file = { blob, filename: exportExcelFilename(edition) };

      if (matchMedia("(pointer: coarse)").matches) {
        setPrepared(file);
        toast.success("Excel preparado. Carrega em «Descarregar Excel» para o guardar ou partilhar.");
      } else {
        downloadBlob(file.blob, file.filename);
        toast.success(`${selectAthletes(records, edition).length} inscrições exportadas para Excel.`);
      }
    } catch (error) {
      console.error("Erro ao exportar marcações:", error);
      toast.error(error instanceof Error ? error.message : "Não foi possível exportar os dados.");
    } finally {
      setExporting(false);
    }
  };

  const handleClick = () => {
    if (prepared) {
      const file = prepared;
      setPrepared(null);
      void deliverFile(file.blob, file.filename);
      return;
    }
    void prepareExport();
  };

  return (
    <div className="bg-card border border-primary/30 rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-start gap-3 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <FileSpreadsheet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-heading text-sm uppercase tracking-wider text-foreground">Exportação de atletas</h2>
          {unidentifiedCount > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              {unidentifiedCount} inscrições antigas sem edição identificada: verificar no Admin.
              {" "}Mantidas no histórico do Verão; excluídas do Outono.
            </p>
          )}
        </div>
      </div>
      <Select value={edition} disabled={exporting} onValueChange={(value) => {
        if (value !== "todos" && value !== SUMMER_EDITION && value !== AUTUMN_EDITION) return;
        setEdition(value);
        setPrepared(null);
      }}>
        <SelectTrigger className="w-full sm:w-[230px] shrink-0" aria-label="Edição para exportar">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SUMMER_EDITION}>Footcamp Verão 2026</SelectItem>
          <SelectItem value={AUTUMN_EDITION}>Footcamp Outono 2026</SelectItem>
          <SelectItem value="todos">Todas as edições</SelectItem>
        </SelectContent>
      </Select>
      <Button
        type="button"
        onClick={handleClick}
        disabled={exporting}
        className="w-full sm:w-auto h-auto min-h-10 whitespace-normal font-heading tracking-wider"
      >
        {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
        {exporting ? "A PREPARAR EXCEL..." : prepared ? "DESCARREGAR EXCEL" : "Exportar Atletas para Excel"}
      </Button>
    </div>
  );
};

export default ExportMarcacoesExcel;
