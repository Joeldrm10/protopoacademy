import { useEffect, useState } from "react";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { buildMarcacoesExcel, exportExcelFilename } from "@/lib/marcacoesExcel";
import { deliverFile, downloadBlob } from "@/lib/downloadFile";
import type { Tables } from "@/integrations/supabase/types";

const PAGE_SIZE = 1000;

async function fetchEveryMarcacao() {
  const records = new Map<string, Tables<"marcacoes">>();
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("marcacoes")
      .select("*")
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

      const records = await fetchEveryMarcacao();
      const blob = await buildMarcacoesExcel(records);
      const file = { blob, filename: exportExcelFilename() };

      if (matchMedia("(pointer: coarse)").matches) {
        setPrepared(file);
        toast.success("Excel preparado. Carrega em «Descarregar Excel» para o guardar ou partilhar.");
      } else {
        downloadBlob(file.blob, file.filename);
        toast.success(`${records.length} registos exportados para Excel.`);
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
          <h2 className="font-heading text-sm uppercase tracking-wider text-foreground">Exportação completa</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Todas as edições e todos os registos, sem aplicar os filtros apresentados no ecrã.
          </p>
        </div>
      </div>
      <Button
        type="button"
        onClick={handleClick}
        disabled={exporting}
        className="w-full sm:w-auto font-heading tracking-wider"
      >
        {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
        {exporting ? "A PREPARAR EXCEL..." : prepared ? "DESCARREGAR EXCEL" : "EXPORTAR TUDO PARA EXCEL"}
      </Button>
    </div>
  );
};

export default ExportMarcacoesExcel;
